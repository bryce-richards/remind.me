import { combineReducers } from 'redux';
import auth from './authReducer';
import reminders from './remindersReducer';

const appReducer = combineReducers({
  auth,
  reminders
});

export default appReducer;