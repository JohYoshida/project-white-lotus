const dbconfig = require('../knexfile.js')[process.env.DB_ENV];
const knex = require('knex')(dbconfig);
const getMonsters = require('../models/monster_builder');


const generateMonstersJSON = (res) => {
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
}

module.exports = generateMonstersJSON;
