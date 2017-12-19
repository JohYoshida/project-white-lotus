const getCreature = require('./generate_monster');

class Team{
  constructor(team){
    for(const monster of team){
      this[monster.id] = monster;
    }
  }
  // returns number of alive monsters
  aliveMonsters(){
    return Object.keys(this).length;
  }
}

const generateTeam = (team) => {
  const teamMembers = [];
  // spin up the promises
  team.forEach(creature => {
    teamMembers.push(getCreature(creature));
  });
  // Once all the teamMembers are pulled.
  return Promise.all(teamMembers).then(teamMembers => {
    return new Team(teamMembers);
  });
};

module.exports = generateTeam;
