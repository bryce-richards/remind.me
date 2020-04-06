import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

import App from './components/App';
import Landing from './components/Landing';
import SignUp from './components/auth/SignUp';
import SignOut from './components/auth/SignOut';
import SignIn from './components/SignIn';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// store = {
//   auth: {},
//   reminders: [],
//   form: {}
// }

const store = createStore(
  reducers,
  {
    auth: {
      token: localStorage.getItem('token')
    }
  },
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Route path="/" exact component={Landing} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signout" component={SignOut} />
        <Route path="/signin" component={SignIn} />
        <Route path="/dashboard" component={Dashboard} />
      </App>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root')
);