
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('teams_monster'),
    knex.schema.createTable('teams_monsters', (table) => {
      table.string('id');
      table.string('team_id').references('teams');
      table.string('monster_id').references('monsters');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('teams_monsters'),
    knex.schema.createTable('teams_monster', (table) => {
      table.increments();
      table.integer('team_id').references('teams');
      table.integer('monster_id').references('monsters');
    })
  ]);
};
