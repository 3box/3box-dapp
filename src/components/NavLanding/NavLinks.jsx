import React from 'react';
import { Link } from 'react-router-dom';

import ProfilesSmall from '../../assets/Profiles.svg';
import MessagingSmall from '../../assets/Messaging.svg';
import StorageSmall from '../../assets/Storage.svg';
import ProfilePicture from '../ProfilePicture';
import { shortenEthAddr } from '../../utils/funcs';
import * as routes from '../../utils/routes';
import ThreeBoxLogoBlack from '../../assets/ThreeBoxLogoBlack.svg';
import List from '../../assets/List.svg';

const NavLinks = props => (
  <div id="landing__nav__logo--marginLeft">
    <div className="landing_nav_hamburger-mobile">
      <button
        className="landing_nav_hamburger_button clearButton"
        onClick={props.handleMobileSideBar}
        type="button"
      >
        <img src={List} alt="List" />
      </button>
    </div>

    <Link to={routes.LANDING}>
      <img src={ThreeBoxLogoBlack} alt="3Box Logo" className="landing__nav__logo" />
    </Link>

    <div
      tabIndex={0}
      onClick={props.handleAPI}
      onKeyPress={props.handleAPI}
      className={`landing_nav_apiLink landing_nav_link ${props.route === 'products' ? 'activeNavLink' : ''}`}
      role="button"
    >
      API Products
    </div>

    <Link to={routes.PARTNERS} className="landing_nav_link">
      Partners
    </Link>

    <a href="https://github.com/3box/3box" target="_blank" rel="noopener noreferrer" className="landing_nav_link">
      Docs
    </a>

    <a href="https://medium.com/3box" target="_blank" rel="noopener noreferrer" className="landing_nav_link">
      Blog
    </a>
  </div>
);

export default NavLinks;