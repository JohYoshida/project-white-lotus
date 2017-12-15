const generateTeam = require('./generate_team');

class Player {
  constructor(userid, team) {
    this.id = userid;
    this.team = team;
    this.turn = true;
  }
  // Function takes an object of changes and applies them to the player.
  // Object should be equivalent to how the player is constructed.
  setState(changesObj){
    for(const propertyName in changesObj){
      const property = changesObj[propertyName];
      // if there isn't a deeper object that needs to be updated.
      if(typeof property !== 'object'){
        this[propertyName] = property;
        continue;
      }
      for(const subPropertyName in property){
        this[propertyName][subPropertyName] = property[subPropertyName];
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
