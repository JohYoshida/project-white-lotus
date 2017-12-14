const get_creature = require('../models/monster_builder');

test('Creature\'s ability should return "Avoid"', done => {
  get_creature(2).then(creature => {
    expect(creature.ability()).toBe("Avoid!");
    done();
  });
});


test('Attack should reduce another monster\'s hp', done => {
  // this is a good way to set up battlefields.
  Promise.all([
    get_creature(1),
    get_creature(1)
  ]).then(creatures => {
    const gojira = creatures[0];
    const mechaGojira = creatures[1];
    gojira.attack(mechaGojira);
    expect(mechaGojira.body.hp).toBe(9);
    done();
  });
});

test('There should be three monsters in play.', done => {
  Promise.all([
    get_creature(1),
    get_creature(2),
    get_creature(3)
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
