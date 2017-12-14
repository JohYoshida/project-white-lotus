const bookshelf = require('./bookshelf');
const Body = require('./body_model');

const Monster = bookshelf.Model.extend({
  tableName: 'monsters',
  body: function(){
    return this.belongsTo(Body);
  }
});

class myMonster {
  constructor(monster){
    const body = monster.relations.body.attributes;
    this.name = monster.attributes.name;
    this.hp = body.hp;
    this.current_hp = body.current_hp;
  }
}

// for testing
module.exports = new Monster({'id': 1}).fetch({withRelated: ['body']}).then((prod) => {
  return new myMonster(prod);
});
