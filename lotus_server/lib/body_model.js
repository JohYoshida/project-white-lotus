const bookshelf = require('./bookshelf');

const Body = bookshelf.Model.extend({
  tableName: 'bodies',
});

module.exports = Body;
