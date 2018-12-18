import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../utils/routes';
import ThreeBoxLogoWhite from '../assets/ThreeBoxLogoWhite.svg';
import ThreeBoxLogoBlue from '../assets/ThreeBoxLogoBlue.svg';
import '../views/styles/Landing.css';
import './styles/Nav.css';

const NavLanding = ({
  handleSignInUp,
  downloadBanner,
  classHide,
  landing,
  pathname,
}) => (
    <nav id="landing__nav" className={`${downloadBanner ? 'bannerMargin' : ''} ${classHide} ${landing}`}>
      <div id="nav__logo--marginLeft">
        <Link to={routes.LANDING}>
          {(classHide || landing)
            ? <img src={ThreeBoxLogoBlue} alt="3Box Logo" className="landing__nav__logo" />
            : <img src={ThreeBoxLogoWhite} alt="3Box Logo" className="landing__nav__logo" />
          }
        </Link>
        <Link to={routes.PROFILES}>
          <h4 className={`landing__nav__link ${landing} ${pathname === routes.PROFILES && 'underline'}`}>
            Profiles
          </h4>
        </Link>
        <Link to={routes.JOBS}>
          <h4 className={`landing__nav__link ${landing} ${pathname === routes.JOBS && 'underline'}`}>
            Jobs
          </h4>
        </Link>
      </div>
      <div id="actionButtons">
        <Link to={routes.CREATE}>
          <p className={`${landing} createProfileLink ${pathname === routes.CREATE && 'underline'}`}>
            Create Profile
          </p>
        </Link>
        <button onClick={handleSignInUp} className={`landing__nav__createProfile ${landing}`} type="button">
          Sign In
        </button>
      </div>
    </nav>
  );

export default NavLanding;
