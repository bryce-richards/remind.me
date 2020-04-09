import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';

// component wrapper to redirect to '/' if user is not authenticated
export default ChildComponent => {
  const ComposedComponent = props => {
    // check if token exists
    const token = useSelector(state => state.auth.token);
    const history = useHistory();

    const shouldNavigateAway = () => {
      // if no token, redirect
      if (!token) {
        history.push('/');
      }
    };

    useEffect(() => {
      shouldNavigateAway();
    });

    return(
      <ChildComponent {...props} />
    );
  }

  return withRouter(ComposedComponent);
};
