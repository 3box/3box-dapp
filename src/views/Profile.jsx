import React from 'react';

import Feed from '../components/Feed';
import Nav from '../components/Nav';
import ProfileDetails from '../components/ProfileDetails.jsx';

const Profile = () => (
  <div>
    <Nav />
    <ProfileDetails />
    <Feed />
  </div>
);

export default Profile;
