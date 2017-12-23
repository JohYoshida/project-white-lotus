class Modifier{
  constructor(monster, attributesToChange, UpdateFunction){
    for(const attribute in attributesToChange){
      monster[attribute] = attributesToChange[attribute];
    }
    this.update = UpdateFunction;
    monster.buff.push(this);
  }
}

module.exports = Modifier;
