const mongoose = require('mongoose');
const { Schema } = mongoose;

const reminderSchema = new Schema({
  text: { type: String, required: true },
  dueDate: { type: Date, required: true },
  dateCreated: { type: Date, required: true },
  _user: { type: Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model('reminder', reminderSchema);