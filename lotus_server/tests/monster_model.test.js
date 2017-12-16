const getCreature = require('../lib/generate_monster');

test('The monster\'s name should be "Gojira".', done => {
  getCreature(1).then((creature) => {
    expect(creature.name).toBe('Gojira');
    done();
  });
});

test('The monster\'s name should be "Rhino".', done => {
  getCreature(2).then((creature) => {
    expect(creature.name).toBe('Rhino');
    done();
  });
});

test('The monster object should have the body\'s HP.', done => {
  getCreature(1).then((creature) => {
    expect(creature.hp).toBe(10);
    done();
  });
});

test('The monster\'s type should be "fire"', done => {
  getCreature(1).then(creature => {
    expect(creature.type.name).toBe('fire')
    done();
  });
});
