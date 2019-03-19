const express = require('express');
const usersDB = require('../database/helpers/usersDB');
const { loginConstraints } = require('../middleware');
const router = express.Router();

const bcrypt = require('bcryptjs');

/* 
  LOGIN API
*/

// login a user
router.post('/', loginConstraints, async (req, res) => {
  // req set in loginConstraints
  const { NAME, CLEARPASSWORD } = req;

  try {
    const USER = await usersDB.getByName(NAME);
    if (USER) {
      const VALID = await bcrypt.compare(CLEARPASSWORD, USER.password);
      if (VALID) {
        req.session.userid = USER.id;
        console.log('in login', req.session.userid);
        res.status(200).send(`Logged in`);
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
