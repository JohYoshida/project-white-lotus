const bookshelf = require('./lib/bookshelf');

const Type = bookshelf.Model.extend({
  tableName: 'types'
});

module.exports = Type;
