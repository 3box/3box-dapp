import React from 'react';
import { Link } from 'react-router-dom';
import ThreeBoxLogo from './ThreeBoxLogo';
import * as routes from '../utils/routes';

const NavLoggedOut = ({ handleSignInUp }) => (
  <nav id="landing__nav" className="hide">
    <div id="nav__logo--marginLeft">
      <ThreeBoxLogo />
      <Link to={routes.JOBS}>
        <h4 className="landing__nav__link">
          Jobs
        </h4>
      </Link>
    </div>
    <div id="actionButtons">
      <p onClick={handleSignInUp}>Create Profile</p>
      <button onClick={handleSignInUp} className="secondaryButton" type="button">
        Sign In
      </button>
    </div>
  </nav>
);

export default NavLoggedOut;
