const bookshelf = require('./lib/bookshelf');
const Modifier = require('../lib/Modifier.js');

const Attack = bookshelf.Model.extend({
  tableName: 'attacks',
});

const getRandomNumber = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
}

const attackFuncs = {
  // TODO: Add DOT, AOE, and other functionality
  toxic_slime: function(attackedPlayer){
    // Attacks return a function which calls a state change on an object.
    const damage = 4;
    attackedPlayer.activeMonster.takeDamage(damage);
    // We set the player turn here because, so it's optional.
    return [`${attackedPlayer.activeMonster.name} took ${damage} damage! They have ${attackedPlayer.activeMonster.hp} hp!`]
  },
  roar: function(attackedPlayer){
    const damage = 3;
    attackedPlayer.activeMonster.takeDamage(damage);
    return [`${attackedPlayer.activeMonster.name} took ${damage} damage! They have ${attackedPlayer.activeMonster.hp} hp!`]
  },
  insanity: function(attackedPlayer){
    const damage = 6;
    attackedPlayer.activeMonster.takeDamage(damage);
    return [`${attackedPlayer.activeMonster.name} took ${damage} damage! They have ${attackedPlayer.activeMonster.hp} hp!`]
  },
  decimate: function(attackedPlayer){
    const maxHp = attackedPlayer.activeMonster.maxHp;
    const hp = attackedPlayer.activeMonster.hp;
    const damage = Math.floor(maxHp/hp);
    console.log(damage);
    attackedPlayer.activeMonster.takeDamage(damage);
    return [`${attackedPlayer.activeMonster.name} took ${damage} damage! They have ${attackedPlayer.activeMonster.hp} hp!`]
  },
  web_sling: function(attackedPlayer){
    const damage = 5;
    attackedPlayer.activeMonster.takeDamage(damage);
    return [`${attackedPlayer.activeMonster.name} took ${damage} damage! They have ${attackedPlayer.activeMonster.hp} hp!`]
  },
  deep_knowledge: function(attackedPlayer){
    const damage = 0;
    attackedPlayer.activeMonster.takeDamage(damage);
    return [`${attackedPlayer.activeMonster.name} took ${damage} damage! They have ${attackedPlayer.activeMonster.hp} hp!`]
  },
  vomitous_sludge: function(attackedPlayer){
    const damage = 10;
    attackedPlayer.activeMonster.takeDamage(damage);
    return [`${attackedPlayer.activeMonster.name} took ${damage} damage! They have ${attackedPlayer.activeMonster.hp} hp!`]
  },
  steel_jaw: function(attackedPlayer){
    const damage = getRandomNumber(14, 18);
    attackedPlayer.activeMonster.takeDamage(damage);
    return [`${attackedPlayer.activeMonster.name} took ${damage} damage! They have ${attackedPlayer.activeMonster.hp} hp!`]
  },
  eldritch_horror: function(attackedPlayer){
    const damage = getRandomNumber(5, 8);
    attackedPlayer.activeMonster.takeDamage(damage);
    return [`${attackedPlayer.activeMonster.name} took ${damage} damage! They have ${attackedPlayer.activeMonster.hp} hp!`]
  },
  neutralize: function(attackedPlayer){
    const damage = getRandomNumber(10, 12);
    attackedPlayer.activeMonster.takeDamage(damage);
    return [`${attackedPlayer.activeMonster.name} took ${damage} damage! They have ${attackedPlayer.activeMonster.hp} hp!`]
  },
  stimulant: function(attackedPlayer){
    const damage = 8;
    attackedPlayer.activeMonster.takeDamage(damage);
    return [`${attackedPlayer.activeMonster.name} took ${damage} damage! They have ${attackedPlayer.activeMonster.hp} hp!`]
  },
  hyper_lance: function(attackedPlayer){
    const damage = getRandomNumber(8, 12);
    attackedPlayer.activeMonster.takeDamage(damage);
    return [`${attackedPlayer.activeMonster.name} took ${damage} damage! They have ${attackedPlayer.activeMonster.hp} hp!`]
  },
  simulate_kaiju: function(attackedPlayer){
    const damage = getRandomNumber(10, 12);
    attackedPlayer.activeMonster.takeDamage(damage);
    return [`${attackedPlayer.activeMonster.name} took ${damage} damage! They have ${attackedPlayer.activeMonster.hp} hp!`]
  },
  snake_handler: function(attackedPlayer){
    const damage = getRandomNumber(12, 16);
    attackedPlayer.activeMonster.takeDamage(damage);
    return [`${attackedPlayer.activeMonster.name} took ${damage} damage! They have ${attackedPlayer.activeMonster.hp} hp!`]
  },
  neurotoxin: function(attackedPlayer){
    const damage = getRandomNumber(5, 18);
    attackedPlayer.activeMonster.takeDamage(damage);
    return [`${attackedPlayer.activeMonster.name} took ${damage} damage! They have ${attackedPlayer.activeMonster.hp} hp!`]
  }
};

module.exports = {Attack, attackFuncs};
