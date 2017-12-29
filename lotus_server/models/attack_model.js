const bookshelf = require('./lib/bookshelf');
const Modifier = require('../lib/Modifier.js');

const Attack = bookshelf.Model.extend({
  tableName: 'attacks',
});

const getRandomNumber = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
}

const compareTyping = (attacker, defender) => {
  const attackerType = attacker.type;
  const defenderType = defender.activeMonster.type;
  let result = "";

  if (attackerType.id === defenderType.weakness){
    console.log('strong attack');
    result = 'strong';
  } else if (attackerType.id === defenderType.id){
    console.log('normal attack');
    result = 'normal';
  } else if (attackerType.weakness === defenderType.id){
    console.log('weak attack');
    result = 'weak';
  } else {
    result = 'normal';
  }
  return result;
}

const damageCalculator = (damage, effectiveness) => {
  console.log(damage);
  switch (effectiveness) {
    case 'strong':
      damage *= 2;
      break;
    case 'normal':
      damage *= 1;
      break;
    case 'weak':
      damage *= 0.5;
      break;
  }
  console.log(damage);
  return damage;
}

const attackFuncs = {
  // TODO: Add DOT, AOE, and other functionality
  toxic_slime: function(attackedPlayer){
    // Attacks return a function which calls a state change on an object.
    const attackTyping = compareTyping(this, attackedPlayer);
    const damage = damageCalculator(4, attackTyping);
    attackedPlayer.activeMonster.takeDamage(damage);
    // We set the player turn here because, so it's optional.
    return [`${attackedPlayer.activeMonster.name} took ${damage} damage! They have ${attackedPlayer.activeMonster.hp} hp!`]
  },
  roar: function(attackedPlayer){
    const attackTyping = compareTyping(this, attackedPlayer);
    const damage = damageCalculator(3, attackTyping);
    attackedPlayer.activeMonster.takeDamage(damage);
    return [`${attackedPlayer.activeMonster.name} took ${damage} damage! They have ${attackedPlayer.activeMonster.hp} hp!`]
  },
  insanity: function(attackedPlayer){
    const attackTyping = compareTyping(this, attackedPlayer);
    const damage = damageCalculator(6, attackTyping);
    attackedPlayer.activeMonster.takeDamage(damage);
    return [`${attackedPlayer.activeMonster.name} took ${damage} damage! They have ${attackedPlayer.activeMonster.hp} hp!`]
  },
  decimate: function(attackedPlayer){
    const attackTyping = compareTyping(this, attackedPlayer);
    const maxHp = attackedPlayer.activeMonster.maxHp;
    const hp = attackedPlayer.activeMonster.hp;
    const damage = damageCalculator(Math.floor(maxHp/hp), attackTyping);

    attackedPlayer.activeMonster.takeDamage(damage);
    return [`${attackedPlayer.activeMonster.name} took ${damage} damage! They have ${attackedPlayer.activeMonster.hp} hp!`]
  },
  web_sling: function(attackedPlayer){
    const attackTyping = compareTyping(this, attackedPlayer);
    const damage = damageCalculator(5, attackTyping);
    attackedPlayer.activeMonster.takeDamage(damage);
    return [`${attackedPlayer.activeMonster.name} took ${damage} damage! They have ${attackedPlayer.activeMonster.hp} hp!`]
  },
  deep_knowledge: function(attackedPlayer){
    const attackTyping = compareTyping(this, attackedPlayer);
    const damage = damageCalculator(0, attackTyping);
    attackedPlayer.activeMonster.takeDamage(damage);
    return [`${attackedPlayer.activeMonster.name} took ${damage} damage! They have ${attackedPlayer.activeMonster.hp} hp!`]
  },
  vomitous_sludge: function(attackedPlayer){
    const attackTyping = compareTyping(this, attackedPlayer);
    const damage = damageCalculator(10, attackTyping);
    attackedPlayer.activeMonster.takeDamage(damage);
    return [`${attackedPlayer.activeMonster.name} took ${damage} damage! They have ${attackedPlayer.activeMonster.hp} hp!`]
  },
  steel_jaw: function(attackedPlayer){
    const attackTyping = compareTyping(this, attackedPlayer);
    const damage = damageCalculator(getRandomNumber(14, 18), attackTyping);

    attackedPlayer.activeMonster.takeDamage(damage);
    return [`${attackedPlayer.activeMonster.name} took ${damage} damage! They have ${attackedPlayer.activeMonster.hp} hp!`]
  },
  eldritch_horror: function(attackedPlayer){
    const attackTyping = compareTyping(this, attackedPlayer);
    const damage = damageCalculator(getRandomNumber(5, 8), attackTyping);

    attackedPlayer.activeMonster.takeDamage(damage);
    return [`${attackedPlayer.activeMonster.name} took ${damage} damage! They have ${attackedPlayer.activeMonster.hp} hp!`]
  },
  neutralize: function(attackedPlayer){
    const attackTyping = compareTyping(this, attackedPlayer);
    const damage = damageCalculator(getRandomNumber(10, 12), attackTyping);

    attackedPlayer.activeMonster.takeDamage(damage);
    return [`${attackedPlayer.activeMonster.name} took ${damage} damage! They have ${attackedPlayer.activeMonster.hp} hp!`]
  },
  stimulant: function(attackedPlayer){
    const attackTyping = compareTyping(this, attackedPlayer);
    const damage = damageCalculator(8, attackTyping);
    attackedPlayer.activeMonster.takeDamage(damage);
    return [`${attackedPlayer.activeMonster.name} took ${damage} damage! They have ${attackedPlayer.activeMonster.hp} hp!`]
  },
  hyper_lance: function(attackedPlayer){
    const attackTyping = compareTyping(this, attackedPlayer);
    const damage = damageCalculator(getRandomNumber(8, 12), attackTyping);

    attackedPlayer.activeMonster.takeDamage(damage);
    return [`${attackedPlayer.activeMonster.name} took ${damage} damage! They have ${attackedPlayer.activeMonster.hp} hp!`]
  },
  simulate_kaiju: function(attackedPlayer){
    const attackTyping = compareTyping(this, attackedPlayer);
    const damage = damageCalculator(getRandomNumber(10, 12), attackTyping);
    attackedPlayer.activeMonster.takeDamage(damage);
    return [`${attackedPlayer.activeMonster.name} took ${damage} damage! They have ${attackedPlayer.activeMonster.hp} hp!`]
  },
  snake_handler: function(attackedPlayer){
    const attackTyping = compareTyping(this, attackedPlayer);
    const damage = damageCalculator(getRandomNumber(12, 16), attackTyping);
    attackedPlayer.activeMonster.takeDamage(damage);
    return [`${attackedPlayer.activeMonster.name} took ${damage} damage! They have ${attackedPlayer.activeMonster.hp} hp!`]
  },
  neurotoxin: function(attackedPlayer){
    const attackTyping = compareTyping(this, attackedPlayer);
    const damage = damageCalculator(getRandomNumber(5, 18), attackTyping);
    attackedPlayer.activeMonster.takeDamage(damage);
    return [`${attackedPlayer.activeMonster.name} took ${damage} damage! They have ${attackedPlayer.activeMonster.hp} hp!`]
  }
};

module.exports = {Attack, attackFuncs};
