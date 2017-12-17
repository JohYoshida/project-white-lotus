// Attacks, abilities and their required collections
const {Attack, attackFuncs} = require('../models/attack_model');
const {Ability, abilityFuncs} = require('../models/ability_model');
const Type = require('../models/type_model');

// Monster components, functions so that we can bring everything together into this file.
const Body = require('../models/body_model')(Type);
const Head = require('../models/head_model')(Ability, Attack);
const Arm = require('../models/arm_model')(Attack);
const Monster = require('../models/monster_model')(Body, Head, Arm, Type, Attack, Ability);

// the monster class
class CompleteMonster {
  constructor(monster){
    // arm and head to be used for image compilation functionality.
    const {body, arm, head, type} = monster.relations;
    // set attributes
    this.id = monster.attributes.id;
    this.name = monster.attributes.name;
    this.creature = body.attributes.creature;
    this.maxHp = body.attributes.hp;
    this.hp = body.attributes.hp;
    this.type = type.attributes;
    // Will eventually the compiled image.
    this.image_url = body.attributes.image_url;
    // on bench?
    this.bench = true;
    // Can passive be used?
    this.passiveActive = true;
  }
  takeDamage(damage){
    this.hp -= damage;
  }
  becomeActive(){
    this.bench = false;
  }
  becomeBenched(){
    this.bench = true;
  }
  set_attacks(name, alt_name) {
    const attackOne = {};
    const attackTwo = {};
    const attacks = [];
    attackOne[name] = attackFuncs[name].bind(this);
    if(alt_name){
      attackTwo[alt_name] = attackFuncs[alt_name].bind(this);
      attacks.push(attackTwo);
    }
    this.attack = attacks;
  }
  set_ability(name) {
    this.ability = abilityFuncs[name].bind(this);
  }
}

const getCreature = (id) => {
  return new Monster({'id': id}).fetch({withRelated: ['body', 'arm', 'head', 'type', 'attack', 'alt_attack', 'ability']}).then((prod) => {
    const {attack, alt_attack, ability} = prod.relations;
    const monster = new CompleteMonster(prod);
    monster.set_attacks(attack.attributes.name, alt_attack.attributes.name);
    if(ability.attributes.name){
      monster.set_ability(ability.attributes.name);
    }
    return monster;
  });
};

module.exports = getCreature;
