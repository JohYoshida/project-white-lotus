const HTTP = require('http');
const querystring = require('querystring');

const getCreature = require('../lib/generate_monster');
const generatePlayer = require('../lib/generate_player');

test('The client should receive a monster object.', done => {
  // sending sample post request
  const postData = querystring.stringify({creature:'kaiju', userid:1});
  const req = HTTP.request({
    port:3001,
    path:'/monsters',
    method:'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    }}, (res) => {
    let message = ''
    res.on('data', (chunk) => {
      message += chunk;
    });
    res.on('end', () => {
      const monsterObj = JSON.parse(message);
      try{
        expect(typeof monsterObj[0]).toBe('number');
        done();
      } catch(error){
        done.fail(error);
      }
    });
  });
  req.write(postData);
  req.end();
});
