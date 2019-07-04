import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { store } from '../../../state/store';
import actions from '../../../state/actions';
import Loading from '../../../assets/Loading.svg';

const {
  saveFollowing,
  deleteFollowing,
  getMyProfileValue,
  getMyDID,
  getCollectibles,
  getMyMemberSince,
  getVerifiedPublicGithub,
  getVerifiedPublicTwitter,
  getVerifiedPrivateEmail,
  getActivity,
} = actions.profile;

const { getMySpacesData, convert3BoxToSpaces } = actions.spaces;

const {
  openBox,
  requestAccess,
} = actions.signin;

const {
  checkWeb3,
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
    this.state = {
      showHoverText: 'Following',
    };
    this.handleFollowing = this.handleFollowing.bind(this);
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

      await this.props.getCollectibles(currentAddress);
      await this.props.convert3BoxToSpaces();
      await this.props.getMySpacesData(currentAddress);

      this.props.getActivity();
    } catch (err) {
      console.error(err);
    }
  }

  handleShowHover = (showHoverText) => {
    this.setState({ showHoverText });
  }

  async handleSignInUp() {
    const {
      accessDeniedModal,
    } = this.props;

    try {
      if (window.ethereum || typeof window.web3 !== 'undefined') {
        await this.props.checkWeb3();
        await this.props.requestAccess();
        await this.props.checkNetwork();

        if (this.props.isSignedIntoWallet) {
          await this.props.openBox(false, true);
          if (!this.props.showErrorModal) await this.getMyData();
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

  async handleFollowing() {
    const {
      fromContactTile,
      handleTileLoading,
      isLoggedIn,
      contactTileAddress,
      otherProfileAddress,
      isFollowing,
    } = this.props;

    const whichFollowButton = fromContactTile ? 'isFollowFromTileLoading' : 'isFollowFromProfileLoading';
    const whichReduxAction = fromContactTile ? 'UI_FOLLOW_LOADING_TILE' : 'UI_FOLLOW_LOADING_PROFILE';
    const deleteOrSave = isFollowing ? 'deleteFollowing' : 'saveFollowing';
    const address = contactTileAddress || otherProfileAddress;

    store.dispatch({
      type: whichReduxAction,
      [whichFollowButton]: true,
    });

    if (!isLoggedIn) await this.handleSignInUp();

    await this.props[deleteOrSave](address);

    store.dispatch({
      type: whichReduxAction,
      [whichFollowButton]: false,
    });
    if (fromContactTile) handleTileLoading();
  }

  render() {
    const {
      isFollowing,
      isFollowFromProfileLoading,
      isFollowFromTileLoading,
      isLoading,
    } = this.props;

    const { showHoverText } = this.state;

    if (isFollowing) {
      return (
        <button
          type="button"
          className="outlineButton unfollowButton followActionButton"
          onClick={this.handleFollowing}
          onMouseEnter={() => this.handleShowHover('Unfollow')}
          onMouseLeave={() => this.handleShowHover('Following')}
        >
          {isFollowFromProfileLoading && <img src={Loading} alt="loading" />}
          {(isFollowFromTileLoading && isLoading) && <img src={Loading} alt="loading" />}
          {((!isFollowFromTileLoading || (!isFollowFromProfileLoading && !isLoading))) && showHoverText}
        </button>
      );
    }

    return (
      <button
        type="button"
        className="followButton followActionButton"
        onClick={this.handleFollowing}
      >
        {(isFollowFromProfileLoading) && <img src={Loading} alt="loading" />}
        {(isFollowFromTileLoading && isLoading) && <img src={Loading} alt="loading" />}
        {(!isFollowFromTileLoading || (!isFollowFromProfileLoading && !isLoading)) && 'Follow'}
      </button>
    );
  }
}

FollowButton.propTypes = {
  saveFollowing: PropTypes.func.isRequired,
  deleteFollowing: PropTypes.func.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool,
  isFollowFromTileLoading: PropTypes.bool,
  isFollowFromProfileLoading: PropTypes.bool,
  otherProfileAddress: PropTypes.string,
  currentAddress: PropTypes.string,
  contactTileAddress: PropTypes.string,
  openBox: PropTypes.func.isRequired,
  getMyProfileValue: PropTypes.func.isRequired,
  getMyDID: PropTypes.func.isRequired,
  getCollectibles: PropTypes.func.isRequired,
  getMyMemberSince: PropTypes.func.isRequired,
  getVerifiedPublicGithub: PropTypes.func.isRequired,
  getVerifiedPublicTwitter: PropTypes.func.isRequired,
  getVerifiedPrivateEmail: PropTypes.func.isRequired,
  getActivity: PropTypes.func.isRequired,
  getMySpacesData: PropTypes.func.isRequired,
  convert3BoxToSpaces: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  accessDeniedModal: PropTypes.bool,
  isSignedIntoWallet: PropTypes.bool,
  showErrorModal: PropTypes.bool,
  fromContactTile: PropTypes.bool,
  handleRequireWalletLoginModal: PropTypes.func.isRequired,
  handleMobileWalletModal: PropTypes.func.isRequired,
  requireMetaMaskModal: PropTypes.func.isRequired,
  handleTileLoading: PropTypes.func.isRequired,
};

FollowButton.defaultProps = {
  otherProfileAddress: '',
  currentAddress: '',
  contactTileAddress: '',
  isLoggedIn: false,
  isFollowFromProfileLoading: false,
  isFollowFromTileLoading: false,
  accessDeniedModal: false,
  isSignedIntoWallet: false,
  showErrorModal: false,
  fromContactTile: false,
};

function mapState(state) {
  return {
    otherProfileAddress: state.otherProfile.otherProfileAddress,
    currentAddress: state.userState.currentAddress,
    isLoggedIn: state.userState.isLoggedIn,
    isFollowFromTileLoading: state.uiState.isFollowFromTileLoading,
    isFollowFromProfileLoading: state.uiState.isFollowFromProfileLoading,
    accessDeniedModal: state.uiState.accessDeniedModal,
    showErrorModal: state.uiState.showErrorModal,
    isSignedIntoWallet: state.userState.isSignedIntoWallet,
  };
}

export default connect(mapState,
  {
    requestAccess,
    checkWeb3,
    checkNetwork,
    saveFollowing,
    deleteFollowing,
    openBox,
    getMyProfileValue,
    getMyDID,
    getCollectibles,
    getMyMemberSince,
    getVerifiedPublicGithub,
    getVerifiedPublicTwitter,
    getVerifiedPrivateEmail,
    getActivity,
    getMySpacesData,
    convert3BoxToSpaces,
    handleRequireWalletLoginModal,
    handleMobileWalletModal,
    requireMetaMaskModal,
  })(FollowButton);
