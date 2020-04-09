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

// check if due date matches current time
reminderSchema.methods.requiresNotification = function(date) {
  const now = moment(date).format("dddd, MMMM Do YYYY, h:mm A");
  const due = moment(this.due).format("dddd, MMMM Do YYYY, h:mm A");
  return now === due;
};

reminderSchema.statics.sendNotifications = function(callback) {
  const searchDate = new Date();
  Reminder
    .find()
    .then(function(reminders) {
      reminders = reminders.filter(function(reminder) {
        return reminder.requiresNotification(searchDate);
      });

      if (reminders.length > 0) {
        sendNotifications(reminders);
      }
    });

    function sendNotifications(reminders) {
        const client = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
        reminders.forEach(function(reminder) {
            // Create options to send the message
            const options = {
                to: `+ ${reminder.phone}`,
                from: TWILIO_PHONE_NUMBER,
                body: `Your Reminder: ${reminder.text}`,
            };

            // Send the message!
            client.messages.create(options, function(err, response) {
                if (err) {
                    console.error(err);
                } else {
                    // Log the last few digits of a phone number
                    let masked = reminder.phone.substr(0,
                        reminder.phone.length - 5);
                    masked += '*****';
                    console.log(`Message sent to ${masked}`);
                }
            });
        });

        // Don't wait on success/failure, just indicate all messages have been
        // queued for delivery
        if (callback) {
          callback.call();
        }
    }
};

const Reminder = mongoose.model('reminder', reminderSchema);
module.exports = Reminder;