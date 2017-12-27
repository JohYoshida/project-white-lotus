const bookshelf = require('./lib/bookshelf');
const uuidv1 = require('uuid/v1');
const monsterMash = require('./monstermash');
const {Team, TeamMonster} = require('./team_model');
// returns a random element from a table
const randomComponent = (collection) => {
  return collection[Math.round(Math.random()*(collection.length-1))];
};

module.exports = (db) => {
  // Make the user model
  const User = bookshelf.Model.extend({
    tableName: 'users',
    team: function(){
      return this.hasMany(Team);
    },
    teamMonster: function(){
      return this.hasMany(TeamMonster).through(Team);
    },
    buyMonster: function(creature, cost){
      const user = this;
      // Returns a promise of a new monster.
      return new Promise(function(resolve){
        user.set({brouzoff: user.attributes.brouzoff - cost});
        user.save().then(() => {
          Promise.all([
            db.select('id','nameword').from('bodies').where('creature', creature),
            db.select('id','nameword').from('heads').where('creature', creature),
            db.select('id','nameword').from('arms').where('creature', creature)
          ]).then(components => {
            const bodies = components[0], heads = components[1], arms = components[2];
            console.log(bodies);
            // Make the monster.
            let arm = randomComponent(arms)
            let body = randomComponent(bodies)
            let head = randomComponent(heads)
            let img1 = './models/parts/RKRH.png';
            let img2 = './models/parts/RKB.png';
            let img3 = './models/parts/RKLH.png';
            let img4 = './models/parts/RKH.png';
            let arr = [img1,img2,img3,img4];
            //console.log(__dirname);
            monsterMash.monsterMash(arr).then((result)=>{;
            return {
                id: uuidv1(),
                arm_id: arm.id,
                body_id: body.id,
                head_id: head.id,
                name: head.nameword+" "+arm.nameword+" "+body.nameword,
                user_id: user.attributes.id,
                image:result
              };
            }).then(monster => {
                console.log(monster);
                resolve(db('monsters').insert(monster, 'id'));
            });
          });
        });
      });
    }
  });
  return User;
};
