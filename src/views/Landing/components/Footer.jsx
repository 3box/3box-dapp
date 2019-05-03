import React from 'react';
import { Link } from 'react-router-dom';

import MailChimp from '../../../components/MailChimp';
import * as routes from '../../../utils/routes';
import ThreeBoxLogo from '../../../assets/ThreeBoxLogoWhite.svg';
import GithubIconWhite from '../../../assets/GithubIconWhite.svg';
import MediumIconWhite from '../../../assets/MediumIconWhite.svg';
import MolliePsychedelic from '../../../assets/MolliePsychedelic.png';
import Twitter from '../../../assets/twitterWhite.svg';
import Discord from '../../../assets/discordWhite.svg';

const Footer = () => (
  <React.Fragment>
    <section className="join">
      <h3>
        Towards a better web for all
      </h3>
      <p>
        Join our mailing list to never miss an update.
      </p>
      <div className="join_input">
        <MailChimp />
      </div>
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
          {/* <p>
            About
          </p> */}
          <Link to={routes.JOBS}>
            Careers
          </Link>
          <a href="https://chat.3box.io" target="_blank" rel="noopener noreferrer">
            Chat
          </a>
        </div>
        <div className="footer_lane rightLane">
          <div>
            <Link to={routes.HUB}>
              <button type="button">
                Sign in to Hub
              </button>
            </Link>
          </div>
          <div>
            <ul className="footer__gutter__social">
              <a href="https://github.com/uport-project/3box" target="_blank" rel="noopener noreferrer">
                <img src={GithubIconWhite} className="footer__socialIcons" alt="Github link" />
              </a>
              <a href="https://medium.com/3box " target="_blank" rel="noopener noreferrer">
                <img src={MediumIconWhite} className="footer__socialIcons" alt="Medium link" />
              </a>
              <a href="https://twitter.com/3boxdb" title="Twitter" target="_blank" rel="noopener noreferrer">
                <img src={Twitter} className="footer__socialIcons" alt="Twitter link" />
              </a>
              <a href="https://discordapp.com/channels/484729862368526356/485438421054128128" title="Discord" target="_blank" rel="noopener noreferrer">
                <img src={Discord} className="footer__socialIcons" alt="Discord link" />
              </a>
            </ul>
            <div className="footer_privacy">
              <Link to={routes.PRIVACY}>
                Privacy
              </Link>
              <p>|</p>
              <Link to={routes.TERMS}>
                Terms
              </Link>
            </div>
            <div className="footer_copyright">
              <p>3Box Copyright 2019</p>
            </div>
          </div>
        </div>
      </div>
      <img src={MolliePsychedelic} alt="Mollie" className="footer_mollie" />
    </footer>
  </React.Fragment>
);

export default Footer;