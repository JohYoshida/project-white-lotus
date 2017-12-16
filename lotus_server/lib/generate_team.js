const getCreature = require('./generate_monster');

const generateTeam = (team) => {
  const teamMembers = [];
  // spin up the promises
  team.forEach(creature => {
    teamMembers.push(getCreature(creature));
  });
  // Once all the teamMembers are pulled.
  return Promise.all(teamMembers).then(team => {
    const teamObj = {};
    team.forEach(monster => {
      teamObj[monster.id] = monster;
    });
    return teamObj;
  });
};

module.exports = generateTeam
