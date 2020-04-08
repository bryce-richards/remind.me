import {
  REMINDER_CREATED,
  REMINDER_DELETED,
  REMINDER_UPDATED,
  REMINDERS_REQUESTED 
} from '../actions/types';

const INITIAL_STATE = [];

const reminders = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REMINDER_CREATED:
      return [
        ...state,
        {
          id: action.id,
          completed: false,
          text: action.text,
          due: action.due
        }
      ];
    case REMINDER_DELETED:
      return state.filter(reminder =>
        reminder.id !== action.id
      );
    case REMINDER_UPDATED:
      return state.map(reminder =>
        reminder.id === action.id ?
          { ...reminder, text: action.text } :
          reminder
      );
    default:
      return state;
  }
};

export default reminders;