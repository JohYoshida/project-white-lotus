const getCreature = require('../models/monster_builder');

const generateTeam = (userid, team) => {
  const teamMembers = [];
  // spin up the promises
  team.forEach(creature => {
    teamMembers.push(getCreature(creature));
  });
  // This should be a function of the user object. So userId will become this.userId.
  return Promise.all(teamMembers).then(team => {
    return {userId, team};
  });
};

module.exports = generateTeam
