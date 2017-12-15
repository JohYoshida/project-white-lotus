'uses strict';

require('dotenv').config();
const express = require('express')
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const server = express();

const dbconfig = require('./knexfile.js')[process.env.DB_ENV];
const knex = require('knex')(dbconfig);

const PORT = 3001;

const getMonsters = require('./models/monster_builder');


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

// Find monsters so they can be fetched by React App component
server.get('/monsters', (req, res) => {
  // Get all monster IDs
  knex.from('monsters').column('id')
  .then(ids => {
    const monsterIDs = [];
    for (let index of ids) {
      // Create promise with a complete monster associated with each ID
      monsterIDs.push(getMonsters(index.id));
    }
    // When all promises are made, send as JSON to App
    Promise.all(monsterIDs).then(results => {
      res.send(JSON.stringify(results));
    });
  });
});
