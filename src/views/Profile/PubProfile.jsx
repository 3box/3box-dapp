import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Helmet } from 'react-helmet';

import actions from '../../state/actions';
import { store } from '../../state/store';
import {
  PublicProfileLoading,
  SignInThroughPublicProfileBanner,
  FollowingListModal,
  ModalBackground,
} from '../../components/Modals';
import PubContent from './PublicProfile/PubContent';
import SideBar from './SideBar';
import './styles/Profile.css';
import PubProfileHeaders from './PublicProfile/PubProfileHeaders';

const {
  handleShowSignInBanner,
  handleContactsModal,
  handleHideSignInBanner,
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
  constructor(props) {
    super(props);
    this.state = {
      isFollowing: false,
    };
  }

  // 

  async componentDidMount() {
    try {
      window.scrollTo(0, 0);
      const { location: { pathname }, currentAddress } = this.props;
      const otherProfileAddress = pathname.split('/')[1];

      this.updateUIState(otherProfileAddress);
      await this.handleWeb3Checks(currentAddress, otherProfileAddress);
      await
        this.checkFollowingAndMutual(otherProfileAddress);
      await this.getProfile(otherProfileAddress);
    } catch (err) {
      console.error(err);
    }
  }

  async componentWillReceiveProps(nextProps) {
    const { location: { pathname }, following, otherFollowing, currentAddress } = this.props;
    const otherProfileAddress = pathname.split('/')[1];
    const nextProfileAddress = nextProps.location.pathname.split('/')[1];

    if ((nextProps.following !== following) ||
      (nextProps.otherFollowing !== otherFollowing)) {
      this.checkFollowingAndMutual(
        otherProfileAddress,
        nextProps.following,
        nextProps.otherFollowing,
      );
    }

    if (otherProfileAddress !== nextProfileAddress) {
      this.updateUIState(nextProfileAddress);
      await this.handleWeb3Checks(currentAddress, nextProfileAddress);
      this.checkFollowingAndMutual(nextProfileAddress);
      await this.getProfile(nextProfileAddress);
    }
  }

  componentWillUnmount() {
    store.dispatch({
      type: 'OTHER_ADDRESS_UPDATE',
      otherProfileAddress: '',
    });
    store.dispatch({
      type: 'UI_ON_OTHER_PROFILE',
      onOtherProfilePage: false,
    });
  }

  updateUIState = (otherProfileAddress) => {
    store.dispatch({
      type: 'OTHER_ADDRESS_UPDATE',
      otherProfileAddress,
    });
    store.dispatch({
      type: 'UI_ON_OTHER_PROFILE',
      onOtherProfilePage: true,
    });
  }

  handleWeb3Checks = async (currentAddress, otherProfileAddress) => {
    let activeAddress;
    if (typeof window.web3 !== 'undefined') {
      if (!currentAddress) {
        const returnedAddress = await accountsPromise;
        [activeAddress] = returnedAddress;
      } else {
        activeAddress = currentAddress;
      }
      if (otherProfileAddress === activeAddress) {
        this.props.handleShowSignInBanner()
      } else {
        this.props.handleHideSignInBanner();
      }
      await this.props.checkNetwork();
    }
  }

  getProfile = async (otherProfileAddress) => {
    await this.props.getOtherProfile(otherProfileAddress);
    this.props.getCollectibles(otherProfileAddress, true);
    this.props.getActivity(otherProfileAddress);
  }

  checkFollowingAndMutual = (otherProfileAddress, nextFollowing, nextOtherFollowing) => {
    const { following, otherFollowing } = this.props;
    const updatedFollowing = nextFollowing || following;
    const updatedOtherFollowing = nextOtherFollowing || otherFollowing;

    updatedFollowing.forEach((user) => {
      if (user[1] === otherProfileAddress) this.setState({ isFollowing: true });
    });

    const otherFollowingAddresses = updatedOtherFollowing.map(user => user[1]);
    const otherMutualFollowing = updatedFollowing.filter(x => otherFollowingAddresses.includes(x[1]));
    store.dispatch({
      type: 'OTHER_MUTUAL_FOLLOWING',
      otherMutualFollowing: otherMutualFollowing.slice(),
    });
  }

  render() {
    const {
      isLoadingOtherProfile,
      showSignInBanner,
      showContactsModal,
      otherFollowing,
      following,
      isLoggedIn,
      otherImage,
      otherName,
      otherProfileAddress,
      handleHideSignInBanner,
    } = this.props;

    const { isFollowing } = this.state;

    return (
      <div>
        <PubProfileHeaders
          otherName={otherName}
          otherProfileAddress={otherProfileAddress}
          otherImage={otherImage}
        />

        <SignInThroughPublicProfileBanner
          show={showSignInBanner}
          handleHideSignInBanner={this.props.handleHideSignInBanner}
        />

        <div id="profile__page">
          <div id="profile__contents">
            <SideBar
              isPublicProfilePage
              isFollowing={isFollowing}
            />
            <PubContent />
          </div>

          <ReactCSSTransitionGroup
            transitionName="app__modals"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
          >

            {isLoadingOtherProfile && <PublicProfileLoading />}
            {showContactsModal && (
              <FollowingListModal
                otherFollowing={otherFollowing}
                otherName={otherName}
                following={following}
                handleContactsModal={this.props.handleContactsModal}
              />)}

            {showContactsModal && <ModalBackground />}
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
}

ProfilePublic.propTypes = {
  getOtherProfile: PropTypes.func.isRequired,
  checkNetwork: PropTypes.func.isRequired,
  getActivity: PropTypes.func.isRequired,
  handleShowSignInBanner: PropTypes.func.isRequired,
  handleHideSignInBanner: PropTypes.func.isRequired,
  handleContactsModal: PropTypes.func.isRequired,
  getCollectibles: PropTypes.func.isRequired,
  pathname: PropTypes.object,
  location: PropTypes.object,
  isLoadingOtherProfile: PropTypes.bool,
  showSignInBanner: PropTypes.bool,
  showContactsModal: PropTypes.bool,
  currentAddress: PropTypes.string,
  following: PropTypes.array,
  otherFollowing: PropTypes.array,
  otherImage: PropTypes.object,
  otherName: PropTypes.string,
  otherProfileAddress: PropTypes.string,
};

ProfilePublic.defaultProps = {
  pathname: {},
  location: {},
  isLoadingOtherProfile: true,
  showSignInBanner: false,
  showContactsModal: false,
  currentAddress: '',
  otherName: '',
  following: [],
  otherFollowing: [],
  otherProfileAddress: '',
};

const mapState = state => ({
  isLoadingOtherProfile: state.otherProfile.isLoadingOtherProfile,
  showSignInBanner: state.uiState.showSignInBanner,
  showContactsModal: state.uiState.showContactsModal,
  currentAddress: state.userState.currentAddress,
  following: state.myData.following,
  otherFollowing: state.otherProfile.otherFollowing,
  otherName: state.otherProfile.otherName,
  otherImage: state.otherProfile.otherImage,
  otherProfileAddress: state.otherProfile.otherProfileAddress,
});

export default withRouter(connect(mapState,
  {
    getOtherProfile,
    checkNetwork,
    getActivity,
    handleShowSignInBanner,
    handleHideSignInBanner,
    handleContactsModal,
    getCollectibles,
  })(ProfilePublic));