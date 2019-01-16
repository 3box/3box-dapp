import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';

import Content from '../components/Profile/Content';
import Categories from '../components/Profile/Categories';
import Nav from '../components/Nav';
import './styles/Profile.css';

class Profile extends Component {
  componentWillMount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
    window.removeEventListener('scroll', this.hideBar);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div>
        <Nav />
        <div id="profile__page">
          <div id="profile__contents">
            <Categories />
            <Content />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Profile);
