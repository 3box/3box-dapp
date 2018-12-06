import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Footer from '../components/Footer';
import LandingBody from '../components/LandingBody';
import './styles/Landing.css';
import '../components/styles/ProfileCard.css';
import '../components/styles/Nav.css';

const Landing = ({ isLoggedIn, handleSignInUp, }) => (
  <div id="landing">

    <LandingBody
      isLoggedIn={isLoggedIn}
      handleSignInUp={handleSignInUp}
    />

    <Footer
      handleSignInUp={handleSignInUp}
      isLoggedIn={isLoggedIn}
    />
  </div>
);

Landing.propTypes = {
  handleSignInUp: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool,
};

Landing.defaultProps = {
  isLoggedIn: false,
};

const mapState = state => ({
  isLoggedIn: state.threeBox.isLoggedIn,
});

export default withRouter(connect(mapState)(Landing));
