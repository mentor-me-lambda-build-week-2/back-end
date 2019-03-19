exports.up = function(knex, Promise) {
  return knex.schema.createTable('q_t', table => {
    table.increments();
    table
      .integer('t_id') // FK to tags
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('tags')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table
      .integer('q_id') // FK to questions
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('questions')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('q_t');
};
