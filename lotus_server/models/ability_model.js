const bookshelf = require('./lib/bookshelf');

const Ability = bookshelf.Model.extend({
  tableName: 'abilities',
});

const abilityFuncs = {
  avoid: function(creature){
    creature ? creature.body.hp += 1 : null;
    return 'Avoid!';
  }
};

module.exports = {Ability, abilityFuncs};
