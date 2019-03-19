const express = require('express');
const answersDB = require('../database/helpers/answersDB.js');
const router = express.Router();

/* 
  ANSWERS API
*/

// get all answers
router.get('/', async (req, res) => {
  try {
    const answers = await answersDB.get();
    if (answers.length === 0) {
      res.status(200).json({ message: 'There are currently no answers' });
    } else {
      res.status(200).json(answers);
    }
  } catch (err) {
    res.status(500).send(`${err}`);
  }
});

module.exports = router;
