const generatePlayer = require('../lib/generate_player');

test('The player should have turns', done => {
  generatePlayer(1, [1,2,3]).then(player => {
    expect(player.turn).toBe(false);
    done();
  });
});
