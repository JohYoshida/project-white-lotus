const dbconfig = require('../knexfile.js')[process.env.DB_ENV];
const knex = require('knex')(dbconfig);
const bcrypt = require('bcrypt');
const generate_user = (res,email,password) => {
  knex.table('users').first('id','email','brouzoff','password').where('email',email)
    .then(ids => {
      if(ids === undefined){
        res.send(JSON.stringify({error:'User or password could not be found'}));
        return;
      }
      // Check password info
      bcrypt.compare(password, ids.password, (err, result) => {
        if(result){
          res.send(JSON.stringify(ids));
          return;
        }
        res.send(JSON.stringify({error:'User or password could not be found'}));
      });
    }).catch((err)=>{
      console.log('Promise error in generate_user.js' + err);
    });
};

module.exports = generate_user;
