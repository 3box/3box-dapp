import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  getProfile,
  getActivity,
  getProfilesVerifiedAccounts,
} from '../state/actions';
import Content from '../components/Profile/Content';
import SideBar from '../components/Profile/SideBar';
import Nav from '../components/Nav';
import './styles/Profile.css';

class ProfilePublic extends Component {
  async componentDidMount() {
    window.scrollTo(0, 0);
    const { location: { pathname } } = this.props;
    const profileAddress = pathname.split('/')[2];
    this.props.getActivity(profileAddress);
    this.props.getProfile(profileAddress);
  }

  render() {
    const { publicProfile, publicProfileActivity, publicVerifiedAccounts } = this.props;
    return (
      <div>
        <Nav />
        <div id="profile__page">
          <div id="profile__contents">
            <SideBar isPublicProfilePage />
            <Content
              publicProfile={publicProfile}
              publicProfileActivity={publicProfileActivity}
              publicVerifiedAccounts={publicVerifiedAccounts}
              isPublicProfilePage
            />
          </div>
        </div>
      </div>
    );
  }
}

ProfilePublic.propTypes = {
  getProfile: PropTypes.func.isRequired,
  getActivity: PropTypes.func.isRequired,
  publicVerifiedAccounts: PropTypes.object,
  box: PropTypes.object,
  pathname: PropTypes.object,
  location: PropTypes.object,
  publicProfile: PropTypes.object,
  publicProfileActivity: PropTypes.array,
};

ProfilePublic.defaultProps = {
  box: {},
  pathname: {},
  publicProfile: {},
  publicProfileActivity: [],
  location: {},
};

const mapState = state => ({
  box: state.threeBox.box,
  publicProfile: state.threeBox.publicProfile,
  publicProfileActivity: state.threeBox.publicProfileActivity,
});

export default withRouter(connect(mapState,
  {
    getProfile,
    getProfilesVerifiedAccounts,
    getActivity,
  })(ProfilePublic));
