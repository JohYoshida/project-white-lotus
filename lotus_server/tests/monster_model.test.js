const get_creature = require('../models/monster_model');

test('The monster\'s name should be "Gojira".', done => {
  get_creature(1).then((creature) => {
    expect(creature.name).toBe("Gojira");
    done();
  });
});

test('The monster object should have the body\'s HP.', done => {
  get_creature(1).then((creature) => {
    expect(creature.body.hp).toBe(10);
    expect(creature.body.current_hp).toBe(10);
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
    expect(creature.body.current_hp).toBe(9);
    done();
  });
});

test('Current_hp lost should not be persistent.', done => {
  get_creature(1).then(creature => {
    expect(creature.body.current_hp).toBe(10);
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
    expect(mechaGojira.body.current_hp).toBe(9);
    done();
  });
});
