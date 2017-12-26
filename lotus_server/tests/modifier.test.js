const generatePlayer = require('../lib/generate_player');
const {Modifier} = require('../lib/Modifier.js');

let player = undefined;

beforeAll(done => {
  generatePlayer('1', ['1', '2', '3']).then(pl => {
    pl.team[1].bench = false;
    pl.findActiveMonster();

    // An attack happens, in the attack block, this code runs
    new Modifier(pl.activeMonster, {maxHp: -2}, (modifier) => {
      modifier.turnCount ? modifier.turnCount++ : modifier.turnCount = 1;
      // remove condition
      if(modifier.turnCount === 3) modifier.removeModifier();
    });

    player = pl;
    done();
  });
});

test('The modifier should lower the target monster\'s maxHp', () => {
  expect(player.activeMonster.maxHp).toBe(28);
});

test('The modifier should update a count the each time it\'s update function is called.', () => {
  const game = {};
  game.players = [player];
  // For each player, in the game run the any modifier functions.
  for(const player of game.players){
    for(const memberId in player.team){
      const teamMember = player.team[memberId];
      teamMember.modifiers.forEach(modifier => modifier.update());
    }
  }
  let turnCount = null;
  player.activeMonster.modifiers.forEach(modifier => turnCount = modifier.turnCount);
  expect(turnCount).toBe(1);
});

test('The modifier should remove itself once it\'s remove condition is met.', () => {
  const game = {};
  game.players = [player];
  // Just loop over the turn switch until the count condition is reached
  while(player.activeMonster.modifiers.length() > 0){
    for(const player of game.players){
      for(const memberId in player.team){
        const teamMember = player.team[memberId];
        teamMember.modifiers.forEach(modifier => modifier.update());
      }
    }
  }
  expect(player.activeMonster.modifiers.length()).toBe(0);
  expect(player.activeMonster.maxHp).toBe(30);
});
