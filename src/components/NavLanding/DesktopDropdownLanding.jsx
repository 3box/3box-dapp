import React from 'react';

import { shortenEthAddr } from '../../utils/funcs';
import ProfilePicture from '../ProfilePicture';

const DesktopDropdownLanding = props => (
  <React.Fragment>
    <div
      className={`
      ${props.showDropdown ? 'nav__dropdown--visible' : undefined} 
        nav__dropdown nav__dropdown--desktop nav__dropdown--desktop-landing
      `}
      tabIndex={0}
      role="button"
    >
      <div className="nav_account">
        <div className="nav_account_top">
          <p className="nav_account_top_description">You last used this account</p>
          <div className="nav_account_user">
            <ProfilePicture
              pictureClass="nav__userPicture--deskopDropdown"
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
    </div>

    {props.showDropdown && (
      <div
        className="onClickOutside"
        onClick={props.handleDropdown}
        onKeyPress={props.handleDropdown}
        tabIndex={0}
        role="button"
      />
    )}
  </React.Fragment>
);

export default DesktopDropdownLanding;