import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Michael from '../assets/me.jpg';
import './styles/Nav.css';
import ThreeBoxLogo from './ThreeBoxLogo';

export function Nav(props) {
  return (
    <nav>
      <ThreeBoxLogo />
      <Link to="/Profile">
        <img src={Michael} id="header_user_picture" alt="profile" />
      </Link>
    </nav>
  );
}

Nav.propTypes = {
  web3: PropTypes.object,
};

Nav.defaultProps = {
  web3: null,
};

export default Nav;