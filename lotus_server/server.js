'uses strict';

// Server setup
require('dotenv').config();
const express = require('express')
const server = express();
const PORT = 3001;
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const expressws = require('express-ws')(server);
const dbconfig = require('./knexfile.js')[process.env.DB_ENV];
const knex = require('knex')(dbconfig);
const bodyParser = require('body-parser')

// Functions
const generatePlayer = require('./lib/generate_player.js');
const getCreature = require('./models/monster_builder');
// const getMonsters = require('./models/monster_builder');
const generateMonstersJSON = require('./lib/generate_monsters_json');

// Body Parser
server.use(bodyParser.urlencoded({ extended: false }));

// Start server
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

server.ws('/battle/:id', function(ws, req) {
  let game = {}
  ws.on('message', function(msg) {
    console.log(msg);
    ws.send("Echo from /battle/"+req.params.id+":"+msg);
  });
});
server.listen(PORT);

server.get('/battle/:id', (req, res) => {
  console.log(req.query);
  generatePlayer(req.query.userid, req.query.team.split('')).then(team => {
    res.send(JSON.stringify(team));
  });
});

server.get('/battles',(req,res) => {
  console.log();
  res.render('Gen.ejs');
});

server.post('/battles',(req,res) => {
  console.log(req.body.roomname);
  genBattle(req.body.roomname);
  res.send(`Room Created at ${req.body.roomname}`)
});

// Find monsters so they can be fetched by React App component
server.get('/monsters', (req, res) => {
  // Get all monster IDs
  generateMonstersJSON(res);
});

function genBattle(id){
  server.ws(`/battles/${id}`, (req, res, ws) => {
    ws.send(`in the WebSocket of /battles/${id}`);
  });
  server.get(`/battles/${id}`, (req, res) => {
    res.send(`in the Get of /battles/${id}`);
  });
  server.post(`/battles/${id}`, (req, res) => {
    res.send(`in the Post of /battles/${id}`);
  });
}
