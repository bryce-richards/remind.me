import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {
  // check if token exists
  const token = useSelector(state => state.auth.token);

  const renderLinks = () => {
    // if user is authorized
    if (token) {
      // render 'new reminder' and 'sign out' links
      return (
        <div>
          <li>
            <Link to="/reminders/new">New Reminder</Link>
          </li>
          <li>
            <Link to="/signout">Sign Out</Link>
          </li>
        </div>
      )
    // if user is not authorized
    } else {
      // render 'sign up' and 'sign in' links
      return (
        <div>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/signin">Sign In</Link>
          </li>
        </div>
      )
    }
  }

  return (
    <div className="navbar-fixed">
      <nav>
        <div className="nav-wrapper">
          <Link 
            className="brand-logo left" 
            style={{marginLeft: "24px"}}
            to={token ? '/dashboard' : '/'}
          >
            Remind.me
          </Link>
          <ul
            className="right"
            style={{marginRight: "24px"}}>
            {renderLinks()}
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Header;