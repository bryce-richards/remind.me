import axios from 'axios';

import {
  USER_SIGNED_UP,
  USER_SIGNED_IN,
  USER_SIGNED_OUT,
  USER_REQUESTED,
  REMINDER_CREATED,
  REMINDER_DELETED,
  REMINDER_UPDATED,
  REMINDERS_REQUESTED,
  ERROR_RECEIVED
} from './types';

export const signUp = () => async dispatch => {
  const res = await axios.post('/signup');

  dispatch({ type: USER_SIGNED_UP, payload: res.data.token });
  localStorage.setItem('token', response.data.token);
};

export const signIn = () => async dispatch => {
  const res = await axios.post('/signin');

  dispatch({ type: USER_SIGNED_IN, payload: res.data });
};

export const signOut = () => {
  localStorage.removeItem('token');

  return {
    type: USER_SIGNED_OUT,
    payload: ''
  };
}

export const requestUser = () => async dispatch => {
  const res = await axios.get('/api/user');

  dispatch({ type: USER_REQUESTED, payload: res.data });
};

export const createReminder = () => async dispatch => {
  const res = await axios.post('/api/reminders');

  if (res.data.error) {
    dispatch({ type: ERROR_RECEIVED, payload: res.data.error });
  } else {
    dispatch({ type: REMINDER_CREATED, payload: res.data.reminder});
  }
};

export const deleteReminder = () => async dispatch => {

};

export const updateReminder = () => async dispatch => {

};

export const getReminders = () => async dispatch => {

};