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
  // Executes an active action and switches turn. Can be passed an action (such as unbenching a monster), or just be used to switch turns.
  executeActive(activeAction){
    if (activeAction) {
      activeAction(this);
    }
    this.checkForDeath();
    this.turn = false;
  }
  // Executes a passive acction, like taking damage. A passive acton is essentially "being attacked".
  executePassive(passiveAction){
    /* @TODO this should apply rather than pass this, makes for more succinct attack functions */
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
    this.turn = false;
    return {messages: [`User has changed their active monster to ${this.activeMonster.name}`]};
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
