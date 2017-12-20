const dbconfig = require('../knexfile.js')[process.env.DB_ENV];
const knex = require('knex')(dbconfig);
const bcrypt = require('bcrypt');
const add_user = (res, email, password) => {
  bcrypt.hash(password, 10, (err, hash) => {
    knex('users').insert({'email':email, 'password':hash, brouzoff:100}, 'id').then(id =>{
      console.log(id);
      knex('users').select('id','email','brouzoff','password').where('id', id[0]) .then(user => {
        res.send(JSON.stringify(user));
      });
    }).catch((err)=>{
      console.log("Promise error in add_user.js"+err);
    });
  });
};

module.exports = add_user;
