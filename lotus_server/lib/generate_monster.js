// Attacks, abilities and their required collections
const {Attack, attackFuncs} = require('../models/attack_model');
const {Ability, abilityFuncs} = require('../models/ability_model');
const Type = require('../models/type_model');

// Monster components, functions so that we can bring everything together into this file.
const Body = require('../models/body_model')(Type);
const Head = require('../models/head_model')(Ability, Attack);
const Arm = require('../models/arm_model')(Attack);
const Monster = require('../models/monster_model')(Body, Head, Arm, Type, Attack, Ability);
const {ModifierCollection} = require('./Modifier.js');

// the monster class
class CompleteMonster {
  constructor(monster){
    // arm and head to be used for image compilation functionality.
    const {body, type} = monster.relations;
    // set attributes
    console.log(body);
    this.id = monster.attributes.id;
    this.name = monster.attributes.name;
    this.creature = body.attributes.creature;
    this.maxHp = body.attributes.hp;
    this.hp = body.attributes.hp;
    this.type = type.attributes;
    // Will eventually the compiled image
    this.image_url = monster.attributes.image || body.attributes.image_url;
    this.image= monster.attributes.image;
    this.bench = true;
    this.passiveActive = true;
    this.dot = [];
    this.modifiers = new ModifierCollection();
  }
  takeDamage(damage){
    this.hp -= damage;
  }
  set_attacks(attributes, altAttributes) {
    this.attacks = {};
    let {id, name, description} = attributes;
    this.attacks[name] = {id, name, description: description || 'Attack 1 description', func: attackFuncs[name].bind(this)};
    if(altAttributes.name){
      let {id, name, description} = altAttributes;
      this.attacks[name]  = {id, name, description: description || 'Attack 2 description', func: attackFuncs[name].bind(this), isAlt:true};
    }
  }
  set_ability(name) {
    /* @TODO: apply the above pattern to abilities */
    // this.ability[name] = {id: id, name: name, description: description || 'Attack 1 description', func: attackFuncs[name].bind(this)};
    this.ability = abilityFuncs[name].bind(this);
  }
}

const getCreature = (id) => {
  return new Monster({'id': id}).fetch({withRelated: ['body', 'arm', 'head', 'type', 'attack', 'alt_attack', 'ability']}).then(prod => {
    const {attack, alt_attack, ability} = prod.relations;
    const monster = new CompleteMonster(prod);
    // After monster has been created set attacks and abilities
    monster.set_attacks(attack.attributes, alt_attack.attributes);
    if(ability.attributes.name){
      monster.set_ability(ability.attributes.name);
    }
    return monster;
  }).catch(e => console.log(e));
};

module.exports = getCreature;
