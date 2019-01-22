import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import box from '3box';

import * as routes from './utils/routes';
import { normalizeURL, matchProtectedRoutes } from './utils/funcs';
import { store } from './state/store';
import Landing from './views/Landing';
import Profile from './views/Profile';
import ProfilePublic from './views/ProfilePublic';
import EditProfile from './views/EditProfile';
import Profiles from './views/Profiles';
import Jobs from './views/Jobs';
import Privacy from './views/Privacy';
import Terms from './views/Terms';
import Create from './views/Create';
import NavLanding from './components/NavLanding';
import Nav from './components/Nav';
import history from './history';
import './index.css';

import AppModals from './components/AppModals';

import {
  getProfileData,
  getPublicMemberSince,
  getVerifiedPublicGithub,
  getVerifiedPublicTwitter,
  getActivity,
  getBox,
  requestAccess,
  checkWeb3Wallet,
  checkNetwork,
  handleSignOut,
} from './state/actions';

import {
  handleSignInModal,
  closeErrorModal,
  handleRequireWalletLoginModal,
  handleSwitchedNetworkModal,
  handleAccessModal,
  closeRequireMetaMaskModal,
  handleConsentModal,
  handleDeniedAccessModal,
  handleLoggedOutModal,
  handleSwitchedAddressModal,
  requireMetaMaskModal,
  handleDownloadMetaMaskBanner,
  handleMobileWalletModal,
  handleOnboardingModal,
} from './state/actions-modals';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onBoardingModalMobileOne: false,
      onBoardingModalMobileTwo: false,
      onBoardingModalMobileThree: false,
    };
    this.handleSignInUp = this.handleSignInUp.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  async componentDidMount() {
    const { location } = this.props;
    const { pathname } = location;
    const normalizedPath = normalizeURL(pathname);
    const splitRoute = normalizedPath.split('/');
    const isProtectedPath = matchProtectedRoutes(splitRoute[2]);
    const currentEthAddress = window.localStorage.getItem('userEthAddress');

    // Initial warning to users without web3
    if (typeof window.web3 === 'undefined') {
      this.props.handleDownloadMetaMaskBanner();
      this.props.handleMobileWalletModal();
    }

    if (typeof window.web3 !== 'undefined' && splitRoute[1].substring(0, 2) === '0x' && splitRoute[1] === currentEthAddress && isProtectedPath) {
      // Has web3 && Land on profile && Matches address
      this.loadData();
    } else if (splitRoute.length > 1 && splitRoute[1].substring(0, 2) === '0x') {
      // Land on profile page && Does not match address
      if (isProtectedPath) history.push(`/${splitRoute[1]}`);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { location } = nextProps;
    const { pathname } = location;
    const normalizedPath = normalizeURL(pathname);
    const splitRoute = normalizedPath.split('/');

    // check previous route for banner behavior on /Create & /Profiles
    // does not work with back button
    if (nextProps.location.pathname !== normalizedPath) {
      store.dispatch({
        type: 'UPDATE_ROUTE',
        currentRoute: normalizedPath,
        onPublicProfilePage: splitRoute.length > 1 && splitRoute[1].substring(0, 2) === '0x' && !matchProtectedRoutes(splitRoute[2]),
      });
    }

    // get profile data again only when onSyncDone
    if (nextProps.onSyncFinished && nextProps.isSyncing) {
      // end onSyncDone animation
      console.log('hitting sync finished');
      store.dispatch({
        type: 'APP_SYNC',
        onSyncFinished: true,
        isSyncing: false,
      });

      this.loadCalls();
    }
  }

  handleNextMobileModal = (thisModal, nextModal) => {
    this.setState({
      [`onBoardingModalMobile${thisModal}`]: false,
      [`onBoardingModalMobile${nextModal}`]: true,
    });
  }

  loadCalls = () => {
    console.log('hitting loadcalls');
    this.props.getActivity();
    this.props.getVerifiedPublicGithub();
    this.props.getVerifiedPublicTwitter();
    this.props.getPublicMemberSince();
    this.props.getProfileData('public', 'status');
    this.props.getProfileData('public', 'name');
    this.props.getProfileData('public', 'description');
    this.props.getProfileData('public', 'image');
    this.props.getProfileData('public', 'coverPhoto');
    this.props.getProfileData('public', 'location');
    this.props.getProfileData('public', 'website');
    this.props.getProfileData('public', 'employer');
    this.props.getProfileData('public', 'job');
    this.props.getProfileData('public', 'school');
    this.props.getProfileData('public', 'degree');
    this.props.getProfileData('public', 'major');
    this.props.getProfileData('public', 'year');
    this.props.getProfileData('public', 'emoji');
    this.props.getProfileData('private', 'email');
    this.props.getProfileData('private', 'birthday');
  }

  async loadData() {
    console.log('in load data');
    const { location } = this.props;
    const { pathname } = location;
    const normalizedPath = normalizeURL(pathname);

    await this.props.checkWeb3Wallet();
    await this.props.requestAccess('directLogin');
    await this.props.checkNetwork();

    if (this.props.isSignedIntoWallet && this.props.isLoggedIn) {
      console.log('2 1');
      await this.props.getBox();
      if (!this.props.showErrorModal) {
        this.loadCalls();
      }
    } else if (!this.props.isSignedIntoWallet) {
      console.log('2 2');
      history.push(routes.LANDING);
      this.props.handleRequireWalletLoginModal();
    } else if (this.props.isSignedIntoWallet
      && !this.props.isLoggedIn
      && matchProtectedRoutes(normalizedPath.split('/')[2])) {
      console.log('2 3');
      history.push(routes.LANDING);
      this.props.handleSignInModal();
    }
    console.log('2 4');
  }

  async handleSignInUp() {
    if (typeof window.web3 !== 'undefined') {
      await this.props.checkWeb3Wallet();
      await this.props.requestAccess();
      await this.props.checkNetwork();

      if (this.props.isSignedIntoWallet) {
        await this.props.getBox('fromSignIn');
        if (!this.props.showErrorModal) {
          this.loadCalls();
        }
      } else if (!this.props.isSignedIntoWallet && !this.props.accessDeniedModal) {
        this.props.handleRequireWalletLoginModal();
      }
    } else if (typeof window.web3 === 'undefined') {
      this.props.requireMetaMaskModal();
      this.props.handleMobileWalletModal();
    }
  }

  render() {
    const {
      showDifferentNetworkModal,
      accessDeniedModal,
      errorMessage,
      allowAccessModal,
      alertRequireMetaMask,
      provideConsent,
      signInToWalletModal,
      signInModal,
      mobileWalletRequiredModal,
      directLogin,
      loggedOutModal,
      switchedAddressModal,
      prevNetwork,
      currentNetwork,
      onBoardingModal,
      onBoardingModalTwo,
      ifFetchingThreeBox,
      prevAddress,
      showErrorModal,
      isLoggedIn,
      isSignedIntoWallet,
      showDownloadBanner,
      location,
      onSyncFinished,
      isSyncing,
      hasSignedOut,
      onPublicProfilePage,
    } = this.props;

    const {
      onBoardingModalMobileOne,
      onBoardingModalMobileTwo,
      onBoardingModalMobileThree,
    } = this.state;

    const { pathname } = location;
    const normalizedPath = normalizeURL(pathname);
    const mustConsentError = errorMessage && errorMessage.message && errorMessage.message.substring(0, 65) === 'Error: MetaMask Message Signature: User denied message signature.';
    const landing = pathname === routes.LANDING ? 'landing' : '';
    const { userAgent: ua } = navigator;
    const isIOS = ua.includes('iPhone');
    const isProtectedPath = matchProtectedRoutes(normalizedPath.split('/'));

    return (
      <div className="App">
        {(!isLoggedIn && !ifFetchingThreeBox && !isProtectedPath) // show landing nav when user is not logged in, 3box is not fetching, and when route is not a protected route
          ? (
            <NavLanding
              handleSignInUp={this.handleSignInUp}
              onPublicProfilePage={onPublicProfilePage}
              landing={landing}
              pathname={normalizedPath}
            />
          ) : <Nav />
        }

        <AppModals
          showDownloadBanner={showDownloadBanner}
          ifFetchingThreeBox={ifFetchingThreeBox}
          onSyncFinished={onSyncFinished}
          isSyncing={isSyncing}
          hasSignedOut={hasSignedOut}
          allowAccessModal={allowAccessModal}
          directLogin={directLogin}
          alertRequireMetaMask={alertRequireMetaMask}
          accessDeniedModal={accessDeniedModal}
          signInToWalletModal={signInToWalletModal}
          signInModal={signInModal}
          isIOS={isIOS}
          mobileWalletRequiredModal={mobileWalletRequiredModal}
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
          onBoardingModalMobileOne={onBoardingModalMobileOne}
          onBoardingModalMobileTwo={onBoardingModalMobileTwo}
          onBoardingModalMobileThree={onBoardingModalMobileThree}
          handleRequireWalletLoginModal={this.props.handleRequireWalletLoginModal}
          handleSignInModal={this.props.handleSignInModal}
          handleMobileWalletModal={this.props.handleMobileWalletModal}
          handleConsentModal={this.props.handleConsentModal}
          handleDeniedAccessModal={this.props.handleDeniedAccessModal}
          closeErrorModal={this.props.closeErrorModal}
          handleSwitchedNetworkModal={this.props.handleSwitchedNetworkModal}
          handleDownloadMetaMaskBanner={this.props.handleDownloadMetaMaskBanner}
          handleLoggedOutModal={this.props.handleLoggedOutModal}
          handleSignOut={this.props.handleSignOut}
          handleSwitchedAddressModal={this.props.handleSwitchedAddressModal}
          handleOnboardingModal={this.props.handleOnboardingModal}
          handleAccessModal={this.props.handleAccessModal}
          handleNextMobileModal={this.handleNextMobileModal}
          closeRequireMetaMaskModal={this.props.closeRequireMetaMaskModal}
        />

        <Switch>
          <Route
            exact
            path={routes.LANDING}

            render={() => (
              <Landing
                handleSignInUp={this.handleSignInUp}
                isLoggedIn={isLoggedIn}
                errorMessage={errorMessage}
                showErrorModal={showErrorModal}
                isSignedIntoWallet={isSignedIntoWallet}
              />
            )}
          />

          <Route
            path={routes.FORMAT_PROFILE_ACTIVITY}
            component={Profile}
          />

          <Route
            path={routes.FORMAT_PROFILE_ABOUT}
            component={Profile}
          />

          <Route
            exact
            path={routes.FORMAT_PROFILE_EDIT}
            component={EditProfile}
          />

          <Route
            exact
            path={routes.JOBS}
            component={() => (
              <Jobs
                isLoggedIn={isLoggedIn}
                handleSignInUp={this.handleSignInUp}
              />
            )}
          />

          <Route
            exact
            path={routes.PRIVACY}
            component={() => (
              <Privacy
                isLoggedIn={isLoggedIn}
                handleSignInUp={this.handleSignInUp}
              />
            )}
          />

          <Route
            exact
            path={routes.TERMS}
            component={() => (
              <Terms
                isLoggedIn={isLoggedIn}
                handleSignInUp={this.handleSignInUp}
              />
            )}
          />

          <Route
            path={routes.CREATE}
            exact
            component={() => (
              <Create
                isLoggedIn={isLoggedIn}
                handleSignInUp={this.handleSignInUp}
              />
            )}
          />

          <Route
            path={routes.PROFILES}
            exact
            component={() => (
              <Profiles
                isLoggedIn={isLoggedIn}
                handleSignInUp={this.handleSignInUp}
              />
            )}
          />

          <Route
            exact
            path={routes.PUBLIC_PROFILE}
            component={ProfilePublic}
          />

        </Switch>

      </div>
    );
  }
}

App.propTypes = {
  getBox: PropTypes.func.isRequired,
  requestAccess: PropTypes.func.isRequired,
  getProfileData: PropTypes.func.isRequired,
  getPublicMemberSince: PropTypes.func.isRequired,
  getVerifiedPublicGithub: PropTypes.func.isRequired,
  getVerifiedPublicTwitter: PropTypes.func.isRequired,
  getActivity: PropTypes.func.isRequired,
  checkWeb3Wallet: PropTypes.func.isRequired,
  requireMetaMaskModal: PropTypes.func.isRequired,
  handleDownloadMetaMaskBanner: PropTypes.func.isRequired,
  handleMobileWalletModal: PropTypes.func.isRequired,
  handleSwitchedNetworkModal: PropTypes.func.isRequired,
  handleAccessModal: PropTypes.func.isRequired,
  closeRequireMetaMaskModal: PropTypes.func.isRequired,
  handleConsentModal: PropTypes.func.isRequired,
  handleDeniedAccessModal: PropTypes.func.isRequired,
  handleRequireWalletLoginModal: PropTypes.func.isRequired,
  handleSignInModal: PropTypes.func.isRequired,
  handleSignOut: PropTypes.func.isRequired,
  checkNetwork: PropTypes.func.isRequired,
  closeErrorModal: PropTypes.func.isRequired,
  handleLoggedOutModal: PropTypes.func.isRequired,
  handleSwitchedAddressModal: PropTypes.func.isRequired,
  handleOnboardingModal: PropTypes.func.isRequired,

  showDifferentNetworkModal: PropTypes.bool,
  onSyncFinished: PropTypes.bool,
  hasSignedOut: PropTypes.bool,
  isSyncing: PropTypes.bool,
  accessDeniedModal: PropTypes.bool,
  errorMessage: PropTypes.string,
  allowAccessModal: PropTypes.bool,
  alertRequireMetaMask: PropTypes.bool,
  provideConsent: PropTypes.bool,
  signInToWalletModal: PropTypes.bool,
  signInModal: PropTypes.bool,
  mobileWalletRequiredModal: PropTypes.bool,
  showErrorModal: PropTypes.bool,
  directLogin: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  isSignedIntoWallet: PropTypes.bool,
  loggedOutModal: PropTypes.bool,
  switchedAddressModal: PropTypes.bool,
  onBoardingModal: PropTypes.bool,
  onBoardingModalTwo: PropTypes.bool,
  ifFetchingThreeBox: PropTypes.bool,
  showDownloadBanner: PropTypes.bool,
  onPublicProfilePage: PropTypes.bool,
  prevNetwork: PropTypes.string,
  currentNetwork: PropTypes.string,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  prevAddress: PropTypes.string,
};

App.defaultProps = {
  showDifferentNetworkModal: false,
  accessDeniedModal: false,
  onSyncFinished: false,
  hasSignedOut: false,
  onPublicProfilePage: false,
  isSyncing: false,
  errorMessage: '',
  allowAccessModal: false,
  alertRequireMetaMask: false,
  provideConsent: false,
  signInToWalletModal: false,
  signInModal: false,
  mobileWalletRequiredModal: false,
  showErrorModal: false,
  showDownloadBanner: false,
  loggedOutModal: false,
  switchedAddressModal: false,
  onBoardingModal: false,
  onBoardingModalTwo: false,
  ifFetchingThreeBox: false,
  isLoggedIn: false,
  isSignedIntoWallet: false,
  prevNetwork: '',
  currentNetwork: '',
  prevAddress: '',
  directLogin: '',
};

const mapState = state => ({
  showDifferentNetworkModal: state.threeBox.showDifferentNetworkModal,
  allowAccessModal: state.threeBox.allowAccessModal,
  alertRequireMetaMask: state.threeBox.alertRequireMetaMask,
  onSyncFinished: state.threeBox.onSyncFinished,
  isSyncing: state.threeBox.isSyncing,
  provideConsent: state.threeBox.provideConsent,
  signInToWalletModal: state.threeBox.signInToWalletModal,
  signInModal: state.threeBox.signInModal,
  mobileWalletRequiredModal: state.threeBox.mobileWalletRequiredModal,
  directLogin: state.threeBox.directLogin,
  loggedOutModal: state.threeBox.loggedOutModal,
  switchedAddressModal: state.threeBox.switchedAddressModal,
  onBoardingModal: state.threeBox.onBoardingModal,
  hasSignedOut: state.threeBox.hasSignedOut,
  onBoardingModalTwo: state.threeBox.onBoardingModalTwo,
  prevNetwork: state.threeBox.prevNetwork,
  currentNetwork: state.threeBox.currentNetwork,
  ifFetchingThreeBox: state.threeBox.ifFetchingThreeBox,
  errorMessage: state.threeBox.errorMessage,
  prevAddress: state.threeBox.prevAddress,
  isLoggedIn: state.threeBox.isLoggedIn,
  showErrorModal: state.threeBox.showErrorModal,
  accessDeniedModal: state.threeBox.accessDeniedModal,
  isSignedIntoWallet: state.threeBox.isSignedIntoWallet,
  showDownloadBanner: state.threeBox.showDownloadBanner,
  onPublicProfilePage: state.threeBox.onPublicProfilePage,
});

export default withRouter(connect(mapState,
  {
    getBox,
    requestAccess,
    getProfileData,
    getPublicMemberSince,
    getVerifiedPublicGithub,
    getVerifiedPublicTwitter,
    getActivity,
    checkWeb3Wallet,
    requireMetaMaskModal,
    checkNetwork,
    handleDownloadMetaMaskBanner,
    handleMobileWalletModal,
    handleSignInModal,
    handleRequireWalletLoginModal,
    handleSwitchedNetworkModal,
    handleAccessModal,
    handleConsentModal,
    handleDeniedAccessModal,
    handleLoggedOutModal,
    handleSignOut,
    handleSwitchedAddressModal,
    handleOnboardingModal,
    closeErrorModal,
    closeRequireMetaMaskModal,
  })(App));

      // else if (typeof window.web3 === 'undefined' && isProtectedPath) { // No wallet and lands on restricted page
    //   history.push(routes.LANDING);
    // } else if (splitRoute.length > 1 && splitRoute[1].substring(0, 2) === '0x' && !isProtectedPath) {
    //   this.loadForLandOnPublicProfile();
    // } else {
    //   // console.log('landed on unprotected route that isnt a public profile');
    // }