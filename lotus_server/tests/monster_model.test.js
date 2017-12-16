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
    expect(creature.body.hp).toBe(10);
    expect(creature.body.hp).toBe(10);
    done();
  });
});

test('The monster should have a head_id of 1.', done => {
  getCreature(1).then((creature) => {
    expect(creature.head.id).toBe(1);
    done();
  });
});

test('The monster should have an arm_id of 1.', done => {
  getCreature(1).then((creature) => {
    expect(creature.arm.id).toBe(1);
    done();
  });
});

test('The monster\'s type should be "fire"', done => {
  getCreature(1).then(creature => {
    expect(creature.type.name).toBe('fire')
    done();
  });
});
