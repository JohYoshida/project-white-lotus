require('dotenv').config();
const dbconfig = require('../knexfile')[process.env.DB_ENV];
const knex = require('knex')(dbconfig);

const generatePlayer = require('../lib/generate_player');
const generateMonster = require('../lib/generate_monster');


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

describe('Simulate kaiju', () => {
  let monster = null;
  let opponentMonster = null;

  /**
   * Generates a test monster and an opponent monster (twrex)
   */
  beforeAll(done => {
    Promise.all([
      // Mind siphon is where simulate_kaiju is held
      knex('arms').where({name:'Mind Siphon'}),
      knex('bodies').where({name:'Blob'}),
      knex('heads').where({name: 'Blob Maw'}),
      // grabbing twrex for the id.
      knex('monsters').where({name: 'T-Wrex'})
    ]).then(parts => {
      const arm = parts[0][0];
      const body = parts[1][0];
      const head = parts[2][0];
      // just need the twrex's id
      const twrexId = parts[3][0].id;
      const monsterToAdd = {
        id: 'SimulateKaijuTestMonster',
        arm_id: arm.id,
        body_id: body.id,
        head_id: head.id,
        name: 'Test monster',
        user_id: 1,
        image: null
      };
      knex('monsters').insert(monsterToAdd, 'id').then(() => {
        // getting my test monster and twrex
        Promise.all([
          generateMonster('SimulateKaijuTestMonster'),
          generateMonster(twrexId)
        ]).then(monsters => {
          monster = monsters[0];
          opponentMonster = monsters[1];
          done();
        });
      });
    });
  });

  /**
   * Removes the test monster after all is said and done.
   */
  afterAll(done => {
    knex('monsters').where({name:'SimulateKaijuTestMonster'}).del().then(() => {
      done();
    });
  });

  test('Monster should exist', () => {
    expect(monster).toBeTruthy();
  });

  test('Opponent monster should exist', () => {
    expect(opponentMonster).toBeTruthy();
  });

  test('Monster should take the t-wrex\'s roar attack', () => {
    const player = {activeMonster: opponentMonster};
    monster.attacks['simulate_kaiju'].func(player);
    expect(monster.attacks['roar']).toBeTruthy();
  });
});
