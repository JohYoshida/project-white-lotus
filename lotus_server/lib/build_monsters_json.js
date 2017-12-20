const dbconfig = require('../knexfile.js')[process.env.DB_ENV];
const knex = require('knex')(dbconfig);
const getMonster = require('./generate_monster');


const generateMonstersJSON = (res, userid) => {
  knex.from('monsters').column('id').where('user_id', userid)
    .then(ids => {
      const monsterIDs = [];
      for (let index of ids) {
        // Create promise with a complete monster associated with each ID
        monsterIDs.push(getMonster(index.id));
      }
      // When all promises are made, send as JSON to App
      Promise.all(monsterIDs).then(results => {
        res.send(JSON.stringify(results));
      });
    });
}

module.exports = generateMonstersJSON;
