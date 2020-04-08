import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReminderItem from './ReminderItem';
import { getReminders } from '../actions';

const ReminderList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getReminders());
  });

  const reminders = useSelector(state => state.reminders);
  return (
    <ul className="collection">
      {reminders.map(reminder =>
        <li key={reminder._id} className="collection-item">
          <ReminderItem reminder={reminder} />
        </li>
      )}
    </ul>
  );
};

export default ReminderList;