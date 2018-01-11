// Server setup
const express = require('express');
const expressws = require('express-ws');
const socketFunctions = require('./socket_functions');

module.exports = (server) => {
  const wss = expressws(server);
  const socketRouter = express.Router();
  // generates a room
  socketRouter.genBattle = function(id){
    const roomFunctionality = socketFunctions(wss, id);
    this.ws(`/${id}`, roomFunctionality);
    // For testing whether a room exists on the client side.
    this.get(`/${id}`, (req, res) => {
      res.send({flash: 'Sorry, this room already exists.'});
    });
  };
  socketRouter.post('/',(req,res) => {
    const {roomName} = req.body;
    socketRouter.genBattle(roomName);
    res.send(JSON.stringify({flash:`/battles/${roomName}`}));
  });
  return socketRouter;
};
