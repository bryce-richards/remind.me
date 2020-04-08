const Reminder = require('../models/Reminder');
const moment = require('moment');

exports.createReminder = async (req, res) => {
  console.log("req: ", req);
  const { id, phone } = req.user;
  const { text, date } = req.body;

  const due = moment(date).utc();
  const newReminder = new Reminder({
    text,
    due,
    phone,
    _user: id
  });
  
  const reminder = newReminder.save();

  res.send(reminder);
};

exports.deleteReminder = async (req, res) => {
  const { id } = req.user;
  const { _id } = req.body;

  const deleted = await Reminder.deleteOne({
    _id,
    _user: id
  });

  res.send({ deleted });
};

exports.updateReminder = async (req, res) => {
  const { id } = req.user;
  const { _id, text, date } = req.body;

  const due = moment(date).utc();

  const updated = await Reminder.updateOne(
    {
      _id,
      _user: id
    }, {
      text,
      due
    }
  );

  res.send(updated);
};

exports.getReminders = async (req, res) => {
  const { id } = req.user;
  const reminders = await Reminder.find(
    { _user: id }
  );

  res.send(reminders);
};