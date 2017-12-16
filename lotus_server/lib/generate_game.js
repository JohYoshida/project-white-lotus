const generatePlayer = require('./generate_player');

class Game{
  constructor(players){
    this.players = players;
    this.start = true;
    this.activePlayer = undefined;
    this.idlePlayer = undefined;

    // action handlers
    const attack = (actionObj) => {
      const actionName = Object.keys(actionObj)[0];
      let actionFuncName = actionObj[actionName];
      let attackFunc = undefined;
      // Find the attack from in the active player
      for(let attack of this.activePlayer.activeMonster.attack){
        if(Object.keys(attack)[0] === actionFuncName){
          attackFunc = attack[actionFuncName];
        }
      }
      // Set the attack player's turn to false.
      this.activePlayer.setState(this.activePlayer.executeActive());

      // Execute the attack function so that it effects the idle player. Set the attacked player's turn to true.
      this.idlePlayer.setState(this.idlePlayer.executePassive(attackFunc));
      this.idlePlayer.turn = true;

      // trigger adjust active player
      this.findActivePlayer();
    };

    const passive = () => {

    };

    const activate = () => {

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
    const actionName = Object.keys(actionObj)[0]
    this.actions[actionName](actionObj);
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
