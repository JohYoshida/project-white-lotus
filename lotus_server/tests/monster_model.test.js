const getCreature = require('../lib/generate_monster');

test('The monster\'s name should be "Gojira".', done => {
  getCreature(1).then((creature) => {
    expect(creature.name).toBe('Blob');
    done();
  });
});

test('The monster\'s name should be "Rhino".', done => {
  getCreature(2).then((creature) => {
    expect(creature.name).toBe('T-Wrex');
    done();
  });
});

test('The monster object should have the body\'s HP.', done => {
  getCreature(1).then((creature) => {
    expect(creature.hp).toBe(30);
    done();
  });
});

test('The monster\'s type should be "absorb"', done => {
  getCreature(1).then(creature => {
    expect(creature.type.name).toBe('absorb')
    done();
  });
});
