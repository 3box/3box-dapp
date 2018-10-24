import React from 'react';
import Deva from '../assets/Deva.png';
import GithubIcon from '../assets/GithubIcon.svg';
import Email from '../assets/Email.svg';
import Private from '../assets/Private.svg';
import './styles/ProfileCard.css';

const ProfileCard = () => (
  <div className="profileCard">
    <img src={Deva} id="profileCard__user__picture" alt="profile" />
    <div className="profileCard__user__info">

      <h2 id="profileCard__username">Deva the Unicorn</h2>

      <div id="profileCard__network">
        <div id="profileCard__network__icon" />
        <p id="profile_address">0x123456789</p>
      </div>

      <div id="profile__card__social">
        <img src={GithubIcon} className="profileCard__icon" alt="Github Icon" />
        <p id="profile__github">ethereum</p>
      </div>

      <div id="profile__card__social">
        <img src={Email} className="profileCard__icon" alt="Github Icon" />
        <p id="profile__email">deva@3box.io</p>
        <img id="editprofile__privateIcon" src={Private} alt="Private" title="Information with this icon are accessible only by those you've given permission to." />
      </div>

    </div>
  </div>
);

export default ProfileCard;
