import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { getReminders, editReminder, deleteReminder } from '../actions';

const formatDate = date => {
  return moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a")
};

const ReminderItem = ({ reminder }) => {
  const dispatch = useDispatch();
  const handleEdit = () => {

  };

  const handleDelete = () => {
    dispatch(deleteReminder(reminder._id));
  };

  return (
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
};

export default ReminderItem;
