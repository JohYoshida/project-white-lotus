const bookshelf = require('./lib/bookshelf');

module.exports = function(Ability){
  return bookshelf.Model.extend({
    tableName: 'heads',
    ability: function(){
      return this.belongsTo(Ability);
    }
  });
};
