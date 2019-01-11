import React, { Component } from 'react';

import Feed from '../components/Feed.jsx';
import ProfileDetails from '../components/ProfileDetails.jsx';
import Nav from '../components/Nav.jsx';
import './styles/Profile.css';

class Profile extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
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
  }
}

export default Profile;
