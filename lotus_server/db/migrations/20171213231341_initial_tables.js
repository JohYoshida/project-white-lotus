
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
      table.integer('user_id');
      table.string('name');
      table.integer('body_id');
      table.integer('arm_id');
      table.integer('head_id');
    }),
    knex.schema.createTable('teams_monster', (table) => {
      table.increments();
      table.integer('team_id');
      table.integer('monster_id');
    }),
    knex.schema.createTable('body', (table) => {
      table.increments();
      table.string('image_url');
      table.integer('hp');
      table.integer('current_hp');
      table.integer('type_id');
      table.string('creature');
    }),
    knex.schema.createTable('head', (table) => {
      table.increments();
      table.string('image_url');
      table.integer('attack_id');
      table.integer('ability_id');
      table.string('creature');
    }),
    knex.schema.createTable('arms', (table) => {
      table.increments();
      table.string('image_url');
      table.integer('attack_id');
      table.string('creature');
    }),
    knex.schema.createTable('types', (table) => {
      table.increments();
      table.string('name');
      table.integer('weak_against');
      table.integer('strong_against');
    }),
    knex.schema.createTable('abilities', (table) => {
      table.increments();
      table.string('name');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('users'),
    knex.schema.dropTableIfExists('monsters'),
    knex.schema.dropTableIfExists('teams_monster'),
    knex.schema.dropTableIfExists('body'),
    knex.schema.dropTableIfExists('head'),
    knex.schema.dropTableIfExists('arms'),
    knex.schema.dropTableIfExists('types'),
    knex.schema.dropTableIfExists('abilities'),
  ]);
};
