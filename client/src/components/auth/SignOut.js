import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signOut } from '../../actions';

const SignOut = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  // upon load, trigger sign out
  useEffect(() => {
    dispatch(signOut(() => {
      // if successful, navigate to landing page
      history.push('/');
    }));
  });

  return (
    <div>See you next time!</div>
  )
}

export default SignOut;
