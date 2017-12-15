const generatePlayer = require('../lib/generate_player.js');

test('The state change should be sent with a turn change', done => {
  generatePlayer(1, [1,2,3]).then(player => {
    const exampleAction = () => {
      return {team: { '1': { bench: false } } };
    };
    expect(player.executeActive(exampleAction)[player.id].turn).toBe(false);
    done();
  });
});

test('The state change should be sent without a turn change', done => {
  generatePlayer(1, [1,2,3]).then(player => {
    const exampleAction = () => {
      return {team: { '1': { bench: false } } };
    };
    expect(player.executePassive(exampleAction)[player.id].turn).toBe(undefined);
    done();
  });
});
