import React, { useEffect } from 'react';
import requireAuth from './requireAuth';
import { useSelector, useDispatch } from 'react-redux';
import ReminderList from './ReminderList';
import { getUser } from '../actions';

const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  });

  const firstName = useSelector(state => state.auth.firstName);

  return (
    <div>
      <h3>
      { firstName ? `${firstName}'s Reminders` : '' }
      </h3>
      <ReminderList />
    </div>
  );
};

export default requireAuth(Dashboard);
