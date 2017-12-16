const generatePlayer = require('../lib/generate_player');

test('This player\'s monster of id 1 should be unbenched and their turn false', done => {
  generatePlayer(1, [1,2,3]).then(player => {
    player.setState(player.team['1'].becomeActive());
    expect(player.team['1'].bench).toBe(false);
    done();
  });
});

test('The monster should of id 1 should take damage.', done => {
  generatePlayer(1, [1,2,3]).then(player => {
    player.setState(player.team['1'].takeDamage(1));
    expect(player.team['1'].hp).toBe(9);
    done();
  });;
});
