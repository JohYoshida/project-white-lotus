const bookshelf = require('./lib/bookshelf');
const {Modifier} = require('../lib/Modifier.js');

const Ability = bookshelf.Model.extend({
  tableName: 'abilities',
});

const abilityFuncs = {
  supercharge: function(player){
    if (!player.activeMonster) {
      return;
    }
    player.activeMonster.supercharged = true;
    this.passiveActive = false;
    return `${this.name} has supercharged ${player.activeMonster.name}`;
  },
  nanomachine_swarm: function(player){
    const {team} = player;
    for(const monsterId in team){
      const curMonster = team[monsterId];
      if(curMonster.creature === 'mecha' && !curMonster.modifiers.has('heal')){
        new Modifier(curMonster, 'heal', {}, (modifier) => {
          if(!this.passiveActive){
            modifier.removeModifier();
          }
          if(curMonster.hp === curMonster.maxHp){
            return;
          }
          curMonster.hp += 2;
        });
      }
    }
  },
  electric_shield: function(player){
    if (!player.activeMonster) {
      return;
    }
    player.activeMonster.protector = this;
    this.passiveActive = false;
    return `${this.name} is protecting ${player.activeMonster.name}`;
  },
  // Have to set type manual because asynchronous programming would not work here.
  // New types are set with the modifier and removed when the monster is benched.
  pierce: function(player){
    if (!player.activeMonster) {
      return;
    }
    new Modifier(player.activeMonster, {type: {id: 1, name: 'pierce', weakness: 2}}, (modifier) => {
      if(player.activeMonster.bench) modifier.removeModifier();
    });
    this.passiveActive = false;
    return `${this.name} has changed ${player.activeMonster.name}'s type to ${player.activeMonster.type.name}`;
  },
  crush: function(player){
    if (!player.activeMonster) {
      return;
    }
    new Modifier(player.activeMonster, {type: {id: 2, name: 'crush', weakness: 3}}, (modifier) => {
      if(player.activeMonster.bench) modifier.removeModifier();
    });
    this.passiveActive = false;
    return `${this.name} has changed ${player.activeMonster.name}'s type to ${player.activeMonster.type.name}`;
  },
  spray: function(player){
    if (!player.activeMonster) {
      return;
    }
    new Modifier(player.activeMonster, {type: {id: 3, name: 'spray', weakness: 1}}, (modifier) => {
      if(player.activeMonster.bench) modifier.removeModifier();
    });
    this.passiveActive = false;
    return `${this.name} has changed ${player.activeMonster.name}'s type to ${player.activeMonster.type.name}`;
  }
};

module.exports = {Ability, abilityFuncs};
