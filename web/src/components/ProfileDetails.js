import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ThreeBox from '3box';

import Michael from '../assets/me.jpg';
import GithubIcon from '../assets/GithubIcon.svg';
import './styles/ProfileDetails.css';

ThreeBox.openBox('0x357F7C9eADd36fd38Ade53561a033b41Cc15157d')
  .then((threeBox) => {
    console.log(threeBox);
  });

const ProfileDetails = () => (
  <div id="profile">
    <img src={Michael} id="profile_user_picture" alt="profile" />

    <div id="profile_user_info">
      <h2 id="profile_user_name">Michael Owen</h2>

      <div id="profile_network_network_div">
        <div id="profile_network" />
        <p id="profile_address">0x123456789</p>
      </div>

      <div id="profile_network_social">
        <img src={GithubIcon} id="profile_githubIcon" alt="Github Icon" />
        <p id="profile_github">mowen</p>
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
};

export default ProfileDetails;
