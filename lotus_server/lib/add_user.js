const dbconfig = require('../knexfile.js')[process.env.DB_ENV];
const knex = require('knex')(dbconfig);
const bcrypt = require('bcrypt');
const add_user = (res,email,password) => {
  knex('users').insert({'email':email,'password':bcrypt.hashSync(password,10) ,brouzoff:100}).then( result =>{
    console.log(result);
     knex.table('users').first('id','email','brouzoff','password').where('email',email) .then(ids => {
      if(ids!== undefined){
        res.send(ids);
      }else{
        res.send("Not found");
      }
  });
  }).catch((err)=>{
      console.log("Promise error in add_user.js"+err);
 });
}

module.exports = add_user;