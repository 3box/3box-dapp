import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { address } from '../utils/address';
import {
  getProfile,
  getActivity,
} from '../state/actions';
import {
  PublicProfileLoading,
  SignInThroughPublicProfileBanner,
} from '../components/Modals.jsx';
import {
  handleSignInBanner,
} from '../state/actions-modals';
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

    if (publicProfileAddress === address) this.props.handleSignInBanner();
    this.props.getProfile(publicProfileAddress);
    this.props.getActivity(publicProfileAddress);

  }

  // componentWillUnmount() {
  //   const { location: { pathname } } = this.props;
  //   const normalizedPath = normalizeURL(pathname);

  //   store.dispatch({
  //     type: 'UPDATE_ROUTE',
  //     currentRoute: normalizedPath,
  //     onPublicProfilePage: false,
  //   });
  // }

  render() {
    const { isLoadingPublicProfile, showSignInBanner } = this.props;
    return (
      <div>
        <SignInThroughPublicProfileBanner show={showSignInBanner} handleSignInBanner={this.props.handleSignInBanner} />
        <Nav />
        <div
          id="profile__page"
        >
          <div id="profile__contents">
            <SideBar isPublicProfilePage />
            <PubContent showSignInBanner={showSignInBanner}/>
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
  handleSignInBanner: PropTypes.func.isRequired,
  pathname: PropTypes.object,
  location: PropTypes.object,
  isLoadingPublicProfile: PropTypes.bool,
  showSignInBanner: PropTypes.bool,
};

ProfilePublic.defaultProps = {
  pathname: {},
  location: {},
  isLoadingPublicProfile: true,
  showSignInBanner: false,
};

const mapState = state => ({
  isLoadingPublicProfile: state.threeBox.isLoadingPublicProfile,
  showSignInBanner: state.threeBox.showSignInBanner,
});

export default withRouter(connect(mapState,
  {
    getProfile,
    getActivity,
    handleSignInBanner,
  })(ProfilePublic));
