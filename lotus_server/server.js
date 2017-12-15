'uses strict';

require('dotenv').config();
const express = require('express')
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const server = express();

const dbconfig = require('./knexfile.js')[process.env.DB_ENV];
const knex = require('knex')(dbconfig);

const PORT = 3001;

server.get('/monsters', (req, res) => {
  knex.from('monsters')
  .then(monsters => {
    for (let monster in monsters) {
      console.log(monster, monsters[monster]);
    }
    res.json(monsters);
  });
});

server.listen(PORT, '0.0.0.0', 'localhost', () => {
  console.log(`Listening on ${PORT}`);
});

// WebSocket
const wss = new SocketServer({ server });
wss.on('connection', (ws) => {
  console.log("A client connected");

  ws.on('close', () => {
    console.log("A client disconnected");
  });
});
