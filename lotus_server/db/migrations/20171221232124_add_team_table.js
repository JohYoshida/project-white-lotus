
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('teams'),
    knex.schema.createTable('teams', (table) => {
      table.string('id');
      table.string('user_id').references('users');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('teams')
  ]);
};
