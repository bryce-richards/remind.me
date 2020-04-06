const requireLogin = require('../middlewares/requireLogin');
const reminderController = require('../controllers/reminderController');

module.exports = app => {
  app.post('/api/reminders', requireLogin, reminderController.createReminder);

  app.get('/api/reminders', requireLogin, reminderController.getReminders);

  app.delete('/api/reminders/:reminder_id', requireLogin, reminderController.deleteReminder);

  app.put('/api/reminders/:reminder_id', requireLogin, reminderController.updateReminder);
};