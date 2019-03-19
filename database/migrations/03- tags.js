exports.up = function(knex, Promise) {
  return knex.schema.createTable('tags', table => {
    table.increments();
    table
      .string('tag', 100)
      .notNullable()
      .unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('tags');
};
