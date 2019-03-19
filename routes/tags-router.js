const express = require('express');
const tagsDB = require('../database/helpers/tagsDB.js');
const router = express.Router();

/* 
  TAGS API
*/

// get all tags
router.get('/', async (req, res) => {
  try {
    const tags = await tagsDB.get();
    if (tags.length === 0) {
      res.status(200).json({ message: 'There are currently no tags' });
    } else {
      res.status(200).json(tags);
    }
  } catch (err) {
    res.status(500).send(`${err}`);
  }
});

module.exports = router;
