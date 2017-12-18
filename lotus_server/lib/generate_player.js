const generateTeam = require('./generate_team');

class Player {
  constructor(userid, team) {
    this.id = userid;
    this.team = team;
    this.turn = false;
    this.activeMonster = undefined;
  }
  executeActive(activeAction){
    if (activeAction) {
      activeAction(this);
    }
    this.turn = false;
  }
  executePassive(passiveAction){
    passiveAction(this);
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
