const generateTeam = require('./generate_team');

class Player {
  constructor(userid, team) {
    this.id = userid;
    this.team = team;
    this.turn = false;
    this.activeMonster = undefined;
  }
  // Executes an active action and switches turn. Can be passed an action (such as unbenching a monster), or just be used to switch turns.
  executeActive(activeAction){
    if (activeAction) {
      activeAction(this);
    }
    this.turn = false;
  }
  // Executes a passive acction, like taking damage. A passive acton is essentially "being attacked".
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
