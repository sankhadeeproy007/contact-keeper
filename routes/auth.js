const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator/check');
const config = require('config');

const auth = require('../middleware/auth');
const User = require('../models/Users');

const router = express.Router();

/**
|--------------------------------------------------
| GetLoggedInUser
| @route GET api/auth
| @desc Get logged in user
| @access Private
|--------------------------------------------------
*/

router.get('/', auth, async (req, res) => {
  const { id } = req.user;

  try {
    const user = await User.findById(id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }

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

router.post(
  '/',
  [
    check('email', 'Email invalid').isEmail(),
    check('password', 'Please is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: `User doesn't exit` });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: 'Incorrect password' });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.send(500).json({ message: 'Server error' });
    }
  }
);

module.exports = router;
