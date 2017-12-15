// Attacks, abilities and their required collections
const {Attack, attackFuncs} = require('./attack_model');
const {Ability, abilityFuncs} = require('./ability_model');
const Type = require('./type_model');

// Monster components, functions so that we can bring everything together into this file.
const Body = require('./body_model')(Type);
const Head = require('./head_model')(Ability, Attack);
const Arm = require('./arm_model')(Attack);
const Monster = require('./monster_model')(Body, Head, Arm, Type, Attack, Ability);

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
    this.attack = attack.attributes;
    this.ability = ability.attributes;
    this.alt_attack = alt_attack.attributes;

    this.image_url = this.body.image_url;
    this.bench = true;

    // generate attacks and/or ability
    this.attack = this.set_attacks();
    this.ability = this.set_ability();
  }
  takeDamage(){
    this.body.hp -= 1;
  }
  set_attacks(name, alt_name) {
    let attack_name = name;
    let alt_attack_name = alt_name;
    attack_name ? null : attack_name = this.attack.name;
    alt_attack_name ? null : alt_attack_name = this.alt_attack.name;
    return [attackFuncs[attack_name], attackFuncs[alt_attack_name]];
  }
  set_ability(name) {
    let ability_name = name;
    ability_name ? null : ability_name = this.ability.name;
    return abilityFuncs[ability_name];
  }
}

const getCreature = (id) => {
  return new Monster({'id': id}).fetch({withRelated: ['body', 'arm', 'head', 'type', 'attack', 'alt_attack', 'ability']}).then((prod) => {
    return new CompleteMonster(prod);
  });
};

module.exports = getCreature;
