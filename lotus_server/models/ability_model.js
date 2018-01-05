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
    const targetMonster = player.activeMonster;
    if(targetMonster.modifiers.has('aoe')){
      return;
    }
    new Modifier(targetMonster, 'aoe', {supercharged: true}, (modifier) => {
      if(!this.passiveActive){
        modifier.removeModifier();
      }
    });
  },
  nanomachine_swarm: function(player){
    const {team} = player;
    // loops over each monster in the players team and applies the heal modifier if applicable.
    for(const monsterId in team){
      const curMonster = team[monsterId];
      if(curMonster.creature === 'mecha' && !curMonster.modifiers.has('heal')){
        // heal modifier increases hp by turn until the monster who applied has a false passiveActive
        // or monster to whom it is applied has max hp.
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
    return `${this.name} is protecting ${player.activeMonster.name}`;
  },
  // Have to set type manual because asynchronous programming would not work here.
  // New types are set with the modifier and removed when the monster is benched.
  pierce: function(player){
    if (!player.activeMonster) {
      return;
    }
    const targetMonster = player.activeMonster;
    if(!targetMonster.modifier.has('morph') || targetMonster.type !== 'pierce'){
      new Modifier(targetMonster, 'morph', {type: {id: 1, name: 'pierce', weakness: 2}}, (modifier) => {
        if(player.activeMonster.bench) modifier.removeModifier();
      });
    }
    return `${this.name} has changed ${player.activeMonster.name}'s type to ${player.activeMonster.type.name}`;
  },
  crush: function(player){
    if (!player.activeMonster) {
      return;
    }
    const targetMonster = player.activeMonster;
    if(!targetMonster.modifier.has('morph') || targetMonster.type !== 'crush'){
      new Modifier(targetMonster, 'morph', {type: {id: 2, name: 'crush', weakness: 3}}, (modifier) => {
        if(targetMonster.bench) modifier.removeModifier();
      });
    }
    return `${this.name} has changed ${player.activeMonster.name}'s type to ${player.activeMonster.type.name}`;
  },
  spray: function(player){
    if (!player.activeMonster) {
      return;
    }
    const targetMonster = player.activeMonster;
    if(!targetMonster.modifier.has('morph') || targetMonster.type !== 'spray'){
      new Modifier(player.activeMonster, 'morph', {type: {id: 3, name: 'spray', weakness: 1}}, (modifier) => {
        if(targetMonster.bench) modifier.removeModifier();
      });
    }
    return `${this.name} has changed ${player.activeMonster.name}'s type to ${player.activeMonster.type.name}`;
  }
};

module.exports = {Ability, abilityFuncs};
