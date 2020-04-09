const Reminder = require('../models/Reminder');
const moment = require('moment');

exports.getReminders = async function (req, res) {
  const id = req.user._id;
  // fetch all reminders for current user id
  const reminders = await Reminder.find(
    { _user: id }
  );

  res.send(reminders);
};

exports.createReminder = async function(req, res) {
  const { id, phone } = req.user;
  const { text, date, time } = req.body;
  // combine date and time
  const combined = new Date(date + " " + time);
  // create new Reminder
  const newReminder = new Reminder({
    text,
    due: combined,
    phone,
    _user: id
  });

  const reminder = await newReminder.save();

  // send back newly created Reminder
  res.send(reminder);
};

exports.updateReminder = async function(req, res) {
  const userId = req.user;
  const reminderId = req.body.id;
  const { text, date, time } = req.body;
  // combine date and time
  const combined = new Date(date + " " + time);
  // update Reminder
  const updated = await Reminder.findOneAndUpdate(
    { _id: reminderId, _user: userId }, 
    { text, due: combined },
    { new: true }
  );

  // return updated Reminder
  res.send(updated);
};

exports.deleteReminder = async function(req, res) {
  const userId = req.user._id;
  const reminderId = req.query.id;

  // delete Reminder
  const deleted = await Reminder.findOneAndDelete({
    _id: reminderId,
    _user: userId
  });
  
  res.send(deleted);
};