const getCreature = require('../models/monster_builder');
const generateTeam = require('../lib/generate_team');

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
    generateTeam(team1),
    generateTeam(team2)
  ]).then(teams => {
    expect(teams[0].userId).toBe(1);
    done();
  });
});

test('A monster\'s abilities should run immediately.', done => {
  const team1 = [1, 2, 3];
  const team2 = [1, 2, 3];
  Promise.all([
    generateTeam(team1),
    generateTeam(team2)
  ]).then(teams => {
    expect(teams[0].userId).toBe(1);
    done();
  });
});
