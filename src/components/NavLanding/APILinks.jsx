import React from 'react';
import { Link } from 'react-router-dom';

import ProfilesSmall from '../../assets/Profiles.svg';
import MessagingSmall from '../../assets/Messaging.svg';
import StorageSmall from '../../assets/Storage.svg';
import * as routes from '../../utils/routes';

const MobileSidedrawer = props => (
  <div className={`${props.showAPI ? 'showAPI' : ''} ${(props.retractNav || props.isProfilePage) ? 'apiLower' : ''} landing_nav_api`}>
    <div className="landing_nav_api_wrapper">
      {/* <div className="landing_nav_api_option">
      <Link to={routes.API_PROFILES} className="">
        <div className="landing_nav_api_option_icon">
          <img src={SSOSmall} alt="Single sign on icon" />
        </div>
        <div className="landing_nav_api_option_text">
          <h4>
            Authentication (SSO)
          </h4>
          <p>
            Seamlessly onboard users to your application
          </p>
        </div>
      </Link>
    </div> */}
      <div
        className="landing_nav_api_option"
        onClick={props.handleAPI}
        onKeyPress={props.handleDropdown}
        role="button"
        tabIndex={0}
      >
        <Link to={routes.API_PROFILES}>
          <div className="landing_nav_api_option_icon">
            <img src={ProfilesSmall} alt="Single sign on icon" />
          </div>
          <div className="landing_nav_api_option_text">
            <h4>
              Profiles
            </h4>
            <p>
              Support social profiles and basic reputation
            </p>
          </div>
        </Link>
      </div>
      <div
        className="landing_nav_api_option"
        onClick={props.handleAPI}
        onKeyPress={props.handleDropdown}
        role="button"
        tabIndex={0}
      >
        <Link to={routes.API_MESSAGING}>
          <div className="landing_nav_api_option_icon">
            <img src={MessagingSmall} alt="Single sign on icon" />
          </div>
          <div className="landing_nav_api_option_text">
            <h4>
              Messaging
            </h4>
            <p>
              Add decentralized chat, messaging, and commenting
            </p>
          </div>
        </Link>
      </div>
      <div
        className="landing_nav_api_option"
        onClick={props.handleAPI}
        onKeyPress={props.handleDropdown}
        role="button"
        tabIndex={0}
      >
        <Link to={routes.API_STORAGE}>
          <div className="landing_nav_api_option_icon">
            <img src={StorageSmall} alt="Single sign on icon" />
          </div>
          <div className="landing_nav_api_option_text">
            <h4>
              Storage
            </h4>
            <p>
              Store user data in a private database just for your app
            </p>
          </div>
        </Link>
      </div>
    </div>
  </div>
);

export default MobileSidedrawer;