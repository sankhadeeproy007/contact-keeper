const express = require('express');
const router = express.Router();

/**
|--------------------------------------------------
| RegisterUser
| @route POST api/users
| @desc Register a user
| @access Public
|--------------------------------------------------
*/

router.post('/', (req, res) => {
  res.send('Register');
});

module.exports = router;
