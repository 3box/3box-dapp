import React from 'react';
import { Link } from 'react-router-dom';

import MailChimp from './MailChimp';
import ThreeBoxLogoWhite from '../assets/ThreeBoxLogoWhite.svg';
import GithubIconWhite from '../assets/GithubIconWhite.svg';
import Email from '../assets/EmailWhite.svg';
import Twitter from '../assets/twitterWhite.svg';
import Discord from '../assets/discordWhite.svg';
import * as routes from '../utils/routes';
import '../views/styles/Landing.css';
import './styles/Footer.css';

const Footer = ({ handleSignInUp, isLoggedIn }) => (
  <div className="footer">

    <div className="footer__tabs">
      <ul className="landing__developers__footer__links">
        <li className="landing__developers__footer__links__logoWrapper">
          <img className="landing__developers__footer__links__logo" src={ThreeBoxLogoWhite} alt="Three Box Logo" />
          <Link to={routes.PROFILES}>
            <h4 className="landing__nav__link--footer">
              Profiles
            </h4>
          </Link>
          <Link to={routes.JOBS}>
            <h4 className="landing__nav__link--footer">
              Jobs
            </h4>
          </Link>
        </li>
      </ul>

      <div id="footer__mailChimp">
        <MailChimp />
      </div>
    </div>


    <div className="footer__signIn">
      <h3 className="footer__signIn__tagline">Create your profile and sign into dapps.</h3>
      {!isLoggedIn
        && (
          <div className="landing__developers__footer__buttons">
            <Link to={routes.CREATE}>
              <p
                className="landing__developers__footer__buttons--signIn"
                type="button"
              >
                Create Profile
            </p>
            </Link>
            <button
              className="landing__developers__footer__buttons--createProfile"
              type="button"
              onClick={handleSignInUp}
            >
              Sign In
          </button>
          </div>)}
    </div>

    <div className="footer__gutter">

      <ul className="footer__gutter__info">
        <Link to={routes.LANDING}>
          <li>3Box 2018</li>
        </Link>

        <Link to={routes.TERMS}>
          <li>Terms</li>
        </Link>

        <Link to={routes.PRIVACY}>
          <li>Privacy</li>
        </Link>
      </ul>

      <ul className="footer__gutter__social">
        <a href="https://github.com/uport-project/3box" target="_blank" rel="noopener noreferrer">
          <img src={GithubIconWhite} className="footer__socialIcons" alt="Partners background" />
        </a>
        <a href="https://twitter.com/3boxdb" title="Twitter" target="_blank" rel="noopener noreferrer">
          <img src={Twitter} className="footer__socialIcons" alt="Github Icon" />
        </a>
        <a href="https://discordapp.com/channels/484729862368526356/485438421054128128" title="Discord" target="_blank" rel="noopener noreferrer">
          <img src={Discord} className="footer__socialIcons" alt="Discord Icon" />
        </a>
        <a href="mailto:community@3box.io" title="Email" target="_blank" rel="noopener noreferrer">
          <img src={Email} className="footer__socialIcons" alt="Email Icon" />
        </a>
      </ul>
    </div>

  </div>
);

export default Footer;