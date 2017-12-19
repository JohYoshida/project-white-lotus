const bookshelf = require('./lib/bookshelf');

// returns a random element from a table
const randomComponentId = (collection) => {
  return collection[Math.floor(Math.random()*(collection.length-1))].id;
};

module.exports = (db) => {
  // Make the user model
  const User = bookshelf.Model.extend({
    tableName: 'users',
    buyMonster: function(creature){
      const user = this;
      // Returns a promise of a new monster.
      return new Promise(function(resolve){
        user.set({brouzoff: user.attributes.brouzoff - 50});
        user.save().then(() => {
          Promise.all([
            db.select('id').from('bodies').where('creature', creature),
            db.select('id').from('heads').where('creature', creature),
            db.select('id').from('arms').where('creature', creature)
          ]).then(components => {
            const bodies = components[0], heads = components[1], arms = components[2];
            // Make the monster.
            return {
              arm_id: randomComponentId(arms),
              body_id: randomComponentId(bodies),
              head_id: randomComponentId(heads),
              name: 'Talonridge',
              user_id: user.attributes.id
            };
          }).then(monster => {
            resolve(db('monsters').insert(monster, 'id'));
          });
        });
      });
    }
  });
  return User;
};
