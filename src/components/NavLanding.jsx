import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as routes from '../utils/routes';
import ThreeBoxLogoWhite from '../assets/ThreeBoxLogoWhite.svg';
import ThreeBoxLogoBlue from '../assets/ThreeBoxLogoBlue.svg';
import GithubIconBlue from '../assets/GithubIconBlue.svg';
import '../views/styles/Landing.css';
import './styles/Nav.css';

class NavLanding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      retractNav: false,
    };
  }

  componentWillMount() {
    window.addEventListener('scroll', this.hideBar);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.hideBar);
  }

  hideBar = () => {
    if (window.scrollY < 1) {
      this.setState({ retractNav: false });
    } else {
      this.setState({ retractNav: true });
    }
  }

  render() {
    const { retractNav } = this.state;
    const {
      handleSignInUp,
      landing,
      pathname,
      onOtherProfilePage,
      showSignInBanner,
    } = this.props;

    const classHide = retractNav ? 'hide' : '';

    return (
      <nav
        id="landing__nav"
        className={`
            ${showSignInBanner ? 'showSignInBanner' : ''} 
            ${(showSignInBanner) ? 'bannerMargin' : ''} 
            ${classHide} 
            ${onOtherProfilePage && 'hide'} 
            ${landing}`}
      >
        <div id="landing__nav__logo--marginLeft">
          <Link to={routes.LANDING}>
            {(classHide || landing || onOtherProfilePage)
              ? <img src={ThreeBoxLogoBlue} alt="3Box Logo" className="landing__nav__logo" />
              : <img src={ThreeBoxLogoWhite} alt="3Box Logo" className="landing__nav__logo" />
            }
          </Link>
          {(classHide || landing || onOtherProfilePage)
            ? (
              <a href="https://github.com/3box/3box" className="landing__nav__developers" target="_blank" rel="noopener noreferrer">
                <img src={GithubIconBlue} alt="Github" className="landing__nav__developers__icon" />
                Developers
              </a>)
            : (
              <a href="https://github.com/3box/3box" className="landing__nav__developers--white" target="_blank" rel="noopener noreferrer">
                <img src={GithubIconBlue} alt="Github" className="landing__nav__developers__icon--white" />
                Developers
              </a>
            )}
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
  }
}

NavLanding.propTypes = {
  isLoggedIn: PropTypes.bool,
  showSignInBanner: PropTypes.bool,
  onOtherProfilePage: PropTypes.bool,
  classHide: PropTypes.string,
  landing: PropTypes.string,
  normalizedPath: PropTypes.string,
  pathname: PropTypes.string,
  handleSignInUp: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

NavLanding.defaultProps = {
  isLoggedIn: false,
  onOtherProfilePage: false,
  showSignInBanner: false,
  classHide: '',
  landing: '',
  pathname: '',
  normalizedPath: '',
};

function mapState(state) {
  return {
    isLoggedIn: state.userState.isLoggedIn,

    showSignInBanner: state.uiState.showSignInBanner,
  };
}

export default withRouter(connect(mapState)(NavLanding));
