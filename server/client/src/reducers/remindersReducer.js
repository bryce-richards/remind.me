import _ from 'lodash';
import {
  REMINDERS_FETCHED,
  REMINDER_CREATED,
  REMINDER_DELETED,
  REMINDER_UPDATED
} from '../actions/types';

const INITIAL_STATE = [];

const reminders = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REMINDERS_FETCHED:
      // sort by due date
      return _.sortBy(action.payload, ['due']);
    case REMINDER_CREATED:
      // add new reminder and sort by due date
      return _.sortBy(
        [ ...state, action.payload], 
      ['due']);
    case REMINDER_DELETED:
      // remove deleted reminder and sort by due date
      return _.orderBy(
        _.filter(state, reminder => (
            reminder._id !== action.payload
        )), 
      ['due']);
    case REMINDER_UPDATED:
      // update reminder and sort by due date
      return _.sortBy(
        _.map(state, reminder => (
          reminder._id === action.payload._id ?
          action.payload :
          reminder
        )),
      ['due']);
    default:
      return state;
  }
};

export default reminders;