import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { updateReminder, deleteReminder } from '../actions';

const formatDate = date => {
  // format date as string
  return moment(date).format("dddd, MMMM Do YYYY, h:mm A");
};

const ReminderItem = ({ reminder }) => {
  const dispatch = useDispatch();
  // store initial values
  const reminderText = reminder.text;
  // break stored date into date value
  const reminderDate = moment(reminder.due).format("YYYY-MM-DD");
  // break stored date into time value
  const reminderTime = moment(reminder.due).format("HH:mm");

  // initialize local state with reminder values
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(reminderText);
  const [date, setDate] = useState(reminderDate);
  const [time, setTime] = useState(reminderTime);

  const handleEdit = () => {
    setEdit(true);
  };

  const handleDelete = () => {
    // trigger reminder delete
    dispatch(deleteReminder(reminder._id));
  };

  const handleCancel = () => {
    // reset to initial values
    setText(reminderText);
    setDate(reminderDate);
    setTime(reminderTime);
    setEdit(false);
  };

  const handleSave = () => {
    const updated = {
      id: reminder._id,
      text,
      date,
      time
    };
    // trigger reminder updated
    dispatch(updateReminder(updated));
    setEdit(false);
  };

  return (
    <div>
      {
        // if item is in edit mode
        edit ? (
          // render inputs
          // set local state values upon each change
          <div>
            <input 
              type="text" 
              value={text} 
              onChange={e => setText(e.target.value)}
            />
            <input 
              type="date" 
              value={date} 
              onChange={e => setDate(e.target.value)}/>
            <input 
              type="time" 
              value={time} 
              onChange={e => setTime(e.target.value)}/>
            <button
              type="button"
              className="waves-effect waves-light btn-flat" 
              onClick={handleSave}
              disabled={!text || !date || !time}>
              <i className="material-icons">
                save
              </i>
            </button>
            <button
              type="button"
              className="waves-effect waves-light btn-flat" 
              onClick={handleCancel}
              disabled={!text || !date || !time}>
              <i className="material-icons">
                cancel
              </i>
            </button>
          </div>
        ) : (
          // if not in edit mode, display reminder data
          <div>
            <h5 className="title">{reminder.text}</h5>
            <p>{formatDate(reminder.due)}</p>
            <button
              type="button"
              className="waves-effect waves-light btn-flat" 
              onClick={handleEdit}>
              <i className="material-icons">
                edit
              </i>
            </button>
            <button
              type="button"
              className="waves-effect waves-light btn-flat" 
              onClick={handleDelete}>
              <i className="material-icons">
                delete_forever
              </i>
            </button>
          </div>
        )
      }
    </div>
  )
};

export default ReminderItem;
