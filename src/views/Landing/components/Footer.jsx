import React from 'react';

import ThreeBoxLogo from '../../../assets/ThreeBoxLogoWhite.svg';

const Footer = () => (
  <footer>
    <div className="footer_wrapper">
      <div className="footer_lane">
        <img src={ThreeBoxLogo} alt="3Box logo" className="footer_logo" />
      </div>
      <div className="footer_lane">
        <h5>
          PRODUCTS
    </h5>
        <p>
          Profiles API
    </p>
        <p>
          Messaging API
    </p>
        <p>
          Storage API
    </p>
        <p>
          Hub App
    </p>
      </div>
      <div className="footer_lane">
        <h5>
          DOCS
    </h5>
        <p>
          Overview
    </p>
      </div>
      <div className="footer_lane">
        <h5>
          MORE
    </h5>
        <p>
          Partners
    </p>
        <p>
          About
    </p>
        <p>
          Team
    </p>
        <p>
          Careers
    </p>
        <p>
          Chat
    </p>
      </div>
      <div className="footer_lane">
        <div>
          <button type="button">
            Sign in to Hub
      </button>
        </div>
        <div>

        </div>
      </div>
    </div>
  </footer>
);

export default Footer;