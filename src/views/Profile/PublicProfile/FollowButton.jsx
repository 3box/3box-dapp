import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { store } from '../../../state/store';
import actions from '../../../state/actions';
import Loading from '../../../assets/Loading.svg';

const {
  saveFollowing,
  getMyProfileValue,
  getMyDID,
  getCollectibles,
  getMyMemberSince,
  getVerifiedPublicGithub,
  getVerifiedPublicTwitter,
  getVerifiedPrivateEmail,
  getActivity,
  getMyFollowing,
  initializeSaveFollowing,
} = actions.profile;

const { getMySpacesData, convert3BoxToSpaces } = actions.spaces;

const {
  openBox,
  injectWeb3,
} = actions.signin;

const {
  checkMobileWeb3,
  checkNetwork,
} = actions.land;

const {
  handleRequireWalletLoginModal,
  requireMetaMaskModal,
  handleMobileWalletModal,
} = actions.modal;

class FollowButton extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  async getMyData() {
    const { currentAddress } = this.props;
    store.dispatch({
      type: 'UI_SPACES_LOADING',
      isSpacesLoading: true,
    });

    try {
      this.props.getVerifiedPublicGithub();
      this.props.getVerifiedPublicTwitter();
      this.props.getVerifiedPrivateEmail();
      this.props.getMyMemberSince();
      this.props.getMyDID();
      this.props.getMyProfileValue('public', 'status');
      this.props.getMyProfileValue('public', 'name');
      this.props.getMyProfileValue('public', 'description');
      this.props.getMyProfileValue('public', 'image');
      this.props.getMyProfileValue('public', 'coverPhoto');
      this.props.getMyProfileValue('public', 'location');
      this.props.getMyProfileValue('public', 'website');
      this.props.getMyProfileValue('public', 'employer');
      this.props.getMyProfileValue('public', 'job');
      this.props.getMyProfileValue('public', 'school');
      this.props.getMyProfileValue('public', 'degree');
      this.props.getMyProfileValue('public', 'major');
      this.props.getMyProfileValue('public', 'year');
      this.props.getMyProfileValue('public', 'emoji');
      this.props.getMyProfileValue('private', 'birthday');

      await this.props.getMyFollowing();
      await this.props.getCollectibles(currentAddress);
      await this.props.convert3BoxToSpaces();
      await this.props.getMySpacesData(currentAddress);

      this.props.getActivity();
    } catch (err) {
      console.error(err);
    }
  }

  async handleSignInUp() {
    const {
      accessDeniedModal,
    } = this.props;

    try {
      if (window.ethereum || typeof window.web3 !== 'undefined') {
        await this.props.checkMobileWeb3();
        await this.props.injectWeb3();
        await this.props.checkNetwork();

        if (this.props.isSignedIntoWallet) {
          await this.props.openBox(false, true);
          if (!this.props.showErrorModal) this.getMyData();
        } else if (!this.props.isSignedIntoWallet && !accessDeniedModal) {
          this.props.handleRequireWalletLoginModal();
        }
      } else if (typeof window.web3 === 'undefined') {
        this.props.requireMetaMaskModal();
        this.props.handleMobileWalletModal();
      }
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const {
      isFollowing,
      otherProfileAddress,
      isLoggedIn,
      isFollowLoading,
      contactTileAddress,
      fromContactTile,
      isLoading,
    } = this.props;

    if (isFollowing) {
      return (
        <button
          type="button"
          className="outlineButton unfollowButton followActionButton"
          onClick={
            async () => {
              store.dispatch({
                type: 'UI_SPACES_LOADING',
                isSpacesLoading: true,
              });

              if (!isLoggedIn) await this.handleSignInUp();

              await this.props.initializeSaveFollowing(contactTileAddress || otherProfileAddress);
              await this.props.saveFollowing(contactTileAddress || otherProfileAddress, true);
              store.dispatch({
                type: 'UI_FOLLOW_LOADING',
                isFollowLoading: false,
              });
            }}
        >
          {(!fromContactTile && isFollowLoading) && <img src={Loading} alt="loading" />}
          {(fromContactTile && isFollowLoading && isLoading) && <img src={Loading} alt="loading" />}
        </button>
      );
    }

    return (
      <button
        type="button"
        className="followButton followActionButton"
        onClick={
          async () => {
            store.dispatch({
              type: 'UI_FOLLOW_LOADING',
              isFollowLoading: true,
            });

            if (!isLoggedIn) await this.handleSignInUp();

            const shouldSave = await this.props.initializeSaveFollowing(contactTileAddress || otherProfileAddress, true);
            if (shouldSave) await this.props.saveFollowing(contactTileAddress || otherProfileAddress);
            store.dispatch({
              type: 'UI_FOLLOW_LOADING',
              isFollowLoading: false,
            });
          }}
      >
        {(!fromContactTile && isFollowLoading) && <img src={Loading} alt="loading" />}
        {(fromContactTile && isFollowLoading && isLoading) && <img src={Loading} alt="loading" />}
        Follow
      </button>
    );
  }
}

FollowButton.propTypes = {
  saveFollowing: PropTypes.func.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool,
  isFollowLoading: PropTypes.bool,
  otherProfileAddress: PropTypes.string,
  currentAddress: PropTypes.string,
  openBox: PropTypes.func.isRequired,
  getMyProfileValue: PropTypes.func.isRequired,
  getMyDID: PropTypes.func.isRequired,
  getCollectibles: PropTypes.func.isRequired,
  getMyMemberSince: PropTypes.func.isRequired,
  getVerifiedPublicGithub: PropTypes.func.isRequired,
  getVerifiedPublicTwitter: PropTypes.func.isRequired,
  getVerifiedPrivateEmail: PropTypes.func.isRequired,
  getActivity: PropTypes.func.isRequired,
  getMyFollowing: PropTypes.func.isRequired,
  getMySpacesData: PropTypes.func.isRequired,
  convert3BoxToSpaces: PropTypes.func.isRequired,
  accessDeniedModal: PropTypes.bool,
  isSignedIntoWallet: PropTypes.bool,
  showErrorModal: PropTypes.bool,
  handleRequireWalletLoginModal: PropTypes.func.isRequired,
  handleMobileWalletModal: PropTypes.func.isRequired,
  requireMetaMaskModal: PropTypes.func.isRequired,
};

FollowButton.defaultProps = {
  otherProfileAddress: '',
  currentAddress: '',
  isLoggedIn: false,
  isFollowLoading: false,
  accessDeniedModal: false,
  isSignedIntoWallet: false,
  showErrorModal: false,
};

function mapState(state) {
  return {
    otherProfileAddress: state.otherProfile.otherProfileAddress,
    currentAddress: state.userState.currentAddress,
    isLoggedIn: state.userState.isLoggedIn,
    isFollowLoading: state.uiState.isFollowLoading,
    accessDeniedModal: state.uiState.accessDeniedModal,
    showErrorModal: state.uiState.showErrorModal,
    isSignedIntoWallet: state.userState.isSignedIntoWallet,
  };
}

export default connect(mapState,
  {
    injectWeb3,
    checkMobileWeb3,
    checkNetwork,
    saveFollowing,
    openBox,
    getMyProfileValue,
    getMyDID,
    getCollectibles,
    getMyMemberSince,
    getVerifiedPublicGithub,
    getVerifiedPublicTwitter,
    getVerifiedPrivateEmail,
    getActivity,
    getMyFollowing,
    getMySpacesData,
    convert3BoxToSpaces,
    handleRequireWalletLoginModal,
    handleMobileWalletModal,
    requireMetaMaskModal,
    initializeSaveFollowing,
  })(FollowButton);
