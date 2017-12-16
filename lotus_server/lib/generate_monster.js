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
    const {body, arm, head, type, attack, alt_attack, ability} = monster.relations;
    // set attributes
    this.id = monster.attributes.id;
    this.name = monster.attributes.name;

    this.body = body.attributes;
    this.arm = arm.attributes;
    this.head = head.attributes;
    this.type = type.attributes;
    this.ability = ability.attributes;

    this.image_url = this.body.image_url;
    this.bench = true;

    // generate attacks and/or ability
    this.attack = this.set_attacks(attack.attributes.name, alt_attack.attributes.name);
    // console.log(this.attack);
    this.ability = this.set_ability();
  }
  buildStateChange(changeObj){
    const stateChanges = {team:{}};
    stateChanges.team[this.id] = {};
    // for each bodypart it builds it up
    for(const attribute in changeObj){
      stateChanges.team[this.id][attribute] = changeObj[attribute];
    }
    return stateChanges;
  }
  takeDamage(damage){
    return this.buildStateChange({'body' : {'hp': this.body.hp - damage}});
  }
  becomeActive(){
    return this.buildStateChange({'bench':false});
  }
  becomeBenched(){
    return this.buildStateChange({'bench':true});
  }
  set_attacks(name, alt_name) {
    const attackOne = {};
    const attackTwo = {};
    const attacks = [];
    attackOne[name] = attackFuncs[name];
    attackTwo[alt_name] = attackFuncs[alt_name];
    attacks.push(attackOne);
    if(alt_name){
      attacks.push(attackTwo);
    }
    return attacks;
  }
  set_ability(name) {
    const ability = {};
    let ability_name = name;
    ability_name ? null : ability_name = this.ability.name;
    ability[ability_name] = abilityFuncs[ability_name]
    return ability;
  }
}

const getCreature = (id) => {
  return new Monster({'id': id}).fetch({withRelated: ['body', 'arm', 'head', 'type', 'attack', 'alt_attack', 'ability']}).then((prod) => {
    return new CompleteMonster(prod);
  });
};

module.exports = getCreature;
