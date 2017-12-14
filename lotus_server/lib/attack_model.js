const bookshelf = require('./bookshelf');

const Attack = bookshelf.Model.extend({
  tableName: 'attacks',
});

const attackFuncs = {
  scratch: function(){
    return 'Scratch!';
  }
}

const set_attack = function(){
  return new Attack({id:this.arm.id}).fetch().then(model => {
    this.attack = attackFuncs[model.attributes.name];
    return this;
  });
};

module.exports = set_attack;
