const generatePlayer = require('../lib/generate_player');

test('This player\'s monster of id 1 should be unbenched and their turn false', done => {
  generatePlayer(1, [1,2,3]).then(player => {
    player.setState(
      {
        team: { '1': { bench: false}},
        turn: false
      }
    );
    expect(player.team['1'].bench).toBe(false);
    expect(player.turn).toBe(false);
    done();
  });
});
