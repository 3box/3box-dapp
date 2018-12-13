import React from 'react';

import Feed from '../components/Feed.jsx';
import ProfileDetails from '../components/ProfileDetails.jsx';
import Nav from '../components/Nav.jsx';
import './styles/Profile.css';

const Profile = () => (
  <div>
    <Nav />
    <div id="profile__page">
      <div id="profile__contents">
        <ProfileDetails />
        <Feed />
      </div>
    </div>
  </div>
);

export default Profile;
