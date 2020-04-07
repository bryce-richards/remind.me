import React from 'react';
import requireAuth from './requireAuth';

const Dashboard = () => {
  return (
    <div>
      <h1>Remind.me</h1>
      Your reminders
    </div>
  );
};

export default requireAuth(Dashboard);
