import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  getProfile,
  getActivity,
  getProfilesVerifiedAccounts,
} from '../state/actions';
import { store } from '../state/store';
import { normalizeURL } from '../utils/funcs';
import PubContent from '../components/Profile/PubContent';
import SideBar from '../components/Profile/SideBar';
import Nav from '../components/Nav';
import './styles/Profile.css';

class ProfilePublic extends Component {
  async componentDidMount() {
    window.scrollTo(0, 0);
    const { location: { pathname } } = this.props;
    const profileAddress = pathname.split('/')[1];
    const normalizedPath = normalizeURL(pathname);
    
    store.dispatch({
      type: 'UPDATE_ROUTE',
      currentRoute: normalizedPath,
      onPublicProfilePage: true,
    });

    this.props.getActivity(profileAddress);
    this.props.getProfile(profileAddress);
  }

  componentWillUnmount() {
    const { location: { pathname } } = this.props;
    const normalizedPath = normalizeURL(pathname);

    store.dispatch({
      type: 'UPDATE_ROUTE',
      currentRoute: normalizedPath,
      onPublicProfilePage: false,
    });
  }

  render() {
    return (
      <div>
        <Nav />
        <div id="profile__page">
          <div id="profile__contents">
            <SideBar isPublicProfilePage />
            <PubContent />
          </div>
        </div>
      </div>
    );
  }
}

ProfilePublic.propTypes = {
  getProfile: PropTypes.func.isRequired,
  getActivity: PropTypes.func.isRequired,
  box: PropTypes.object,
  pathname: PropTypes.object,
  location: PropTypes.object,
};

ProfilePublic.defaultProps = {
  box: {},
  pathname: {},
  location: {},
};

const mapState = state => ({
  box: state.threeBox.box,
});

export default withRouter(connect(mapState,
  {
    getProfile,
    getProfilesVerifiedAccounts,
    getActivity,
  })(ProfilePublic));
