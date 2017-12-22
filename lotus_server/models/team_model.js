const bookshelf = require('./lib/bookshelf');
const uuidv1 = require('uuid/v1');

const Monster =  bookshelf.Model.extend({
  tableName: 'monsters'
});

const TeamMonster = bookshelf.Model.extend({
  tableName: 'teams_monsters',
  monster: function(){
    return this.belongsTo(Monster);
  },
  getMonster: function(){
    const teamMonster = this;
    const {name, id, image} = teamMonster.relations.monster.attributes;
    return {id, name, image};
  }
});
const Team = bookshelf.Model.extend({
  tableName: 'teams',
  teamMonster: function() {
    return this.hasMany(TeamMonster);
  }
});

module.exports = {Team, TeamMonster};
