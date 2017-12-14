const bookshelf = require('./lib/bookshelf');

module.exports = function(Attack){
  return bookshelf.Model.extend({
    tableName: 'arms',
    attack: function(){
      return this.belongsTo(Attack);
    }
  });
};
