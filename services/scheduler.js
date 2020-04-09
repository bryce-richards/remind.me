const CronJob = require('cron').CronJob;
const notificationsWorker = require('../workers/notificationsWorker');

const schedulerFactory = () => {
  return {
    start: function() {
      // run job every minute
      new CronJob('00 * * * * *', () => {
        notificationsWorker.run();
      }, null, true, '');
    },
  };
};

module.exports = schedulerFactory();