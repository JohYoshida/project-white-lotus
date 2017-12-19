// Server setup
const buildMonstersJSON = require('../lib/build_monsters_json');
const buildMonsterJSON = require('../lib/build_monster_json');
const express = require('express');

// returns a random element from a table
const randomComponentId = (collection) => {
  return collection[Math.floor(Math.random()*(collection.length-1))].id;
};

/* @TODO implement random kaiju name generator */


module.exports = (db) => {

  const monsterRouter = express.Router();

  // Find monsters so they can be fetched by React Monsters component
  monsterRouter.get('/', (req, res) => {
    // Get all monster IDs
    buildMonstersJSON(res);
  });

  // Find a single monster so it can be fetched by React Monster component
  monsterRouter.get('/:id', (req, res) => {
    buildMonsterJSON(res, req.params.id);
  });

  // For creating a new monster.
  monsterRouter.post('/', (req, res) => {
    const {creature, userid} = req.body;
    Promise.all([
      db.select('id').from('bodies').where('creature', creature),
      db.select('id').from('heads').where('creature', creature),
      db.select('id').from('arms').where('creature', creature)
    ]).then(components => {
      const bodies = components[0];
      const heads = components[1];
      const arms = components[2];
      const newMonster = {
        arm_id: randomComponentId(arms),
        body_id: randomComponentId(bodies),
        head_id: randomComponentId(heads),
        name: 'Talonridge',
        user_id: userid
      };
      db('monsters').insert(newMonster, 'id').then(monster => {
        res.send(JSON.stringify(monster));
      });
    });
  });

  // For updating monster name
  monsterRouter.put('/:id', (req, res) => {
    /* @TODO add user authentication */
  });

  return monsterRouter;
};
