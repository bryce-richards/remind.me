import React from 'react';
import requireAuth from './requireAuth';
import { useSelector } from 'react-redux';
import ReminderList from './ReminderList';

const Dashboard = () => {
  const firstName = useSelector(state => state.auth.firstName);

  return (
    <div>
      { firstName ? `${firstName}'s ` : 'Your ' }
      Reminders
    </div>
  );
};

export default requireAuth(Dashboard);
