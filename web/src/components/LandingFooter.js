import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './styles/Footer.css';
import ThreeBoxLogo from './ThreeBoxLogo';
import FooterGraphic from '../assets/Footer.svg';
import PartnersBG from '../assets/PartnersBG.svg';

export function LandingFooter(props) {
  return (
    <div id="landingFooter">

      <ThreeBoxLogo />

      <ul id="footer_links">
        <Link to="/About">
          <li>About 3Box</li>
        </Link>
        <a href="https://github.com/uport-project/3box">
          <li>Github Docs</li>
        </a>
        <a href="https://mailchi.mp/c671ca2b8093/3box">
          <li>Join our community</li>
        </a>
      </ul>

      <img src={FooterGraphic} id="footer_bg" alt="Partners background" />
      
    </div>
  );
}

LandingFooter.propTypes = {
  web3: PropTypes.object,
};

LandingFooter.defaultProps = {
  web3: null,
};

export default LandingFooter;