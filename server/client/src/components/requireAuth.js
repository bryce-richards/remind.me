import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';

export default ChildComponent => {
  const ComposedComponent = props => {
    const token = useSelector(state => state.auth.token);
    const history = useHistory();
    const shouldNavigateAway = () => {
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
