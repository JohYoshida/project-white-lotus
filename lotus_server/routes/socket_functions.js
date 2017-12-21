const generatePlayer = require('../lib/generate_player');
const Game = require('../lib/generate_game');

module.exports = (wss, id) => {
  // handles setting up the room
  const setupRoom = (room, playerInfo) => {
    room.battle = {};
    let battle = room.battle;
    return generatePlayer(playerInfo.battlerId, playerInfo.team.split(',')).then(player => {
      battle['players'] = [player];
    });
  };

  // once both players are in a room, this starts the game.
  const startGame = (battle, msg) => {
    const playerInfo = msg;
    return generatePlayer(playerInfo.battlerId, playerInfo.team.split(',')).then(player => {
      battle.players.push(player);
      return new Game(battle.players);
    });
  };

  // Executes action on behalf of client.
  const handleActions = (room, actionInfo) => {
    const {action} = actionInfo;
    if(!action){
      return;
    }
    return room.game.takeAction(actionInfo);
  };

  const socketFunctionality = (ws) => {
    const clients = wss.getWss(`/${id}`).clients;
    ws.broadcast = (data) => {
      clients.forEach(client => {
        // deep cloning object, note no functions are carried over, OK for this purpose.
        const copiedData = JSON.parse(JSON.stringify(data));
        const {game} = copiedData;
        for(let player of game.players){
          if(player.id !== client.id){
            delete player.id;
          }
        }
        if(client.readyState === 1){
          client.send(JSON.stringify(copiedData));
        }
      });
    };
    ws.on('message', function(msg) {
      const room = wss.getWss(`/${id}`);
      const battle = room.battle;
      let parsedMsg = JSON.parse(msg);
      switch(parsedMsg.messageType) {
      case 'join': {
        room.clients.forEach(client => {
          if(!client.id) client.id = parsedMsg.battlerId;
        });
        if(!battle) {
          setupRoom(room, parsedMsg).catch(() => delete ws.battle);
        } else {
          startGame(battle, parsedMsg).then(game => {
            delete battle.players;
            battle.game = game;
            ws.broadcast({game: game, message:['Game started!']});
          });
        }
        break;
      }
      case 'action' : {
        const messages = handleActions(battle, parsedMsg);
        // console.log(battle.game.players);
        ws.broadcast({
          game: battle.game,
          messages: battle.game.gameOver ? ['Game is over!'] : messages
        });
        break;
      }
      default:
        ws.send(JSON.stringify({error: 'Invalid message'}));
      }
    });
  };

  return socketFunctionality;
};
