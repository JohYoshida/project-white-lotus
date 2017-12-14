const getCreature = require('../models/monster_builder');

const generateTeam = (team) => {
  const teamMembers = [];
  // spin up the promises
  team.forEach(creature => {
    teamMembers.push(getCreature(creature));
  });
  // This should be a function of the user object. So userId will become this.userId.
  const userId = 1;
  return Promise.all(teamMembers).then(team => {
    return {userId, team};
  });
};

module.exports = generateTeam
