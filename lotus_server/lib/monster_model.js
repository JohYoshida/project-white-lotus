const bookshelf = require('./bookshelf');
const set_attack = require('./attack_model');

const Body = bookshelf.Model.extend({
  tableName: 'bodies',
});

const Head = bookshelf.Model.extend({
  tableName: 'heads',
});

const Arm = bookshelf.Model.extend({
  tableName: 'arms',
});

const Monster = bookshelf.Model.extend({
  tableName: 'monsters',
  body: function(){
    return this.belongsTo(Body);
  },
  head: function(){
    return this.belongsTo(Head);
  },
  arm: function(){
    return this.belongsTo(Arm);
  }
});

class myMonster {
  constructor(monster){
    this.body = monster.relations.body.attributes;
    this.arm = monster.relations.arm.attributes;
    this.head = monster.relations.head.attributes;
    this.name = monster.attributes.name;
    this.set_attack = set_attack;
  }
  takeDamage(){
    this.body.current_hp -= 1;
  }
}

const get_creature = (id) => {
  return new Monster({'id': id}).fetch({withRelated: ['body', 'arm', 'head']}).then((prod) => {
    return new myMonster(prod);
  }).then(monster => monster.set_attack());
};
// for testing
module.exports = get_creature;
