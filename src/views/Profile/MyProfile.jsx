import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import MyContent from './MyProfile/MyContent';
import SideBar from './SideBar';
import Nav from '../../components/Nav';
import './styles/Profile.css';

class Profile extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const {
      otherImage,
      otherName,
      otherProfileAddress,
    } = this.props;

    return (
      <div>
        <Helmet>
          <title>{otherName}</title>
          <meta name="description" content={`3Box Profile for ${otherProfileAddress}`} />

          <meta property="og:description" content={`3Box Profile for ${otherProfileAddress}`} />
          <meta property="og:url" content={`https://3box.io/${otherProfileAddress}`} />
          <meta property="og:title" content={otherName} />
          <meta property="og:image" content={`${otherImage ? `https://ipfs.infura.io/ipfs/${otherImage[0].contentUrl['/']}` : ''}`} />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@3boxdb" />
          <meta name="twitter:title" content={otherName} />
          <meta name="twitter:description" content={`3Box Profile for ${otherProfileAddress}`} />
          <meta name="twitter:image" content={`${otherImage ? `https://ipfs.infura.io/ipfs/${otherImage[0].contentUrl['/']}` : ''}`} />
        </Helmet>

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

const mapState = state => ({
  otherName: state.otherProfile.otherName,
  otherImage: state.otherProfile.otherImage,
  otherProfileAddress: state.otherProfile.otherProfileAddress,
});

export default withRouter(connect(mapState)(Profile));