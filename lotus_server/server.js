'uses strict';

require('dotenv').config();
const generatePlayer = require('./lib/generate_player.js');
const getCreature = require('./models/monster_builder');
const express = require('express')
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const server = express();


const getMonsters = require('./models/monster_builder');
const dbconfig = require('./knexfile.js')[process.env.DB_ENV];
const knex = require('knex')(dbconfig);
const bodyParser = require('body-parser')
server.use(bodyParser.urlencoded({ extended: false }))


const expressws = require('express-ws')(server);
const PORT = 3001;
server.ws('/battle/:id', function(ws, req) {
  let game = {}
  ws.on('message', function(msg) {
    console.log(msg);
    ws.send("Echo from /battle/"+req.params.id+":"+msg);
  });
});
server.listen(PORT);
// WebSocket
const wss = new SocketServer({ server });
wss.on('connection', (ws) => {
  console.log("A client connected");
  ws.on('close', () => {
    console.log("A client disconnected");
  });
});
server.get('/battle/:id', (req, res) => {
  console.log(req.query);
  generatePlayer(req.query.userid, req.query.team.split('')).then(team => {
    res.send(JSON.stringify(team));
  });

});
server.get('/battles',(req,res)=>{
  console.log();
  res.render('Gen.ejs');
});
server.post('/battles',(req,res)=>{
  console.log(req.body.roomname);
  genBattle(req.body.roomname);
  res.send("Room Created at "+req.body.roomname)
});
function genBattle(id){
  server.ws('/battles/'+id,(req,res,ws)=>{
    ws.send('in the WebSocket of /battles/'+id);
  });
  server.get('/battles/'+id,(req,res)=>{
    res.send('in the Get of /battles/'+id);
  });
  server.post('/battles/'+id,(req,res)=>{
    res.send('in the Post of /battles/'+id);
  });


}

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

server.listen(PORT, '0.0.0.0', 'localhost', () => {
  console.log(`Listening on ${PORT}`);
});
