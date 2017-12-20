const generatePlayer = require('../lib/generate_player');
const Game = require('../lib/generate_game');

module.exports = (socketRouter, id) => {
  // handles setting up the room
  const setupRoom = (playerInfo) => {
    socketRouter.rooms[`battle_${id}`] = {};
    let room = socketRouter.rooms[`battle_${id}`];
    return generatePlayer(playerInfo.battlerId, playerInfo.team.split(',')).then(player => {
      room['players'] = [player];
    });
  };

  // once both players are in a room, this starts the game.
  const startGame = (msg) => {
    const room = socketRouter.rooms[`battle_${id}`];
    const playerInfo = msg;
    return generatePlayer(playerInfo.battlerId, playerInfo.team.split(',')).then(player => {
      room.players.push(player);
      return new Game(room.players);
    });
  };

  const handleJoinRequest = (room, msg) => {
    // If the game room for this socket doesn't exist.
    if(!room) {
      return setupRoom(msg).catch(() => delete socketRouter.rooms[`battle_${id}`]);
    }
    if(room) {
      return startGame(msg).then(game => {
        delete room.players;
        room.game = game;
        return JSON.stringify({game: game, message:['Game started!']});
      });
    }
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
    ws.on('message', function(msg) {
      const room = socketRouter.rooms[`battle_${id}`];
      let parsedMsg = JSON.parse(msg);
      switch(parsedMsg.messageType) {
      case 'team': {
        handleJoinRequest(room, parsedMsg).then(game => game && ws.send(game));
        break;
      }
      case 'action' : {
        const messages = handleActions(room, parsedMsg);
        ws.send(JSON.stringify({
          game: room.game,
          messages: room.game.gameOver ? ['Game is over!'] : messages
        }));
        break;
      }
      default:
        ws.send(JSON.stringify({error: 'Invalid message'}));
      }
    });
  };

  return socketFunctionality;
};
