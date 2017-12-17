const generatePlayer = require('./generate_player');

class Game{
  constructor(players){
    this.players = players;
    this.start = true;
    this.activePlayer = null;
    this.idlePlayer = null;

    // action handlers
    const attack = (actionObj) => {
      const {activePlayer, idlePlayer} = this;
      const actionOptions = actionObj[Object.keys(actionObj)[1]];
      const actionFuncName = actionObj[Object.keys(actionObj)[0]];
      let attackFunc = null;
      // Find the attack function in the active player
      for(let attack of activePlayer.activeMonster.attack){
        if(Object.keys(attack)[0] === actionFuncName){
          attackFunc = attack[actionFuncName];
        }
      }
      // Execute the attack function so that it effects the idle player. Set attacking player's turn to false.
      idlePlayer.executePassive(attackFunc(actionOptions));
      activePlayer.executeActive();
    };

    const passive = () => {
      for(let monsterId in this.activePlayer.team){
        const {team} = this.activePlayer;
        const monster = team[monsterId];
        if(monster.bench && monster.passiveActive && monster.ability){
          this.activePlayer.executePassive(monster.ability);
        }
      }
    };

    const activate = (actionObj) => {
      const {activePlayer, idlePlayer} = this;
      const monsterId = actionObj[Object.keys(actionObj)[0]];
      activePlayer.activateMonster(monsterId);
      activePlayer.executeActive();
      idlePlayer.turn = true;
    };

    this.actions = {
      attack,
      passive,
      activate
    };

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
    const actionName = Object.keys(actionObj)[0];
    this.actions[actionName](actionObj);
    this.findActivePlayer();
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
