const get_creature = require('../models/monster_builder');

test('The monster\'s name should be "Gojira".', done => {
  get_creature(1).then((creature) => {
    expect(creature.name).toBe('Gojira');
    done();
  });
});

test('The monster\'s name should be "Rhino".', done => {
  get_creature(2).then((creature) => {
    expect(creature.name).toBe('Rhino');
    done();
  });
});

test('The monster object should have the body\'s HP.', done => {
  get_creature(1).then((creature) => {
    expect(creature.body.hp).toBe(10);
    expect(creature.body.hp).toBe(10);
    done();
  });
});

test('The monster should have a head_id of 1.', done => {
  get_creature(1).then((creature) => {
    expect(creature.head.id).toBe(1);
    done();
  });
});

test('The monster should have an arm_id of 1.', done => {
  get_creature(1).then((creature) => {
    expect(creature.arm.id).toBe(1);
    done();
  });
});

test('The monster\'s attack should return scratch.', done => {
  get_creature(1).then((creature) => {
    expect(creature.attack()).toBe("Scratch!");
    done();
  });
});

test('The monster\'s hp should be reduced when takeDamage is called.', done => {
  get_creature(1).then(creature => {
    creature.takeDamage();
    expect(creature.body.hp).toBe(9);
    done();
  });
});

test('The monster\'s type should be "fire"', done => {
  get_creature(1).then(creature => {
    expect(creature.type.name).toBe('fire')
    done();
  });
});
