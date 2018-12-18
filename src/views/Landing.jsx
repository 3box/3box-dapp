import React, { Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import LandingBody from '../components/LandingBody';
// import Footer from '../components/Footer';
import './styles/Landing.css';
import '../components/styles/Nav.css';

const Footer = lazy(() => import('../components/Footer'));

const Landing = ({ isLoggedIn, handleSignInUp, }) => (
  <div id="landing">

    <LandingBody
      isLoggedIn={isLoggedIn}
      handleSignInUp={handleSignInUp}
    />

    <Suspense fallback={<div>Loading...</div>}>
      <Footer
        handleSignInUp={handleSignInUp}
        isLoggedIn={isLoggedIn}
      />
    </Suspense>
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
