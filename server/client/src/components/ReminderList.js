import React from 'react';
import { useSelector } from 'react-redux';
import ReminderItem from './ReminderItem';

const ReminderList = () => {
  const reminders = useSelector(state => state.reminders);
  return (
      <ul class="collection with-header">
        {reminders.map(reminder =>
          <ReminderItem key={reminder._id} reminder={reminder} />
        )}
      </ul>
  );
};

export default ReminderList;
