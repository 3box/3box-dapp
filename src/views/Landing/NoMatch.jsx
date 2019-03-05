import React from 'react';

import Footer from '../../components/Footer';
import '../styles/Info.css';
import '../styles/Landing.css';

const NoMatch = ({ isLoggedIn, handleSignInUp }) => (
  <div className="info NoMatchPage">

    <div className="info__page">
      <div className="info__banner--NoMatchPage">
        <h1>This page doesn't exist</h1>
      </div>
    </div>

    <Footer
      handleSignInUp={handleSignInUp}
      isLoggedIn={isLoggedIn}
    />

  </div>
);

export default NoMatch;
