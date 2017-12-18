'uses strict';

// Server setup
require('dotenv').config();
const express = require('express')
const server = express();
const PORT = 3001;
const WebSocket = require('ws');
const expressws = require('express-ws')(server);
const bodyParser = require('body-parser')

// Routes
const socketRouter = require('./routes/battles_routes')(server);
// Functions
const buildMonstersJSON = require('./lib/build_monsters_json');
const buildMonsterJSON = require('./lib/build_monster_json');
const generatePlayer = require('./lib/generate_player');
// Body Parser
server.use(bodyParser.urlencoded({ extended: false }));


// Default room for testing.
socketRouter.genBattle('1');
server.use('/battles', socketRouter);

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
