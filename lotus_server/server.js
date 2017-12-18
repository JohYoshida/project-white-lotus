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

// Routes
const socketRouter = require('./routes/battles_routes')(server);
const monsterRouter = require('./routes/monster_routes')(knex);
// Body Parser
server.use(bodyParser.urlencoded({ extended: false }));

// Default room for testing.
socketRouter.genBattle('1');

server.use('/battles', socketRouter);
server.use('/monsters', monsterRouter);

// Start server
server.listen(PORT, '0.0.0.0', 'localhost', () => {
  console.log(`Listening on ${PORT}`);
});
