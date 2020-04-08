import {  
  USER_SIGNED_UP, 
  USER_SIGNED_IN, 
  USER_SIGNED_OUT,
  USER_FETCHED,
  ERROR_RECEIVED
} from '../actions/types';

const INITIAL_STATE = {
  token: '',
  error: '',
  firstName: ''
};

const auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_FETCHED:
      return { ...state, firstName: action.payload }
    case USER_SIGNED_UP:
    case USER_SIGNED_IN:
      return { token: action.payload.token, error: '', firstName: action.payload.firstName };
    case USER_SIGNED_OUT:
      return { token: action.payload, error: '', firstName: '' };
    case ERROR_RECEIVED:
      return { ...state, error: action.payload};
    default:
      return state;
  }
};

export default auth;
