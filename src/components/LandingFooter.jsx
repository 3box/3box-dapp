import React from 'react';

import MailChimp from './MailChimp';
import ThreeBoxLogo from './ThreeBoxLogo.jsx';
import GithubIconWhite from '../assets/GithubIconWhite.svg';
import Email from '../assets/EmailWhite.svg';
import Twitter from '../assets/twitterWhite.svg';
import Discord from '../assets/discordWhite.svg';
import FooterGraphic from '../assets/Footer.svg';
import './styles/LandingFooter.css';

const LandingFooter = () => (
  <div id="landingFooter">
    <div id="mailChimp">
      <MailChimp />
    </div>

    <div id="footerLinks">
      <div id="scaleLogo">
        <ThreeBoxLogo />
      </div>
      <div id="socialLinks">
        <a href="https://github.com/uport-project/3box">
          <img src={GithubIconWhite} id="footer_socialIcons" alt="Partners background" />
        </a>
        <a href="https://twitter.com/3boxdb" title="Twitter">
          <img src={Twitter} id="footer_socialIcons" alt="Github Icon" />
        </a>
        <a href="https://discordapp.com/channels/484729862368526356/485438421054128128" title="Discord">
          <img src={Discord} id="footer_socialIcons" alt="Github Icon" />
        </a>
        <a href="https://discordapp.com/channels/484729862368526356/485438421054128128" title="Discord">
          <img src={Email} id="footer_socialIcons" alt="Github Icon" />
        </a>
      </div>
    </div>

    <div id="footer_info">
      <p>Terms</p>
      <p>Privacy</p>
    </div>

    <img src={FooterGraphic} id="footer_bg" alt="Partners background" />

  </div>
);

export default LandingFooter;
