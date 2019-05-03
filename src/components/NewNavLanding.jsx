import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as routes from '../utils/routes';
import { normalizeURL } from '../utils/funcs';
import ThreeBoxLogoBlack from '../assets/ThreeBoxLogoBlack.svg';
import SSOSmall from '../assets/SSOSmall.png';
import ProfilesSmall from '../assets/ProfilesSmall.png';
import MessagingSmall from '../assets/MessagingSmall.png';
import StorageSmall from '../assets/StorageSmall.png';
import List from '../assets/List.svg';
import '../views/styles/Landing.css';
import './styles/Nav.css';

class NavLanding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      retractNav: false,
      showAPI: false,
      showSideDrawer: false,
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

  handleMobileSideBar = () => {
    const { showSideDrawer } = this.state;
    this.setState({
      showSideDrawer: !showSideDrawer,
    });
  }

  render() {
    const { retractNav, showAPI, showSideDrawer } = this.state;
    const {
      landing,
      onOtherProfilePage,
      showSignInBanner,
    } = this.props;

    const classHide = retractNav ? 'hide' : '';

    const { pathname } = this.props.location;
    const normalizedPath = normalizeURL(pathname);
    const route = pathname.split('/')[1];

    return (
      <nav
        id="landing__nav"
        className={`
            ${showSignInBanner ? 'showSignInBanner' : ''} 
            ${(showSignInBanner) ? 'bannerMargin' : ''} 
            ${classHide} 
            ${onOtherProfilePage && 'hide'} 
            ${showAPI ? 'showAPINav' : ''}
            ${landing}`}
      >
        <div id="landing__nav__logo--marginLeft">
          <div className="landing_nav_hamburger-mobile">
            <button
              className="landing_nav_hamburger_button clearButton"
              onClick={this.handleMobileSideBar}
              type="button"
            >
              <img src={List} alt="" />
            </button>
          </div>
          <Link to={routes.LANDING}>
            <img src={ThreeBoxLogoBlack} alt="3Box Logo" className="landing__nav__logo" />
          </Link>
          <div
            onClick={this.handleAPI}
            className={`landing_nav_apiLink landing_nav_link ${route === 'products' ? 'activeNavLink' : ''}`}
          >
            API Products
          </div>
          <a href="https://github.com/3box/3box" target="_blank" rel="noopener noreferrer" className="landing_nav_link">
            Docs
          </a>
          <a href="https://medium.com/3box" target="_blank" rel="noopener noreferrer" className="landing_nav_link">
            Blog
          </a>
        </div>
        {route !== 'hub' && (
          <div id="actionButtons">
            <Link to={routes.HUB}>
              <button type="button">
                Sign in to Hub
              </button>
            </Link>
          </div>)}

        <div className={`${showAPI ? 'showAPI' : ''} ${retractNav ? 'apiLower' : ''} landing_nav_api`}>
          <div className="landing_nav_api_wrapper">
            {/* <div className="landing_nav_api_option">
              <Link to={routes.API_PROFILES} className="">
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
              </Link>
            </div> */}
            <div
              className="landing_nav_api_option"
              onClick={this.handleAPI}
              onKeyPress={this.handleDropdown}
              role="button"
              tabIndex={0}
            >
              <Link to={routes.API_PROFILES}>
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
              </Link>
            </div>
            <div
              className="landing_nav_api_option"
              onClick={this.handleAPI}
              onKeyPress={this.handleDropdown}
              role="button"
              tabIndex={0}
            >
              <Link to={routes.API_MESSAGING}>
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
              </Link>
            </div>
            <div
              className="landing_nav_api_option"
              onClick={this.handleAPI}
              onKeyPress={this.handleDropdown}
              role="button"
              tabIndex={0}
            >
              <Link to={routes.API_STORAGE}>
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
              </Link>
            </div>
          </div>
        </div>
        {showAPI &&
          (
            <div
              className="onClickOutside"
              onClick={this.handleAPI}
              onKeyPress={this.handleAPI}
              tabIndex={0}
              role="button"
            />)
        }

        <div
          className={`${showSideDrawer ? 'sideDrawer' : undefined} nav__dropdown mobileDropDown`}
          onClick={this.handleMobileSideBar}
          onKeyPress={this.handleMobileSideBar}
          role="button"
          tabIndex={0}
        >
          <ul>
            <Link to={routes.LANDING} className="nav__dropdown__mobileLogo">
              <img src={ThreeBoxLogoBlack} alt="3Box Logo" className="landing__nav__logo" />
            </Link>

            <Link to={routes.HUB} className="landing_nav_apiLink">
              <li className={normalizedPath === routes.HUB ? 'nav__activePage' : ''}>
                Hub
              </li>
            </Link>

            <Link to={routes.API} className="landing_nav_apiLink">
              <li className={normalizedPath === routes.API ? 'nav__activePage' : ''}>
                API Products
              </li>
            </Link>

            <a href="https://github.com/3box/3box" target="_blank" rel="noopener noreferrer">
              <li>
                Docs
              </li>
            </a>

            <a href="https://medium.com/3box" target="_blank" rel="noopener noreferrer">
              <li>
                Blog
              </li>
            </a>
          </ul>
        </div>

        <div
          id={showSideDrawer ? 'dropdownContainer' : undefined}
          onClick={this.handleMobileSideBar}
          onKeyPress={this.handleMobileSideBar}
          role="button"
          tabIndex={0}
        />
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
