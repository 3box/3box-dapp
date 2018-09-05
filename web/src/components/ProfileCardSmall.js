import React from 'react';
import Michael from '../assets/me.jpg';
import './styles/ProfileCard.css';
// import PropTypes from 'prop-types';

const ProfileCardSmall = () => (
  <div className="profileCardSmall">
    <img src={Michael} className="profileCardSmall_user_picture" alt="profile" />
    <div className="profileCard_user_info">
    
      <h4 className="profileCardSmall_user_name">Joseph Lubin</h4>

      <div id="profile_network" />
      <p className="profileCardSmall_address">0x123456789</p>
    </div>
  </div>
);

ProfileCardSmall.propTypes = {
};

export default ProfileCardSmall;
