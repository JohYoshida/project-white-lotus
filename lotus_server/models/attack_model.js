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
    damage = Math.round(damage*1.25);
    break;
  case 'weak':
    damage = Math.round(damage*0.75);
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

const doSplashDamage = (attackedPlayer, dmg, attacker, messages) => {
  if(!messages) messages = [];
  // Loop over each monster and cause them to take damage.
  for(const monsterId in attackedPlayer.team){
    const curMonster = attackedPlayer.team[monsterId];
    let damage = damageCalculator(dmg, compareTyping(attacker, curMonster));
    if(curMonster.id !== attackedPlayer.activeMonster.id){
      damage = damageCalculator((Math.round(dmg*0.10)), compareTyping(attacker, curMonster));
    }
    curMonster.takeDamage(damage, messages);
  }
  return messages;
}

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
  toxic_slime: function(attackedPlayer, messages){
    // check hit
    const targetMonster = attackedPlayer.activeMonster;
    if(!rollToHit(this)) {
      return targetMonster.dodged(messages);
    }
    messages.push(`${targetMonster.name} becomes enveloped in slime...`);
    const damage = damageCalculator(400, compareTyping(this, targetMonster));

    const description = `Slime causes ${targetMonster.name} to lose ${damage} hp each turn (3 turns).`;
    new Modifier(targetMonster, {}, 'dot', description, (modifier, messages) => {
      // check turn count
      modifier.count ? modifier.count++ : modifier.count = 1;
      if(modifier.count >= 3) return modifier.removeModifier();
      return targetMonster.takeDamage(damage, messages, true);
    });
    return messages;
  },
  roar: function(attackedPlayer, messages){
    return doAOEAttack(attackedPlayer, 300, this, messages);
  },
  insanity: function(attackedPlayer, messages){
    const targetMonster = attackedPlayer.activeMonster;
    if(!rollToHit(this)) {
      return targetMonster.dodged(messages);
    }
    const damage = damageCalculator(300, compareTyping(this, targetMonster));
    messages.push(`${targetMonster.name} is less accurate...`);

    const description = `${targetMonster.name} loses 1 accuracy until benched. Then accuracy resets.`;
    new Modifier(targetMonster, {accuracy_bonus: targetMonster.accuracy_bonus - 1}, 'accDebuff', description, (modifier) => {
      // If the monster is on the bench, remove the modifier.
      if(targetMonster.bench) modifier.removeModifier();
    });

    return targetMonster.takeDamage(damage, messages);
  },
  decimate: function(attackedPlayer, messages){
    const targetMonster = attackedPlayer.activeMonster;
    if(!rollToHit(this)) {
      return targetMonster.dodged(messages);
    }
    const hp = targetMonster.hp;
    const damage = damageCalculator(Math.floor(hp*0.25), compareTyping(this, targetMonster));
    return targetMonster.takeDamage(damage, messages);
  },
  // Adds +2 to the attacking monster's accuracy and prevents the attacked monster from benching
  web_sling: function(attackedPlayer, messages){
    const targetMonster = attackedPlayer.activeMonster;
    if(!rollToHit(this)) {
      return targetMonster.dodged(messages);
    }
    messages.push(`Webbing prevents ${targetMonster.name} from moving!`);
    // Increase accuracy
    let description1 = `${this.name} has +2 accuracy until next turn.`;
    new Modifier(this, {accuracy_bonus: this.accuracy_bonus + 2}, 'accBuff', description1, (modifier) => modifier.removeModifier());

    // Prevents benching
    let description2 = `${targetMonster.name} cannot be benched until next turn.`;
    new Modifier(targetMonster, {canBench: false}, 'stuck', description2, (modifier) => {
      this.count ? this.count++ : this.count = 1;
      if(this.count > 2){
        modifier.removeModifier();
      }
    });
    return targetMonster.takeDamage(damageCalculator(500, compareTyping(this, targetMonster)), messages);
  },
  deep_knowledge: function(attackedPlayer, messages){
    const targetMonster = attackedPlayer.activeMonster;
    if(!rollToHit(this)) {
      return targetMonster.dodged(messages);
    }
    messages.push(`${this.name}'s type changed to ${targetMonster.type} type.`);
    const description = `Changes type to ${targetMonster.type}.`;
    new Modifier(this, {type: targetMonster.type}, 'morph', description, (modifier) => this.bench && modifier.removeModifier());
    return messages;
  },
  /**
  * primary attacks
  */
  vomitous_sludge: function(attackedPlayer, messages){
    const targetMonster = attackedPlayer.activeMonster;
    if(!rollToHit(this)) {
      return targetMonster.dodged(messages);
    }
    messages.push(`Sludge envelopes ${targetMonster.name}.`);
    const description = `The sludge causes ${targetMonster.name} to lose 100hp per turn until benched.`;
    new Modifier(targetMonster, {}, 'dot', description, (modifier, messages) => {
      if(targetMonster.bench) return modifier.removeModifier();
      return targetMonster.takeDamage(100, messages, true);
    });
    const damage = damageCalculator(1000, compareTyping(this, targetMonster));
    return targetMonster.takeDamage(damage, messages);
  },

  steel_jaw: function(attackedPlayer, messages){
    const targetMonster = attackedPlayer.activeMonster;
    if(!rollToHit(this)) {
      return targetMonster.dodged(messages);
    }
    const dmg = getRandomNumber(1400, 1600) ;
    // If the monster is supercharged perform an AOE attack
    if(this.supercharged) {
      return doSplashDamage(attackedPlayer, dmg, this, messages);
    }
    return targetMonster.takeDamage(damageCalculator(dmg, compareTyping(this, targetMonster)), messages);
  },

  eldritch_horror: function(attackedPlayer, messages){
    const targetMonster = attackedPlayer.activeMonster;
    if(!rollToHit(this)) {
      return targetMonster.dodged(messages);
    }

    const dmg = getRandomNumber(500, 800);
    // check for supercharged and add to messages accordingly.
    if(this.supercharged) {
      doSplashDamage(attackedPlayer, dmg, this, messages);
    } else {
      targetMonster.takeDamage(damageCalculator(dmg, compareTyping(this, targetMonster)), messages);
    }
    if(getRandomNumber(1, 100) < 50){
      // Get a random monster id and activate it.
      const randomBenchedMonster = attackedPlayer.getRandomMonster({bench:true});
      if(!randomBenchedMonster){
        return messages;
      }
      attackedPlayer.activateMonster(randomBenchedMonster.id);
      attackedPlayer.findActiveMonster();
      messages.push(`${attackedPlayer.activeMonster.name} is now on the field.`);
    }
    return messages;
  },

  neutralize: function(attackedPlayer, messages){
    const targetMonster = attackedPlayer.activeMonster;
    if(!rollToHit(this)) {
      return targetMonster.dodged(messages);
    }
    const dmg = getRandomNumber(1000, 1200);
    if(this.supercharged) {
      doSplashDamage(attackedPlayer, dmg, this, messages);
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

  stimulant: function(attackedPlayer, messages){
    const targetMonster = attackedPlayer.activeMonster;
    if(!rollToHit(this)) {
      return targetMonster.dodged(messages);
    }
    const dmg = 800;
    if(this.supercharged) {
      doSplashDamage(attackedPlayer, dmg, this, messages);
    } else {
      targetMonster.takeDamage(damageCalculator(dmg, compareTyping(this, targetMonster)), messages);
    }
    return this.healHp(400, messages);
  },

  hyper_lance: function(attackedPlayer, messages){
    const targetMonster = attackedPlayer.activeMonster;
    if(!rollToHit(this)) {
      return targetMonster.dodged(messages);
    }
    const dmg = getRandomNumber(800, 1200);
    if(this.supercharged) {
      return doSplashDamage(attackedPlayer, dmg, this, messages);
    } else {
      return targetMonster.takeDamage(damageCalculator(dmg, compareTyping(this, targetMonster)), messages);
    }
  },
  simulate_kaiju: function(attackedPlayer, messages){
    const targetMonster = attackedPlayer.activeMonster;
    if(!rollToHit(this)) {
      return targetMonster.dodged(messages);
    }
    const dmg = getRandomNumber(1000, 1200) ;
    if(this.supercharged) {
      doSplashDamage(attackedPlayer, dmg, this, messages);
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
  snake_handler: function(attackedPlayer, messages){
    const targetMonster = attackedPlayer.activeMonster;
    if(!rollToHit(this)) {
      return targetMonster.dodged(messages);
    }
    const dmg = getRandomNumber(1000, 1600);
    if(this.supercharged) {
      return doSplashDamage(attackedPlayer, dmg, this, messages);
    } else {
      return targetMonster.takeDamage(damageCalculator(dmg, compareTyping(this, targetMonster)), messages);
    }
  },
  neurotoxin: function(attackedPlayer, messages){
    const targetMonster = attackedPlayer.activeMonster;
    if(!rollToHit(this)) {
      return targetMonster.dodged(messages);
    }
    const dmg = getRandomNumber(500, 1800);
    if(this.supercharged) {
      return doSplashDamage(attackedPlayer, dmg, this, messages);
    } else {
      return targetMonster.takeDamage(damageCalculator(dmg, compareTyping(this, targetMonster)), messages);
    }
  }
};

module.exports = {Attack, attackFuncs};
