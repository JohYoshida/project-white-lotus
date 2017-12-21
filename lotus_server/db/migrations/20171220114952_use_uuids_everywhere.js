
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('monsters'),
    knex.schema.dropTableIfExists('teams_monster'),
    knex.schema.dropTableIfExists('bodies'),
    knex.schema.dropTableIfExists('heads'),
    knex.schema.dropTableIfExists('arms'),
    knex.schema.dropTableIfExists('types'),
    knex.schema.dropTableIfExists('abilities'),
    knex.schema.dropTableIfExists('attacks'),
    knex.schema.createTable('monsters', (table) => {
      table.string('id');
      table.string('user_id').references('users');
      table.string('name');
      table.string('body_id').references('bodies');
      table.string('arm_id').references('arms');
      table.string('head_id').references('heads');
      table.string('image');
    }),
    knex.schema.createTable('teams_monster', (table) => {
      table.string('id');
      table.string('team_id').references('teams');
      table.string('monster_id').references('monsters');
    }),
    knex.schema.createTable('bodies', (table) => {
      table.string('id');
      table.string('image_url');
      table.integer('hp');
      table.integer('accuracy_bonus');
      table.string('type_id').references('types');
      table.string('creature');
    }),
    knex.schema.createTable('heads', (table) => {
      table.string('id');
      table.string('image_url');
      table.string('attack_id').references('attacks');
      table.string('ability_id').references('abilities');
      table.string('creature');
    }),
    knex.schema.createTable('arms', (table) => {
      table.string('id');
      table.string('image_url');
      table.string('attack_id').references('attacks');
      table.string('creature');
    }),
    knex.schema.createTable('types', (table) => {
      table.string('id');
      table.string('name');
      table.string('weakness');
    }),
    knex.schema.createTable('abilities', (table) => {
      table.string('id');
      table.string('name');
    }),
    knex.schema.createTable('attacks', (table) => {
      table.string('id');
      table.string('name');
      table.boolean('aoe');
      table.boolean('dot');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('monsters'),
    knex.schema.dropTableIfExists('teams_monster'),
    knex.schema.dropTableIfExists('bodies'),
    knex.schema.dropTableIfExists('heads'),
    knex.schema.dropTableIfExists('arms'),
    knex.schema.dropTableIfExists('types'),
    knex.schema.dropTableIfExists('abilities'),
    knex.schema.dropTableIfExists('attacks'),
    knex.schema.createTable('monsters', (table) => {
      table.increments();
      table.integer('user_id').references('users');
      table.string('name');
      table.integer('body_id').references('bodies');
      table.integer('arm_id').references('arms');
      table.integer('head_id').references('heads');
      table.string('image');
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
      table.boolean('aoe');
      table.boolean('dot');
    })
  ]);
};
