const bcrypt = require('bcrypt');

const loginUser = (knex) => {
  return (req, res) => {
    const {email, password} = req.body;
    knex.table('users').first('id','email','brouzoff','password').where('email',email)
      .then(user => {
        if(user === undefined){
          res.send(JSON.stringify({error:'User could not be found'}));
          return;
        }
        // Check password info
        bcrypt.compare(password, user.password, (err, result) => {
          if(result){
            req.session.id = user.id;
            res.status(200).send(JSON.stringify({flash: 'Login success!'}));
            return;
          }
          res.send(JSON.stringify({error:'Wrong password'}));
        });
      });
  };
};

module.exports = loginUser;
