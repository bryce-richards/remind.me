const express = require('express');
const reminderController = require('../controllers/reminderController');

const router = express.Router();

// route to create a new reminder
router.post('/reminders', reminderController.createReminder);

// route to fetch all reminders for current user
router.get('/reminders', reminderController.getReminders);

// route to delete a given reminder
router.delete('/reminders/', reminderController.deleteReminder);

// route to update a given reminder
router.put('/reminders/', reminderController.updateReminder);

module.exports = router;