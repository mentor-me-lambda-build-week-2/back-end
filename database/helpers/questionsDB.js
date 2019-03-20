const db = require('../dbConfig.js');

module.exports = {
  get: function(id) {
    if (id === undefined) {
      return db
        .select(
          'q.id',
          'q.title',
          'q.body',
          'q.created_at',
          'u.first_name',
          'u.last_name',
          'u.username',
        )
        .from('questions as q')
        .join('users as u', 'q.u_id', 'u.id');
    }
    if (id) {
      return db
        .select(
          'a.title',
          'a.body',
          'u.first_name',
          'u.last_name',
          'u.username',
        )
        .from('questions as q')
        .join('answers as a', 'a.q_id', 'q.id')
        .join('users as u', 'a.u_id', 'u.id')
        .where('q.id', id);
    }
    return query;
  },
  insert: function(question) {
    return db('questions')
      .insert(question)
      .returning('id')
      .then(id => ({ id }));
  },
  update: function(id, question) {
    return db('questions')
      .where('id', id)
      .update(question)
      .returning('id')
      .then(id => ({ id }));
  },
  remove: function(id) {
    return db('questions')
      .where('id', id)
      .del()
      .returning('id')
      .then(id => ({ id }));
  },
};
