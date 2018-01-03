const dbconfig = require('../knexfile.js')[process.env.DB_ENV];
const knex = require('knex')(dbconfig);
const bcrypt = require('bcrypt');
const generate_user = (res, req, email, password) => {
  knex.table('users').first('id','email','brouzoff','password').where('email',email)
    .then(user => {
      if(user === undefined){
        res.send(JSON.stringify({error:'User or password could not be found 1'}));
        return;
      }
      // Check password info
      bcrypt.compare(password, user.password, (err, result) => {
        if(result){
          req.session.id = user.id;
          res.send(JSON.stringify({flash: 'Login confirmed'}));
          return;
        }
        res.send(JSON.stringify({error:'User or password could not be found 2'}));
      });
    }).catch((err)=>{
      console.log('Promise error in generate_user.js' + err);
    });
};

module.exports = generate_user;
