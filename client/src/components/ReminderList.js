import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ReminderItem from './ReminderItem';

const ReminderList = () => {
  // get reminders from state
  const reminders = useSelector(state => state.reminders);
  // get user's name from state
  const firstName = useSelector(state => state.auth.firstName);

  const remindersLink = <Link className="waves-effect waves-light btn" to="/reminders/new">New Reminder</Link>;
  return (
    <div>
      {
        // if user has reminders
        reminders.length ? (
          // render reminder collection
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
          // if not, prompt user to create first reminder
          <div>
            <h4>Create your first reminder!</h4>
            {remindersLink}
          </div>
          
        )
      }
    </div>
    
    
  );
};

export default ReminderList;