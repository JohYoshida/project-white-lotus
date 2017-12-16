const bookshelf = require('./lib/bookshelf');

const Attack = bookshelf.Model.extend({
  tableName: 'attacks',
});

const attackFuncs = {
  scratch: function(player){
    // Attacks return a function which calls a state change on an object.
    const damage = 1;
    return player.activeMonster.takeDamage(damage);
  }
};

module.exports = {Attack, attackFuncs};
