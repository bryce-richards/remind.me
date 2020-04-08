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
      return _.sortBy(action.payload, ['due']);
    case REMINDER_CREATED:
      return _.sortBy(
        [ ...state, action.payload], 
      ['due']);
    case REMINDER_DELETED:
      return _.orderBy(
        _.filter(state, reminder => (
            reminder._id !== action.id
        )), 
      ['due']);
    case REMINDER_UPDATED:
      return _.sortBy(
        _.map(state, reminder => (
          reminder._id === action.id ?
          { ...reminder, ...action.payload } :
          reminder
        )),
      ['due']);
    default:
      return state;
  }
};

export default reminders;