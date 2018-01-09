// Server setup
const buildMonstersJSON = require('../lib/build_monsters_json');
const buildMonsterJSON = require('../lib/build_monster_json');
const express = require('express');
const getCreature = require('../lib/generate_monster.js');
const Monster = require('../models/monster_model.js')();

module.exports = (db) => {
  const User = require('../models/user_model')(db);
  const monsterRouter = express.Router();
  // Find monsters so they can be fetched by React Monsters component
  monsterRouter.get('/', (req, res) => {
    if(!req.session.id) res.status(400).send();
    // Get all monster IDs
    buildMonstersJSON(res, req.session.id)
  });

  // For deleting a monster
  monsterRouter.delete('/:id', (req, res) => {
    const userId = req.session.id;
    const {id} = req.params;
    new Monster({id}).fetch().then(monster => {
      if(monster.get('user_id') !== userId){
        res.status(400).send();
        return;
      }
      monster.destroy().then(() => {
        res.send(JSON.stringify({flash: `Monster ${id} has been deleted.`}));
      })
    });
  });

  // For creating a new monster.
  monsterRouter.post('/', (req, res) => {
    const {id} = req.session;
    const {creature, cost} = req.body;
    if (!creature || !id){
      return;
    }
    // Pull the user model and buy dat monster
    new User({id}).fetch().then(user => {
      if (user.attributes.brouzoff < cost){
        res.send(JSON.stringify({error: 'Sorry, not enough Brouzoff'}));
        return;
      }
      user.buyMonster(creature, cost).then(monster => {
        const monsterId = monster[0];
        getCreature(monsterId).then(monster => {
          res.send(JSON.stringify({monster, brouzoff: user.attributes.brouzoff}));
        });
      });
    });
  });

  return monsterRouter;
};
