import React from 'react';
import Michael from '../assets/me.jpg';
import './styles/ProfileCard.css';

const ProfileCardSmall = () => (
  <div className="profileCardSmall">
    <img src={Michael} className="profileCardSmall_user_picture" alt="profile" />
    <div className="profileCard_user_info">
    
      <h4 className="profileCardSmall_user_name">Joseph Lubin</h4>

      <div id="profile_network_icon" />
      <p className="profileCardSmall_address">0x123456789</p>
    </div>
  </div>
);

export default ProfileCardSmall;
