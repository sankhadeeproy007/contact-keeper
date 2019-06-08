const express = require('express');
const router = express.Router();

/**
|--------------------------------------------------
| GetContacts
| @route GET api/contacts
| @desc Get all user's contacts
| @access Private
|--------------------------------------------------
*/

router.get('/', (req, res) => {
  res.send('Get contacts');
});

/**
|--------------------------------------------------
| AddContact
| @route POST api/contacts
| @desc Add a new contact
| @access Private
|--------------------------------------------------
*/

router.post('/', (req, res) => {
  res.send('Add a new contact');
});

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
