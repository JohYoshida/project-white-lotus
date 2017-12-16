const dbconfig = require('../knexfile.js')[process.env.DB_ENV];
const knex = require('knex')(dbconfig);
const getMonsters = require('../models/monster_builder');


const generateMonstersJSON = (res, id) => {
  getMonsters(id).then(result => {
    console.log('Get monster result', result);
    res.json(result);
  });
}

module.exports = generateMonstersJSON;
