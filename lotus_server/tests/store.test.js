
// Implement a mock server


// const HTTP = require('http');
// const querystring = require('querystring');
//
// const getCreature = require('../lib/generate_monster');
// const generatePlayer = require('../lib/generate_player');
//
// test('The client should receive a monster object.', done => {
//   // sending sample post request
//   const postData = querystring.stringify({creature:'kaiju'});
//   const req = HTTP.request({
//     port:3001,
//     path:'/monsters',
//     method:'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//       'Content-Length': Buffer.byteLength(postData)
//     }}, (res) => {
//     let message = '';
//     res.on('data', (chunk) => {
//       message += chunk;
//     });
//     res.on('end', () => {
//       const monsterObj = JSON.parse(message);
//       try{
//         expect(typeof monsterObj.id).toBe('number');
//         expect(monsterObj.user_id).toBe(1);
//         done();
//       } catch(error){
//         done.fail(error);
//       }
//     });
//   });
//
//   req.write(postData);
//   req.end();
// });
//
// test('The monster\'s new name should be "Barbstalker"', done => {
//   // sending sample post request
//   const putData = querystring.stringify({name:'Barbstalker'});
//   const req = HTTP.request({
//     port:3001,
//     path:'/monsters/5',
//     method:'PUT',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//       'Content-Length': Buffer.byteLength(putData)
//     }}, (res) => {
//     let message = '';
//     res.on('data', (chunk) => {
//       message += chunk;
//     });
//     res.on('end', () => {
//       const monsterObj = JSON.parse(message);
//       try{
//         expect(monsterObj.name).toBe('Barbstalker');
//         done();
//       } catch(error){
//         done.fail(error);
//       }
//     });
//   });
//
//   req.write(putData);
//   req.end();
// });
