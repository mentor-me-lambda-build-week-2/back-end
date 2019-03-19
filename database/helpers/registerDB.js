const db = require('../dbConfig.js');

module.exports = {
  insert: function(user) {
    return db('users')
      .insert(user)
      .returning('id')
      .then(id => ({ id }));
  },
};
