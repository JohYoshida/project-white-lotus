const generatePlayer = require('./generate_player');

class Game{
  constructor(players){
    this.players = players;
    // First player to join given first turn.
    this.players[0].turn = true;
    this.activePlayer = null;
    this.idlePlayer = null;
    this.gameOver = false;
    this.findActivePlayer();
  }
  // Used to execute attack abilities. Options are optional.
  // actionObj = {action:'attack', name:{{attack_name}}, [options:{options}]}
  attackDo(actionObj){
    const {activePlayer, idlePlayer} = this;
    const {options, name} = actionObj;
    const messages = activePlayer.activeMonster.attacks[name].func(idlePlayer, options);
    // switch turns, check for deaths
    this.switchTurns();
    return messages;
  }
  // used to execute all passive abilities of monsters with their passive's active. This can include monsters on the field.
  passive(){
    const {activePlayer} = this;
    const {team} = activePlayer;
    const messages = [];
    if(!activePlayer.activeMonster){
      return;
    }
    for(let monsterId in team){
      const monster = team[monsterId];
      if(monster.bench && monster.passiveActive && monster.ability){
        messages.push(monster.ability(activePlayer));
      }
      // if there is a dot on the monster, activate it.
      if(monster.dot.length > 1){
        monster.dot.forEach(dot => {
          messages.push(dot.func(activePlayer));
        });
      }
    }
    return messages;
  }
  // this is used to execute position shifts, takes the id of the monster through the action object
  // actionObj = {action:'activate', id:{monster_id}}
  activateDo(actionObj){
    const {activePlayer} = this;
    const monsterId = actionObj.monsterId;
    if(!monsterId){
      return;
    }
    this.switchTurns();
    return activePlayer.activateMonster(monsterId);
  }
  switchTurns(){
    this.idlePlayer.checkForDeath();
    this.activePlayer.turn = false;
    this.idlePlayer.turn = true;
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
      player.turn ? this.activePlayer = player : this.idlePlayer = player;
    }
    // executes passives
    return this.passive();
  }
  takeAction(actionObj){
    const messages = this[actionObj.action + 'Do'](actionObj);
    // After action is over, check active players and run passives if applicable.
    const passiveMessages = this.findActivePlayer(actionObj);
    if(passiveMessages){
      for(const message of passiveMessages){
        messages.push(message);
      }
    }
    // Returns log of changes.
    return messages;
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
