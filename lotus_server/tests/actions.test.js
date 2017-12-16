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

test('The state change should contain multiple states per player.', done => {
  Promise.all([
    generatePlayer(1, [1,2,3]),
    generatePlayer(2, [1,2,3])
  ])
    .then(players => {
      const ben = players[0];
      const lisa = players[1];
      lisa.team[1].bench = false;
      console.log(ben.team['2']);
      const changes = [ben.executeActive(), lisa.executePassive(ben.team['1'].attack[0]["scratch"]())];
      expect(changes[1][lisa.id].team['1'].body.hp).toBe(9);
      done();
    });
});
