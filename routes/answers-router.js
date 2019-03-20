const express = require('express');
const answersDB = require('../database/helpers/answersDB.js');
const { jwtRoute } = require('../middleware/jwt');
const { answerConstraints } = require('../middleware');
const router = express.Router();

/* 
  ANSWERS API
*/

// get all answers
router.get('/', jwtRoute, async (req, res) => {
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

// get answer by id
router.get('/:id', jwtRoute, async (req, res) => {
  const ID = req.params.id;

  try {
    const answer = await answersDB.get(ID);
    if (typeof answer === 'undefined') {
      res.status(400).json({ message: `There is no answer with id:${ID}` });
    } else {
      res.status(200).json(answer);
    }
  } catch (err) {
    res.status(500).send(`${err}`);
  }
});

// post an answer
router.post('/', jwtRoute, answerConstraints, async (req, res) => {
  const { TITLE, BODY, U_ID, Q_ID } = req;
  const ANSWER = { title: TITLE, body: BODY, u_id: U_ID, q_id: Q_ID };

  try {
    const response = await answersDB.insert(ANSWER);
    if (response) {
      res
        .status(201)
        .json({ message: `Answer with id:${response.id} has been added.` });
    } else {
      res.status(400).json({
        error: `Undetermined error adding answer.`,
      });
    }
  } catch (err) {
    res.status(500).send(`${err}`);
  }
});

// edit an answer
router.put('/:id', jwtRoute, answerConstraints, async (req, res) => {
  const A_ID = req.params.id;
  const { TITLE, BODY, U_ID, Q_ID } = req;
  const ANSWER = { title: TITLE, body: BODY, u_id: U_ID, q_id: Q_ID };

  // make sure we have the answer to update
  try {
    const answer = await answersDB.get(A_ID);
    if (typeof answer === 'undefined') {
      res.status(400).json({ message: `There is no answer with id:${A_ID}` });
    } else {
      // we do! try to update the answer
      try {
        const answer = await answersDB.update(A_ID, ANSWER);
        res
          .status(201)
          .json({ message: `Answer id:${A_ID} has been updated.` });
      } catch (err) {
        res.status(500).send(`${err}`);
      }
    }
  } catch (err) {
    res.status(500).send(`${err}`);
  }
});

// delete an answer
router.delete('/:id', jwtRoute, async (req, res) => {
  const Q_ID = req.params.id;

  // make sure we have the answer to delete
  try {
    const answer = await answersDB.get(Q_ID);
    if (typeof answer === 'undefined') {
      res.status(400).json({ message: `There is no answer with id:${Q_ID}` });
    } else {
      // we do! try to delete the answer
      try {
        const answer = await answersDB.remove(Q_ID);
        res
          .status(200)
          .json({ message: `Answer id:${Q_ID} has been deleted.` });
      } catch (err) {
        res.status(500).send(`${err}`);
      }
    }
  } catch (err) {
    res.status(500).send(`${err}`);
  }
});

module.exports = router;
