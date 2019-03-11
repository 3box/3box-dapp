import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from '../../state/actions';
import {
  PublicProfileLoading,
  SignInThroughPublicProfileBanner,
} from '../../components/Modals.jsx';
import { store } from '../../state/store';
import PubContent from '../../components/Profile/PublicProfile/PubContent';
import SideBar from '../../components/Profile/SideBar';
import '../styles/Profile.css';

const {
  handleSignInBanner,
} = actions.modal;

const {
  checkNetwork,
} = actions.land;

const {
  accountsPromise,
} = actions.signin;

const {
  getOtherProfile,
  getActivity,
  getCollectibles,
} = actions.profile;

class ProfilePublic extends Component {
  async componentDidMount() {
    window.scrollTo(0, 0);
    const { location: { pathname }, currentAddress } = this.props;
    const otherProfileAddress = pathname.split('/')[1];
    let activeAddress;

    store.dispatch({
      type: 'UPDATE_OTHER_PROFILE',
      otherProfileAddress,
    });
    store.dispatch({
      type: 'ON_OTHER_PROFILE',
      onOtherProfilePage: true,
    });

    if (typeof window.web3 !== 'undefined') {
      if (!currentAddress) {
        const returnedAddress = await accountsPromise;
        [activeAddress] = returnedAddress;
      } else {
        activeAddress = currentAddress;
      }
      if (otherProfileAddress === activeAddress) this.props.handleSignInBanner();
      await this.props.checkNetwork();
    }

    await this.props.getOtherProfile(otherProfileAddress);
    this.props.getCollectibles(otherProfileAddress, true);
    this.props.getActivity(otherProfileAddress);
  }

  componentWillUnmount() {
    store.dispatch({
      type: 'UPDATE_OTHER_PROFILE',
      otherProfileAddress: '',
    });
    store.dispatch({
      type: 'ON_OTHER_PROFILE',
      onOtherProfilePage: false,
    });
  }

  render() {
    const { isLoadingOtherProfile, showSignInBanner } = this.props;
    return (
      <div>
        <SignInThroughPublicProfileBanner show={showSignInBanner} handleSignInBanner={this.props.handleSignInBanner} />
        <div
          id="profile__page"
        >
          <div id="profile__contents">
            <SideBar isPublicProfilePage />
            <PubContent />
          </div>
          <PublicProfileLoading show={isLoadingOtherProfile} />
        </div>
      </div>
    );
  }
}

ProfilePublic.propTypes = {
  getOtherProfile: PropTypes.func.isRequired,
  checkNetwork: PropTypes.func.isRequired,
  getActivity: PropTypes.func.isRequired,
  handleSignInBanner: PropTypes.func.isRequired,
  getCollectibles: PropTypes.func.isRequired,
  pathname: PropTypes.object,
  location: PropTypes.object,
  isLoadingOtherProfile: PropTypes.bool,
  showSignInBanner: PropTypes.bool,
  currentAddress: PropTypes.string,
};

ProfilePublic.defaultProps = {
  pathname: {},
  location: {},
  isLoadingOtherProfile: true,
  showSignInBanner: false,
  currentAddress: '',
};

const mapState = state => ({
  isLoadingOtherProfile: state.otherProfile.isLoadingOtherProfile,
  showSignInBanner: state.uiState.showSignInBanner,
  currentAddress: state.userState.currentAddress,
});

export default withRouter(connect(mapState,
  {
    getOtherProfile,
    checkNetwork,
    getActivity,
    handleSignInBanner,
    getCollectibles,
  })(ProfilePublic));
