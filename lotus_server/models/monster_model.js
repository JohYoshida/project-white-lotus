const bookshelf = require('./lib/bookshelf');
const set_attack = require('./attack_model');

//  monster components

const Type = bookshelf.Model.extend({
  tableName: 'types'
});
const Body = bookshelf.Model.extend({
  tableName: 'bodies',
  type: function(){
    return this.belongsTo(Type);
  }
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
  },
  type: function(){
    return this.belongsTo(Type).through(Body);
  }
});

class myMonster {
  constructor(monster){
    this.body = monster.relations.body.attributes;
    this.arm = monster.relations.arm.attributes;
    this.head = monster.relations.head.attributes;
    this.name = monster.attributes.name;
    this.set_attack = set_attack;
    this.type = monster.relations.type.attributes;
  }
  takeDamage(){
    this.body.hp -= 1;
  }
}
// How we will actually get the creature data.
const get_creature = (id) => {
  return new Monster({'id': id}).fetch({withRelated: ['body', 'arm', 'head', 'type']}).then((prod) => {
    return new myMonster(prod);
  }).then(monster => monster.set_attack());
};

module.exports = get_creature;
