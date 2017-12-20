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
    // dot passive objects go here.
    this.dot = [];
  }
  // simple helper to cause damage to be taken. Takes an integer to represent damage.
  takeDamage(damage){
    this.hp -= damage;
  }
  // sets up this.attacks property, attributes is a bookshelf attack object
  set_attacks(attributes, altAttributes) {
    this.attacks = {};
    const {id, name, description} = attributes;
    const {altId, altName, altDescription} = altAttributes;
    this.attacks[name] = {id: id, name: name, description: description || 'Attack 1 description', func: attackFuncs[name].bind(this)};
    if(altName){
      this.attacks[altName]  = {id: altId, name: altName, description: altDescription || 'Attack 2 description', func: attackFuncs[altName].bind(this)};
    }
  }
  // Sets up abilities, should be implemented as above.
  set_ability(name) {
    /* @TODO: apply the above pattern to abilities */
    this.ability = abilityFuncs[name].bind(this);
  }
}

const getCreature = (id) => {
  return new Monster({'id': id}).fetch({withRelated: ['body', 'arm', 'head', 'type', 'attack', 'alt_attack', 'ability']}).then((prod) => {
    const {attack, alt_attack, ability} = prod.relations;
    const monster = new CompleteMonster(prod);
    // After monster has been created set attacks and abilities
    monster.set_attacks(attack.attributes, alt_attack.attributes);
    if(ability.attributes.name){
      monster.set_ability(ability.attributes.name);
    }
    return monster;
  });
};

module.exports = getCreature;
