import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import GithubIcon from '../assets/GithubIcon.svg';
import './styles/ProfileDetails.css';

const address = web3.eth.accounts[0]; // eslint-disable-line no-undef

const ProfileDetails = ({ name, github, image, email }) => (
  <div id="profile">
    {image.length > 0
      ? <img src={`https://ipfs.io/ipfs/${image[0].contentUrl['/']}`} id="profile_user_picture" alt="profile" />
      : <div id="profile_user_picture" />
    }

    <div id="profile_user_info">
      <h2 id="profile_user_name">{name}</h2>

      <div id="profile_network_network_div">
        <div id="profile_network" />
        <p id="profile_address">
          {address}
          <span className="tooltiptext">{address}</span>
        </p>
      </div>

      <div id="profile_network_social">
        <img src={GithubIcon} id="profile_githubIcon" alt="Github Icon" />
        <p id="profile_github">{github}</p>
      </div>

      <p className="subheader" id="profile_private_header">PRIVATE</p>
      <p id="profile_email">{email}</p>
    </div>
    <Link to="/EditProfile">
      <button id="profile_edit_button" type="button">
        Edit
        </button>
    </Link>
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
