const express = require('express');
const reminderController = require('../controllers/reminderController');

const router = express.Router();

router.post('/reminders', reminderController.createReminder);

router.get('/reminders', reminderController.getReminders);

router.delete('/reminders/', reminderController.deleteReminder);

router.put('/reminders/', reminderController.updateReminder);

module.exports = router;