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
import Categories from '../components/Profile/Categories';
import Nav from '../components/Nav';
import './styles/Profile.css';


class ProfilePublic extends Component {
  componentWillMount() {
    console.log('willUmount');
    window.removeEventListener('resize', this.handleWindowSizeChange);
    window.removeEventListener('scroll', this.hideBar);
  }

  async componentDidMount() {
    const { location: { pathname } } = this.props;
    const profileAddress = pathname.split('/')[2];
    this.props.getActivity(profileAddress);
    this.props.getProfile(profileAddress);
  }

  render() {
    console.log('in profile public');
    return (
      <div>
        <Nav />
        <div id="profile__page">
          <div id="profile__contents">
            <Categories />
            <Content
              publicProfile={this.props.publicProfile}
              publicProfileActivity={this.props.publicProfileActivity}
              publicVerifiedAccounts={this.props.publicVerifiedAccounts}
            />
          </div>
        </div>
      </div>
    );
  }
}

ProfilePublic.propTypes = {
  box: PropTypes.object,
  pathname: PropTypes.object,
  location: PropTypes.object,
  publicProfile: PropTypes.object,
  publicProfileActivity: PropTypes.array,
  getProfile: PropTypes.func,
  getActivity: PropTypes.func,
  getProfilesVerifiedAccounts: PropTypes.func,
};

ProfilePublic.defaultProps = {
  box: {},
  pathname: {},
  publicProfile: {},
  publicProfileActivity: [],
  location: {},
  getProfile: getProfile(),
  getActivity: getActivity(),
  getProfilesVerifiedAccounts: getProfilesVerifiedAccounts(),
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
