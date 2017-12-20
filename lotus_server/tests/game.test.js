const Game = require('../lib/generate_game');

let game = undefined;

const setUpGame = done => {
  Game.generateGame({id: '1', team:[1,2,3]}, {id: '2', team:[1,2,3]}).then(g => {
    g.players[0].turn = true;
    // Sets active player and idle player
    g.findActivePlayer();

    g.players[0].team['1'].bench = false;
    g.players[1].team['2'].bench = false;
    // Finds the active monster based on who is not on the bench
    g.players[0].findActiveMonster();
    g.players[1].findActiveMonster();

    game = g;
    done();
  });
};

beforeEach(setUpGame);

test('The game should take and execute an action', () => {
  expect(game.players[0].turn).toBe(true);
  game.takeAction({action: 'attack', name:'scratch', options: null});

  expect(game.players[0].turn).toBe(false);
  expect(game.players[1].activeMonster.hp).toBe(4);
});

test('The game should take and execute a passive action', () => {
  expect(game.players[0].turn).toBe(true);
  expect(game.players[1].turn).toBe(false);
  game.takeAction({action: 'passive'});
  expect(game.players[0].turn).toBe(true);
  expect(game.players[1].turn).toBe(false);
  expect(game.players[0].activeMonster.hp).toBe(11);
  expect(game.players[0].team['2'].passiveActive).toBe(false);
});

test('Game should kill monsters when hp is less than 0', () => {
  const player = game.players[0];
  player.activeMonster.takeDamage(50);
  player.checkForDeath();
  expect(player.team.aliveMonsters()).toBe(2);
});

test('Game should set a new active monster, if the current active dies', () => {
  const player = game.players[0];
  player.activeMonster.takeDamage(50);
  player.checkForDeath();
  expect(player.activeMonster.id).toBe(2);
});

test('Game should set state to game over if all monsters are dead', () => {
  const player = game.players[0];
  for(const monstId in player.team){
    player.team[monstId].takeDamage(50);
  }
  player.checkForDeath();
  game.findActivePlayer();
  console.log(game);
  expect(game.gameOver.winner.id).toBe('2');
});
