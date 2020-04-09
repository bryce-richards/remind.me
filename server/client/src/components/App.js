import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SignUp from './auth/SignUp';
import SignIn from './auth/SignIn';
import SignOut from './auth/SignOut';
import ReminderForm from './ReminderForm';
import { getUser } from '../actions';

// upon load, fetch current user
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  });

  return (
    <div>
      <BrowserRouter>
        <nav>
          <Header />
        </nav>
        <main className="container" style={{marginTop: "24px"}}>
          <Route exact path="/" component={Landing} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signout" component={SignOut} />
          <Route exact path="/reminders/new" component={ReminderForm} />
        </main>
      </BrowserRouter>
    </div>
  )
};

export default App;