const generatePlayer = require('./generate_player');

class Game{
  constructor(players){
    this.players = players;
    this.start = true;
    this.activePlayer = undefined;
    this.idlePlayer = undefined;
  }
  findActivePlayer(){
    for(const player of this.players){
      if(player.turn === true){
        this.activePlayer = player;
      } else {
        this.idlePlayer = player;
      }
    }
  }
  takeAction(actionObj){
    // @todo: put this if block into an object
    if(Object.keys(actionObj)[0] === 'attack'){
      let actionName = Object.keys(actionObj)[0];
      let actionFuncName = actionObj[actionName];
      let attackFunc = undefined;
      for(let attack of this.activePlayer.activeMonster.attack){
        if(Object.keys(attack)[0] === actionFuncName){
          attackFunc = attack[actionFuncName];
        }
      }
      this.activePlayer.setState(this.activePlayer.executeActive());
      this.idlePlayer.setState(this.idlePlayer.executePassive(attackFunc));
      // trigger turn change
      this.findActivePlayer();
    }
  }
}

const generateGame = (playerObj1, playerObj2) => {
  return Promise.all([
    generatePlayer(playerObj1.id, playerObj1.team),
    generatePlayer(playerObj2.id, playerObj2.team)
  ]).then(players => {
    // @todo: create a new game with players array
    return new Game(players);
  });
};

module.exports = generateGame;
