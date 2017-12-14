const bookshelf = require('./lib/bookshelf');

const Attack = bookshelf.Model.extend({
  tableName: 'attacks',
});

const attackFuncs = {
  scratch: function(creature){
    creature ? creature.takeDamage(this.type.name) : null;
    return 'Scratch!';
  }
};

module.exports = {Attack, attackFuncs};
