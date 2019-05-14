import React from 'react';

import Footer from './components/Footer';
import '../styles/Info.css';
import '../styles/Landing.css';

const NoMatch = () => (
  <div className="info NoMatchPage">

    <div className="info__page">
      <div className="info__banner--NoMatchPage">
        <h1>This page doesn't exist</h1>
      </div>
    </div>

    <Footer />
  </div>
);

export default NoMatch;
