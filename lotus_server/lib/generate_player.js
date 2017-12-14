const generateTeam = require('./generate_team');

class Player {
  constructor(team) {
    this.id = team.userId;
    this.team = team.team;
    this.turn = true;
  }
}

const generatePlayer = (team) => {
  return generateTeam(team).then(team => {
    return new Player(team);
  });
};

module.exports = generatePlayer;
