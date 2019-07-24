import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter, NavLink } from 'react-router-dom';

import ProfilePicture from './ProfilePicture';
import ThreeBoxLogo from '../assets/ThreeBoxLogoBlack.svg';
import ThreeBoxB from '../assets/3Box3Blue.svg';
import DropDown from '../assets/DropDown.svg';
import actions from '../state/actions';
import * as routes from '../utils/routes';
import { normalizeURL } from '../utils/funcs';
import Edit from '../assets/Edit.svg';
import SignOut from '../assets/SignOut.svg';
import Folder from '../assets/Folder.svg';
import Switch from '../assets/Switched.svg';
import './styles/Nav.css';

const { handleSignOut } = actions.signin;

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showProfileModal: false,
    };
  }

  handleDropdown = () => {
    const { showProfileModal } = this.state;
    this.setState({
      showProfileModal: !showProfileModal,
    });
  }

  handleSignOut = () => {
    const { box } = this.props;
    if (box.logout) this.props.handleSignOut();
  }

  render() {
    const { showProfileModal } = this.state;
    const {
      location,
      currentAddress,
      currentWallet,
      currentNetwork,
      currentWalletLogo,
      handleSignInUp
    } = this.props;
    const { pathname } = location;
    const normalizedPath = normalizeURL(pathname);
    const networkColor = this.props.currentNetwork;
    // console.log('Web3Connect', Web3Connect.getProviderInfo());

    return (
      <nav>
        <div id="nav__logo--marginLeft">
          <Link to={`/${currentAddress}/${routes.ACTIVITY}`}>
            <img src={ThreeBoxLogo} alt="3Box Logo" className="landing__nav__logo" />
          </Link>
        </div>

        <div id="nav__logo--mobile">
          <Link to={`/${currentAddress}/${routes.ACTIVITY}`}>
            <img src={ThreeBoxB} alt="3Box Logo" className="landing__nav__logo" />
          </Link>
        </div>

        <div className="nav__profile--mobile">
          <ProfilePicture
            pictureClass="nav__userPicture clearProfPic"
            onClickFunction={this.handleDropdown}
            isMyPicture
          />
        </div>

        <div id="nav__networkStatus">
          <div id="nav__networkStatus__networkColor" className={`${networkColor}`} />
          <p>{networkColor}</p>
        </div>

        {
          <div
            className="nav__arrow"
            onMouseOver={this.handleDropdown}
            onFocus={this.handleDropdown}

            role="button"
            tabIndex={0}
          >
            <img src={DropDown} alt="dropdown" className="nav__arrow__icon" />
          </div>
        }

        <span className="nav__tabs">
          <NavLink
            to={`/${currentAddress}/${routes.ACTIVITY}`}
            className="nav__profile"
            activeClassName="activeNav"
          >
            <ProfilePicture
              pictureClass="nav__userPicture clearProfPic"
              isMyPicture
            />
            Profile
          </NavLink>

          <NavLink
            to={`/${currentAddress}/${routes.DATA}`}
            className="nav__data"
            activeClassName="activeNav"
          >
            <img src={Folder} alt="Folder" className="nav__folder" />
            Data
          </NavLink>
        </span>

        {/* desktop nav dropdown */}
        <div
          className={`${showProfileModal ? 'nav__dropdown--visible' : undefined} nav__dropdown nav__dropdown--desktop`}
          onClick={this.handleDropdown}
          onKeyPress={this.handleDropdown}

          onMouseLeave={this.handleDropdown}
          onBlur={this.handleDropdown}
          tabIndex={0}
          role="button"
        >
          <ul>
            <Link to={`/${currentAddress}/${routes.EDIT}`}>
              <li className="nav__dropdown__wrapper">
                <div className="nav_dropdown_icon_wrapper">
                  <img
                    src={Edit}
                    className="nav__dropdown__icon"
                    alt="profile"
                    role="button"
                  />
                </div>
                <p>
                  Edit profile
                </p>
              </li>
            </Link>
            <div className="nav__divide" />
            <li
              onClick={() => this.handleSignOut()}
              onKeyPress={() => this.handleSignOut()}
              className="nav__dropdown__wrapper"
              role="button"
            >
              <div className="nav_dropdown_icon_wrapper">
                <img
                  src={SignOut}
                  className="nav__dropdown__icon"
                  alt="profile"
                  role="button"
                />
              </div>
              <p>
                Sign Out
              </p>
            </li>
            <div className="nav__divide" />
            <li
              className="nav__dropdown__wrapper--extra"
              onClick={e => handleSignInUp(true, true, e)}
              onKeyPress={e => handleSignInUp(true, true, e)}
              role="button"
            >
              <div className="nav_network nav_dropdown_icon_wrapper">
                <img
                  src={currentWalletLogo}
                  className="nav__dropdown__icon"
                  alt="profile"
                />
              </div>
              <p>
                Wallet
              </p>
              <button
                type="button"
                className="clearButton nav_dropdown_switchWalletButton"
              >
                <img
                  src={Switch}
                  className="nav_dropdown_switchWallet"
                  alt="profile"
                />
              </button>
            </li>
            <div className="nav__divide" />
            <li
              className="nav__dropdown__wrapper--extra"
            >
              <div className="nav_network nav_dropdown_icon_wrapper">
                <div id="nav__networkStatus__networkColor" className={`${networkColor}`} />
                <p>{networkColor}</p>
              </div>
              <p>
                Network
              </p>
            </li>
          </ul>
        </div>

        {showProfileModal &&
          (
            <div
              className="onClickOutside"
              onClick={this.handleDropdown}
              onKeyPress={this.handleDropdown}
              tabIndex={0}
              role="button"
            />)
        }

        {/* mobile nav dropdown */}
        <div
          className={`${showProfileModal ? 'sideDrawer' : undefined} nav__dropdown mobileDropDown`}
          onClick={this.handleDropdown}
          onKeyPress={this.handleDropdown}
          role="button"
          tabIndex={0}
        >
          <ul>
            <div className="nav__dropdown__mobileLogo">
              <img src={ThreeBoxLogo} alt="3Box Logo" className="landing__nav__logo" />
            </div>
            <div id="nav__networkStatus--mobile">
              <div id="nav__networkStatus__networkColor" className={`${networkColor}`} />
              <p>{networkColor}</p>
            </div>

            <Link to={`/${currentAddress}/${routes.ACTIVITY}`}>
              <li className={normalizedPath === `/${currentAddress}/${routes.ACTIVITY}` ? 'nav__activePage' : ''}>
                Profile
              </li>
            </Link>

            <Link to={`/${currentAddress}/${routes.EDIT}`}>
              <li className={normalizedPath === `/${currentAddress}/${routes.EDIT}` ? 'nav__activePage' : ''}>
                Edit profile
              </li>
            </Link>

            <Link to={`/${currentAddress}/${routes.DATA}`}>
              <li className={normalizedPath === `/${currentAddress}/${routes.DATA}` ? 'nav__activePage' : ''}>
                Data
              </li>
            </Link>

            <li
              id="mobileNav__signout"
              onClick={() => this.handleSignOut()}
              tabIndex={0}
              onKeyPress={() => this.handleSignOut()}
              role="button"
            >
              Sign Out
            </li>
          </ul>
        </div>

        <div
          id={showProfileModal ? 'dropdownContainer' : undefined}
          onClick={this.handleDropdown}
          onKeyPress={this.handleDropdown}
          role="button"
          tabIndex={0}
        />

      </nav >
    );
  }
}

Nav.propTypes = {
  box: PropTypes.object,
  location: PropTypes.object,
  handleSignOut: PropTypes.func.isRequired,
  currentNetwork: PropTypes.string,
  currentAddress: PropTypes.string,
  currentWallet: PropTypes.string,
};

Nav.defaultProps = {
  box: {},
  currentNetwork: '',
  currentAddress: '',
  currentWallet: '',
  location: {},
};

function mapState(state) {
  return {
    box: state.myData.box,

    currentNetwork: state.userState.currentNetwork,
    currentAddress: state.userState.currentAddress,
    currentWallet: state.userState.currentWallet,
    currentWalletLogo: state.userState.currentWalletLogo,
  };
}

export default withRouter(connect(mapState, { handleSignOut })(Nav));