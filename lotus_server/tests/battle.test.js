const get_creature = require('../models/monster_model');

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
