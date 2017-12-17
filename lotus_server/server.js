'uses strict';

// Server setup
require('dotenv').config();
const express = require('express')
const server = express();
const PORT = 3001;
const WebSocket = require('ws');
const expressws = require('express-ws')(server);
const bodyParser = require('body-parser')

// Functions
const buildMonstersJSON = require('./lib/build_monsters_json');
const buildMonsterJSON = require('./lib/build_monster_json');

// Body Parser
server.use(bodyParser.urlencoded({ extended: false }));

function genBattle(id){
  server.ws(`/battles/${id}`, (ws) => {
    ws.on('message', function(msg) {
      ws.send(`Echo from /battle/, ${msg}`);
    });
  });
  server.get(`/battles/${id}`, (req, res) => {
    res.send(`in the Get of /battles/${id}`);
  });
  server.post(`/battles/${id}`, (req, res) => {
    res.send(`in the Post of /battles/${id}`);
  });
}

server.get('/battles',(req,res) => {
  res.render('gen.ejs');
});

server.post('/battles',(req,res) => {
  genBattle(req.body.roomname);
  res.send(`Room Created at ${req.body.roomname}`);
});

// Find monsters so they can be fetched by React Monsters component
server.get('/monsters', (req, res) => {
  // Get all monster IDs
  buildMonstersJSON(res);
});

// Find a single monster so it can be fetched by React Monster component
server.get('/monsters/:id', (req, res) => {
  buildMonsterJSON(res, req.params.id);
});

// Start server
server.listen(PORT, '0.0.0.0', 'localhost', () => {
  console.log(`Listening on ${PORT}`);
});
