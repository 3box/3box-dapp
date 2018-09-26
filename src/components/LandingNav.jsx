import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import './styles/Nav.css';
import ThreeBoxLogo from './ThreeBoxLogo.jsx';

const LandingNav = ({ handleSignInUp, classHide }) => (
  <nav id="landingNav" className={classHide}>
    <ThreeBoxLogo />

    <div id="actionButtons">
      <p onClick={handleSignInUp}>Sign in</p>
      <button onClick={handleSignInUp} className="secondaryButton" type="button">
        Create profile
      </button>
    </div>
  </nav>
);

LandingNav.propTypes = {
  handleSignInUp: PropTypes.func,
  classHide: PropTypes.string,
};

LandingNav.defaultProps = {
  handleSignInUp: {},
  classHide: '',
};

export default withRouter(LandingNav);

