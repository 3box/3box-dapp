import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
    const { image } = this.props;
    return (
      <nav>
        <ThreeBoxLogo />
        <img src={image.length > 0 ? `https://ipfs.io/ipfs/${image[0].contentUrl['/']}` : undefined} id="header_user_picture" alt="profile" onClick={this.handleDropdown} role="button" />

        {showProfileModal
          && (
            <li id="dropdown" onMouseLeave={this.handleDropdown} onClick={this.handleDropdown}>
              <ul>
                <Link to={routes.PROFILE}><li>Profile</li></Link>
                <Link to={routes.EDITPROFILE}><li>Edit profile</li></Link>
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
  image: PropTypes.array,
};

Nav.defaultProps = {
  image: [],
};

function mapState(state) {
  return {
    image: state.threeBoxData.image,
  };
}

export default connect(mapState)(Nav);

