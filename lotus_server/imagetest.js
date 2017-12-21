const fs = require('fs');
const gm = require('gm');
console.log(process.cwd());

gm(process.cwd()+'\\test.jpg')
.identify(function (err, data) {
  if (!err){
    console.log(data)
  }else{
    console.log(err)
  }
});
