exports.up = function(knex, Promise) {
  return knex.schema.createTable('questions', table => {
    table.increments();
    table
      .string('title')
      .notNullable()
      .unique();
    table.string('body', 10000).notNullable();
    table.timestamps(true, true);
    table
      .integer('u_id') // FK to users
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('questions');
};
