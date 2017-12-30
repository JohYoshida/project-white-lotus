const uuid = require('uuid/v1');
// Takes an active monster, an object of attributesToChange and an update functions
// it will add the modifier to the modifiers collection on first argument monster.
// Each turn, the modifier's update function will be called, taking itself as an argument.
// see modifier.test.js for a use case.
class Modifier{
  constructor(monster, attributesToChange, updateFunction){
    this.id = uuid();
    this.savedAttributes = {};
    // change monster attributes
    for(const attribute in attributesToChange){
      const attributeValue = attributesToChange[attribute];
      this.savedAttributes[attribute] = monster[attribute];
      monster[attribute] = attributeValue;
    }
    this.update = () => {
      return updateFunction(this);
    };
    monster.modifiers[this.id] = this;
    this.removeModifier = () => {
      // Reset monster attributes.
      for(const attribute in this.savedAttributes){
        const savedAttributeValue = this.savedAttributes[attribute];
        monster[attribute] = savedAttributeValue;
      }
      delete monster.modifiers[this.id];
    }
  }
  // remove the modifier from the monster to whom it belongs

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
