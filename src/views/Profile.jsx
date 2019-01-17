import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';

import Content from '../components/Profile/Content';
import SideBar from '../components/Profile/SideBar';
import Nav from '../components/Nav';
import { address } from '../utils/address';
import * as routes from '../utils/routes';
import './styles/Profile.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copySuccessful: false,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  copyToClipBoard = (e) => {
    const textArea = document.createElement('textarea');
    const profileURL = `https://www.3box.io${routes.PUBLIC_BASE}/${address}${routes.PUBLIC_ACTIVITY_ROUTE}`;
    textArea.value = profileURL;
    try {
      document.body.appendChild(textArea);
      textArea.focus({
        preventScroll: true,
      });
      textArea.select();
      document.execCommand('copy');
      setTimeout(() => {
        this.setState({
          copySuccessful: true,
        });
      }, 1);
      setTimeout(() => {
        this.setState({
          copySuccessful: false,
        });
      }, 2000);
    } catch (err) {
      console.error('Unable to copy', err);
    }
    document.body.removeChild(textArea);
  }

  render() {
    const { copySuccessful } = this.state;
    console.log(copySuccessful);
    return (
      <div>
        <Nav />
        <div id="profile__page">
          <div id="profile__contents">
            <SideBar show={copySuccessful} copyToClipBoard={this.copyToClipBoard} />
            <Content />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Profile);
