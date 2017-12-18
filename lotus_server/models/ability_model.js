const bookshelf = require('./lib/bookshelf');

const Ability = bookshelf.Model.extend({
  tableName: 'abilities',
});

const abilityFuncs = {
  avoid: function(player){
    player.activeMonster.hp += 1;
    // this is bound to the monster who has this ability, this ability is one time use. Increases max hp.
    this.passiveActive = false;
  }
};

module.exports = {Ability, abilityFuncs};
