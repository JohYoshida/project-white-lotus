const bookshelf = require('./lib/bookshelf');

const Attack = bookshelf.Model.extend({
  tableName: 'attacks',
});

const attackFuncs = {
  scratch: function(){
    // Attacks return a function which calls a state change on an object.
    return (player) => {
      let target = {};
      const damage = 1;
      // find the currently active monster.
      for(const monster in player.team){
        if(player.team[monster].bench === false){
          target = player.team[monster];
        }
      }
      return target.takeDamage(damage);
    };
  }
};

module.exports = {Attack, attackFuncs};
