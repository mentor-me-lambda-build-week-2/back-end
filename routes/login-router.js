const express = require('express');
const usersDB = require('../database/helpers/usersDB');
const { generateToken } = require('../middleware/jwt');
const { loginConstraints } = require('../middleware');
const router = express.Router();

const bcrypt = require('bcryptjs');

/* 
  LOGIN API
*/

// login a user
router.post('/', loginConstraints, async (req, res) => {
  // req set in loginConstraints
  const { USERNAME, CLEARPASSWORD } = req;

  try {
    const USER = await usersDB.getByUsername(USERNAME);
    if (USER) {
      const VALID = await bcrypt.compare(CLEARPASSWORD, USER.password);
      if (VALID) {
        // set JWT: generate the token
        const token = {};
        token.jwt = generateToken(USER);
        // attach the username, firstname, and id to the token
        token.username = USER.username;
        token.firstname = USER.first_name;
        token.id = USER.id;
        // attach token to the response
        res.status(201).send(token);
      } else {
        res.status(401).send(`Invalid Credentials`);
      }
    } else {
      // error with the user, but don't let the hackers know!
      // take the same amount of time as if legit checking
      await bcrypt.compare(
        CLEARPASSWORD,
        '$2a$14$plRslh.07bHu/BWHztxq9.20YIJluMBo9JhdIOCJOQjvAZHmbPV6a',
      );
      res.status(401).send(`Invalid Credentials`);
    }
  } catch (err) {
    res.status(500).send(`${err}`);
  }
});

module.exports = router;
