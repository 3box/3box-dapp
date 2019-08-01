import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { checkIsEthAddress, normalizeURL } from '../../utils/funcs';
import * as routes from '../../utils/routes';

import NavLinks from './NavLinks';
import MobileSidedrawer from './MobileSidedrawer';
import APILinks from './APILinks';
import DesktopDropdownLanding from './DesktopDropdownLanding';

import DropDownMenu from '../../assets/DropDownMenu.svg';
import '../../views/styles/Landing.css';
import '../styles/Nav.css';

class NavLanding extends Component {
  constructor(props) {
    super(props);
    const { pathname } = this.props.history.location;
    this.state = {
      retractNav: false,
      showAPI: false,
      showSideDrawer: false,
      isProfilePage: checkIsEthAddress(pathname.split('/')[1]),
      showDropdown: false,
    };
  }

  componentWillMount() {
    window.addEventListener('scroll', this.hideBar);
  }

  componentWillReceiveProps(nextProps) {
    const { location } = this.props;
    const { pathname } = nextProps.location;
    const isProfilePage = checkIsEthAddress(pathname.split('/')[1]);
    if (location.pathname !== pathname) this.setState({ isProfilePage });
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

  handleDropdown = () => {
    const { showDropdown } = this.state;
    this.setState({
      showDropdown: !showDropdown,
    });
  }

  render() {
    const {
      retractNav,
      showAPI,
      showSideDrawer,
      isProfilePage,
      showDropdown,
    } = this.state;
    const {
      landing,
      onOtherProfilePage,
      showSignInBanner,
      handleSignInUp,
      isLoggedIn,
      currentAddress,
      name,
    } = this.props;

    const classHide = retractNav ? 'hide' : '';

    const { pathname } = this.props.location;
    const normalizedPath = normalizeURL(pathname);
    const route = pathname.split('/')[1];
    const currentUrlEthAddr = checkIsEthAddress(normalizedPath.split('/')[1]);
    const profilePage = typeof normalizedPath.split('/')[2] === 'undefined';
    const isPublicProfile = currentUrlEthAddr && profilePage;

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
        <NavLinks
          handleMobileSideBar={this.handleMobileSideBar}
          handleAPI={this.handleAPI}
          route={route}
        />

        {(route !== 'hub' && !isProfilePage && route !== 'login') && (
          <div id="actionButtons">
            <Link to={routes.HUB}>
              <button type="button">
                Sign in to Hub
              </button>
            </Link>
          </div>
        )}

        {(route !== 'hub' && isProfilePage && !isLoggedIn) && (
          <div id="actionButtons">
            <button
              type="button"
              className="textButton newWallet"
              onClick={() => handleSignInUp(true)}
            >
              Choose wallet
            </button>
            <button type="button" onClick={() => handleSignInUp(false)}>
              Log in
            </button>
          </div>
        )}

        <APILinks
          showAPI={showAPI}
          retractNav={retractNav}
          isProfilePage={isProfilePage}
          handleAPI={this.handleAPI}
          handleDropdown={this.handleDropdown}
        />

        {showAPI && (
          <div
            className="onClickOutside"
            onClick={this.handleAPI}
            onKeyPress={this.handleAPI}
            tabIndex={0}
            role="button"
          />
        )}

        {isPublicProfile && (
          <div
            className="nav__arrow"
            onClick={this.handleDropdown}
            onKeyPress={this.handleDropdown}

            role="button"
            tabIndex={0}
          >
            <img src={DropDownMenu} alt="dropdown" className="nav__arrow__icon" />
          </div>
        )}

        <DesktopDropdownLanding
          showDropdown={showDropdown}
          name={name}
          currentAddress={currentAddress}
          handleDropdown={this.handleDropdown}
        />

        <MobileSidedrawer
          showSideDrawer={showSideDrawer}
          handleMobileSideBar={this.handleMobileSideBar}
          normalizedPath={normalizedPath}
          isPublicProfile={isPublicProfile}
          name={name}
          currentAddress={currentAddress}
        />

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
  handleSignInUp: PropTypes.func.isRequired,
  showSignInBanner: PropTypes.bool,
  onOtherProfilePage: PropTypes.bool,
  name: PropTypes.string,
  classHide: PropTypes.string,
  landing: PropTypes.string,
  normalizedPath: PropTypes.string,
  pathname: PropTypes.string,
  location: PropTypes.object.isRequired,
  currentAddress: PropTypes.string,
};

NavLanding.defaultProps = {
  isLoggedIn: false,
  onOtherProfilePage: false,
  showSignInBanner: false,
  name: '',
  currentAddress: '',
  classHide: '',
  landing: '',
  pathname: '',
  normalizedPath: '',
};

function mapState(state) {
  return {
    isLoggedIn: state.userState.isLoggedIn,
    showSignInBanner: state.uiState.showSignInBanner,

    name: state.myData.name,

    currentAddress: state.userState.currentAddress,
  };
}

export default withRouter(connect(mapState)(NavLanding));
