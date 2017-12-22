// Server setup/dependencies
require('dotenv').config();
const express = require('express');
const server = express();
const PORT = 3001;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const uuid = require('uuid/v1');

// database setup
const dbconfig = require('./knexfile.js')[process.env.DB_ENV];
const knex = require('knex')(dbconfig);

// Models
const {Team, TeamMonster} = require('./models/team_model');

// Routes
const socketRouter = require('./routes/battles_routes')(server);
const monsterRouter = require('./routes/monster_routes')(knex);

// Functions
const loginUser = require('./lib/login_user');
const registerUser = require('./lib/register_user');


// Middleware
server.use(bodyParser.urlencoded({ extended: false }));
// This is required to parse POST fetch requests for the store
server.use(bodyParser.json());

// Cookie Parser
server.use(cookieParser());

// Default room for testing.
socketRouter.genBattle('1');

server.use('/battles', socketRouter);
server.use('/monsters', monsterRouter);

server.post('/login', (req, res) => {
  loginUser(res, req.body.email, req.body.password);
});

server.post('/users', (req, res) => {
  registerUser(res, req.body.email, req.body.password);
});

server.get('/users/:id', (req, res) => {
  const { id } = req.params;
  knex('users').first('brouzoff', 'email').where('id', id)
    .then(data => {
      res.send(JSON.stringify(data));
    });
});

// Change the player's money
server.patch('/users/:id', (req, res) => {
  const userId = req.params.id;
  let brouzoffChange = req.body.brouzoffChange;
  knex.select().from('users').where('id', '=', userId)
    .increment('brouzoff', brouzoffChange).then();
  res.status(204).send();
});

server.post('/users/:id/teams', (req, res) => {
  const {id} = req.params;
  // should look like {members: [monstId1, monstId2, monstId3]}
  const {members} = req.body;
  new Team().save({id:uuid(), user_id:id}).then(team => {
    return Promise.all([
      new TeamMonster().save({team_id: team.get('id'), monster_id: members[0]}),
      new TeamMonster().save({team_id: team.get('id'), monster_id: members[1]}),
      new TeamMonster().save({team_id: team.get('id'), monster_id: members[2]}),
    ]);
  });
  res.send({alert: 'Team saved!'});
});


server.listen(PORT, '0.0.0.0', 'localhost', () => {
  console.log(`Listening on ${PORT}`);
});
