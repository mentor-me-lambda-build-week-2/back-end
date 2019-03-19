const faker = require('faker');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('questions')
    .delete()
    .then(function() {
      // Inserts seed entries
      return knex('questions').insert([
        {
          title: 'First Post!!!',
          body: `${faker.lorem.paragraphs(3)}`,
          u_id: 1,
        },
        {
          title: 'second',
          body: `${faker.lorem.paragraphs(2)}`,
          u_id: 1,
        },
        {
          title: 'hasta la vista',
          body: `${faker.lorem.paragraphs(1)}`,
          u_id: 1,
        },
      ]);
    });
};
