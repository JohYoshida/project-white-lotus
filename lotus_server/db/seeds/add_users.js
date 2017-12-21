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
          id: uuidv1(),
          email: 'user',
          password: bcrypt.hashSync('pass',10),
          brouzoff:100
       }
      ]);
    });
};
