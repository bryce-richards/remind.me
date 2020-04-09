import {  
  USER_SIGNED_UP, 
  USER_SIGNED_IN, 
  USER_SIGNED_OUT,
  ERROR_RECEIVED
} from '../actions/types';

const INITIAL_STATE = {
  token: '',
  error: '',
  firstName: ''
};

const auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_SIGNED_UP:
    case USER_SIGNED_IN:
      // update token with jwt, update user's name
      return { token: action.payload.token, error: '', firstName: action.payload.firstName };
    case USER_SIGNED_OUT:
      // clear out auth data
      return { token: action.payload, error: '', firstName: '' };
    case ERROR_RECEIVED:
      // update error
      return { ...state, error: action.payload};
    default:
      return state;
  }
};

export default auth;
