// Attacks, abilities and their required collections
const {Attack, attackFuncs} = require('./attack_model');
const {Ability, abilityFuncs} = require('./ability_model');
const Type = require('./type_model');

// Monster components, functions so that we can bring everything together into this file.
const Body = require('./body_model')(Type);
const Head = require('./head_model')(Ability);
const Arm = require('./arm_model')(Attack);
const Monster = require('./monster_model')(Body, Head, Arm, Type, Attack, Ability);

// the monster class
class CompleteMonster {
  constructor(monster){
    const {body, arm, head, type, attack, ability} = monster.relations;
    this.body = body.attributes;
    this.arm = arm.attributes;
    this.head = head.attributes;
    this.name = monster.attributes.name;
    this.type = type.attributes;
    this.attack = attack.attributes;
    this.ability = ability.attributes;
    this.attack = this.set_attack();
    this.ability = this.set_ability();
  }
  takeDamage(){
    this.body.hp -= 1;
  }
  set_attack(name) {
    let attack_name = name;
    attack_name ? null : attack_name = this.attack.name;
    return attackFuncs[attack_name];
  }
  set_ability(name) {
    let ability_name = name;
    ability_name ? null : ability_name = this.ability.name;
    return abilityFuncs[ability_name];
  }
}

const get_creature = (id) => {
  return new Monster({'id': id}).fetch({withRelated: ['body', 'arm', 'head', 'type', 'attack', 'ability']}).then((prod) => {
    return new CompleteMonster(prod);
  });
};

module.exports = get_creature;
