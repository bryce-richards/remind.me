import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ReminderItem from './ReminderItem';

const ReminderList = () => {
  const reminders = useSelector(state => state.reminders);
  const firstName = useSelector(state => state.auth.firstName);

  return (
    <div>
      {
        reminders.length ? (
          <div>
            <h4>
            { firstName ? `${firstName}'s Reminders` : '' }
            </h4>
            <ul className="collection">
              {reminders.map(reminder =>
                <li key={reminder._id} className="collection-item">
                  <ReminderItem reminder={reminder} />
                </li>
              )}
            </ul>
          </div>
        ) : (
          <div>
            <h4>Create your first reminder!</h4>
            <Link className="waves-effect waves-light btn" to="/reminders/new">New Reminder</Link>
          </div>
          
        )
      }
    </div>
    
    
  );
};

export default ReminderList;