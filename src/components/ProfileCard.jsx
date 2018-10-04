import React from 'react';
import Deva from '../assets/Deva.png';
import GithubIcon from '../assets/GithubIcon.svg';
import Email from '../assets/Email.svg';
import Private from '../assets/Private.svg';
import './styles/ProfileCard.css';

const ProfileCard = () => (
  <div className="profileCard">
    <img src={Deva} id="profileCard_user_picture" alt="profile" />
    <div className="profileCard_user_info">

      <h2 id="profile_card_username">Deva the Unicorn</h2>

      <div id="profile_card_network">
        <div id="profile_card_network_icon" />
        <p id="profile_address">0x123456789</p>
      </div>

      <div id="profile_card_social">
        <img src={GithubIcon} className="profile_card_icon" alt="Github Icon" />
        <p id="profile_github">ethereum</p>
      </div>

      <div id="profile_card_social">
        <img src={Email} className="profile_card_icon" alt="Github Icon" />
        <p id="profile_email">deva@3box.io</p>
        <img id="editprofile_privateIcon" src={Private} alt="Private" title="Information with this icon are accessible only by those you've given permission to." />
      </div>

    </div>
  </div>
);

export default ProfileCard;
