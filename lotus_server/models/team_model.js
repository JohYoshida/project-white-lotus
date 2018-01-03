const bookshelf = require('./lib/bookshelf');
const getCreature = require('../lib/generate_monster');

const Monster =  bookshelf.Model.extend({
  tableName: 'monsters'
});
// Handles teams
const Team = bookshelf.Model.extend({
  tableName: 'teams',
  teamMonster: function() {
    return this.hasMany(TeamMonster);
  }
});
// handles individual monsters
const TeamMonster = bookshelf.Model.extend({
  tableName: 'teams_monsters',
  monster: function(){
    return this.belongsTo(Monster);
  },
  team: function(){
    return this.belongsTo(Team);
  },

  /**
   * getMonster - gets a CompleteMonster object for an individual team member.
   *
   */
  getMonster: function(){
    const teamMonster = this;
    const {name, id, image} = teamMonster.relations.monster.attributes;
    return getCreature(id);
  }
});

module.exports = {Team, TeamMonster};
