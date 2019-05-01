import React from 'react';
import { Link } from 'react-router-dom';

import MailChimp from '../../../components/MailChimp';
import * as routes from '../../../utils/routes';
import ThreeBoxLogo from '../../../assets/ThreeBoxLogoWhite.svg';

const Footer = () => (
  <React.Fragment>
    <section className="join">
      <h3>
        Towards a better web for all
      </h3>
      <p>
        Join our mailing list to never miss an update.
      </p>
      <form className="join_input">
        {/* <input type="text" placeholder="Subscribe to email" />
        <button type="button">
          Join
        </button> */}
        <MailChimp />
      </form>
      <div className="footer_line" />
    </section>
    <footer>
      <div className="footer_wrapper">
        <div className="footer_lane">
          <img src={ThreeBoxLogo} alt="3Box logo" className="footer_logo" />
        </div>
        <div className="footer_lane">
          <h5>
            PRODUCTS
          </h5>
          <Link to={routes.API_PROFILES}>
            Profiles API
          </Link>
          <Link to={routes.API_MESSAGING}>
            Messaging API
          </Link>
          <Link to={routes.API_STORAGE}>
            Storage API
          </Link>
          <Link to={routes.HUB}>
            Hub App
          </Link>
        </div>
        <div className="footer_lane">
          <h5>
            DOCS
          </h5>
          <a href="https://github.com/3box/3box" target="_blank" rel="noopener noreferrer">
            Overview
          </a>
        </div>
        <div className="footer_lane">
          <h5>
            MORE
          </h5>
          <p>
            About
          </p>
          <Link to={routes.JOBS}>
            Careers
          </Link>
          <a href="https://chat.3box.io" target="_blank" rel="noopener noreferrer">
            Chat
          </a>
        </div>
        <div className="footer_lane">
          <div>
            <Link to={routes.HUB}>
              <button type="button">
                Sign in to Hub
              </button>
            </Link>
          </div>
          <div>

          </div>
        </div>
      </div>
    </footer>
  </React.Fragment>
);

export default Footer;