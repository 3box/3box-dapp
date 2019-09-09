import React from 'react';
import { Link } from 'react-router-dom';

import ProfilePicture from '../ProfilePicture';
import { shortenEthAddr } from '../../utils/funcs';
import * as routes from '../../utils/routes';
import ThreeBoxLogoBlack from '../../assets/ThreeBoxLogoBlack.svg';

const MobileSidedrawer = props => (
  <div
    className={`
    ${props.showSideDrawer ? 'sideDrawer' : undefined} 
    nav__dropdown 
    mobileDropDown
    `}
    onClick={props.handleMobileSideBar}
    onKeyPress={props.handleMobileSideBar}
    role="button"
    tabIndex={0}
  >
    <div className="sideDrawer_wrapper">
      <ul className={`${props.showSignInBanner ? 'showSignInBanner' : ''}`}>
        <Link to={routes.LANDING} className="nav__dropdown__mobileLogo">
          <img src={ThreeBoxLogoBlack} alt="3Box Logo" className="landing__nav__logo" />
        </Link>

        <Link to={routes.HUB} className="landing_nav_apiLink">
          <li className={props.normalizedPath === routes.HUB ? 'nav__activePage' : ''}>
            <p>
              Hub
            </p>
          </li>
        </Link>

        <Link to={routes.API} className="landing_nav_apiLink">
          <li className={props.normalizedPath === routes.API ? 'nav__activePage' : ''}>
            <p>
              API Products
            </p>
          </li>
        </Link>

        <a href="https://docs.3box.io" target="_blank" rel="noopener noreferrer">
          <li>
            <p>
              Docs
            </p>
          </li>
        </a>

        <Link to={routes.PARTNERS} className="landing_nav_apiLink">
          <li className={props.normalizedPath === routes.PARTNERS ? 'nav__activePage' : ''}>
            <p>
              Partners
            </p>
          </li>
        </Link>

        <a href="https://medium.com/3box" target="_blank" rel="noopener noreferrer">
          <li>
            <p>
              Blog
            </p>
          </li>
        </a>
      </ul>

      {props.isPublicProfile && (
        <div className="nav_account">
          <div className="nav_account_top">
            <p className="nav_account_top_description">You last used this account</p>
            <div className="nav_account_user">
              <ProfilePicture
                pictureClass="nav__userPicture--mobile"
                isMyPicture
              />
              <div className="nav_account_user_name">
                <h4>{props.name}</h4>
                <p>{shortenEthAddr(props.currentAddress)}</p>
              </div>
            </div>
          </div>

          <div className="nav_account_info">
            Last account is used for mutual followers and other features
          </div>
        </div>
      )}
    </div>
  </div>
);

export default MobileSidedrawer;