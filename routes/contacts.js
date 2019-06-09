const express = require('express');
const { check, validationResult } = require('express-validator/check');

const auth = require('../middleware/auth');
const Contact = require('../models/Contact');
const User = require('../models/User');

const router = express.Router();

/**
|--------------------------------------------------
| GetContacts
| @route GET api/contacts
| @desc Get all user's contacts
| @access Private
|--------------------------------------------------
*/

router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(contacts);
  } catch (error) {
    console.error(error.message);
    req.send(500).json({ message: 'Server error' });
  }
});

/**
|--------------------------------------------------
| AddContact
| @route POST api/contacts
| @desc Add a new contact
| @access Private
|--------------------------------------------------
*/

router.post(
  '/',
  [
    auth,
    check('name', 'name is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id
      });

      const contact = await newContact.save();

      res.json(contact);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

/**
|--------------------------------------------------
| UpdateContact
| @route PUT api/contacts
| @desc Update contact
| @access Private
|--------------------------------------------------
*/

router.put('/:id', (req, res) => {
  res.send('Update contact');
});

/**
|--------------------------------------------------
| DeleteContact
| @route DELETE api/contacts
| @desc Delete contact
| @access Private
|--------------------------------------------------
*/

router.delete('/:id', (req, res) => {
  res.send('Delete contact');
});

module.exports = router;
