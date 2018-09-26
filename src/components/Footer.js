import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './styles/Footer.css';
import ThreeBoxLogo from './ThreeBoxLogo.jsx';

export function Footer(props) {
  return (
    <div id="footer">

      <ThreeBoxLogo />

      <ul id="footer_links">

        <Link to="/About">
          <li>About 3Box</li>
        </Link>

        <a href="https://github.com/uport-project/3box">
          <li>Github Docs</li>
        </a>

        <a href="https://mailchi.mp/c671ca2b8093/3box">
          <li>Join our community</li>
        </a>

      </ul>
    </div>
  );
}

Footer.propTypes = {
  web3: PropTypes.object,
};

Footer.defaultProps = {
  web3: null,
};

export default Footer;