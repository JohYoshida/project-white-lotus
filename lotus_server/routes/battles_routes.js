// Server setup
const express = require('express');
const WebSocket = require('ws');
const generatePlayer = require('../lib/generate_player');

module.exports = (server) => {
  const expressws = require('express-ws')(server);
  const socketRouter = express.Router();
  socketRouter.rooms = {};
  // generates a room
  socketRouter.genBattle = function(id){
    this.ws(`/${id}`, (ws) => {
      ws.on('message', function(msg) {
        /* @TODO add more intelligence to this on message event */

        // If the game room for this socket doesn't exist.
        if(!socketRouter.rooms[`battle_${id}`]){
          const playerInfo = JSON.parse(msg);
          socketRouter.rooms[`battle_${id}`] = {};
          let room = socketRouter.rooms[`battle_${id}`];
          generatePlayer(playerInfo.userid, playerInfo.team.split(',')).then(player => {
            room['players'] = [player];
            ws.send(JSON.stringify(room.players));
          });
          return;
        }
        ws.send(`Echo from /battle/, ${msg}`);
      });
    });
  }
  socketRouter.post('/',(req,res) => {
    genBattle(req.body.roomname);
    res.send(`Room Created at ${req.body.roomname}`);
  });
  return socketRouter;
}
