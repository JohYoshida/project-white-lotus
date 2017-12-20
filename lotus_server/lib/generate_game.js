const generatePlayer = require('./generate_player');

class Game{
  constructor(players){
    this.players = players;
    // First player to join given first turn.
    this.players[0].turn = true;
    this.activePlayer = null;
    this.idlePlayer = null;
    this.gameOver = false;

    // action handlers
    // Used to execute attack abilities. Options are optional.
    // actionObj = {action:'attack', name:{{attack_name}}, [options:{options}]}
    const attack = (actionObj) => {
      const {activePlayer, idlePlayer} = this;
      const {options, name} = actionObj;
      const messages = activePlayer.activeMonster.attacks[name].func(idlePlayer, options);
      idlePlayer.checkForDeath();
      return messages;
    };

    // used to execute all passive abilities of monsters with their passive's active. This can include monsters on the field.
    // actionObj = {action:'passive'}
    const passive = () => {
      const {activePlayer} = this;
      const {team} = activePlayer;
      const messages = [];
      if(!activePlayer.activeMonster){
        return;
      }
      for(let monsterId in this.activePlayer.team){
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
    };
    // this is used to execute position shifts, takes the id of the monster through the action object
    // actionObj = {action:'activate', id:{monster_id}}
    const activate = (actionObj) => {
      const {activePlayer, idlePlayer} = this;
      const monsterId = actionObj.monsterId;
      idlePlayer.turn = true;
      return activePlayer.activateMonster(monsterId);
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
      player.turn ? this.activePlayer = player : this.idlePlayer = player;
    }
    // executes passives
    return this.actions.passive();
  }
  // Used to sort the action object into the appropriate function.
  takeAction(actionObj){
    // Look for the appropriate action.
    const messageObj = this.actions[actionObj.action](actionObj);
    const passiveMessages = this.findActivePlayer(actionObj);
    if(passiveMessages){
      for(const message of passiveMessages){
        messageObj.messages.push(message);
      }
    }
    return messageObj;
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
