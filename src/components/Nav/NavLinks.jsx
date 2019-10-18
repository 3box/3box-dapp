import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import * as routes from '../../utils/routes';
import ProfilePicture from '../ProfilePicture';
import DropDownMenu from '../../assets/DropDownMenu.svg';
import Folder from '../../assets/Folder.svg';
import ThreeBoxLogo from '../../assets/ThreeBoxLogoBlack.svg';
import ThreeBoxB from '../../assets/3Box3Blue.svg';

const MobileDropdown = (props) => (
  <>
    <div id="nav__logo--marginLeft">
      <Link to={`/${props.currentAddress}/${routes.ACTIVITY}`}>
        <img src={ThreeBoxLogo} alt="3Box Logo" className="landing__nav__logo" />
      </Link>
    </div>

    <div id="nav__logo--mobile">
      <Link to={`/${props.currentAddress}/${routes.ACTIVITY}`}>
        <img src={ThreeBoxB} alt="3Box Logo" className="landing__nav__logo" />
      </Link>
    </div>

    <div className="nav__profile--mobile">
      <ProfilePicture
        pictureClass="nav__userPicture clearProfPic"
        onClickFunction={props.handleDropdown}
        isMyPicture
      />
    </div>

    <div id="nav__networkStatus">
      <div id="nav__networkStatus__networkColor" className={`${props.networkColor}`} />
      <p>{props.networkColor}</p>
    </div>

    <div
      className="nav__arrow"
      onClick={props.handleDropdown}
      onKeyPress={props.handleDropdown}

      role="button"
      tabIndex={0}
    >
      <img src={DropDownMenu} alt="dropdown" className="nav__arrow__icon" />
    </div>

    <span className="nav__tabs">
      <NavLink
        to={`/${props.currentAddress}/${routes.ACTIVITY}`}
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
        to={`/${props.currentAddress}/${routes.DATA}`}
        className="nav__data"
        activeClassName="activeNav"
      >
        <img src={Folder} alt="Folder" className="nav__folder" />
        Data
      </NavLink>
    </span>
  </>
);

export default MobileDropdown;