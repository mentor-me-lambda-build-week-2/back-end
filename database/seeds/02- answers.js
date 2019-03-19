const faker = require('faker');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('answers')
    .delete()
    .then(function() {
      // Inserts seed entries
      return knex('answers').insert([
        {
          title: 'answering first post',
          body: 'With luck, this is the answer to the first post.',
          u_id: 1,
          q_id: 1,
        },
        {
          title: 'answering first post again?',
          body: 'What happens now?',
          u_id: 1,
          q_id: 1,
        },
        {
          title: 'answering second',
          body: `${faker.lorem.paragraphs(2)}`,
          u_id: 1,
          q_id: 2,
        },
      ]);
    });
};
