import React from 'react';
import Michael from '../assets/me.jpg';
import './styles/ProfileCard.css';

const ProfileCardSmall = () => (
  <div className="profileCardSmall">
    <img src={Michael} className="profileCardSmall__user__picture" alt="profile" />
    <div className="profileCard__user__info">
    
      <h4 className="profileCardSmall__user__name">Joseph Lubin</h4>

      <div id="profile__network__icon" />
      <p className="profileCardSmall__address">0x123456789</p>
    </div>
  </div>
);

export default ProfileCardSmall;
