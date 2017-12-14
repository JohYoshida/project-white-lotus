const bookshelf = require('./lib/bookshelf');

const Attack = bookshelf.Model.extend({
  tableName: 'attacks',
});

const attackFuncs = {
  scratch: function(creature){
    creature ? creature.takeDamage(this.type.name) : null;
    return 'Scratch!';
  }
}

const set_attack = function(){
  return new Attack({id:this.arm.attack_id}).fetch().then(model => {
    this.attack = attackFuncs[model.attributes.name];
    return this;
  });
};

module.exports = set_attack;
