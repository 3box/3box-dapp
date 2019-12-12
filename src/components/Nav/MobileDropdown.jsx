import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import * as routes from '../../utils/routes';
import ProfilePicture from '../ProfilePicture';
import Edit from '../../assets/Edit.svg';
import SignOut from '../../assets/SignOut.svg';
import Switch from '../../assets/Switched.svg';
import ThreeBoxLogo from '../../assets/ThreeBoxLogoBlack.svg';
import Folder from '../../assets/FolderOutline.svg';

const MobileDropdown = (props) => {
  const {
    showProfileModal,
    handleDropdown,
    networkColor,
    currentAddress,
    normalizedPath,
    handleSignInUp,
    currentWalletLogo,
    handleSignOut,
  } = props;

  return (
    <div
      className={`
      ${showProfileModal ? 'sideDrawer' : undefined} 
      nav__dropdown 
      mobileDropDown
    `}
      onClick={handleDropdown}
      onKeyPress={handleDropdown}
      role="button"
      tabIndex={0}
    >
      <div className="sideDrawer_wrapper">

        <ul>
          <div className="nav__dropdown__mobileLogo">
            <img src={ThreeBoxLogo} alt="3Box Logo" className="landing__nav__logo" />
          </div>
          <div id="nav__networkStatus--mobile">
            <div id="nav__networkStatus__networkColor" className={`${networkColor}`} />
            <p>{networkColor}</p>
          </div>

          <Link to={`/${currentAddress}/${routes.directToHome()}`}>
            <li className={normalizedPath === `/${currentAddress}/${routes.directToHome()}` ? 'nav__activePage' : ''}>
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

          <Link to={`/${currentAddress}/${routes.EDIT}`}>
            <li className={normalizedPath === `/${currentAddress}/${routes.EDIT}` ? 'nav__activePage' : ''}>
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
            <li className={normalizedPath === `/${currentAddress}/${routes.SETTINGS}` ? 'nav__activePage' : ''}>
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

          <Link to={`/${currentAddress}/${routes.DATA}`}>
            <li className={normalizedPath === `/${currentAddress}/${routes.DATA}` ? 'nav__activePage' : ''}>
              <div className="nav_dropdown_icon_wrapper">
                <img
                  src={Folder}
                  className="nav__dropdown__icon nav__dropdown__icon--mobileData"
                  alt="profile"
                />
              </div>
              <p>
                Data
              </p>
            </li>
          </Link>

          <li
            className="nav__dropdown__wrapper"
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
              className="nav__dropdown__icon nav_dropdown_walletIcon"
              alt="profile"
            />
          </li>

          <li
            id="mobileNav__signout"
            onClick={() => handleSignOut()}
            tabIndex={0}
            onKeyPress={() => handleSignOut()}
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
        </ul>
      </div>
    </div>
  );
};

MobileDropdown.propTypes = {
  currentAddress: PropTypes.string,
  currentWalletLogo: PropTypes.string,
  handleSignInUp: PropTypes.func.isRequired,
  handleSignOut: PropTypes.func.isRequired,
  handleDropdown: PropTypes.func.isRequired,
  showProfileModal: PropTypes.bool,
  networkColor: PropTypes.string,
  normalizedPath: PropTypes.string,
};

MobileDropdown.defaultProps = {
  currentAddress: '',
  currentWalletLogo: '',
  showProfileModal: false,
  networkColor: '',
  normalizedPath: '',
};

export default MobileDropdown;