const bookshelf = require('./lib/bookshelf');

module.exports = function(Ability, Attack){
  return bookshelf.Model.extend({
    tableName: 'heads',
    ability: function(){
      return this.belongsTo(Ability);
    },
    attack: function(){
      return this.belongsTo(Attack);
    }
  });
};
