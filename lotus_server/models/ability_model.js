const bookshelf = require('./lib/bookshelf');

const Ability = bookshelf.Model.extend({
  tableName: 'abilities',
});

const abilityFuncs = {
  avoid: function(creature){
    return (player) => {
      creature ? player.team[creature.id].body.hp += 1 : null;
    };
  }
};

module.exports = {Ability, abilityFuncs};
