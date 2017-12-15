const bookshelf = require('./lib/bookshelf');

const Attack = bookshelf.Model.extend({
  tableName: 'attacks',
});

const attackFuncs = {
  scratch: function(player){
    let target = {};
    let damage = 1;
    player.team.forEach(monster => {
      if(monster.bench == false){
        target = monster;
      }
    });
    target.takeDamage(damage);
  }
};

module.exports = {Attack, attackFuncs};
