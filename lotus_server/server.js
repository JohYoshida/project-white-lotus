'uses strict';

require('dotenv').config();
const generatePlayer = require('./lib/generate_player.js');
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
  knex.from('monsters')
    .then(monsters => {
      for (let monster in monsters) {
        // console.log(monster, monsters[monster]);
      }
      res.json(monsters);
    });
});

server.get('/battle/:id', (req, res) => {
  // assumed the "team" is already generated.
  // In reality, the team would be selected (i.e. generated), then the Player would be created.
  // We're skipping that part for testing.
  console.log(req.query);
  generatePlayer(req.query.monsters.split('')).then(team => {
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
