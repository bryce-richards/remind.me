import axios from 'axios';

import {
  USER_SIGNED_UP,
  USER_SIGNED_IN,
  USER_SIGNED_OUT,
  REMINDER_CREATED,
  REMINDER_DELETED,
  REMINDER_UPDATED,
  REMINDERS_FETCHED,
  ERROR_RECEIVED,
  CODE_SENT,
  CODE_VERIFIED
} from './types';

// NOTE: all jwt routes must include the authorization header with the stored token

const getToken = () => {
  // return locally stored token
  return localStorage.getItem('token');
};

// api call to sign up new user
// send new user data to auth reducer
export const signUp = ({ formProps, phone }, callback) => async dispatch => {
  try {
    const { firstName, email, password } = formProps;
    const res = await axios.post('/auth/signup', { firstName, email, password, phone });

    dispatch({ type: USER_SIGNED_UP, payload: res.data });
    localStorage.setItem('token', res.data.token);
    callback();
  } catch (err) {
    dispatch({ type: ERROR_RECEIVED, payload: 'User already exists'});
  }
};

// api call to sign in new user
// send user data to auth reducer
export const signIn = (formProps, callback) => async dispatch => {
  try {
    const res = await axios.post('/auth/signin', formProps);

    dispatch({ type: USER_SIGNED_IN, payload: res.data });
    localStorage.setItem('token', res.data.token);
    callback();
  } catch (err) {
    dispatch({ type: ERROR_RECEIVED, payload: 'Invalid login' });
  }
};

// remove locally stored token and trigger callback
// send empty payload to auth reducer
export const signOut = callback => {
  localStorage.removeItem('token');
  callback();

  return {
    type: USER_SIGNED_OUT,
    payload: ''
  };
};

export const requestCode = (phone, callback) => async dispatch => {
  try {
    const res = await axios.post('/verify/phone/new', { phone });

    dispatch({ type: CODE_SENT, payload: res.data });
    callback();
  } catch (err) {
    dispatch({ type: ERROR_RECEIVED, payload: '' });
  }
};

export const checkCode = ({ phone, code }, callback) => async dispatch => {
  try {
    const res = await axios.post('/verify/phone', { phone, code });

    dispatch({ type: CODE_VERIFIED, payload: res.data });
    callback();
  } catch (err) {
    dispatch({ type: ERROR_RECEIVED, payload: '' });
  }
};

// api call to fetch all reminders for current user
// send reminders to reminder reducer
export const getReminders = () => async dispatch => {
  try {
    const res = await axios.get('/api/reminders', {
      headers: { authorization: getToken() }
    });

    dispatch({ type: REMINDERS_FETCHED, payload: res.data });
  } catch (err) {
    dispatch({ type: ERROR_RECEIVED, payload: 'Could not fetch reminders' });
  }
};

// api call to fetch all reminders for current user
// send reminders to reminder reducer
export const createReminder = (formProps, callback) => async dispatch => {
  try {
    const res = await axios.post('/api/reminders', formProps, {
      headers: { authorization: getToken() }
    });

    dispatch({ type: REMINDER_CREATED, payload: res.data });
    callback();
  } catch (err) {
    dispatch({ type: ERROR_RECEIVED, payload: 'Could not create reminder' });
  }
};

// api call to update reminder
// send updated reminder to reminder reducer
export const updateReminder = reminder => async dispatch => {
  try {
    const res = await axios.put('/api/reminders', reminder, {
      headers: { authorization: getToken() }
    });

    dispatch({ type: REMINDER_UPDATED, payload: res.data });
  } catch (err) {
    dispatch({ type: ERROR_RECEIVED, payload: 'Could not update reminder' });
  }
};

// api call to delete reminder with given id
// send id to reminder reducer
export const deleteReminder = id => async dispatch => {
  try {
    const res = await axios.delete('/api/reminders', {
      params: { id: id },
      headers: { authorization: getToken() }
    });
    
    dispatch({ type: REMINDER_DELETED, payload: id });
  } catch (err) {
    dispatch({ type: ERROR_RECEIVED, payload: 'Could not delete reminder' });
  }
};