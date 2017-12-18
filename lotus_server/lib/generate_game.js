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
      const actionOptions = actionObj.opts;
      const actionFuncName = actionObj.name;
      let attackFunc = null;
      // Find the attack function in the active player
      for(let attack of activePlayer.activeMonster.attacks){
        if(attack.name === actionFuncName){
          attackFunc = attack.func;
        }
      }
      // Execute the attack function so that it effects the idle player. Set attacking player's turn to false.
      idlePlayer.executePassive(attackFunc(actionOptions));
      activePlayer.executeActive();
    };

    // used to execute all passive abilities of monsters with their passive's active. This can include monsters on the field
    // actionObj to trigger this should look like {action:'passive'}
    const passive = () => {
      for(let monsterId in this.activePlayer.team){
        const {team} = this.activePlayer;
        const monster = team[monsterId];
        if(monster.bench && monster.passiveActive && monster.ability){
          this.activePlayer.executePassive(monster.ability);
        }
        // if there is a dot on the monster, activate it.
        /* @TODO: implment DOT */
        if(monster.dot.length > 1){
          monster.dot.forEach(dot => {
            this.activePlayer.executePassive(dot.func);
          });
        }
      }
    };
    // this is used to execute position shifts, takes the id of the monster through the action object
    // actionObj should look like {action:'activate', id:{monster_id}}
    const activate = (actionObj) => {
      const {activePlayer, idlePlayer} = this;
      const monsterId = actionObj.monsterId;
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
    // Look for the appropriate action.
    this.actions[actionObj.action](actionObj);
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
