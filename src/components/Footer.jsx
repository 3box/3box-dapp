import React from 'react';
import { Link } from 'react-router-dom';

import ThreeBoxLogoWhite from '../assets/ThreeBoxLogoWhite.svg';
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

      <div className="footer">

      </div>
    </div>

    <div className="footer__signIn">
      <div>
        <h3>Create your profile and sign into dapps.</h3>
      </div>

      {!isLoggedIn
        && (
          <div className="landing__developers__footer__buttons">
            <p
              className="landing__developers__footer__buttons--signIn"
              type="button"
              onClick={handleSignInUp}
            >Sign In</p>
            <button
              className="landing__developers__footer__buttons--createProfile"
              type="button"
              onClick={handleSignInUp}
            >
              Create Profile
          </button>
          </div>)}
    </div>

    <div className="footer__gutter">

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