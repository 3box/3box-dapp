import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import MailChimp from './MailChimp';
import './styles/Footer.css';
import ThreeBoxLogo from './ThreeBoxLogo';
import GithubIconWhite from '../assets/GithubIconWhite.svg';
import FooterGraphic from '../assets/Footer.svg';
import PartnersBG from '../assets/PartnersBG.svg';

export function LandingFooter(props) {
  return (
    <div>
      <div id="landingFooter">

        <ThreeBoxLogo />

        <ul id="footer_links">
          <li>
            <a href="https://github.com/uport-project/3box">
              <img src={GithubIconWhite} id="footer_github" alt="Partners background" />
              Github Docs
            </a>
          </li>
          <li id="mailChimp">
            <p>Join our community</p>
            <MailChimp />
          </li>
        </ul>
      </div>

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