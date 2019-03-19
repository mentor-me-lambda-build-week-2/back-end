const db = require('../dbConfig.js');

module.exports = {
  get: function(id) {
    let query = db('answers').select();
    if (id) {
      query.where('id', id).first();
    }
    return query;
  },
  insert: function(answer) {
    return db('answers')
      .insert(answer)
      .returning('id')
      .then(id => ({ id }));
  },
  update: function(id, answer) {
    return db('answers')
      .where('id', id)
      .update(answer)
      .returning('id')
      .then(id => ({ id }));
  },
  remove: function(id) {
    return db('answers')
      .where('id', id)
      .del()
      .returning('id')
      .then(id => ({ id }));
  },
};
