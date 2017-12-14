
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', (table) => {
      table.increments();
      table.string('email');
      table.string('password');
      table.integer('brouzoff');
    }),
    knex.schema.createTable('monsters', (table) => {
      table.increments();
      table.integer('user_id').references('users');
      table.string('name');
      table.integer('body_id').references('bodies');
      table.integer('arm_id').references('arms');
      table.integer('head_id').references('heads');
    }),
    knex.schema.createTable('teams_monster', (table) => {
      table.increments();
      table.integer('team_id').references('teams');
      table.integer('monster_id').references('monsters');
    }),
    knex.schema.createTable('bodies', (table) => {
      table.increments();
      table.string('image_url');
      table.integer('hp');
      table.integer('current_hp');
      table.integer('accuracy_bonus');
      table.integer('type_id').references('types');
      table.string('creature');
    }),
    knex.schema.createTable('heads', (table) => {
      table.increments();
      table.string('image_url');
      table.integer('attack_id').references('attacks');
      table.integer('ability_id').references('abilities');
      table.string('creature');
    }),
    knex.schema.createTable('arms', (table) => {
      table.increments();
      table.string('image_url');
      table.integer('attack_id').references('attacks');
      table.string('creature');
    }),
    knex.schema.createTable('types', (table) => {
      table.increments();
      table.string('name');
      table.integer('weakness');
    }),
    knex.schema.createTable('abilities', (table) => {
      table.increments();
      table.string('name');
    }),
    knex.schema.createTable('attacks', (table) => {
      table.increments();
      table.string('name');
      table.integer('type_id').references('types');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('users'),
    knex.schema.dropTableIfExists('monsters'),
    knex.schema.dropTableIfExists('teams_monster'),
    knex.schema.dropTableIfExists('bodies'),
    knex.schema.dropTableIfExists('heads'),
    knex.schema.dropTableIfExists('arms'),
    knex.schema.dropTableIfExists('types'),
    knex.schema.dropTableIfExists('abilities'),
    knex.schema.dropTableIfExists('attacks')
  ]);
};
