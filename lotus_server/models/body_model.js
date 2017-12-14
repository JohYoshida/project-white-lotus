const bookshelf = require('./lib/bookshelf');

module.exports = function(Type){
  return bookshelf.Model.extend({
    tableName: 'bodies',
    type: function(){
      return this.belongsTo(Type);
    }
  });
};
