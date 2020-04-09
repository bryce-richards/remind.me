const Reminder = require('../models/Reminder');
const moment = require('moment');

exports.getReminders = async function (req, res) {
  const id = req.user._id;
  const reminders = await Reminder.find(
    { _user: id }
  );

  res.send(reminders);
};

exports.createReminder = async function(req, res) {
  const { id, phone } = req.user;
  const { text, date, time } = req.body;

  const combined = new Date(date + " " + time);
  const newReminder = new Reminder({
    text,
    due: combined,
    phone,
    _user: id
  });
  console.log("combined: ", combined);
  const reminder = await newReminder.save();

  res.send(reminder);
};

exports.updateReminder = async function(req, res) {
  const userId = req.user;
  const reminderId = req.body.id;
  const { text, date, time } = req.body;
  console.log("time: ", time);
  console.log("date: ", date);
  const combined = new Date(date + " " + time);

  console.log("combined: ", combined);
  const updated = await Reminder.findOneAndUpdate(
    { _id: reminderId, _user: userId }, 
    { text, due: combined },
    { new: true }
  );

  res.send(updated);
};

exports.deleteReminder = async function(req, res) {
  const userId = req.user._id;
  const reminderId = req.query.id;

  const deleted = await Reminder.findOneAndDelete({
    _id: reminderId,
    _user: userId
  });

  res.send(deleted);
};