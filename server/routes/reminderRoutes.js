const express = require('express');
const reminderController = require('../controllers/reminderController');

const router = express.Router();

router.post('/reminders', reminderController.createReminder);

router.get('/reminders', reminderController.getReminders);

router.delete('/reminders/:reminder_id', reminderController.deleteReminder);

router.put('/reminders/:reminder_id', reminderController.updateReminder);

module.exports = router;