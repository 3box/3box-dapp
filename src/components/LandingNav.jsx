import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import './styles/Nav.css';
import ThreeBoxLogo from './ThreeBoxLogo';
import * as routes from '../utils/routes';

const LandingNav = ({ handleSignInUp, threeBox }) => {
  return (
    <nav id="landingNav">
      <ThreeBoxLogo />

      <div id="actionButtons">
        <p onClick={handleSignInUp}>Sign in</p>
        <button onClick={handleSignInUp} className="secondaryButton">Create profile</button>
      </div>
    </nav>
  );
};

LandingNav.propTypes = {
  threeBox: PropTypes.object,
};

LandingNav.defaultProps = {
  threeBox: {},
};

function mapState(state) {
  return {
    threeBox: state.threeBoxData.threeBoxObject,
  };
}

export default withRouter(connect(mapState)(LandingNav));

