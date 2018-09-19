import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { address } from '../utils/address';

import EthereumLogo from '../assets/Ethereum_logo_2014.svg';
import GithubIcon from '../assets/GithubIcon.svg';
import './styles/ProfileDetails.css';

const ProfileDetails = ({ name, github, image, email }) => (
  <div id="profile">

    <div id="profile_user_info">
      {image.length > 0
        ? <img src={`https://ipfs.io/ipfs/${image[0].contentUrl['/']}`} id="profile_user_picture" alt="profile" />
        : <div id="profile_user_picture" />
      }
      <h2 id="profile_user_name">{name}</h2>

      <div id="profile_network">
        <img className="feed_activity_tile_networkLogo" src={EthereumLogo} alt="Ethereum Logo" />
        <p id="profile_address" title={address}>
          {address}
          <span className="tooltiptext">{address}</span>
        </p>
      </div>

      <div id="profile_social">
        <img src={GithubIcon} id="profile_githubIcon" alt="Github Icon" />
        <p id="profile_github">{github}</p>
      </div>

      <div id="profile_private">
        <p id="profile_private_header" className="subheader">Private</p>
        <p id="profile_email">{email}</p>
      </div>

      <div id="profile_edit">
        <Link to="/EditProfile" id="profile_edit_button">
          Edit
        </Link>
      </div>

    </div>

    <div id="profile_footer">
      <div id="profile_footer_contents">
        <Link to="/About">
          <li>About 3Box</li>
        </Link>
        <a href="https://github.com/uport-project/3box">
          <li>Github Docs</li>
        </a>
        <a href="https://mailchi.mp/c671ca2b8093/3box">
          <li>Join our community</li>
        </a>
      </div>
    </div>
  </div>
);

ProfileDetails.propTypes = {
  name: PropTypes.string,
  github: PropTypes.string,
  email: PropTypes.string,
  image: PropTypes.array,
};

ProfileDetails.defaultProps = {
  name: '',
  github: '',
  email: '',
  image: [],
};

function mapState(state) {
  console.log(state);
  return {
    name: state.threeBoxData.name,
    github: state.threeBoxData.github,
    image: state.threeBoxData.image,
    email: state.threeBoxData.email,
  };
}

function mapDispatch(/* dispatch */) {
  return {};
}

export default connect(mapState, mapDispatch)(ProfileDetails);
