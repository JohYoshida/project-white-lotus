
require('dotenv').config();

const dbconfig = require('../knexfile.js')[process.env.DB_ENV];
const knex = require('knex')(dbconfig);

module.exports = require('bookshelf')(knex)
