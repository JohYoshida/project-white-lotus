// Server setup
const express = require('express');
const WebSocket = require('ws');
const socketFunctions = require('./socket_functions');

module.exports = (server) => {
  const expressws = require('express-ws')(server);
  const socketRouter = express.Router();
  socketRouter.rooms = {};
  // generates a room
  socketRouter.genBattle = function(id){
    const socketFunctionality = socketFunctions(socketRouter, id);
    this.ws(`/${id}`, socketFunctionality);
  };

  socketRouter.post('/',(req,res) => {
    socketRouter.genBattle(req.body.roomname);
    res.send(JSON.stringify({flash:`Room Created at ${req.body.roomname}`}));
  });
  return socketRouter;
};
