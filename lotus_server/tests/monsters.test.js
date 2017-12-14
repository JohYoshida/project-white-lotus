const gojira = require('../lib/monster_model');

test('The monster object should have the body\'s HP!', done => {
  gojira.then((prod) => {
    expect(prod.hp).toBe(10);
    expect(prod.current_hp).toBe(10);
    done();
  });
});
