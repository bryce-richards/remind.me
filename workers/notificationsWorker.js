const Reminder = require('../models/Reminder');

const notificationWorkerFactory = function() {
  return {
    // send notifications per logic in Reminder model
    run: function() {
      Reminder.sendNotifications();
    },
  };
};

module.exports = notificationWorkerFactory();