import React from 'react';
import { Link } from 'react-router-dom';

import MailChimp from './MailChimp';
import ThreeBoxLogoWhite from './ThreeBoxLogoWhite.jsx';
import * as routes from '../utils/routes';
import GithubIconWhite from '../assets/GithubIconWhite.svg';
import Email from '../assets/EmailWhite.svg';
import Twitter from '../assets/twitterWhite.svg';
import Discord from '../assets/discordWhite.svg';
import FooterGraphic from '../assets/Footer.svg';
import '../views/styles/Landing.css';

const LandingFooter = () => (
  <div id="landing__footer">
    <div id="landing__mailChimp">
      <MailChimp />
    </div>

    <div id="footer__links">
      <div id="footer__scaleLogo">
        <ThreeBoxLogoWhite />
      </div>
      <div id="footer__socialLinks">
        <a href="https://github.com/uport-project/3box">
          <img src={GithubIconWhite} className="footer__socialIcons" alt="Partners background" />
        </a>
        <a href="https://twitter.com/3boxdb" title="Twitter">
          <img src={Twitter} className="footer__socialIcons" alt="Github Icon" />
        </a>
        <a href="https://discordapp.com/channels/484729862368526356/485438421054128128" title="Discord">
          <img src={Discord} className="footer__socialIcons" alt="Github Icon" />
        </a>
        <a href="https://discordapp.com/channels/484729862368526356/485438421054128128" title="Discord">
          <img src={Email} className="footer__socialIcons" alt="Github Icon" />
        </a>
      </div>
    </div>

    <div id="footer__info">
      <Link to={routes.TERMS}>
        <p>Terms</p>
      </Link>
      <Link to={routes.PRIVACY}>
        <p>Privacy</p>
      </Link>
    </div>

    <img src={FooterGraphic} id="footer__bg" alt="Partners background" />

  </div>
);

export default LandingFooter;
