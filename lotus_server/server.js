'uses strict';

require('dotenv').config();
const generatePlayer = require('./lib/generate_player.js');
const getCreature = require('./models/monster_builder');
const express = require('express')
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const server = express();


const dbconfig = require('./knexfile.js')[process.env.DB_ENV];
const knex = require('knex')(dbconfig);
const bodyParser = require('body-parser')

const PORT = 3001;

server.use(bodyParser.urlencoded({ extended: false }))

server.get('/monsters', (req, res) => {
  getCreature(1).then(creature => {
    res.send(JSON.stringify(creature));
  })
});

server.get('/battle/:id', (req, res) => {
  console.log(req.query);
  generatePlayer(req.query.userid, req.query.team.split('')).then(team => {
    res.send(JSON.stringify(team));
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
