import { combineReducers } from 'redux';
import auth from './authReducer';
import reminders from './remindersReducer';
import { reducer as form } from 'redux-form';

const appReducer = combineReducers({
  auth,
  reminders,
  form
});

export default appReducer;