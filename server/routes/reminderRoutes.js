const passport = require('passport');
const reminderController = require('../controllers/reminderController');
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = app => {
  app.post('/api/reminders', requireAuth, reminderController.createReminder);

  app.get('/api/reminders', requireAuth, reminderController.getReminders);

  app.delete('/api/reminders/:reminder_id', requireAuth, reminderController.deleteReminder);

  app.put('/api/reminders/:reminder_id', requireAuth, reminderController.updateReminder);
};