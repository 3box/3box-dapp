import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import actions from '../../state/actions';
import { store } from '../../state/store';
import {
  PublicProfileLoading,
  SignInThroughPublicProfileBanner,
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
      isMe: false,
    };
  }

  async componentDidMount() {
    try {
      window.scrollTo(0, 0);
      window.prerenderReady = false;

      const { location: { pathname }, currentAddress } = this.props;
      const otherProfileAddress = pathname.split('/')[1];

      this.updateUIState(otherProfileAddress);
      await this.handleWeb3Checks(currentAddress, otherProfileAddress);
      await this.checkFollowingAndMutual(otherProfileAddress);
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
    const { currentAddress } = this.props;

    const myAddress = currentAddress || window.localStorage.getItem('userEthAddress');
    this.setState({ isMe: otherProfileAddress.toLowerCase() === myAddress });

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
        this.props.handleShowSignInBanner();
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

    const checkIfFollowing = user => user[1] !== otherProfileAddress;

    if (updatedFollowing.every(checkIfFollowing)) {
      this.setState({ isFollowing: false });
    } else {
      this.setState({ isFollowing: true });
    }

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
      otherImage,
      otherName,
      otherProfileAddress,
    } = this.props;

    const { isFollowing, isMe } = this.state;

    return (
      <React.Fragment>
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
              isMe={isMe}
            />
            <PubContent />
          </div>

          <ReactCSSTransitionGroup
            transitionName="app__modals"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
          >

            {isLoadingOtherProfile && <PublicProfileLoading />}

            {/* {showContactsModal && (
              <FollowingListModal
                otherFollowing={otherFollowing}
                otherName={otherName}
                following={following}
                otherProfileAddress={otherProfileAddress}
                handleContactsModal={this.props.handleContactsModal}
              />
            )} */}

          </ReactCSSTransitionGroup>
        </div>
      </React.Fragment>
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
  otherImage: PropTypes.array,
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
  showSignInBanner: state.uiState.showSignInBanner,
  showContactsModal: state.uiState.showContactsModal,
  currentAddress: state.userState.currentAddress,

  following: state.myData.following,

  isLoadingOtherProfile: state.otherProfile.isLoadingOtherProfile,
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