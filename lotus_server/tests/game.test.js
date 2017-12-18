const Game = require('../lib/generate_game');

test('The game should take and execute an action', done => {
  Game.generateGame({id: '1', team:[1,2,3]}, {id: '2', team:[1,2,3]}).then(game => {
    game.players[0].turn = true;
    // Sets active player and idle player
    game.findActivePlayer();

    game.players[0].team[1].bench = false;
    game.players[1].team[2].bench = false;
    // Finds the active monster based on who is not on the bench
    game.players[0].findActiveMonster();
    game.players[1].findActiveMonster();

    expect(game.players[0].turn).toBe(true);
    game.takeAction({action: 'attack', name:'scratch', options: null});

    expect(game.players[0].turn).toBe(false);
    expect(game.players[1].activeMonster.hp).toBe(4);
    done();
  });
});

test('The game should take and execute a passive action', done => {
  Game.generateGame({id: '1', team:[1,2,3]}, {id: '2', team:[1,2,3]}).then(game => {
    game.players[0].turn = true;
    // Sets active player and idle player
    game.findActivePlayer();

    game.players[0].team[1].bench = false;
    game.players[1].team[2].bench = false;
    // Finds the active monster based on who is not on the bench
    game.players[0].findActiveMonster();
    game.players[1].findActiveMonster();

    expect(game.players[0].turn).toBe(true);
    expect(game.players[1].turn).toBe(false);
    game.takeAction({action: 'passive'});
    expect(game.players[0].turn).toBe(true);
    expect(game.players[1].turn).toBe(false);
    expect(game.players[0].activeMonster.hp).toBe(11);
    expect(game.players[0].team['2'].passiveActive).toBe(false);

    done();
  });
});

test('The game should take set a monster to active', done => {
  Game.generateGame({id: '1', team:[1,2,3]}, {id: '2', team:[1,2,3]}).then(game => {
    game.players[0].turn = true;
    // Sets active player and idle player
    game.findActivePlayer();

    game.players[0].team[1].bench = false;
    game.players[1].team[2].bench = false;
    // Finds the active monster based on who is not on the bench
    game.players[0].findActiveMonster();
    game.players[1].findActiveMonster();

    expect(game.players[0].turn).toBe(true);
    expect(game.players[1].turn).toBe(false);
    game.takeAction({action:'activate', 'monsterId': '2'});
    expect(game.players[0].turn).toBe(false);
    expect(game.players[1].turn).toBe(true);

    expect(game.players[0].activeMonster.id).toBe(2);
    done();
  });
});
