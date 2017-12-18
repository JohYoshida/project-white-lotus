const bookshelf = require('./lib/bookshelf');

const Attack = bookshelf.Model.extend({
  tableName: 'attacks',
});

const attackFuncs = {
  scratch: function(){
    return (player) => {
      // Attacks return a function which calls a state change on an object.
      const damage = 1;
      player.activeMonster.takeDamage(damage);
      // We set the player turn here because, so it's optional.
      player.turn = true;
    };
  }
};

module.exports = {Attack, attackFuncs};
