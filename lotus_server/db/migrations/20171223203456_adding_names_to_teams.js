
exports.up = function(knex) {
  return knex.schema.table('teams', table => {
    table.string('name');
  });
};

exports.down = function(knex) {
  return knex.schema.table('teams', table => {
    table.dropColumn('name');
  })
};
