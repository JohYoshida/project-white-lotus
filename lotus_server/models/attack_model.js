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

const attackFuncs = {
  toxic_slime: function(attackedPlayer){
    const targetMonster = attackedPlayer.activeMonster;
    // calculate damage, taking into accont the type.
    const damage = damageCalculator(4, compareTyping(this, targetMonster));

    new Modifier(targetMonster, {}, (modifier) => {
      // check turn count
      modifier.count ? modifier.count++ : modifier.count = 1;
      if(modifier.count >= 3) return modifier.removeModifier();
      targetMonster.takeDamage(damage);
      return `Toxic Slime: ${targetMonster.name} took ${damage} damage!`;
    });
    return [`${targetMonster.name} becomes enveloped in slime...`];
  },
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
  decimate: function(attackedPlayer){
    const targetMonster = attackedPlayer.activeMonster;
    const maxHp = targetMonster.maxHp;
    const hp = targetMonster.hp;
    const damage = damageCalculator(Math.floor(maxHp/hp), compareTyping(this, attackedPlayer));

    targetMonster.takeDamage(damage);
    return [`${targetMonster.name} took ${damage} damage!`];
  },
  // Adds +2 to the attacking monster's accuracy and prevents the attacked monster from benching
  web_sling: function(attackedPlayer){
    const targetMonster = attackedPlayer.activeMonster;
    const damage = damageCalculator(5, compareTyping(this, targetMonster));
    attackedPlayer.activeMonster.takeDamage(damage);
    // Increase accuracy
    new Modifier(this, {accuracy_bonus: this.accuracy_bonus + 2}, (modifier) => modifier.removeModifier());
    new Modifier(targetMonster, {canBench: false}, (modifier) => modifier.removeModifier());
    return [`${targetMonster.name} took ${damage} damage! Webbing prevents them from moving!`];
  },
  deep_knowledge: function(attackedPlayer){
    const {activeMonster} = attackedPlayer;

    new Modifier(this, {type: activeMonster.type}, (modifier) => this.bench && modifier.removeModifier());
    return [`${this.name}'s type changed to ${activeMonster.type} type.`];
  },
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
  steel_jaw: function(attackedPlayer){
    const targetMonster = attackedPlayer.activeMonster;
    const damage = damageCalculator(getRandomNumber(14, 18), compareTyping(this, targetMonster));
    targetMonster.takeDamage(damage);
    return [`${targetMonster.name} took ${damage} damage!`];
  },
  eldritch_horror: function(attackedPlayer){
    const targetMonster = attackedPlayer.activeMonster;
    const damage = damageCalculator(getRandomNumber(5, 8), compareTyping(this, targetMonster));
    targetMonster.takeDamage(damage);

    // Get a random monster id and activate it.
    const randomId = attackedPlayer.getRandomMonster({bench:true}).id;
    attackedPlayer.activateMonster(randomId);
    attackedPlayer.findActiveMonster();
    const messages = [
      `${targetMonster.name} took ${damage} damage!`,
      `${attackedPlayer.activeMonster.name} is now on the field.`
    ];
    return messages;
  },
  neutralize: function(attackedPlayer){
    const targetMonster = attackedPlayer.activeMonster;
    const damage = damageCalculator(getRandomNumber(10, 12), compareTyping(this, targetMonster));
    targetMonster.takeDamage(damage);
    // removes the passive ability of a random benched monster.
    const randomBenchedMonster = attackedPlayer.getRandomMonster({bench: true});
    new Modifier(randomBenchedMonster, {passiveActive: false}, modifier => {
      if(!randomBenchedMonster.bench) {
        modifier.removeModifier();
        return `${randomBenchedMonster.name}'s passive has been reactivated!`;
      }
    });
    return [
      `${targetMonster.name} took ${damage} damage! They have ${targetMonster.hp} hp!`,
      `${randomBenchedMonster.name}'s passive is disabled.`
    ];
  },
  stimulant: function(attackedPlayer){
    const targetMonster = attackedPlayer.activeMonster;
    const damage = damageCalculator(8, compareTyping(this, targetMonster));
    targetMonster.takeDamage(damage);
    this.hp += 4;
    return [
      `${this.name} drains ${targetMonster.name}. They took ${damage} damage!`,
      `${this.name} heals 4hp.`
    ];
  },
  hyper_lance: function(attackedPlayer){
    const targetMonster = attackedPlayer.activeMonster;
    const damage = damageCalculator(getRandomNumber(8, 12), compareTyping(this, attackedPlayer));

    targetMonster.takeDamage(damage);
    return [`${this.name}'s Hyper Lance pierces ${targetMonster.name}. They take ${damage} damage!`];
  },
  simulate_kaiju: function(attackedPlayer){
    const targetMonster = attackedPlayer.activeMonster;
    const damage = damageCalculator(getRandomNumber(10, 12), compareTyping(this, targetMonster));
    targetMonster.takeDamage(damage);
    const messages = [`${targetMonster.name} took ${damage} damage!`];
    // get the secondary attack if the opposing creature is a kaiju.
    if(targetMonster.creature === 'kaiju'){
      const {id, name, description, func} = targetMonster.attacks[1];
      this.attacks.push({id, name, description, func: func.bind(this)});
      messages.push(`${this.name} has gained ${this.attacks[0]}.`);
    }
    return messages;
  },
  snake_handler: function(attackedPlayer){
    const targetMonster = attackedPlayer.activeMonster;
    const damage = damageCalculator(getRandomNumber(12, 16), compareTyping(this, targetMonster));
    targetMonster.takeDamage(damage);
    return [`${targetMonster.name} took ${damage} damage!`];
  },
  neurotoxin: function(attackedPlayer){
    const targetMonster = attackedPlayer.activeMonster;
    const damage = damageCalculator(getRandomNumber(5, 18), compareTyping(this, targetMonster));
    targetMonster.takeDamage(damage);
    return [`${targetMonster.name} took ${damage} damage!`];
  }
};

module.exports = {Attack, attackFuncs};
