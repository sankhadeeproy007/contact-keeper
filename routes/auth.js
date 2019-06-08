const express = require('express');
const router = express.Router();

/**
|--------------------------------------------------
| GetLoggedInUser
| @route GET api/auth
| @desc Get logged in user
| @access Private
|--------------------------------------------------
*/

router.post('/', (req, res) => {
  res.send('Get logged in user');
});

/**
|--------------------------------------------------
| Login
| @route POST api/auth
| @desc Auth user and get token
| @access Public
|--------------------------------------------------
*/

router.post('/', (req, res) => {
  res.send('Log in user');
});

module.exports = router;
