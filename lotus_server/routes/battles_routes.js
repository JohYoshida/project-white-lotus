// Server setup
const express = require('express');
const WebSocket = require('ws');
const generatePlayer = require('../lib/generate_player');

module.exports = (server) => {
  const expressws = require('express-ws')(server);
  const socketRouter = express.Router();
  const rooms = {};
  // generates a room
  socketRouter.genBattle = function(id){
    this.ws(`/${id}`, (ws) => {
      ws.on('message', function(msg) {
        const playerInfo = JSON.parse(msg);
        let room = rooms[`battle_${id}`];
        // If the room doesn't exist.
        if(!room){
          room = {};
          generatePlayer(playerInfo.userid, playerInfo.team.split('')).then(player => {
            let players = rooms[`battle_${id}`]['players'];
            players = [player];
            ws.send(JSON.stringify(players));
          });
          return;
        }
        /* @TODO: Add a better else */
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
