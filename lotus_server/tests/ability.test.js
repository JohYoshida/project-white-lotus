const generatePlayer = require('../lib/generate_player');


describe('electric_shield', () => {
  let player1 = null;
  let player2 = null;
  beforeAll(done => {
    Promise.all([generatePlayer(1, [1,2,3]), generatePlayer(2, [1,2,6])]).then(players => {
      player1 = players[0];
      player2 = players[1];
      player2.activateMonster('2');
      player2.findActiveMonster();
      player2.team[6].ability.func(player2);
      done();
    });
  });

  test('should set a protector.', () => {
    expect(player2.activeMonster.protector).toBeTruthy();
    expect(player2.team[6].passiveActive).toBeFalsy();
  });

  test('ability should work again if a new monster is set to active.', () => {
    player2.activateMonster('1');
    player2.findActiveMonster();
    player2.team[6].ability.func(player2);
    expect(player2.activeMonster.protector).toBeTruthy();
    expect(player2.team[2].protector).toBeFalsy();
  });

  test('ability should protect against damage.', () => {
    player2.activeMonster.hp = 10;
    expect(player2.activeMonster.protector.hp).toBe(25);
    player2.activeMonster.takeDamage(5);
    expect(player2.activeMonster.hp).toBe(10);
    expect(player2.team[6].hp).toBe(20);
  });
});

describe('Supercharge', () => {
  let player1 = null;
  let player2 = null;
  beforeAll(done => {
    Promise.all([generatePlayer(1, [1,2,4]), generatePlayer(2, [1,2,4])]).then(players => {
      player1 = players[0];
      player2 = players[1];
      player1.activateMonster('4');
      player1.findActiveMonster();
      player2.activateMonster('2');
      player2.findActiveMonster();
      player2.team[4].ability.func(player2);
      done();
    });
  });

  test('ability should set Supercharge to the attacking monster', () => {
    expect(player2.activeMonster.supercharged).toBeTruthy();
  });

  test('t-wrex\'s steel jaw should harm all monsters on the enemy team', () => {
    const {team} = player1;
    player2.activeMonster.attacks['steel_jaw'].func(player1);
    expect(team[1].hp).toBeLessThan(30);
    expect(team[2].hp).toBeLessThan(35);
    expect(team[4].hp).toBeLessThan(20);
  });
});

describe('pierce', () => {
  let player1 = null;
  let player2 = null;
  beforeAll(done => {
    Promise.all([generatePlayer(1, [1,2,4]), generatePlayer(2, [1,2,4])]).then(players => {
      player1 = players[0];
      player2 = players[1];
      player1.activateMonster('4');
      player1.findActiveMonster();
      player2.activateMonster('2');
      player2.findActiveMonster();
      player2.team[4].ability.func(player2);
      done();
    });
  });

  test('ability should set Supercharge to the attacking monster', () => {
    expect(player2.activeMonster.supercharged).toBeTruthy();
  });

  test('t-wrex\'s steel jaw should harm all monsters on the enemy team', () => {
    const {team} = player1;
    player2.activeMonster.attacks['steel_jaw'].func(player1);
    expect(team[1].hp).toBeLessThan(30);
    expect(team[2].hp).toBeLessThan(35);
    expect(team[4].hp).toBeLessThan(20);
  });
});
