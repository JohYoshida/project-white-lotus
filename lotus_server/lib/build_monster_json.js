const dbconfig = require('../knexfile.js')[process.env.DB_ENV];
const knex = require('knex')(dbconfig);
const getMonster = require('./generate_monster');


const generateMonstersJSON = (res, id) => {
  getMonster(id).then(result => {
    res.json(result);
  });
}

module.exports = generateMonstersJSON;
