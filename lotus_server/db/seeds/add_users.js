const bcrypt = require('bcrypt');
const uuidv1 = require('uuid/v1');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          email: 'admin',
          password: bcrypt.hashSync('pass',10),
          brouzoff:9999
       },
       {
          id: 2,
          email: 'Joh',
          password: bcrypt.hashSync('pass',10),
          brouzoff: 200
       },
       {
          id: 3,
          email: 'Quinlan',
          password: bcrypt.hashSync('pass',10),
          brouzoff: 200
       },
       {
          id: 4,
          email: 'David',
          password: bcrypt.hashSync('pass',10),
          brouzoff: 200
       },
       {
          id: 5,
          email: 'Nicolas',
          password: bcrypt.hashSync('pass',10),
          brouzoff: 200
       },
      ]);
    });
};
