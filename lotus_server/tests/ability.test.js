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
