const generateTeam = require('./generate_team');

class Player {
  constructor(userid, team) {
    this.id = userid;
    this.team = team;
    this.turn = false;
    this.activeMonster = undefined;
  }
  // checks if any monsters are dead.
  checkForDeath(){
    const {team} = this;
    for(const monstId in team){
      const monster = team[monstId];
      if(monster.hp < 1){
        delete team[monstId];
        // If the monster that died is the active monster, the game will automatically set the next monster in the list as the active monster.
        if(monster.bench === false && team.aliveMonsters() > 0){
          const firstMonsterId = Object.keys(team)[0];
          team[firstMonsterId].bench = false;
          this.findActiveMonster();
        }
      }
    }
  }
  activateMonster(monsterId){
    const {team} = this;
    for(const id in team){
      if(monsterId === id){
        team[id].bench = false;
      } else {
        team[id].bench = true;
      }
    }
    this.findActiveMonster();
    return [`User has changed their active monster to ${this.activeMonster.name}`];
  }
  findActiveMonster(){
    for(const monsterId in this.team){
      const monster = this.team[monsterId];
      if(monster.bench === false){
        this.activeMonster = monster;
        break;
      }
    }
  }
}

const generatePlayer = (userid, team) => {
  return generateTeam(team).then(team => {
    return new Player(userid, team);
  });
};

module.exports = generatePlayer;
