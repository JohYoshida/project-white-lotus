const bookshelf = require('./lib/bookshelf');
const uuidv1 = require('uuid/v1');
const getCreature = require('../lib/generate_monster');

const Monster =  bookshelf.Model.extend({
  tableName: 'monsters'
});
const Team = bookshelf.Model.extend({
  tableName: 'teams',
  teamMonster: function() {
    return this.hasMany(TeamMonster);
  }
});
const TeamMonster = bookshelf.Model.extend({
  tableName: 'teams_monsters',
  monster: function(){
    return this.belongsTo(Monster);
  },
  team: function(){
    return this.belongsTo(Team);
  },
  getMonster: function(){
    const teamMonster = this;
    const {name, id, image} = teamMonster.relations.monster.attributes;
    return getCreature(id);
  }
});

module.exports = {Team, TeamMonster};
