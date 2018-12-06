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
  isMobile,
  pathname,
  handleSideNav,
  showSideNav,
}) => (
    <nav id="landing__nav" className={`${downloadBanner ? 'bannerMargin' : ''} ${classHide} ${landing}`}>
      <div id="nav__logo--marginLeft">
        <Link to={routes.LANDING}>
          {(classHide || landing)
            ? <img src={ThreeBoxLogoBlue} alt="" className="landing__nav__logo" />
            : <img src={ThreeBoxLogoWhite} alt="" className="landing__nav__logo" />
          }
        </Link>
        <Link to={routes.CREATEPROFILE}>
          <h4 className={`landing__nav__link ${landing}`}>
            Profiles
        </h4>
        </Link>
        <Link to={routes.JOBS}>
          <h4 className={`landing__nav__link ${landing}`}>
            Jobs
        </h4>
        </Link>
      </div>
      <div id="actionButtons">
        <Link to={routes.CREATEPROFILE}>
          <p className={`${landing} createProfileLInk`}>
            Create Profile
          </p>
        </Link>
        <button onClick={handleSignInUp} className={`landing__nav__createProfile ${landing}`} type="button">
          Sign In
      </button>
      
        {/* {isMobile
          && (
            <div className={`landing__nav__mobileMenu ${landing}`} onClick={handleSideNav}>
              <div className="bar1"></div>
              <div className="bar1"></div>
              <div className="bar1"></div>
            </div>)} */}

      </div>

      {showSideNav
        && <div className='onClickOutside' onClick={handleSideNav} />}

      {/* mobile nav dropdown */}
      <div className={`${showSideNav ? 'sideDrawer' : undefined} nav__dropdown mobileDropDown`} onMouseLeave={handleSideNav} onClick={handleSideNav}>
        <ul>
          <div className='nav__dropdown__mobileLogo'>
            <img src={ThreeBoxLogoBlue} alt="" className="landing__nav__logo" />
          </div>
          <Link to={routes.CREATEPROFILE}><li className={pathname === routes.CREATEPROFILE ? 'nav__activePage' : ''}>Profiles</li></Link>
          <Link to={routes.JOBS}><li className={pathname === routes.JOBS ? 'nav__activePage' : ''}>Jobs</li></Link>
          <Link to={routes.CREATEPROFILE}><li>Create Profile</li></Link>
          <li id="mobileNav__signout" onClick={handleSignInUp}>Sign In</li>
          <a href="https://airtable.com/shrX4fI8MDuaPpef9"><li id="nav__reportBug">Report a bug</li></a>
        </ul>
      </div>

    </nav>
  );

export default NavLanding;
