import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Michael from '../assets/me.jpg';
import './styles/Nav.css';
import ThreeBoxLogo from './ThreeBoxLogo';
import * as routes from '../utils/routes';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showProfileModal: false,
    };
  }

  handleDropdown = () => {
    const { showProfileModal } = this.state;
    this.setState({
      showProfileModal: !showProfileModal,
    });
  }

  render() {
    const { showProfileModal } = this.state;
    return (
      <nav>
        <ThreeBoxLogo />
        <img src={Michael} id="header_user_picture" alt="profile" onClick={this.handleDropdown} role="button"/>

        {showProfileModal
          && (
            <li id="dropdown" onMouseLeave={this.handleDropdown} onClick={this.handleDropdown}>
              <ul>
                <Link to={routes.PROFILE}><li>Profile</li></Link>
                <div className="divide" />
                <Link to={routes.PROFILE}><li>Sign Out</li></Link>
              </ul>
            </li>
          )
        }
      </nav>
    );
  }
}

Nav.propTypes = {
  web3: PropTypes.object,
};

Nav.defaultProps = {
  web3: null,
};

export default Nav;