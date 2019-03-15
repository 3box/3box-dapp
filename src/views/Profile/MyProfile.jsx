import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';

import MyContent from './MyProfile/MyContent';
import SideBar from './SideBar';
import Nav from '../../components/Nav';
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
            <SideBar />
            <MyContent />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Profile);