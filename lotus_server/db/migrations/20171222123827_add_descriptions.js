
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('bodies'),
    knex.schema.dropTableIfExists('heads'),
    knex.schema.dropTableIfExists('arms'),
    knex.schema.dropTableIfExists('abilities'),
    knex.schema.dropTableIfExists('attacks'),
    knex.schema.createTable('bodies', (table) => {
      table.string('id');
      table.string('name');
      table.string('image_url');
      table.integer('hp');
      table.integer('accuracy_bonus');
      table.string('type_id').references('types');
      table.string('creature');
      table.string('nameword');
    }),
    knex.schema.createTable('heads', (table) => {
      table.string('id');
      table.string('name');
      table.string('image_url');
      table.string('attack_id').references('attacks');
      table.string('ability_id').references('abilities');
      table.string('creature');
      table.string('nameword');
    }),
    knex.schema.createTable('arms', (table) => {
      table.string('id');
      table.string('name');
      table.string('image_url');
      table.string('attack_id').references('attacks');
      table.string('creature');
      table.string('nameword');
    }),
    knex.schema.createTable('abilities', (table) => {
      table.string('id');
      table.string('name');
      table.string('description');
    }),
    knex.schema.createTable('attacks', (table) => {
      table.string('id');
      table.string('name');
      table.boolean('aoe');
      table.boolean('dot');
      table.string('description');
    })
  ]);

};

exports.down = function(knex, Promise) {
  return Promise.all([,
    knex.schema.dropTableIfExists('bodies'),
    knex.schema.dropTableIfExists('heads'),
    knex.schema.dropTableIfExists('arms'),
    knex.schema.dropTableIfExists('abilities'),
    knex.schema.dropTableIfExists('attacks'),
    knex.schema.createTable('bodies', (table) => {
      table.string('id');
      table.string('name');
      table.string('image_url');
      table.integer('hp');
      table.integer('accuracy_bonus');
      table.string('type_id').references('types');
      table.string('creature');
    }),
    knex.schema.createTable('heads', (table) => {
      table.string('id');
      table.string('name');
      table.string('image_url');
      table.string('attack_id').references('attacks');
      table.string('ability_id').references('abilities');
      table.string('creature');
    }),
    knex.schema.createTable('arms', (table) => {
      table.string('id');
      table.string('name');
      table.string('image_url');
      table.string('attack_id').references('attacks');
      table.string('creature');
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
