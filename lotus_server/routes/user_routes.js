// Server setup
const express = require('express');
const userRouter = express.Router();

// Models
const {Team, TeamMonster} = require('../models/team_model');
const getUserModel = require('../models/user_model');

// Functions
const uuid = require('uuid/v1');
const formatTeam = require('./team_functions');

module.exports = (db) => {
  const User = getUserModel(db);

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
        // remove any null entries before sending.
        res.send(JSON.stringify({teams: formattedTeams.filter(team => team)}));
      });
    });
  });

  return userRouter;
};
