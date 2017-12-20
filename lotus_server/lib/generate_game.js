const generatePlayer = require('./generate_player');

class Game{
  constructor(players){
    this.players = players;
    // First player to join given first turn.
    this.players[0].turn = true;
    this.activePlayer = null;
    this.idlePlayer = null;
    this.gameOver = false;

    /* @TODO put these functions in a seperate file and import them ?*/
    // action handlers

    // Used to execute attack abilities. Options are optional.
    // actionObj = {action:'attack', name:{{attack_name}}, [options:{options}]}
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
      // Idle player's turn is set to true in the attack.
      idlePlayer.executePassive(attackFunc(actionOptions));
      activePlayer.executeActive();
    };

    // used to execute all passive abilities of monsters with their passive's active. This can include monsters on the field.
    // actionObj = {action:'passive'}
    const passive = () => {
      if(!this.activePlayer.activeMonster){
        return;
      }
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
    // actionObj = {action:'activate', id:{monster_id}}
    const activate = (actionObj) => {
      const {activePlayer, idlePlayer} = this;
      const monsterId = actionObj.monsterId;
      activePlayer.activateMonster(monsterId);
      // adjusts turns
      activePlayer.executeActive();
      idlePlayer.turn = true;
    };
    // All possible actions collected here.
    this.actions = {
      attack,
      passive,
      activate
    };
    this.findActivePlayer();
  }
  // Sets this.activePlayer and this.idlePlayer to the appropriate player. Used for turns.
  findActivePlayer(){
    for(const player of this.players){
      if(player.team.aliveMonsters() === 0){
        const losingPlayerIndex = this.players.indexOf(player);
        const winningPlayerIndex = 1 - losingPlayerIndex;
        this.gameOver = {winner:this.players[winningPlayerIndex], loser: this.players[losingPlayerIndex]};
        return;
      }
      // If the turn hasn't changed
      if(player.turn && this.activePlayer === player){
        return;
      }
      player.turn ? this.activePlayer = player : this.idlePlayer = player;
    }
    // executes passives
    this.actions.passive();
  }
  // Used to sort the action object into the appropriate function.
  takeAction(actionObj){
    // Look for the appropriate action.
    this.actions[actionObj.action](actionObj);
    this.findActivePlayer();
  }
}
// class method used to generate a game, for testing.
Game.generateGame = (playerObj1, playerObj2) => {
  return Promise.all([
    generatePlayer(playerObj1.id, playerObj1.team),
    generatePlayer(playerObj2.id, playerObj2.team)
  ]).then(players => {
    return new Game(players);
  });
};

module.exports = Game;
