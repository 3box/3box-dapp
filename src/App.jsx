import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import queryString from 'query-string';

import * as routes from './utils/routes';
import {
  initialAddress,
} from './utils/address';
import {
  normalizeURL,
  matchProtectedRoutes,
  checkIsEthAddress,
  checkRequestRoute,
} from './utils/funcs';
import { followingSpaceName } from './utils/constants';
import history from './utils/history';
import { store } from './state/store';
import actions from './state/actions';
import getMyData from './state/actions/profile/getMyData';

import AppRoutes from './AppRoutes';
import AppPreviewRoutes from './AppPreviewRoutes';
import {
  AppModals,
  AppHeaders,
  NavLanding,
  Nav,
  ChatboxComponent,
} from './DynamicImports';
import './index.scss';
import SimpleID from 'simpleid-js-sdk';

new SimpleID({
  appOrigin: window.location.origin,
  appName: "App Name",
  appId: "YOUR APP ID HERE",
  useSimpledIdWidget: false,
  network: 'mainnet'
});

const {
  handleSignInModal,
  closeErrorModal,
  handleSwitchedNetworkModal,
  handleAccessModal,
  handleConsentModal,
  handleDeniedAccessModal,
  handleLoggedOutModal,
  handleSwitchedAddressModal,
  handleOnboardingModal,
  handleFollowingPublicModal,
  handleContactsModal,
  handleUnsupportedBrowserModal,
} = actions.modal;

const {
  getPublicFollowing,
} = actions.profile;

const {
  openBox,
  handleSignOut,
  injectWeb3,
  clearReduxState,
} = actions.signin;

const {
  checkMobileWeb3,
  checkNetwork,
} = actions.land;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onBoardingModalMobileOne: false,
      onBoardingModalMobileTwo: false,
      onBoardingModalMobileThree: false,
    };
  }

  async componentDidMount() {
    try {
      const { location: { pathname, search } } = this.props;
      const normalizedPath = normalizeURL(pathname);
      const splitRoute = normalizedPath.split('/');
      const firstParam = splitRoute[1] && splitRoute[1].toLowerCase();
      const isProtectedRoute = matchProtectedRoutes(splitRoute[2]);
      const queryParams = queryString.parse(search);
      const isRequest = checkRequestRoute(splitRoute);
      if (isRequest) return;

      const currentEthAddress = await initialAddress(); // Initial get address
      const isEthAddr = checkIsEthAddress(firstParam);
      const isMyAddr = firstParam === currentEthAddress;
      const onProfilePage = isEthAddr;
      const isWalletConnectDefault = window.localStorage.getItem('defaultWallet') === 'WalletConnect';

      const allowDirectSignIn = (
        (isEthAddr // Lands on profile page
          && isProtectedRoute // Lands on protected page
          && isMyAddr)
        || !!queryParams.wallet
      );

      if (isWalletConnectDefault && allowDirectSignIn) {
        history.push('/login');
        return;
      }

      if (allowDirectSignIn) { // Begin signin
        this.directSignIn(queryParams.wallet);
      } else if (onProfilePage) { // Lands on profile page
        const userEth = window.localStorage.getItem('userEthAddress');
        if (userEth) getPublicFollowing(userEth);
        if (isProtectedRoute) history.push(`/${firstParam}`);
      }
    } catch (err) {
      console.error(err);
    }
  }

  componentWillReceiveProps(nextProps) {
    const onSyncDoneToTrigger = nextProps.onSyncFinished && nextProps.isSyncing;
    const { location: { search } } = nextProps;
    const queryParams = queryString.parse(search);
    const { location } = this.props;
    const isNewPath = nextProps.location.pathname !== location.pathname;

    if (queryParams.wallet && isNewPath) this.directSignIn(queryParams.wallet, nextProps);
    if (onSyncDoneToTrigger) { // get profile data again only when onSyncDone
      store.dispatch({ // end onSyncDone animation
        type: 'UI_APP_SYNC',
        onSyncFinished: true,
        isSyncing: false,
      });
      const fromOnSyncDone = true;
      getMyData(fromOnSyncDone);
    }
  }

  handleNextMobileModal = (thisModal, nextModal) => {
    this.setState({
      [`onBoardingModalMobile${thisModal}`]: false,
      [`onBoardingModalMobile${nextModal}`]: true,
    });
  }

  directSignIn = async (wallet, nextProps) => {
    try {
      store.dispatch({
        type: 'UI_3BOX_LOADING',
        isFetchingThreeBox: true,
      });

      const { location: { pathname } } = this.props;
      const pathToUse = nextProps ? nextProps.location.pathname : pathname;
      const normalizedPath = normalizeURL(pathToUse);
      const currentUrlEthAddr = normalizedPath.split('/')[1];
      const profilePage = normalizedPath.split('/')[2];
      const doesEthAddrMatch = currentUrlEthAddr === this.props.currentAddress;

      await this.props.checkMobileWeb3();
      await this.props.injectWeb3('directLogin', false, wallet);
      await this.props.checkNetwork();

      if (!doesEthAddrMatch) history.push(`/${this.props.currentAddress}/${profilePage || routes.directToHome()}`);

      await this.props.openBox();
      if (!this.props.showErrorModal) getMyData();
    } catch (err) {
      console.error(err);
      store.dispatch({
        type: 'UI_3BOX_LOADING',
        isFetchingThreeBox: false,
      });
    }
  }

  handleSignInUp = async (chooseWallet, shouldSignOut, e, fromPost) => {
    try {
      if (e) e.stopPropagation();
      await this.props.checkMobileWeb3();
      await this.props.injectWeb3(null, chooseWallet, false, shouldSignOut);
      await this.props.checkNetwork();
      await this.props.openBox(true, fromPost);
      if (!this.props.showErrorModal) getMyData();
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const {
      showDifferentNetworkModal,
      accessDeniedModal,
      errorMessage,
      allowAccessModal,
      provideConsent,
      signInModal,
      directLogin,
      loggedOutModal,
      switchedAddressModal,
      prevNetwork,
      currentNetwork,
      onBoardingModal,
      onBoardingModalTwo,
      isFetchingThreeBox,
      prevAddress,
      showErrorModal,
      isLoggedIn,
      location: { pathname },
      onSyncFinished,
      isSyncing,
      hasSignedOut,
      onOtherProfilePage,
      showFollowingPublicModal,
      otherAddressToFollow,
      showContactsModal,
      otherFollowing,
      otherName,
      following,
      otherProfileAddress,
      fixBody,
      showUnsupportedBrowser,
      box,
      currentAddress,
    } = this.props;

    const {
      onBoardingModalMobileOne,
      onBoardingModalMobileTwo,
      onBoardingModalMobileThree,
    } = this.state;

    const normalizedPath = normalizeURL(pathname);
    const mustConsentError = errorMessage && errorMessage.message && errorMessage.message.substring(0, 65) === 'Error: Web3 Wallet Message Signature: User denied message signature.';
    const landing = pathname === routes.LANDING ? 'landing' : '';
    const isMyProfilePath = matchProtectedRoutes(normalizedPath.split('/')[2]);

    const splitRoute = normalizedPath.split('/');
    const isRequestRoute = checkRequestRoute(splitRoute);
    const isNotLoginPage = splitRoute[1] !== 'login';

    if (isRequestRoute) return <AppPreviewRoutes />; // routes for when client request is for link preview

    return (
      <div className={`App ${(fixBody && isNotLoginPage) ? 'fixBody' : ''}`}>
        <AppHeaders />

        {(!isMyProfilePath && !isLoggedIn) // show landing nav when user is not logged in, 3box is not fetching, and when route is not a protected route
          && (
            <NavLanding
              handleSignInUp={this.handleSignInUp}
              onOtherProfilePage={onOtherProfilePage}
              landing={landing}
              pathname={normalizedPath}
            />
          )}

        {(!isMyProfilePath && isLoggedIn) && <Nav handleSignInUp={this.handleSignInUp} />}

        <AppModals
          isFetchingThreeBox={isFetchingThreeBox}
          onSyncFinished={onSyncFinished}
          isSyncing={isSyncing}
          hasSignedOut={hasSignedOut}
          allowAccessModal={allowAccessModal}
          directLogin={directLogin}
          isMyProfilePath={isMyProfilePath}
          accessDeniedModal={accessDeniedModal}
          signInModal={signInModal}
          errorMessage={errorMessage}
          mustConsentError={mustConsentError}
          showErrorModal={showErrorModal}
          prevNetwork={prevNetwork}
          currentNetwork={currentNetwork}
          showDifferentNetworkModal={showDifferentNetworkModal}
          loggedOutModal={loggedOutModal}
          switchedAddressModal={switchedAddressModal}
          prevAddress={prevAddress}
          onBoardingModal={onBoardingModal}
          onBoardingModalTwo={onBoardingModalTwo}
          provideConsent={provideConsent}
          showContactsModal={showContactsModal}
          showFollowingPublicModal={showFollowingPublicModal}
          onBoardingModalMobileOne={onBoardingModalMobileOne}
          onBoardingModalMobileTwo={onBoardingModalMobileTwo}
          onBoardingModalMobileThree={onBoardingModalMobileThree}
          otherAddressToFollow={otherAddressToFollow}
          otherFollowing={otherFollowing}
          otherName={otherName}
          following={following}
          otherProfileAddress={otherProfileAddress}
          showUnsupportedBrowser={showUnsupportedBrowser}
          handleContactsModal={this.props.handleContactsModal}
          handleSignInModal={this.props.handleSignInModal}
          handleConsentModal={this.props.handleConsentModal}
          handleDeniedAccessModal={this.props.handleDeniedAccessModal}
          closeErrorModal={this.props.closeErrorModal}
          handleSwitchedNetworkModal={this.props.handleSwitchedNetworkModal}
          handleLoggedOutModal={this.props.handleLoggedOutModal}
          handleSignOut={this.props.handleSignOut}
          handleSwitchedAddressModal={this.props.handleSwitchedAddressModal}
          handleOnboardingModal={this.props.handleOnboardingModal}
          handleAccessModal={this.props.handleAccessModal}
          handleNextMobileModal={this.handleNextMobileModal}
          handleFollowingPublicModal={this.props.handleFollowingPublicModal}
          handleUnsupportedBrowserModal={this.props.handleUnsupportedBrowserModal}
        />

        {isMyProfilePath && (
          <ChatboxComponent
            spaceName={followingSpaceName}
            threadName="chatbox"
            box={box}
            currentUserAddr={currentAddress}
            agentProfile={{
              chatName: '3Box Chat',
              imageUrl: null,
            }}
            popupChat
            userProfileURL={(address) => `https://3box.io/${address}`}
          />
        )}

        <AppRoutes
          handleSignInUp={this.handleSignInUp}
          isLoggedIn={isLoggedIn}
          errorMessage={errorMessage}
          showErrorModal={showErrorModal}
        />
      </div>
    );
  }
}

App.propTypes = {
  openBox: PropTypes.func.isRequired,
  injectWeb3: PropTypes.func.isRequired,
  checkMobileWeb3: PropTypes.func.isRequired,
  handleSwitchedNetworkModal: PropTypes.func.isRequired,
  handleAccessModal: PropTypes.func.isRequired,
  handleConsentModal: PropTypes.func.isRequired,
  handleDeniedAccessModal: PropTypes.func.isRequired,
  handleSignInModal: PropTypes.func.isRequired,
  handleSignOut: PropTypes.func,
  checkNetwork: PropTypes.func.isRequired,
  closeErrorModal: PropTypes.func.isRequired,
  handleLoggedOutModal: PropTypes.func.isRequired,
  handleSwitchedAddressModal: PropTypes.func.isRequired,
  handleOnboardingModal: PropTypes.func.isRequired,

  showDifferentNetworkModal: PropTypes.bool,
  showFollowingPublicModal: PropTypes.bool,
  showUnsupportedBrowser: PropTypes.bool,
  onSyncFinished: PropTypes.bool,
  hasSignedOut: PropTypes.bool,
  isSyncing: PropTypes.bool,
  accessDeniedModal: PropTypes.bool,
  errorMessage: PropTypes.string,
  allowAccessModal: PropTypes.bool,
  provideConsent: PropTypes.bool,
  signInModal: PropTypes.bool,
  fixBody: PropTypes.bool,
  showErrorModal: PropTypes.bool,
  directLogin: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  loggedOutModal: PropTypes.bool,
  switchedAddressModal: PropTypes.bool,
  onBoardingModal: PropTypes.bool,
  onBoardingModalTwo: PropTypes.bool,
  isFetchingThreeBox: PropTypes.bool,
  showContactsModal: PropTypes.bool,
  onOtherProfilePage: PropTypes.bool,
  prevNetwork: PropTypes.string,
  currentNetwork: PropTypes.string,
  currentAddress: PropTypes.string,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,

  }).isRequired,
  prevAddress: PropTypes.string,
  otherAddressToFollow: PropTypes.string,
  otherName: PropTypes.string,
  otherProfileAddress: PropTypes.string,
  following: PropTypes.array,
  otherFollowing: PropTypes.array,
  box: PropTypes.object,
};

App.defaultProps = {
  showDifferentNetworkModal: false,
  fixBody: false,
  handleSignOut,
  accessDeniedModal: false,
  showUnsupportedBrowser: false,
  onSyncFinished: false,
  hasSignedOut: false,
  onOtherProfilePage: false,
  showFollowingPublicModal: false,
  isSyncing: false,
  showContactsModal: false,
  errorMessage: '',
  allowAccessModal: false,
  provideConsent: false,
  signInModal: false,
  showErrorModal: false,
  loggedOutModal: false,
  switchedAddressModal: false,
  onBoardingModal: false,
  onBoardingModalTwo: false,
  isFetchingThreeBox: false,
  isLoggedIn: false,
  prevNetwork: '',
  currentNetwork: '',
  prevAddress: '',
  directLogin: '',
  currentAddress: '',
  otherAddressToFollow: '',
  otherFollowing: [],
  otherName: '',
  following: [],
  otherProfileAddress: '',
};

const mapState = (state) => ({
  showDifferentNetworkModal: state.uiState.showDifferentNetworkModal,
  allowAccessModal: state.uiState.allowAccessModal,
  provideConsent: state.uiState.provideConsent,
  signInModal: state.uiState.signInModal,
  directLogin: state.uiState.directLogin,
  loggedOutModal: state.uiState.loggedOutModal,
  switchedAddressModal: state.uiState.switchedAddressModal,
  onBoardingModal: state.uiState.onBoardingModal,
  onBoardingModalTwo: state.uiState.onBoardingModalTwo,
  isFetchingThreeBox: state.uiState.isFetchingThreeBox,
  errorMessage: state.uiState.errorMessage,
  prevAddress: state.uiState.prevAddress,
  showErrorModal: state.uiState.showErrorModal,
  accessDeniedModal: state.uiState.accessDeniedModal,
  onOtherProfilePage: state.uiState.onOtherProfilePage,
  showFollowingPublicModal: state.uiState.showFollowingPublicModal,
  showContactsModal: state.uiState.showContactsModal,
  showUnsupportedBrowser: state.uiState.showUnsupportedBrowser,
  fixBody: state.uiState.fixBody,
  onSyncFinished: state.uiState.onSyncFinished,
  isSyncing: state.uiState.isSyncing,

  hasSignedOut: state.userState.hasSignedOut,
  prevNetwork: state.userState.prevNetwork,
  currentNetwork: state.userState.currentNetwork,
  isLoggedIn: state.userState.isLoggedIn,
  currentAddress: state.userState.currentAddress,
  isMobile: state.userState.isMobile,

  otherAddressToFollow: state.otherProfile.otherAddressToFollow,
  otherFollowing: state.otherProfile.otherFollowing,
  otherName: state.otherProfile.otherName,
  following: state.myData.following,
  otherProfileAddress: state.otherProfile.otherProfileAddress,

  box: state.myData.box,
});

export default withRouter(connect(mapState,
  {
    openBox,
    injectWeb3,
    checkMobileWeb3,
    checkNetwork,
    handleSignInModal,
    handleSwitchedNetworkModal,
    handleAccessModal,
    handleConsentModal,
    handleDeniedAccessModal,
    handleLoggedOutModal,
    handleSignOut,
    handleSwitchedAddressModal,
    handleOnboardingModal,
    handleFollowingPublicModal,
    closeErrorModal,
    handleContactsModal,
    clearReduxState,
    handleUnsupportedBrowserModal,
  })(App));
