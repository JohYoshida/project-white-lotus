const generateGame = require('../lib/game');

test('The game should start', done => {
  // when there are two players in the socket
  generateGame({id: '1', team:[1,2,3]}, {id: '2', team:[1,2,3]}).then(game => {
    expect(game.start).toBe(true);
    const playerIds = Object.keys(game.players);
    expect(playerIds.length).toBe(2);
    expect(game.players['1'].team['1'].name).toBe('Gojira');
    done();
  });
});

test('The game should take and execute and action', done => {
  generateGame({id: '1', team:[1,2,3]}, {id: '2', team:[1,2,3]}).then(game => {
    game.players[0].turn = true;
    game.findActivePlayer();
    game.players[0].team[1].bench = false;
    game.players[1].team[2].bench = false;
    game.players[0].findActiveMonster();
    game.players[1].findActiveMonster();
    expect(game.players[0].turn).toBe(true);
    game.takeAction({attack: 'scratch'});

    expect(game.players[0].turn).toBe(false);
    expect(game.players[1].activeMonster.body.hp).toBe(4);
    done();
  });
});
