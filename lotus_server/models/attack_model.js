const bookshelf = require('./lib/bookshelf');
const {Modifier} = require('../lib/Modifier.js');

const Attack = bookshelf.Model.extend({
  tableName: 'attacks',
});

const getRandomNumber = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};


const compareTyping = (attacker, defendingMonster) => {
  const attackerType = attacker.type;
  const defenderType = defendingMonster.type;
  let result = '';

  if (attackerType.id === defenderType.weakness){
    result = 'strong';
  } else if (attackerType.id === defenderType.id){
    result = 'normal';
  } else if (attackerType.weakness === defenderType.id){
    result = 'weak';
  } else {
    result = 'normal';
  }
  return result;
};

const damageCalculator = (damage, effectiveness) => {
  switch (effectiveness) {
  case 'strong':
    damage *= 1.5;
    break;
  case 'normal':
    damage *= 1;
    break;
  case 'weak':
    damage *= 0.5;
    break;
  }
  return damage;
};

// Handles AOE attack lcgic
const doAOEAttack = (attackedPlayer, dmg, attacker, messages) => {
  if(!messages) messages = [];
  // Loop over each monster and cause them to take damage.
  for(const monsterId in attackedPlayer.team){
    const curMonster = attackedPlayer.team[monsterId];
    const damage = damageCalculator(dmg, compareTyping(attacker, curMonster));
    curMonster.takeDamage(damage, messages);
  }
  return messages;
};

/**
 * Returns a random 2d6 dice roll plus the accuracy_bonus of the argument monster
 */
const rollToHit = (monster) => {
  return Math.round(Math.random()*6) + Math.round(Math.random()*6) + monster.accuracy_bonus > 5;
};

const attackFuncs = {
  /**
   * Secondary attacks
   */
  toxic_slime: function(attackedPlayer){
    // check hit
    if(!rollToHit(this)) {
      return [`${this.name} misses!`];
    }
    const targetMonster = attackedPlayer.activeMonster;
    const damage = damageCalculator(4, compareTyping(this, targetMonster));

    const description = `Slime causes ${targetMonster.name} to lose ${damage} hp each turn (3 turns).`;
    new Modifier(targetMonster, {}, 'dot', description, (modifier, messages) => {
      // check turn count
      modifier.count ? modifier.count++ : modifier.count = 1;
      if(modifier.count >= 3) return modifier.removeModifier();
      return targetMonster.takeDamage(damage, messages, true);
    });
    return [`${targetMonster.name} becomes enveloped in slime...`];
  },
  roar: function(attackedPlayer){
    if(!rollToHit(this)) {
      return [`${this.name} misses!`];
    }
    return doAOEAttack(attackedPlayer, 3, this);
  },
  insanity: function(attackedPlayer){
    if(!rollToHit(this)) {
      return [`${this.name} misses!`];
    }
    const targetMonster = attackedPlayer.activeMonster;
    const damage = damageCalculator(6, compareTyping(this, targetMonster));
    const messages = [`${targetMonster.name} is less accurate...`];

    const description = `${targetMonster.name} loses 1 accuracy per turn until benched. Then accuracy resets.`;
    new Modifier(targetMonster, {accuracy_bonus: targetMonster.accuracy_bonus - 1}, 'accDebuff', description, (modifier) => {
      // If the monster is on the bench, remove the modifier.
      if(targetMonster.bench) modifier.removeModifier();
      targetMonster.accuracy_bonus -= 1;
    });

    return targetMonster.takeDamage(damage, messages);
  },
  decimate: function(attackedPlayer){
    if(!rollToHit(this)) {
      return [`${this.name} misses!`];
    }
    const targetMonster = attackedPlayer.activeMonster;
    const maxHp = targetMonster.maxHp;
    const hp = targetMonster.hp;
    const damage = damageCalculator(Math.floor(maxHp/hp), compareTyping(this, targetMonster));
    return targetMonster.takeDamage(damage);
  },
  // Adds +2 to the attacking monster's accuracy and prevents the attacked monster from benching
  web_sling: function(attackedPlayer){
    if(!rollToHit(this)) {
      return [`${this.name} misses!`];
    }
    const targetMonster = attackedPlayer.activeMonster;
    const messages = [`Webbing prevents ${targetMonster.name} from moving!`];
    // Increase accuracy
    let description1 = `${this.name} has +2 accuracy until next turn.`;
    new Modifier(this, {accuracy_bonus: this.accuracy_bonus + 2}, 'accBuff', description1, (modifier) => modifier.removeModifier());

    // Prevents benching
    let description2 = `${targetMonster.name} cannot be benched until next turn.`;
    new Modifier(targetMonster, {canBench: false}, 'stuck', description2, (modifier) => {
      this.count ? this.count++ : this.count = 1;
      if(this.count > 1){
        modifier.removeModifier();
      }
    });
    return targetMonster.takeDamage(damageCalculator(5, compareTyping(this, targetMonster)), messages);
  },
  deep_knowledge: function(attackedPlayer){
    if(!rollToHit(this)) {
      return [`${this.name} misses!`];
    }
    const {activeMonster} = attackedPlayer;
    const description = `Changes type to ${activeMonster.type}.`;
    new Modifier(this, {type: activeMonster.type}, 'morph', description, (modifier) => this.bench && modifier.removeModifier());
    return [`${this.name}'s type changed to ${activeMonster.type} type.`];
  },
  /**
  * primary attacks
  */
  vomitous_sludge: function(attackedPlayer){
    if(!rollToHit(this)) {
      return [`${this.name} misses!`];
    }
    const targetMonster = attackedPlayer.activeMonster;

    const description = `The sludge causes ${targetMonster.name} to lose 1hp per turn until benched.`;
    new Modifier(targetMonster, {}, 'dot', description, (modifier, messages) => {
      if(targetMonster.bench) return modifier.removeModifier();
      return targetMonster.takeDamage(1, messages, true);
    });

    const messages = [`Sludge envelopes ${targetMonster.name}.`];
    const damage = damageCalculator(10, compareTyping(this, targetMonster));
    return targetMonster.takeDamage(damage, messages);
  },

  steel_jaw: function(attackedPlayer){
    if(!rollToHit(this)) {
      return [`${this.name} misses!`];
    }
    const targetMonster = attackedPlayer.activeMonster;
    const dmg = getRandomNumber(14, 18) ;
    // If the monster is supercharged perform an AOE attack
    if(this.supercharged) {
      return doAOEAttack(attackedPlayer, dmg, this);
    }
    return targetMonster.takeDamage(damageCalculator(dmg, compareTyping(this, targetMonster)));
  },

  eldritch_horror: function(attackedPlayer){
    if(!rollToHit(this)) {
      return [`${this.name} misses!`];
    }
    const targetMonster = attackedPlayer.activeMonster;

    const dmg = getRandomNumber(5, 8);
    const messages = [`${attackedPlayer.activeMonster.name} is now on the field.`];
    // check for supercharged and add to messages accordingly.
    if(this.supercharged) {
      doAOEAttack(attackedPlayer, dmg, this, messages);
    } else {
      targetMonster.takeDamage(damageCalculator(dmg, compareTyping(this, targetMonster)), messages);
    }

    // Get a random monster id and activate it.
    const randomBenchedMonster = attackedPlayer.getRandomMonster({bench:true});
    if(!randomBenchedMonster){
      return messages;
    }
    attackedPlayer.activateMonster(randomBenchedMonster.id);
    attackedPlayer.findActiveMonster();

    return messages;
  },

  neutralize: function(attackedPlayer){
    if(!rollToHit(this)) {
      return [`${this.name} misses!`];
    }
    const targetMonster = attackedPlayer.activeMonster;
    const messages = [];
    const dmg = getRandomNumber(10, 12);
    if(this.supercharged) {
      doAOEAttack(attackedPlayer, dmg, this, messages);
    } else {
      targetMonster.takeDamage(damageCalculator(dmg, compareTyping(this, targetMonster)), messages);
    }
    // removes the passive ability of a random benched monster.
    const randomBenchedMonster = attackedPlayer.getRandomMonster({bench: true, creature: 'mecha'});
    if(!randomBenchedMonster){
      return messages;
    }
    const description = `${randomBenchedMonster.name}'s passive ability is disabled.`;
    new Modifier(randomBenchedMonster, {passiveActive: false}, 'deactivate', description, modifier => {
      if(!randomBenchedMonster.bench) {
        modifier.removeModifier();
      }
    });
    messages.push(`${randomBenchedMonster.name}'s passive is disabled.`);
    return messages;
  },

  stimulant: function(attackedPlayer){
    if(!rollToHit(this)) {
      return [`${this.name} misses!`];
    }
    const messages = [];
    const dmg = 8;
    const targetMonster = attackedPlayer.activeMonster;
    if(this.supercharged) {
      doAOEAttack(attackedPlayer, dmg, this, messages);
    } else {
      targetMonster.takeDamage(damageCalculator(dmg, compareTyping(this, targetMonster)), messages);
    }
    return this.healHp(4, messages);
  },

  hyper_lance: function(attackedPlayer){
    if(!rollToHit(this)) {
      return [`${this.name} misses!`];
    }
    const dmg = getRandomNumber(8, 12) ;
    const targetMonster = attackedPlayer.activeMonster;
    if(this.supercharged) {
      return doAOEAttack(attackedPlayer, dmg, this);
    } else {
      return targetMonster.takeDamage(damageCalculator(dmg, compareTyping(this, targetMonster)));
    }
  },
  simulate_kaiju: function(attackedPlayer){
    if(!rollToHit(this)) {
      return [`${this.name} misses!`];
    }
    let messages = [];
    const dmg = getRandomNumber(10, 12) ;
    const targetMonster = attackedPlayer.activeMonster;
    if(this.supercharged) {
      doAOEAttack(attackedPlayer, dmg, this, messages);
    } else {
      targetMonster.takeDamage(damageCalculator(dmg, compareTyping(this, targetMonster)), messages);
    }
    // if the creature is kaiju, grab their secondary attack.
    if(targetMonster.creature === 'kaiju'){
      const attacks = Object.keys(targetMonster.attacks);
      const {id, name, description, func} = targetMonster.attacks[attacks[1]];
      this.attacks[name] = {id, name, description, func: func.bind(this)};
      messages.push(`${this.name} has gained ${this.attacks[attacks[1]].name}.`);
    }
    return messages;
  },
  snake_handler: function(attackedPlayer){
    if(!rollToHit(this)) {
      return [`${this.name} misses!`];
    }
    const dmg = getRandomNumber(12, 16);
    const targetMonster = attackedPlayer.activeMonster;
    if(this.supercharged) {
      return doAOEAttack(attackedPlayer, dmg, this);
    } else {
      return targetMonster.takeDamage(damageCalculator(dmg, compareTyping(this, targetMonster)));
    }
  },
  neurotoxin: function(attackedPlayer){
    if(!rollToHit(this)) {
      return [`${this.name} misses!`];
    }
    const dmg = getRandomNumber(5, 18);
    const targetMonster = attackedPlayer.activeMonster;
    if(this.supercharged) {
      return doAOEAttack(attackedPlayer, dmg, this);
    } else {
      return targetMonster.takeDamage(damageCalculator(dmg, compareTyping(this, targetMonster)));
    }
  }
};

module.exports = {Attack, attackFuncs};
