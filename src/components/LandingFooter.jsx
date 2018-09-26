import React from 'react';

import MailChimp from './MailChimp';
import ThreeBoxLogo from './ThreeBoxLogo.jsx';
import GithubIconWhite from '../assets/GithubIconWhite.svg';
import FooterGraphic from '../assets/Footer.svg';
import './styles/Footer.css';

const LandingFooter = () => (
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
    <img src={FooterGraphic} id="footer_bg" alt="Partners background" />

  </div>
);

export default LandingFooter;
