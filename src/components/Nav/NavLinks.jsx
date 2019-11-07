import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as routes from '../../utils/routes';
import ProfilePicture from '../ProfilePicture';
import DropDownMenu from '../../assets/DropDownMenu.svg';
import Folder from '../../assets/Folder.svg';
import ThreeBoxLogo from '../../assets/ThreeBoxLogoBlack.svg';
import ThreeBoxB from '../../assets/3Box3Blue.svg';

const NavLinks = (props) => {
  const {
    currentAddress,
    showMobileSearch,
    handleDropdown,
  } = props;

  return (
    <>
      <div id="nav__logo--marginLeft">
        <Link to={`/${currentAddress}/${routes.directToHome()}`}>
          <img src={ThreeBoxLogo} alt="3Box Logo" className="landing__nav__logo" />
        </Link>
      </div>

      <div className={`nav__logo--mobile ${showMobileSearch ? 'close' : 'open'}`}>
        <Link to={`/${currentAddress}/${routes.directToHome()}`}>
          <img src={ThreeBoxB} alt="3Box Logo" className="landing__nav__logo" />
        </Link>
      </div>

      <div className={`nav__profile--mobile ${showMobileSearch ? 'close' : 'open'}`}>
        <ProfilePicture
          pictureClass="nav__userPicture clearProfPic"
          onClickFunction={handleDropdown}
          isMyPicture
        />
      </div>

      <div
        className="nav__arrow"
        onClick={handleDropdown}
        onKeyPress={handleDropdown}

        role="button"
        tabIndex={0}
      >
        <img src={DropDownMenu} alt="dropdown" className="nav__arrow__icon" />
      </div>

      <span className="nav__tabs">
        <NavLink
          to={`/${currentAddress}/${routes.directToHome()}`}
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
    </>
  );
};

NavLinks.propTypes = {
  showMobileSearch: PropTypes.bool,
  currentAddress: PropTypes.string,
  handleDropdown: PropTypes.func.isRequired,
};

NavLinks.defaultProps = {
  showMobileSearch: false,
  currentAddress: '',
};

export default NavLinks;