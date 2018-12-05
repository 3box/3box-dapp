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
          <Link to={routes.JOBS}>
            <h4 className="landing__nav__link--footer">
              Jobs
          </h4>
          </Link>
        </li>
      </ul>

      <div id="footer__mailChimp">
        <p>Subscribe to our newsletter</p>
        <MailChimp />
      </div>
    </div>


    <div className="footer__signIn">
      <h3 className="footer__signIn__tagline">Create your profile and sign into dapps.</h3>
      {!isLoggedIn
        && (
          <div className="landing__developers__footer__buttons">
            <p
              className="landing__developers__footer__buttons--signIn"
              type="button"
              onClick={handleSignInUp}
            >Create Profile</p>
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
      </ul>
    </div>

  </div>
);

export default Footer;

// <div className="landing__developers__footer">
//   <ul className="landing__developers__footer__links">
//     <li className="landing__developers__footer__links__logoWrapper">
//       {/* <img className="landing__developers__footer__links__logo" src={ThreeBoxLogoWhite} alt="Three Box Logo" /> */}
//     </li>
//     {/*
//   <li className="landing__developers__footer__links__linkWrapper">
//     <p>
//       Jobs
//     </p>
//   </li> */}
//   </ul>
//   <div className="landing__developers__footer__buttons">
//     <p
//       className="landing__developers__footer__buttons--signIn"
//       type="button"
//       onClick={handleSignInUp}
//     >Sign In</p>
//     <button
//       className="landing__developers__footer__buttons--createProfile"
//       type="button"
//       onClick={handleSignInUp}
//     >Create Profile</button>
//   </div>
// </div>