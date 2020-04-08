import React from 'react';
import moment from 'moment';

const formatDate = date => {
  return moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a")
};

const ReminderItem = ({ reminder }) => (
  <li className="collection-item">
    <span class="title">{reminder.text}</span>
    <p>{formatDate(reminder.due)}</p>
    <a href="#" className="secondary-content">
      <i className="material-icons">
        edit
      </i>
    </a>
    <a href="#" className="secondary-content">
      <i className="material-icons">
        delete_forever
      </i>
    </a>
  </li>
);

export default ReminderItem;
