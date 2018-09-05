import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './styles/Footer.css';
import ThreeBoxLogo from './ThreeBoxLogo';

export function Header(props) {
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

Header.propTypes = {
  web3: PropTypes.object,
};

Header.defaultProps = {
  web3: null,
};

export default Header;