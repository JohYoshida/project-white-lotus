const generatePlayer = require('../lib/generate_player');

test('eldritch_horror should change a player\'s active monster.', done => {
  Promise.all([generatePlayer(1, [1,2,3]), generatePlayer(2, [1,2,3])]).then(players => {
    const player1 = players[0];
    const player2 = players[1];
    player2.activateMonster('2');
    player2.findActiveMonster();
    player1.team["3"].attacks['eldritch_horror'].func(player2);
    expect(player2.activeMonster.id === 2).toBe(false);
    done();
  });
});

test('roar should harm all monsters on a player.', done => {
  Promise.all([generatePlayer(1, [1,2,3]), generatePlayer(2, [1,2,3])]).then(players => {
    const player1 = players[0];
    const player2 = players[1];

    player1.activateMonster('1');
    player1.findActiveMonster();
    player2.activateMonster('2');
    player2.findActiveMonster();
    player2.activeMonster.attacks['roar'].func(player1);
    expect(player1.team['1'].hp).toBe(25.5);
    expect(player1.team['2'].hp).toBe(32);
    expect(player1.team['3'].hp).toBe(23.5);
    done();
  });
});
