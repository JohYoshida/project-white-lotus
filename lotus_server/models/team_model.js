const bookshelf = require('./lib/bookshelf');
const uuidv1 = require('uuid/v1');

// returns a random element from a table
const randomComponentId = (collection) => {
  return collection[Math.round(Math.random()*(collection.length-1))].id;
};

// Make the user model
const TeamMonster = bookshelf.Model.extend({
  tableName: 'teams_monsters'
});
const Team = bookshelf.Model.extend({
  tableName: 'teams',
  teamMonster: function() {
    return this.belongsTo(TeamMonster);
  }
});

module.exports = {Team, TeamMonster}
