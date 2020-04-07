import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signOut } from '../../actions';

const SignOut = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(signOut(() => {
      history.push('/');
    }));
  });

  return (
    <div>See you next time!</div>
  )
}

export default SignOut;
