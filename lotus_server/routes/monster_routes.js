// Server setup
const buildMonstersJSON = require('../lib/build_monsters_json');
const buildMonsterJSON = require('../lib/build_monster_json');
const express = require('express');

/* @TODO implement random kaiju name generator */

module.exports = (db) => {
  const User = require('../models/user_model')(db);
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
    if(!creature || !userid){
      return;
    }
    // Pull the user model and buy dat monster
    new User({id: userid}).fetch().then(user => {
      if(user.attributes.brouzoff < 50){
        res.send(JSON.stringify({error: 'Sorry, not enough Brouzoff'}));
        return;
      }
      user.buyMonster(creature).then(monster => {
        const monsterId = monster[0];
        db('monsters').where('id', monsterId).then(monster => {
          res.send(JSON.stringify(monster[0]));
        });
      });
    });
  });

  // For updating monster name
  monsterRouter.put('/:id', (req, res) => {
    const {id} = req.params;
    const {name} = req.body;
    if(!name){
      return;
    }
    db('monsters').update({name: name}).where('id', id).then(() => {
      db('monsters').where('id', id).then(monster => {
        res.send(JSON.stringify(monster[0]));
      });
    });
  });

  return monsterRouter;
};
