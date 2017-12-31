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
const doAOEAttack = (attackedPlayer, messages, dmg, attacker) => {
  for(const monsterId in attackedPlayer.team){
    const curMonster = attackedPlayer.team[monsterId];
    const damage = damageCalculator(dmg, compareTyping(attacker, curMonster));
    curMonster.takeDamage(damage);
  }
  return ['All monsters take damage!'];
};

const attackFuncs = {
  // Secondary attack
  toxic_slime: function(attackedPlayer){
    const dmg = 4;
    const targetMonster = attackedPlayer.activeMonster;
    const damage = damageCalculator(dmg, compareTyping(this, targetMonster));
    new Modifier(targetMonster, {}, (modifier) => {
      // check turn count
      modifier.count ? modifier.count++ : modifier.count = 1;
      if(modifier.count >= 3) return modifier.removeModifier();
      targetMonster.takeDamage(damage);
      return `Toxic Slime: ${targetMonster.name} took ${damage} damage!`;
    });
    return [`${targetMonster.name} becomes enveloped in slime...`];
  },
  // Secondary attack
  roar: function(attackedPlayer){
    const messages = [];
    for(const monsterId in attackedPlayer.team){
      const curMonster = attackedPlayer.team[monsterId];
      const damage = damageCalculator(3, compareTyping(this, curMonster));
      curMonster.takeDamage(damage);
      messages.push(`${curMonster.name} took ${damage} damage!`);
    }
    return messages;
  },
  // Secondary attack
  insanity: function(attackedPlayer){
    const targetMonster = attackedPlayer.activeMonster;
    const damage = damageCalculator(6, compareTyping(this, targetMonster));
    targetMonster.takeDamage(damage);
    new Modifier(targetMonster, {accuracy_bonus: targetMonster.accuracy_bonus - 1}, (modifier) => {
      // If the monster is on the bench, remove the modifier.
      if(targetMonster.bench) modifier.removeModifier();
      targetMonster.accuracy_bonus -= 1;
      return `Insanity: ${targetMonster.name} loses 1 accuracy!`;
    });
    return [`${targetMonster.name} took ${damage} damage! They are less accurate...`];
  },
  // Secondary attack
  decimate: function(attackedPlayer){
    const targetMonster = attackedPlayer.activeMonster;
    const maxHp = targetMonster.maxHp;
    const hp = targetMonster.hp;
    const damage = damageCalculator(Math.floor(maxHp/hp), compareTyping(this, attackedPlayer));

    targetMonster.takeDamage(damage);
    return [`${targetMonster.name} took ${damage} damage!`];
  },
  // Secondary attack
  // Adds +2 to the attacking monster's accuracy and prevents the attacked monster from benching
  web_sling: function(attackedPlayer){
    const targetMonster = attackedPlayer.activeMonster;
    const damage = damageCalculator(5, compareTyping(this, targetMonster));
    attackedPlayer.activeMonster.takeDamage(damage);
    // Increase accuracy
    new Modifier(this, {accuracy_bonus: this.accuracy_bonus + 2}, (modifier) => modifier.removeModifier());
    // Prevents benching
    new Modifier(targetMonster, {canBench: false}, (modifier) => modifier.removeModifier());
    return [`${targetMonster.name} took ${damage} damage! Webbing prevents them from moving!`];
  },
  // Secondary attack
  deep_knowledge: function(attackedPlayer){
    const {activeMonster} = attackedPlayer;

    new Modifier(this, {type: activeMonster.type}, (modifier) => this.bench && modifier.removeModifier());
    return [`${this.name}'s type changed to ${activeMonster.type} type.`];
  },
  // Secondary attack
  vomitous_sludge: function(attackedPlayer){
    const targetMonster = attackedPlayer.activeMonster;
    const damage = damageCalculator(10, compareTyping(this, targetMonster));
    targetMonster.takeDamage(damage);

    new Modifier(targetMonster, {}, (modifier) => {
      if(targetMonster.bench) return modifier.removeModifier();
      targetMonster.hp -= 1;
      return `The sludge causes ${targetMonster.name} to lose 1 hp!`;
    });
    return [`${targetMonster.name} took ${damage} damage! The sludge envelopes them.`];
  },
  // primary attack
  steel_jaw: function(attackedPlayer){
    let messages = null;
    let damage = null;
    const dmg = getRandomNumber(14, 18) ;
    const targetMonster = attackedPlayer.activeMonster;
    if(this.supercharged) {
      messages = doAOEAttack(attackedPlayer, messages, dmg, this);
    } else {
      damage = damageCalculator(dmg, compareTyping(this, targetMonster));
      targetMonster.takeDamage(damage);
      messages = [`${targetMonster.name} took ${damage} damage!`];
    }
    return messages;
  },
  // primary attack
  eldritch_horror: function(attackedPlayer){
    let messages = null;
    let damage = null;
    const dmg = getRandomNumber(5, 8);
    const targetMonster = attackedPlayer.activeMonster;
    if(this.supercharged) {
      messages = doAOEAttack(attackedPlayer, messages, dmg, this);
    } else {
      damage = damageCalculator(dmg, compareTyping(this, targetMonster));
      targetMonster.takeDamage(damage);
      messages = [`${targetMonster.name} took ${damage} damage!`];
    }
    // Get a random monster id and activate it.
    const randomId = attackedPlayer.getRandomMonster({bench:true}).id;
    attackedPlayer.activateMonster(randomId);
    attackedPlayer.findActiveMonster();
    messages.push(`${attackedPlayer.activeMonster.name} is now on the field.`);
    return messages;
  },
  // primary attack
  neutralize: function(attackedPlayer){
    let messages = null;
    let damage = null;
    const dmg = getRandomNumber(10, 12);
    const targetMonster = attackedPlayer.activeMonster;
    if(this.supercharged) {
      messages = doAOEAttack(attackedPlayer, messages, dmg, this);
    } else {
      damage = damageCalculator(getRandomNumber(10, 12), compareTyping(this, targetMonster));
      targetMonster.takeDamage(damage);
      messages = [`${this.name}'s Hyper Lance pierces ${targetMonster.name}. They take ${damage} damage!`];
    }
    // removes the passive ability of a random benched monster.
    const randomBenchedMonster = attackedPlayer.getRandomMonster({bench: true});
    new Modifier(randomBenchedMonster, {passiveActive: false}, modifier => {
      if(!randomBenchedMonster.bench) {
        modifier.removeModifier();
        return `${randomBenchedMonster.name}'s passive has been reactivated!`;
      }
    });
    messages.push(`${randomBenchedMonster.name}'s passive is disabled.`);
    return messages;
  },
  // primary attack
  stimulant: function(attackedPlayer){
    let messages = null;
    let damage = null;
    const dmg = 8;
    const targetMonster = attackedPlayer.activeMonster;
    if(this.supercharged) {
      messages = doAOEAttack(attackedPlayer, messages, dmg, this);
    } else {
      damage = damageCalculator(dmg, compareTyping(this, targetMonster));
      targetMonster.takeDamage(damage);
      messages = [`${this.name} drains ${targetMonster.name}. They took ${damage} damage!`];
    }
    this.hp += 4;
    messages.push(`${this.name} heals 4hp.`);
    return messages;
  },
  // primary attack
  hyper_lance: function(attackedPlayer){
    let messages = null;
    let damage = null;
    const dmg = getRandomNumber(8, 12) ;
    const targetMonster = attackedPlayer.activeMonster;
    if(this.supercharged) {
      messages = doAOEAttack(attackedPlayer, messages, dmg, this);
    } else {
      damage = damageCalculator(dmg, compareTyping(this, targetMonster));
      targetMonster.takeDamage(damage);
      messages = [`${this.name}'s Hyper Lance pierces ${targetMonster.name}. They take ${damage} damage!`];
    }
    return messages;
  },
  // primary attack
  simulate_kaiju: function(attackedPlayer){
    let messages = null;
    let damage = null;
    const dmg = getRandomNumber(10, 12) ;
    const targetMonster = attackedPlayer.activeMonster;
    if(this.supercharged) {
      messages = doAOEAttack(attackedPlayer, messages, dmg, this);
    } else {
      damage = damageCalculator(dmg, compareTyping(this, targetMonster));
      targetMonster.takeDamage(damage);
      messages = [`${targetMonster.name} took ${damage} damage!`];
    }
    if(targetMonster.creature === 'kaiju'){
      const {id, name, description, func} = targetMonster.attacks[1];
      this.attacks.push({id, name, description, func: func.bind(this)});
      messages.push(`${this.name} has gained ${this.attacks[1].name}.`);
    }
    return messages;
  },
  // primary attack
  snake_handler: function(attackedPlayer){
    let messages = null;
    let damage = null;
    const dmg = getRandomNumber(12, 16);
    const targetMonster = attackedPlayer.activeMonster;
    if(this.supercharged) {
      messages = doAOEAttack(attackedPlayer, messages, dmg, this);
    } else {
      damage = damageCalculator(dmg, compareTyping(this, targetMonster));
      targetMonster.takeDamage(damage);
      messages = [`${targetMonster.name} took ${damage} damage!`];
    }
    return messages;
  },
  // primary attack
  neurotoxin: function(attackedPlayer){
    let messages = null;
    let damage = null;
    const dmg = getRandomNumber(5, 18) ;
    const targetMonster = attackedPlayer.activeMonster;
    if(this.supercharged) {
      messages = doAOEAttack(attackedPlayer, messages, dmg, this);
    } else {
      damage = damageCalculator(dmg, compareTyping(this, targetMonster));
      targetMonster.takeDamage(damage);
      messages = [`${targetMonster.name} took ${damage} damage!`];
    }
    return messages;
  }
};

module.exports = {Attack, attackFuncs};
