const db = require('../dbConfig.js');

module.exports = {
  get: function(id) {
    let query = db('questions').select();
    if (id) {
      return (
        db
          // .select(
          //   'q.title as question_title',
          //   'q.body as question_body',
          //   'a.title as answer_title',
          //   'a.body as answer_body',
          // )
          .select('a.title', 'a.body')
          .from('questions as q')
          .join('answers as a', 'a.q_id', 'q.id')
          .where('q.id', id)
      );
    }
    return query;
  },
};
