const express = require('express');
const questionsDB = require('../database/helpers/questionsDB.js');
const { questionConstraints } = require('../middleware');
const router = express.Router();

/* 
  QUESTIONS API
*/

// get all questions
router.get('/', async (req, res) => {
  try {
    const questions = await questionsDB.get();
    if (questions.length === 0) {
      res.status(200).json({ message: 'There are currently no questions' });
    } else {
      res.status(200).json(questions);
    }
  } catch (err) {
    res.status(500).send(`${err}`);
  }
});

// get question by id
router.get('/:id', async (req, res) => {
  const ID = req.params.id;

  try {
    const question = await questionsDB.get(ID);
    if (typeof question === 'undefined') {
      res.status(400).json({ message: `There is no question with id:${ID}` });
    } else {
      res.status(200).json(question);
    }
  } catch (err) {
    res.status(500).send(`${err}`);
  }
});

// post a question
router.post('/', questionConstraints, async (req, res) => {
  const { TITLE, BODY, U_ID } = req;

  const QUESTION = { title: TITLE, body: BODY, u_id: U_ID };

  try {
    const response = await questionsDB.insert(QUESTION);
    if (response) {
      res
        .status(200)
        .json({ message: `Question with id:${response.id} has been added.` });
    } else {
      res.status(400).json({
        error: `Undetermined error adding question.`,
      });
    }
  } catch (err) {
    res.status(500).send(`${err}`);
  }
});

module.exports = router;
