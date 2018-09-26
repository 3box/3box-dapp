import React from 'react';
import Joe from '../assets/Joe.jpg';
import GithubIcon from '../assets/GithubIcon.svg';
import './styles/ProfileCard.css';

const ProfileCard = () => (
  <div className="profileCard">
    <img src={Joe} id="profileCard_user_picture" alt="profile" />
    <div className="profileCard_user_info">

      <h2 id="profile_user_name">Joseph Lubin</h2>

      <div>
        <div id="profile_network_icon" />
        <p id="profile_address">0x123456789</p>
      </div>

      <div>
        <img src={GithubIcon} id="profile_githubIcon" alt="Github Icon" />
        <p id="profile_github">jmlubin</p>
      </div>

      <p className="subheader" id="profile_private_header">PRIVATE</p>
      <p id="profile_email">joe@consensys.net</p>
    </div>
  </div>
);

export default ProfileCard;
