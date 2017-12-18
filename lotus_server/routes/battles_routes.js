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
    const {setupRoom, addPlayerToRoom} = roomFunctions(socketRouter, id);
    this.ws(`/${id}`, (ws) => {
      ws.on('message', function(msg) {
        const room = socketRouter.rooms[`battle_${id}`];
        // If the game room for this socket doesn't exist.
        if(!room){
          setupRoom(msg).then(gameUpdate => {
            ws.send(gameUpdate);
          }).catch((error) => {
            delete socketRouter.rooms[`battle_${id}`];
            console.log('There was an error during room creation, room has been deleted. Message:', error);
          });
          return;
        }
        if(room){
          addPlayerToRoom(msg).then(gameUpdate => {
            ws.send(gameUpdate);
          });
          return;
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
