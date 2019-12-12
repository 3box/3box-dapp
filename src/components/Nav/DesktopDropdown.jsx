import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import * as routes from '../../utils/routes';
import Edit from '../../assets/Edit.svg';
import SignOut from '../../assets/SignOut.svg';
import Switch from '../../assets/Switched.svg';
import EthereumNetwork from '../../assets/EthereumNetwork.svg';

const DesktopDropdown = (props) => {
  const {
    showProfileModal,
    handleDropdown,
    networkColor,
    currentAddress,
    handleSignOut,
    handleSignInUp,
    currentWalletLogo,
  } = props;

  return (
    <div
      className={`${showProfileModal ? 'nav__dropdown--visible' : undefined} nav__dropdown nav__dropdown--desktop`}
      tabIndex={0}
      role="button"
    >
      <ul>
        <Link to={`/${currentAddress}/${routes.EDIT}`}>
          <li
            className="nav__dropdown__wrapper"
            onClick={handleDropdown}
            onKeyPress={handleDropdown}
            tabIndex={0}
            role="button"
          >
            <div className="nav_dropdown_icon_wrapper">
              <img
                src={Edit}
                className="nav__dropdown__icon"
                alt="profile"
              />
            </div>
            <p>
              Edit profile
            </p>
          </li>
        </Link>

        <Link to={`/${currentAddress}/${routes.SETTINGS}`}>
          <li
            className="nav__dropdown__wrapper"
            onClick={handleDropdown}
            onKeyPress={handleDropdown}
            tabIndex={0}
            role="button"
          >
            <div className="nav_dropdown_icon_wrapper">
              <img
                src={Edit}
                className="nav__dropdown__icon"
                alt="profile"
              />
            </div>
            <p>
              Settings
            </p>
          </li>
        </Link>

        <div className="nav__divide" />

        <li
          onClick={() => { handleSignOut(); handleDropdown(); }}
          onKeyPress={() => { handleSignOut(); handleDropdown(); }}
          tabIndex={0}
          className="nav__dropdown__wrapper"
          role="button"
        >
          <div className="nav_dropdown_icon_wrapper">
            <img
              src={SignOut}
              className="nav__dropdown__icon"
              alt="profile"
            />
          </div>
          <p>
            Sign Out
          </p>
        </li>

        <div className="nav__divide" />

        <li
          className="nav__dropdown__wrapper--extra"
          onClick={(e) => { handleSignInUp(true, true, e); handleDropdown(); }}
          onKeyPress={(e) => { handleSignInUp(true, true, e); handleDropdown(); }}
          role="button"
        >
          <div className="nav_dropdown_icon_wrapper">
            <img
              src={Switch}
              className="nav__dropdown__icon nav_dropdown_switchWallet"
              alt="profile"
            />
          </div>
          <p>
            Wallet
          </p>
          <img
            src={currentWalletLogo}
            className="nav__dropdown__icon"
            alt="profile"
          />
        </li>

        <div className="nav__divide" />

        <li
          className="nav__dropdown__wrapper--extra"
        >
          <div className="nav_dropdown_icon_wrapper">
            <img
              src={EthereumNetwork}
              className="nav__dropdown__icon"
              alt="profile"
            />
          </div>
          <p>
            {networkColor}
          </p>
          <div id="nav__networkStatus__networkColor" className={`${networkColor}`} />
        </li>
      </ul>
    </div>
  );
};

DesktopDropdown.propTypes = {
  currentAddress: PropTypes.string,
  currentWalletLogo: PropTypes.string,
  handleSignInUp: PropTypes.func.isRequired,
  handleSignOut: PropTypes.func.isRequired,
  handleDropdown: PropTypes.func.isRequired,
  showProfileModal: PropTypes.bool,
  networkColor: PropTypes.string,
};

DesktopDropdown.defaultProps = {
  currentAddress: '',
  currentWalletLogo: '',
  showProfileModal: false,
  networkColor: '',
};

export default DesktopDropdown;