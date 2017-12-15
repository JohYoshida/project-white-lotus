const getCreature = require('../models/monster_builder');
const generatePlayer = require('../lib/generate_player');

test('There should be three monsters in play.', done => {
  Promise.all([
    getCreature(1),
    getCreature(2),
    getCreature(3)
  ]).then(creatures => {
    const gojira = creatures[0];
    const rhino = creatures[1];
    const mechaGojira = creatures[2];
    expect(gojira.name).toBe("Gojira");
    expect(rhino.name).toBe("Rhino");
    expect(mechaGojira.name).toBe("Mecha Gojira");
    done();
  });
});

test('There should be two teams in play.', done => {
  const team1 = [1, 2, 3];
  const team2 = [1, 2, 3];
  Promise.all([
    generatePlayer(1, team1),
    generatePlayer(2, team2)
  ]).then(players => {
    expect(players[0].team.length).toBe(3);
    expect(players[1].team.length).toBe(3);
    done();
  });
});
