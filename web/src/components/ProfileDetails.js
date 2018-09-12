import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import GithubIcon from '../assets/GithubIcon.svg';
import './styles/ProfileDetails.css';

const address = web3.eth.accounts[0]; // eslint-disable-line no-undef

const ProfileDetails = ({ name, github, image }) => (
  <div id="profile">
    <img src={image.length > 0 && `https://ipfs.io/ipfs/${image[0].contentUrl['/']}`} id="profile_user_picture" alt="profile" />

    <div id="profile_user_info">
      <h2 id="profile_user_name">{name && name}</h2>

      <div id="profile_network_network_div">
        <div id="profile_network" />
        <p id="profile_address">
          {address}
          <span className="tooltiptext">{address}</span>
        </p>
      </div>

      <div id="profile_network_social">
        <img src={GithubIcon} id="profile_githubIcon" alt="Github Icon" />
        <p id="profile_github">{github && github}</p>
      </div>

      <p className="subheader" id="profile_private_header">PRIVATE</p>
      <p id="profile_email">mowen@gmail.com</p>
    </div>
    <Link to="/EditProfile">
      <button id="profile_edit_button" type="button">
        Edit
      </button>
    </Link>
  </div>
);

ProfileDetails.propTypes = {
  name: PropTypes.string,
  github: PropTypes.string,
  image: PropTypes.array,
};

ProfileDetails.defaultProps = {
  name: '',
  github: '',
  image: [],
};

function mapState(state) {
  console.log(state);
  return {
    name: state.threeBoxData.name,
    github: state.threeBoxData.github,
    image: state.threeBoxData.image,
  };
}

function mapDispatch(/* dispatch */) {
  return {};
}

export default connect(mapState, mapDispatch)(ProfileDetails);
