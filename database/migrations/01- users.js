exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments();
    table
      .string('username', 20)
      .notNullable()
      .unique();
    table
      .string('email', 255)
      .notNullable()
      .unique();
    table.string('password', 255).notNullable();
    table.string('first_name', 100).notNullable();
    table.string('last_name', 100).notNullable();
    table.bool('to_notify'); // todo set up  Twilio
    table.bool('is_mentor'); // true if mentor, false if
    table.string('about_title', 255);
    table.string('about', 10000);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
