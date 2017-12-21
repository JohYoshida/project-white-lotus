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
  };
  socketRouter.post('/',(req,res) => {
    socketRouter.genBattle(req.body.roomname);
    res.send(JSON.stringify({flash:`Room Created at ${req.body.roomname}`}));
  });
  return socketRouter;
};
