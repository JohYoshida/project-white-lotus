const bookshelf = require('./lib/bookshelf');

const Ability = bookshelf.Model.extend({
  tableName: 'abilities',
});

const abilityFuncs = {
  supercharge: function(player){
    if (!player.activeMonster) {
      return;
    }
    player.activeMonster.hp += 1;
    this.passiveActive = false;
    return `${this.name} increased ${player.activeMonster.name}'s HP by 1`;
  },
  nanomachine_swarm: function(player){
    if (!player.activeMonster) {
      return;
    }
    player.activeMonster.hp += 1;
    // this is bound to the monster who has this ability, this ability is one time use. Increases max hp.
    this.passiveActive = false;
    return `${this.name} increased ${player.activeMonster.name}'s HP by 1`;
  },
  electric_shield: function(player){
    if (!player.activeMonster) {
      return;
    }
    player.activeMonster.protector = this;
    // this is bound to the monster who has this ability, this ability is one time use. Increases max hp.
    this.passiveActive = false;
    return `${this.name} is protecting ${player.activeMonster.name}`;
  },
  pierce: function(player){
    if (!player.activeMonster) {
      return;
    }
    player.activeMonster.hp += 1;
    // this is bound to the monster who has this ability, this ability is one time use. Increases max hp.
    this.passiveActive = false;
    return `${this.name} increased ${player.activeMonster.name}'s HP by 1`;
  },
  crush: function(player){
    if (!player.activeMonster) {
      return;
    }
    player.activeMonster.hp += 1;
    // this is bound to the monster who has this ability, this ability is one time use. Increases max hp.
    this.passiveActive = false;
    return `${this.name} increased ${player.activeMonster.name}'s HP by 1`;
  },
  spray: function(player){
    if (!player.activeMonster) {
      return;
    }
    player.activeMonster.hp += 1;
    // this is bound to the monster who has this ability, this ability is one time use. Increases max hp.
    this.passiveActive = false;
    return `${this.name} increased ${player.activeMonster.name}'s HP by 1`;
  }
};

module.exports = {Ability, abilityFuncs};
