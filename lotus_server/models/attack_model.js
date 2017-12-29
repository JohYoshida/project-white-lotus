const bookshelf = require('./lib/bookshelf');
const Modifier = require('../lib/Modifier.js');
const uuidv1 = require('uuid/v1');

const Attack = bookshelf.Model.extend({
  tableName: 'attacks',
});

const getRandomNumber = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
}

// TODO: Add DOT, AOE, and other functionality
// These attack functions are applied to monsters, and are called when an attack message is sent.
// After executing their functionality, they return a message array that is sent with the game update.
const attackFuncs = {
  toxic_slime: function(attackedPlayer){
    const damage = 4;
    new Modifier(attackedPlayer.activeMonster, {}, (modifier) => {
      const monster = attackedPlayer.activeMonster;
      // check turn count
      modifier.count ? modifier.count++ : modifier.count = 1;
      if(modifier.count >= 3) return modifier.removeModifier();
      // Inflict 4 damage
      modifier.monster.takeDamage(damage);
      return `${monster.name} took ${damage} damage! They have ${monster.hp} hp!`
    });
  },
  roar: function(attackedPlayer){
    const damage = 3;
    const messages = [];
    for(const monsterId of attackedPlayer.team){
      const monster = attackedPlayer.team[monsterId];
      monster.takeDamage(damage);
      messages.push(`${monster.name} took ${damage} damage! They have ${monster.hp} hp!`);
    }
    return messages;
  },
  insanity: function(attackedPlayer){
    const damage = 6;
    const {monster} = attackedPlayer.activeMonster;
    monster.takeDamage(damage);
    new Modifier(monster, {accuracy_bonus: monster.accuracy_bonus - 1}, (modifier) => {
      // If the monster is on the bench, remove the modifier.
      if(modifier.monster.bench) modifier.removeModifier();
      modifier.monster.accuracy_bonus -= 1;
      return `${monster.name} lost 1 accuracy! They have ${monster.accuracy_bonus} accuracy!`;
    });
    return [`${monster.name} took ${damage} damage! They have ${monster.hp} hp! They are less accurate...`];
  },
  decimate: function(attackedPlayer){
    const maxHp = attackedPlayer.activeMonster.maxHp;
    const hp = attackedPlayer.activeMonster.hp;
    const damage = Math.floor(maxHp/hp);
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
