import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { getReminders, updateReminder, deleteReminder } from '../actions';

const formatDate = date => {
  return moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a")
};

const ReminderItem = ({ reminder }) => {
  const dispatch = useDispatch();
  const reminderText = reminder.text;
  const reminderDate = moment(reminder.due).format("YYYY-MM-DD");
  const reminderTime = moment(reminder.due).format("HH:mm");

  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(reminderText);
  const [date, setDate] = useState(reminderDate);
  const [time, setTime] = useState(reminderTime);

  const handleEdit = () => {
    setEdit(true);
  };

  const handleDelete = () => {
    dispatch(deleteReminder(reminder._id));
  };

  const handleCancel = () => {
    setText(reminderText);
    setDate(reminderDate);
    setTime(reminderTime);
    setEdit(false);
  };

  const handleSave = () => {
    setEdit(false);
    const updated = {
      id: reminder._id,
      text: text,
      date: date,
      time: time
    };
    dispatch(updateReminder(updated));
  };

  return (
    <div>
      {
        edit ? (
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
            <a className="waves-effect waves-light btn-flat" onClick={handleSave}>
              <i className="material-icons">
                save
              </i>
            </a>
            <a className="waves-effect waves-light btn-flat" onClick={handleCancel}>
              <i className="material-icons">
                cancel
              </i>
            </a>
          </div>
        ) : (
          <div>
            <h5 className="title">{reminder.text}</h5>
            <p>{formatDate(reminder.due)}</p>
            <a className="waves-effect waves-light btn-flat" onClick={handleEdit}>
              <i className="material-icons">
                edit
              </i>
            </a>
            <a className="waves-effect waves-light btn-flat" onClick={handleDelete}>
              <i className="material-icons">
                delete_forever
              </i>
            </a>
          </div>
        )
      }
    </div>
  )
};

export default ReminderItem;
