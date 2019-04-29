import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as routes from '../utils/routes';
import ThreeBoxLogoBlack from '../assets/ThreeBoxLogoBlack.svg';
import SSOSmall from '../assets/SSOSmall.png';
import ProfilesSmall from '../assets/ProfilesSmall.png';
import MessagingSmall from '../assets/MessagingSmall.png';
import StorageSmall from '../assets/StorageSmall.png';
import '../views/styles/Landing.css';
import './styles/Nav.css';

class NavLanding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      retractNav: false,
      showAPI: false,
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

  handleAPI = () => {
    const { showAPI } = this.state;
    this.setState({ showAPI: !showAPI });
  }

  render() {
    const { retractNav, showAPI } = this.state;
    const {
      handleSignInUp,
      showInfoBanner,
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
            ${(showInfoBanner || showSignInBanner) ? 'bannerMargin' : ''} 
            ${classHide} 
            ${onOtherProfilePage && 'hide'} 
            ${landing}`}
      >
        <div id="landing__nav__logo--marginLeft">
          <Link to={routes.LANDING}>
            <img src={ThreeBoxLogoBlack} alt="3Box Logo" className="landing__nav__logo" />
          </Link>
          <div onClick={this.handleAPI} className="landing_nav_apiLink">
            API Products
          </div>
          <a href="https://github.com/3box/3box" target="_blank" rel="noopener noreferrer">
            Docs
          </a>
          <Link to="/partners">
            Partners
          </Link>
          <Link to="/partners">
            Chat
          </Link>
          <a href="https://medium.com/3box" target="_blank" rel="noopener noreferrer">
            Blog
          </a>
        </div>
        <div id="actionButtons">
          <button onClick={handleSignInUp} type="button">
            Sign in to Hub
          </button>
        </div>

        <div className={`${showAPI ? 'showAPI' : ''} ${retractNav ? 'apiLower' : ''} landing_nav_api`}>
          <div className="landing_nav_api_wrapper">
            <div className="landing_nav_api_option">
              <div className="landing_nav_api_option_icon">
                <img src={SSOSmall} alt="Single sign on icon" />
              </div>
              <div className="landing_nav_api_option_text">
                <h4>
                  Authentication (SSO)
                </h4>
                <p>
                  Seamlessly onboard users to your application
                </p>
              </div>
            </div>
            <div className="landing_nav_api_option">
              <div className="landing_nav_api_option_icon">
                <img src={ProfilesSmall} alt="Single sign on icon" />
              </div>
              <div className="landing_nav_api_option_text">
                <h4>
                  Profiles
                </h4>
                <p>
                  Support social profiles and basic reputation
                </p>
              </div>
            </div>
            <div className="landing_nav_api_option">
              <div className="landing_nav_api_option_icon">
                <img src={MessagingSmall} alt="Single sign on icon" />
              </div>
              <div className="landing_nav_api_option_text">
                <h4>
                  Messaging
                </h4>
                <p>
                  Add decentralized chat, messaging, and commenting
                </p>
              </div>
            </div>
            <div className="landing_nav_api_option">
              <div className="landing_nav_api_option_icon">
                <img src={StorageSmall} alt="Single sign on icon" />
              </div>
              <div className="landing_nav_api_option_text">
                <h4>
                  Storage
                </h4>
                <p>
                  Store user data in a private database just for your app
                </p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

NavLanding.propTypes = {
  isLoggedIn: PropTypes.bool,
  showInfoBanner: PropTypes.bool,
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
  showInfoBanner: false,
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

    showInfoBanner: state.uiState.showInfoBanner,
    showSignInBanner: state.uiState.showSignInBanner,
  };
}

export default withRouter(connect(mapState)(NavLanding));
