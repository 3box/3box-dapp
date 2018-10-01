import React from 'react';

import Feed from '../components/Feed.jsx';
import ProfileDetails from '../components/ProfileDetails.jsx';
import './styles/Profile.css';

const Profile = () => (
  <div id="profile_page">
    <div id="profile_contents">
      <ProfileDetails />
      <Feed />
      <div id="profile_gutter" />
    </div>
  </div>
);

export default Profile;
