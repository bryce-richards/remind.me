import axios from 'axios';

import {
  USER_SIGNED_UP,
  USER_SIGNED_IN,
  USER_SIGNED_OUT,
  USER_FETCHED,
  REMINDER_CREATED,
  REMINDER_DELETED,
  REMINDER_UPDATED,
  REMINDERS_FETCHED,
  ERROR_RECEIVED
} from './types';

const getToken = () => {
  return localStorage.getItem('token');
};

export const getUser = () => async dispatch => {
  try {
    const res = await axios.get('/auth/user', {
      headers: { authorization: getToken() }
    });

    const { firstName } = res.data;

    dispatch({ type: USER_FETCHED, payload: firstName });
  } catch (err) {
    dispatch({ type: ERROR_RECEIVED, payload: 'User already exists'});
  }
};

export const signUp = (formProps, callback) => async dispatch => {
  try {
    const res = await axios.post('/auth/signup', formProps);

    dispatch({ type: USER_SIGNED_UP, payload: res.data });
    localStorage.setItem('token', res.data.token);
    callback();
  } catch (err) {
    dispatch({ type: ERROR_RECEIVED, payload: 'User already exists'});
  }
};

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

export const signOut = callback => {
  localStorage.removeItem('token');
  callback();

  return {
    type: USER_SIGNED_OUT,
    payload: ''
  };
};

export const getReminders = () => async dispatch => {
  
};

export const createReminder = (formProps, callback) => async dispatch => {
  try {

    const res = await axios.post('/api/reminders', formProps, {
      headers: { authorization: getToken() }
    });

    dispatch({ type: REMINDER_CREATED, payload: res.data });
    callback();
  } catch(err) {
    dispatch({ type: ERROR_RECEIVED, payload: '' });
  }
};

export const deleteReminder = () => async dispatch => {

};

export const updateReminder = (formProps, callback) => async dispatch => {

};