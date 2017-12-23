const uuid = require('uuid/v1');

class Modifier{
  constructor(monster, attributesToChange, updateFunction){
    this.id = uuid();
    this.monster = monster;
    for(const attribute in attributesToChange){
      const attributeValue = attributesToChange[attribute];
      if(typeof attributeValue === 'number' && attributeValue){
        monster[attribute] += attributeValue;
      } else {
        monster[attribute] = attributeValue;
      }
    }
    this.update = updateFunction.bind(this);
    monster.modifiers[this.id] = this;
  }
  removeModifier(){
    delete this.monster.modifiers[this.id];
  }
}

class ModifierCollection{
  forEach(callback){
    for(const key in this){
      callback(this[key]);
    }
  }
  length(){
    return Object.keys(this).length;
  }
}

module.exports = {Modifier, ModifierCollection};
