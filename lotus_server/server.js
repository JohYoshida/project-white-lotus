// Server setup/dependencies
require('dotenv').config();
const express = require('express');
const server = express();
const PORT = 3001;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// Routes
const socketRouter = require('./routes/battles_routes')(server);
const monsterRouter = require('./routes/monster_routes')(knex);
const userRouter = require('./routes/user_routes')(knex);

// Functions
const loginUser = require('./lib/login_user');

// Middleware
// Body Parser
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(express.static('./models/monsters'))
// Cookie Parser
server.use(cookieParser());

// Default room for testing.
socketRouter.genBattle('1');

server.use('/battles', socketRouter);
server.use('/monsters', monsterRouter);
server.use('/user', userRouter);

server.post('/login', (req, res) => {
  loginUser(res, req.body.email, req.body.password);
});

server.listen(PORT, '0.0.0.0', 'localhost', () => {
  console.log(`Listening on ${PORT}`);
});
