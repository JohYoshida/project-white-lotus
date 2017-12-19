'uses strict';

// Server setup
require('dotenv').config();
const express = require('express')
const server = express();
const PORT = 3001;
const WebSocket = require('ws');
const expressws = require('express-ws')(server);
const bodyParser = require('body-parser');

// database setup
const dbconfig = require('./knexfile.js')[process.env.DB_ENV];
const knex = require('knex')(dbconfig);

// functions
const generateUser = require('./lib/generate_user');

// Routes
const socketRouter = require('./routes/battles_routes')(server);
// Functions
const buildMonstersJSON = require('./lib/build_monsters_json');
const buildMonsterJSON = require('./lib/build_monster_json');
const generatePlayer = require('./lib/generate_player');
const addUser = require('./lib/add_user')
const monsterRouter = require('./routes/monster_routes')(knex);

// Body Parser
server.use(bodyParser.urlencoded({ extended: false }));
// This is required to parse POST fetch requests for the store
server.use(bodyParser.json());

// Default room for testing.
socketRouter.genBattle('1');

server.use('/battles', socketRouter);
server.use('/monsters', monsterRouter);

server.get('/users/:email/:password', (req, res) => {
  // find a user by email
  generateUser(res, req.params.email);
});
server.get('/create/:email/:password', (req, res) => {
  // find a user by email
  addUser(res, req.params.email,req.params.password);
});
// Find a single monster so it can be fetched by React Monster component
server.get('/monsters/:id', (req, res) => {
  buildMonsterJSON(res, req.params.id);
});


// Start server
server.listen(PORT, '0.0.0.0', 'localhost', () => {
  console.log(`Listening on ${PORT}`);
});
