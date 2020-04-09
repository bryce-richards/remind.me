const mongoose = require('mongoose');
const { Schema } = mongoose;
const Twilio = require('twilio');
const moment = require('moment');

const TWILIO_ACCOUNT_SID = process.env.twilioAccountSID;
const TWILIO_AUTH_TOKEN = process.env.twilioAuthToken;
const TWILIO_PHONE_NUMBER = process.env.twilioPhoneNumber;

const reminderSchema = new Schema({
  text: { type: String, required: true },
  due: { type: Date, required: true },
  phone: String,
  _user: { type: Schema.Types.ObjectId, ref: 'User' }
});

// check if due datetime matches current datetime
reminderSchema.methods.requiresNotification = function(date) {
  const now = moment(date).format("dddd, MMMM Do YYYY, h:mm A");
  const due = moment(this.due).format("dddd, MMMM Do YYYY, h:mm A");
  return now === due;
};

// method run by cron job to check if reminder is due
reminderSchema.statics.sendNotifications = function(callback) {
  const searchDate = new Date();
  Reminder
    .find()
    .then(function(reminders) {
      reminders = reminders.filter(function(reminder) {
        return reminder.requiresNotification(searchDate);
      });
      // if reminder is due, send notifications
      if (reminders.length > 0) {
        sendNotifications(reminders);
      }
    });

    function sendNotifications(reminders) {
        const client = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
        reminders.forEach(function(reminder) {
          const { phone, text } = reminder;
          // generate message data
          const options = {
            to: `+ ${phone}`,
            from: TWILIO_PHONE_NUMBER,
            body: `${text}`,
          };

          // send sms message
          client.messages.create(options, function(err, res) {
              if (err) {
                  console.error(err);
              } else {
                  // log last 4 digits of phone number
                  const masked = '******' + phone.substr(phone.length - 4);
                  console.log(`Message sent to ${masked}`);
              }
          });
        });

        // all messages have been queued for delivery
        if (callback) {
          callback.call();
        }
    }
};

const Reminder = mongoose.model('reminder', reminderSchema);
module.exports = Reminder;