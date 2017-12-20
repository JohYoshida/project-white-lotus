
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('users'),
    knex.schema.dropTableIfExists('monsters'),
    knex.schema.createTable('users', (table) => {
      table.string('id');
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
      table.string('image');
    })
  ]);
};

exports.down = function(knex, Promise) {
   return Promise.all([
    knex.schema.dropTableIfExists('users'),
    knex.schema.dropTableIfExists('monsters'),
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
    })

    ]);


};
