exports.up = function(knex, Promise) {
  return knex.schema.createTable('answers', table => {
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
      .inTable('users');
    table
      .integer('q_id') // FK to questions
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('questions');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('answers');
};
