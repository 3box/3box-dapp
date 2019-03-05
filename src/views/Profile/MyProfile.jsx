import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';

import Content from '../../components/Profile/MyProfile/Content';
import SideBar from '../../components/Profile/SideBar';
import Nav from '../../components/Nav';
import '../styles/Profile.css';

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
            <SideBar />
            <Content />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Profile);
