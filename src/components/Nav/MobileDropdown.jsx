import React from 'react';
import { Link } from 'react-router-dom';

import * as routes from '../../utils/routes';
import ProfilePicture from '../ProfilePicture';
import Edit from '../../assets/Edit.svg';
import SignOut from '../../assets/SignOut.svg';
import Switch from '../../assets/Switched.svg';
import ThreeBoxLogo from '../../assets/ThreeBoxLogoBlack.svg';
import Folder from '../../assets/FolderOutline.svg';

const MobileDropdown = props => (
  <div
    className={`
      ${props.showProfileModal ? 'sideDrawer' : undefined} 
      nav__dropdown 
      mobileDropDown
    `}
    onClick={props.handleDropdown}
    onKeyPress={props.handleDropdown}
    role="button"
    tabIndex={0}
  >
    <div className="sideDrawer_wrapper">

      <ul>
        <div className="nav__dropdown__mobileLogo">
          <img src={ThreeBoxLogo} alt="3Box Logo" className="landing__nav__logo" />
        </div>
        <div id="nav__networkStatus--mobile">
          <div id="nav__networkStatus__networkColor" className={`${props.networkColor}`} />
          <p>{props.networkColor}</p>
        </div>

        <Link to={`/${props.currentAddress}/${routes.ACTIVITY}`}>
          <li className={props.normalizedPath === `/${props.currentAddress}/${routes.ACTIVITY}` ? 'nav__activePage' : ''}>
            <div className="nav_dropdown_icon_wrapper">
              <ProfilePicture
                pictureClass="nav__userPicture--mobile"
                isMyPicture
              />
            </div>
            <p>
              Profile
            </p>
          </li>
        </Link>

        <Link to={`/${props.currentAddress}/${routes.EDIT}`}>
          <li className={props.normalizedPath === `/${props.currentAddress}/${routes.EDIT}` ? 'nav__activePage' : ''}>
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

        <Link to={`/${props.currentAddress}/${routes.DATA}`}>
          <li className={props.normalizedPath === `/${props.currentAddress}/${routes.DATA}` ? 'nav__activePage' : ''}>
            <div className="nav_dropdown_icon_wrapper">
              <img
                src={Folder}
                className="nav__dropdown__icon nav__dropdown__icon--mobileData"
                alt="profile"
                role="button"
              />
            </div>
            <p>
              Data
            </p>
          </li>
        </Link>

        <li
          className="nav__dropdown__wrapper"
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
            className="nav__dropdown__icon nav_dropdown_walletIcon"
            alt="profile"
          />
        </li>

        <li
          id="mobileNav__signout"
          onClick={() => props.handleSignOut()}
          tabIndex={0}
          onKeyPress={() => props.handleSignOut()}
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
      </ul>
    </div>
  </div>
);

export default MobileDropdown;