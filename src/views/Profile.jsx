import React from 'react';
import { withRouter } from 'react-router-dom';

import ProfileContent from '../components/ProfileContent.jsx';
// import ProfileDetails from '../components/ProfileDetails.jsx';
import ProfileCategories from '../components/ProfileCategories.jsx';
import Nav from '../components/Nav.jsx';
import './styles/Profile.css';

const Profile = () => (
  <div>
    <Nav />
    <div id="profile__page">
      <div id="profile__contents">
        <ProfileCategories />
        <ProfileContent />
      </div>
    </div>
  </div>
);

export default withRouter(Profile);
