const bookshelf = require('./lib/bookshelf');

module.exports = function(Body, Head, Arm, Type, Attack, Ability){
  return bookshelf.Model.extend({
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
    },
    attack: function(){
      return this.belongsTo(Attack).through(Arm);
    },
    ability: function(){
      return this.belongsTo(Ability).through(Head);
    }
  });
}
