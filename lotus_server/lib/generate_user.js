const dbconfig = require('../knexfile.js')[process.env.DB_ENV];
const knex = require('knex')(dbconfig);
const bcrypt = require('bcrypt');
const generate_user = (res,email,password) => {
  knex.table('users').first('id','email','brouzoff','password').where('email',email)
    .then(ids => {
      console.log(ids);
      if(ids===undefined){
        res.send("Not found");

      }else{
      if(bcrypt.compare(password,ids.password)){
        console.log(JSON.stringify(ids));
        res.send(JSON.stringify(ids));
      }else{
        res.send("Invalid password");
      }
    }
    }).catch((err)=>{
      console.log("Promise error in generate_user.js"+err);
    });

}

module.exports = generate_user;