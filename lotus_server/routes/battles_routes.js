// Server setup
const express = require('express');
const WebSocket = require('ws');
const roomFunctions = require('./room_functions');

module.exports = (server) => {
  const expressws = require('express-ws')(server);
  const socketRouter = express.Router();
  socketRouter.rooms = {};
  // generates a room
  socketRouter.genBattle = function(id){
    const {setupRoom, startGame} = roomFunctions(socketRouter, id);
    this.ws(`/${id}`, (ws) => {
      ws.on('message', function(msg) {
        const room = socketRouter.rooms[`battle_${id}`];

        let parsedMsg = JSON.parse(msg);
        switch(parsedMsg.messageType) {
        case 'team':
          console.log('User connected:', msg);
          // If the game room for this socket doesn't exist.
          if(!room) {
            setupRoom(msg).catch((error) => {
              delete socketRouter.rooms[`battle_${id}`];
              console.log('There was an error during room creation, room has been deleted. Message:', error);
            }).catch(e => {console.log(e)});
            return;
          }
          if(room) {
            startGame(msg).then(game => {
              delete room.players;
              room.game = game;
              ws.send(JSON.stringify({game: game, message:'Game started!'}));
            }).catch(e => {console.log(e)});
            return;
          }
          break;
        case 'action' : {
          switch(parsedMsg.action) {
          case 'activate': {
            room.game.takeAction(parsedMsg);
            ws.send(JSON.stringify({
              game: room.game,
              message: 'Changed Player active monster to activeMonster.'
            }));
            break;
          }
          case 'attack': {
            room.game.takeAction(parsedMsg);
            // If there is gameover info, send back game is over!
            ws.send(JSON.stringify({
              game: room.game,
              message: room.game.gameOver ? 'Game is over!' : 'playerMonster dealt int damage to enemyMonster'
            }));
            break;
          }
          default:
            console.log('Didn\'t recognize that action type.');
          }
          break;
        }
        default:
          console.log('Didn\'t recognize that message type.');
        }

        ws.send(`Echo from /battle/, ${msg}`);
      });
    });
  };

  socketRouter.post('/',(req,res) => {
    socketRouter.genBattle(req.body.roomname);
    res.send(`Room Created at ${req.body.roomname}`);
  });
  return socketRouter;
};
