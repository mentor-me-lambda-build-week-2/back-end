const express = require('express');
const registerDB = require('../database/helpers/registerDB');
const { generateToken } = require('../middleware/jwt');
const { registerConstraints } = require('../middleware');
const router = express.Router();

const bcrypt = require('bcryptjs');

/* 
  REGISTER API
*/

// add a new user
router.post('/', registerConstraints, async (req, res) => {
  const { USERNAME, CLEARPASSWORD, FIRSTNAME, LASTNAME, EMAIL, ISMENTOR } = req;
  try {
    // hash the password
    const HASH = await bcrypt.hash(CLEARPASSWORD, 14);
    const USER = {
      username: USERNAME,
      email: EMAIL,
      password: HASH,
      first_name: FIRSTNAME,
      last_name: LASTNAME,
      is_mentor: ISMENTOR,
    };
    try {
      const response = await registerDB.insert(USER);
      if (response) {
        // set JWT: generate the token
        const token = {};
        token.jwt = generateToken(USER);
        // attach the username, firstname, and id to the token
        token.username = USERNAME;
        token.firstname = FIRSTNAME;
        token.id = response.id[0];
        // attach token to the response
        res.status(201).send(token);
      } else {
        res.status(400).json({
          error: `Undetermined error adding user.`,
        });
      }
    } catch (err) {
      res.status(500).send(`${err}`);
    }
  } catch (err) {
    res.status(500).send(`${err}`);
  }
});

module.exports = router;
