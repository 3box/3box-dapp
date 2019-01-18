import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as routes from '../utils/routes';
import ThreeBoxLogoWhite from '../assets/ThreeBoxLogoWhite.svg';
import ThreeBoxLogoBlue from '../assets/ThreeBoxLogoBlue.svg';
import '../views/styles/Landing.css';
import './styles/Nav.css';

const NavLanding = ({
  handleSignInUp,
  showDownloadBanner,
  classHide,
  landing,
  pathname,
  onPublicProfilePage,
}) => (
    <nav
      id="landing__nav"
      className={`
      ${showDownloadBanner ? 'bannerMargin' : ''} 
      ${classHide} 
      ${onPublicProfilePage && 'hide'} 
      ${landing}`}
    >
      <div id="nav__logo--marginLeft">
        <Link to={routes.LANDING}>
          {(classHide || landing || onPublicProfilePage)
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

NavLanding.propTypes = {
  isLoggedIn: PropTypes.bool,
  showDownloadBanner: PropTypes.bool,
  onPublicProfilePage: PropTypes.bool,
  classHide: PropTypes.string,
  landing: PropTypes.string,
  normalizedPath: PropTypes.string,
  pathname: PropTypes.string,
  handleSignInUp: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

NavLanding.defaultProps = {
  isLoggedIn: false,
  showDownloadBanner: false,
  onPublicProfilePage: false,
  classHide: '',
  landing: '',
  pathname: '',
  normalizedPath: '',
};

function mapState(state) {
  return {
    isLoggedIn: state.threeBox.isLoggedIn,
    showDownloadBanner: state.threeBox.showDownloadBanner,
  };
}

export default withRouter(connect(mapState)(NavLanding));
// export default NavLanding;


// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { Link, withRouter } from 'react-router-dom';
// import { connect } from 'react-redux';

// import * as routes from '../utils/routes';
// import { normalizeURL } from '../utils/funcs';
// import ThreeBoxLogoWhite from '../assets/ThreeBoxLogoWhite.svg';
// import ThreeBoxLogoBlue from '../assets/ThreeBoxLogoBlue.svg';
// import '../views/styles/Landing.css';
// import './styles/Nav.css';


// const NavLanding = ({
//   handleSignInUp,
//   showDownloadBanner,
//   isLoggedIn,
//   classHide,
//   landing,
//   normalizedPath,
// }) => (
//     <nav id="landing__nav" className={`${showDownloadBanner ? 'bannerMargin' : ''} ${classHide} ${normalizedPath === routes.LANDING && 'landing'} ${isLoggedIn && 'hide'}`}>
//       <div id="nav__logo--marginLeft">
//         <Link to={routes.LANDING}>
//           {(classHide || landing)
//             ? <img src={ThreeBoxLogoBlue} alt="3Box Logo" className="landing__nav__logo" />
//             : <img src={ThreeBoxLogoWhite} alt="3Box Logo" className="landing__nav__logo" />
//           }
//         </Link>
//         <Link to={routes.PROFILES}>
//           <h4 className={`landing__nav__link ${landing} ${normalizedPath === routes.PROFILES && 'underline'}`}>
//             Profiles
//           </h4>
//         </Link>
//         <Link to={routes.JOBS}>
//           <h4 className={`landing__nav__link ${landing} ${normalizedPath === routes.JOBS && 'underline'}`}>
//             Jobs
//           </h4>
//         </Link>
//       </div>
//       <div id="actionButtons">
//         <Link to={routes.CREATE}>
//           <p className={`${landing} createProfileLink ${normalizedPath === routes.CREATE && 'underline'}`}>
//             Create Profile
//           </p>
//         </Link>
//         <button onClick={handleSignInUp} className={`landing__nav__createProfile ${landing}`} type="button">
//           Sign In
//         </button>
//       </div>
//     </nav>
//   );

// NavLanding.propTypes = {
//   isLoggedIn: PropTypes.bool,
//   showDownloadBanner: PropTypes.bool,
//   classHide: PropTypes.string,
//   landing: PropTypes.string,
//   normalizedPath: PropTypes.string,
//   handleSignInUp: PropTypes.func.isRequired,
//   location: PropTypes.object.isRequired,
// };

// NavLanding.defaultProps = {
//   isLoggedIn: false,
//   showDownloadBanner: false,
//   classHide: '',
//   landing: '',
//   normalizedPath: '',
// };

// function mapState(state) {
//   return {
//     isLoggedIn: state.threeBox.isLoggedIn,
//     showDownloadBanner: state.threeBox.showDownloadBanner,
//   };
// }

// export default withRouter(connect(mapState)(NavLanding));
