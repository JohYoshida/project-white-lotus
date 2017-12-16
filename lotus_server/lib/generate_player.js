const generateTeam = require('./generate_team');

class Player {
  constructor(userid, team) {
    this.id = userid;
    this.team = team;
    this.turn = false;
    this.activeMonster = undefined;
  }
  // Function takes an object of changes and applies them to the player.
  // Lets you change the player's properties but also the player's teams. Useful for any range of effects.
  // When to use:
  // - When you want to change a monster or multiple monster's properties (e.g. taking damage).
  // - When you want to conveniently affect mmultiple properties at the same time.
  setState(changesObj){
    for(const propertyName in changesObj){
      const property = changesObj[propertyName];
      // if there isn't a deeper object that needs to be updated.
      if(typeof property !== 'object'){
        this[propertyName] = property;
        continue;
      }
      for(const bodyPartName in property){
        const bodyPart = property[bodyPartName];
        for(const bodyPartAttribute in bodyPart){
          this[propertyName][bodyPartName][bodyPartAttribute] = bodyPart[bodyPartAttribute];
        }
      }
    }
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
