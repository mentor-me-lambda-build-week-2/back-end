const db = require('../dbConfig.js');

module.exports = {
  get: function(id) {
    let query = db('questions').select();
    if (id) {
      return db
        .select('a.title', 'a.body')
        .from('questions as q')
        .join('answers as a', 'a.q_id', 'q.id')
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
