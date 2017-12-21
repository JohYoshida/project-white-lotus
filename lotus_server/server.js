// Server setup/dependencies
require('dotenv').config();
const express = require('express');
const server = express();
const PORT = 3001;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// database setup
const dbconfig = require('./knexfile.js')[process.env.DB_ENV];
const knex = require('knex')(dbconfig);

// Routes
const socketRouter = require('./routes/battles_routes')(server);
const monsterRouter = require('./routes/monster_routes')(knex);

// Functions
const buildMonstersJSON = require('./lib/build_monsters_json');
const buildMonsterJSON = require('./lib/build_monster_json');
const generatePlayer = require('./lib/generate_player');
const addUser = require('./lib/add_user');

// Functions
const loginUser = require('./lib/login_user');
const registerUser = require('./lib/register_user');

// Middleware
server.use(bodyParser.urlencoded({ extended: false }));
// This is required to parse POST fetch requests for the store
server.use(bodyParser.json());

// Cookie Parser
server.use(cookieParser())

// Default room for testing.
socketRouter.genBattle('1');

server.use('/battles', socketRouter);
server.use('/monsters', monsterRouter);

server.post('/login', (req, res) => {
  loginUser(res, req.body.email, req.body.password);
});

server.post('/users', (req, res) => {
  // find a user by email
  addUser(res, req.body.email, req.body.password);
});

server.get('/users/:id', (req, res) => {
  const { id } = req.params;
  knex('users').first('brouzoff').where('id', id)
    .then(brouzoff => {
      res.send(JSON.stringify(brouzoff));
    });
});

server.listen(PORT, '0.0.0.0', 'localhost', () => {
  console.log(`Listening on ${PORT}`);
});
