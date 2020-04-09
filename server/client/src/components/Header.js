import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {
  const token = useSelector(state => state.auth.token);

  const renderLinks = () => {
    if (token) {
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
    } else {
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