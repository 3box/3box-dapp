import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  getProfile,
  getActivity,
} from '../state/actions';
import {
  PublicProfileLoading,
} from '../components/Modals.jsx';
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
    const publicProfileAddress = pathname.split('/')[1];
    const normalizedPath = normalizeURL(pathname);

    store.dispatch({
      type: 'UPDATE_ROUTE',
      currentRoute: normalizedPath,
      onPublicProfilePage: true,
    });

    this.props.getProfile(publicProfileAddress);
    this.props.getActivity(publicProfileAddress);
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
    const { isLoadingPublicProfile } = this.props;
    return (
      <div>
        <Nav />
        <div id="profile__page">
          <div id="profile__contents">
            <SideBar isPublicProfilePage />
            <PubContent />
          </div>
          <PublicProfileLoading show={isLoadingPublicProfile} />
        </div>
      </div>
    );
  }
}

ProfilePublic.propTypes = {
  getProfile: PropTypes.func.isRequired,
  getActivity: PropTypes.func.isRequired,
  pathname: PropTypes.object,
  location: PropTypes.object,
  isLoadingPublicProfile: PropTypes.bool,
};

ProfilePublic.defaultProps = {
  pathname: {},
  location: {},
  isLoadingPublicProfile: true,
};

const mapState = state => ({
  isLoadingPublicProfile: state.threeBox.isLoadingPublicProfile,
});

export default withRouter(connect(mapState,
  {
    getProfile,
    getActivity,
  })(ProfilePublic));
