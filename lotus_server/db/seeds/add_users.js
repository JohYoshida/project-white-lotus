const bcrypt = require('bcrypt');
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
          email: 'user',
          password: bcrypt.hashSync('pass',10),
          brouzoff:100
       }
      ]);
    });
};
