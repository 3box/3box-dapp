import React from 'react';
import { Link } from 'react-router-dom';

import * as routes from '../../utils/routes';
import Edit from '../../assets/Edit.svg';
import SignOut from '../../assets/SignOut.svg';
import Switch from '../../assets/Switched.svg';
import EthereumNetwork from '../../assets/EthereumNetwork.svg';

const DesktopDropdown = props => (
  <div
    className={`${props.showProfileModal ? 'nav__dropdown--visible' : undefined} nav__dropdown nav__dropdown--desktop`}
    tabIndex={0}
    role="button"
  >
    <ul>
      <Link to={`/${props.currentAddress}/${routes.EDIT}`}>
        <li
          className="nav__dropdown__wrapper"
          onClick={props.handleDropdown}
          onKeyPress={props.handleDropdown}
          tabIndex={0}
          role="button"
        >
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
        onClick={() => { props.handleSignOut(); props.handleDropdown(); }}
        onKeyPress={() => { props.handleSignOut(); props.handleDropdown(); }}
        tabIndex={0}
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
        onClick={(e) => { props.handleSignInUp(true, true, e); props.handleDropdown(); }}
        onKeyPress={(e) => { props.handleSignInUp(true, true, e); props.handleDropdown(); }}
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
          src={props.currentWalletLogo}
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
          {props.networkColor}
        </p>
        <div id="nav__networkStatus__networkColor" className={`${props.networkColor}`} />
      </li>
    </ul>
  </div>
);

export default DesktopDropdown;