import {  
  USER_SIGNED_UP, 
  USER_SIGNED_IN, 
  USER_SIGNED_OUT, 
  USER_REQUESTED
} from '../actions/types';

const INITIAL_STATE = {
  token: '',
  error: ''
};

const auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_SIGNED_UP:
    case USER_SIGNED_IN:
    case USER_SIGNED_OUT:
      return { ...state, token: action.payload };
    case ERROR_RECEIVED:
      return { ...state, error: action.payload};
    default:
      return state;
  }
};

export default auth;
