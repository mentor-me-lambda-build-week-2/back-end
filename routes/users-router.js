const express = require('express');
const usersDB = require('../database/helpers/usersDB.js');
const router = express.Router();

/* 
  USERS API
*/

// get all users
router.get('/', async (req, res) => {
  try {
    const users = await usersDB.get();
    if (users.length === 0) {
      res.status(200).json({ message: 'There are currently no users' });
    } else {
      res.status(200).json(users);
    }
  } catch (err) {
    res.status(500).send(`${err}`);
  }
});

module.exports = router;
