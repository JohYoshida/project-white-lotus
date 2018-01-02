// Server setup
const express = require('express');
const userRouter = express.Router();

// database setup
const dbconfig = require('../knexfile.js')[process.env.DB_ENV];
const knex = require('knex')(dbconfig);

// Models
const {Team, TeamMonster} = require('../models/team_model');
const getUserModel = require('../models/user_model');

// Functions
const uuid = require('uuid/v1');
const formatTeam = require('./team_functions');
const registerUser = require('../lib/register_user');

module.exports = (db) => {
  const User = getUserModel(db);

  userRouter.post('/', (req, res) => {
    registerUser(res, req.body.email, req.body.password);
  });

  // Change the player's money
  userRouter.patch('/brouzoff/:id', (req, res) => {
    const userId = req.params.id;
    let brouzoffChange = req.body.brouzoffChange;
    knex.select().from('users').where('id', '=', userId)
      .increment('brouzoff', brouzoffChange).then();
    res.status(204).send();
  });

  userRouter.post('/teams', (req, res) => {
    const {id} = req.cookies;
    if(!id) res.send({error: 'Not authorized to complete this transaction.'});
    // req body should look like {name: "MyTeam", members: [monstId1, monstId2, monstId3]}
    const {name, members} = req.body;
    new Team().save({id:uuid(), name, user_id:id}).then(team => {
      return Promise.all([
        new TeamMonster().save({team_id: team.get('id'), monster_id: members[0]}),
        new TeamMonster().save({team_id: team.get('id'), monster_id: members[1]}),
        new TeamMonster().save({team_id: team.get('id'), monster_id: members[2]}),
      ]);
    });
    res.send({flash: 'Team saved!'});
  });

  userRouter.get('/teams', (req, res) => {
    const {id} = req.cookies;
    new User({id}).fetch({withRelated:['team']}).then(user => {
      const teams = user.related('team').serialize();
      const teamPromises = teams.map(team => new TeamMonster().query({where: {team_id: team.id}}).fetchAll({withRelated: ['monster', 'team']}));
      Promise.all(teamPromises).then(teams => {
        const formattedTeams = teams.map(formatTeam);
        Promise.all(formattedTeams).then(teams => {
          // remove any null entries before sending.
          res.send(JSON.stringify({teams: teams.filter(team => team)}));
        });
      });
    });
  });

  // Sends back a JSON entry of the deleted team name.
  userRouter.delete('/teams', (req, res) => {
    const {teamId} = req.body;
    const userId = req.cookies.id;
    new Team({id: teamId}).fetch({withRelated:['teamMonster']}).then(team => {
      if(team.get('user_id') !== userId){
        return res.send(JSON.stringify({error: 'Not authorized to complete this transaction'}));
      }
      // destroy all the teamMonsterEntries then the team itself.
      Promise.all(team.related('teamMonster').models.map(teamMonsterEntries => {
        // to destroy something, there must be a where clause or an id attribute
        // teamMonsterEntries have a null id by default.
        teamMonsterEntries.where({team_id: team.get('id')}).destroy();
      })).then(() => {
        team.destroy().then(team => {
          res.send(JSON.stringify({flash: `${team.get('name')} has been deleted.`}));
        });
      });
    });
  });

  userRouter.get('/:id', (req, res) => {
    const {id} = req.params;
    knex('users').first('brouzoff', 'email').where('id', id)
    .then(data => {
      res.send(JSON.stringify(data));
    });
  });

  return userRouter;
};
