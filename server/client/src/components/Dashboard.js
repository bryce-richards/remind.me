import React, { useEffect } from 'react';
import requireAuth from './requireAuth';
import { useDispatch } from 'react-redux';
import ReminderList from './ReminderList';
import { getReminders } from '../actions';

const Dashboard = () => {
  // upon load, fetch reminders for current user
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getReminders());
  });

  return (
    <div style={{margin: "0 auto 0 auto", width: "70%"}}>
      <ReminderList />
    </div>
  );
};

export default requireAuth(Dashboard);
