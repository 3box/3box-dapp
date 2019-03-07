import React, { Component } from 'react';
import {
  Route, Switch, withRouter, Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as routes from './utils/routes';
import { pollNetworkAndAddress, initialAddress } from './utils/address';
import { normalizeURL, matchProtectedRoutes } from './utils/funcs';
import { store } from './state/store';
import Landing from './views/Landing/Landing';
import MyProfile from './views/Profile/MyProfile';
import PubProfile from './views/Profile/PubProfile';
import NoMatch from './views/Landing/NoMatch';
import EditProfile from './views/Profile/EditProfile';
import Profiles from './views/Landing/Profiles';
import Jobs from './views/Landing/Jobs';
import Privacy from './views/Landing/Privacy';
import Terms from './views/Landing/Terms';
import Create from './views/Landing/Create';
import NavLanding from './components/NavLanding';
import history from './utils/history';
import './index.css';
import AppModals from './components/AppModals';
import actions from './state/actions';

const {
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
} = actions.modal;

const {
  getProfileValue,
  getCollectibles,
  getMyMemberSince,
  getVerifiedPublicGithub,
  getVerifiedPublicTwitter,
  getVerifiedPrivateEmail,
  getActivity,
} = actions.profile;

const {
  openBox,
  handleSignOut,
  requestAccess,
} = actions.signin;

const {
  checkWeb3,
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
    this.handleSignInUp = this.handleSignInUp.bind(this);
    this.directSignIn = this.directSignIn.bind(this);
  }

  async componentDidMount() {
    const { location } = this.props;
    const { pathname } = location;
    const normalizedPath = normalizeURL(pathname);
    const splitRoute = normalizedPath.split('/');
    const isMyProfilePath = matchProtectedRoutes(splitRoute[2]);
    const currentEthAddress = window.localStorage.getItem('userEthAddress');

    initialAddress(); // Initial get address
    pollNetworkAndAddress(); // Start polling for address change
    await this.props.checkWeb3();

    const allowDirectSignIn = (this.props.hasWeb3
      && splitRoute.length > 1 // Route has more than one
      && splitRoute[1].substring(0, 2) === '0x' // Lands on profile page
      && isMyProfilePath // Lands on protected page
      && splitRoute[1] === currentEthAddress // Eth address is own)
    );
    const onProfilePage = (splitRoute.length > 1 // Route has more than one
      && splitRoute[1].substring(0, 2) === '0x');

    if (allowDirectSignIn) { // Begin signin
      this.directSignIn();
    } else if (onProfilePage) { // Lands on profile page
      if (isMyProfilePath) history.push(`/${splitRoute[1]}`);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { location } = nextProps;
    const { pathname } = location;
    const normalizedPath = normalizeURL(pathname);

    // check previous route for banner behavior on /Create & /Profiles
    // does not work with back button
    if (nextProps.location.pathname !== normalizedPath) {
      store.dispatch({
        type: 'UPDATE_ROUTE',
        currentRoute: normalizedPath,
      });
    }

    // get profile data again only when onSyncDone
    if (nextProps.onSyncFinished && nextProps.isSyncing) {
      store.dispatch({ // end onSyncDone animation
        type: 'APP_SYNC',
        onSyncFinished: true,
        isSyncing: false,
      });

      this.getMyData();
    }
  }

  handleNextMobileModal = (thisModal, nextModal) => {
    this.setState({
      [`onBoardingModalMobile${thisModal}`]: false,
      [`onBoardingModalMobile${nextModal}`]: true,
    });
  }

  getMyData = () => {
    const { currentAddress } = this.props;
    this.props.getActivity();
    this.props.getVerifiedPublicGithub();
    this.props.getVerifiedPublicTwitter();
    this.props.getVerifiedPrivateEmail();
    this.props.getMyMemberSince();
    this.props.getProfileValue('public', 'status');
    this.props.getProfileValue('public', 'name');
    this.props.getProfileValue('public', 'description');
    this.props.getProfileValue('public', 'image');
    this.props.getProfileValue('public', 'coverPhoto');
    this.props.getProfileValue('public', 'location');
    this.props.getProfileValue('public', 'website');
    this.props.getProfileValue('public', 'employer');
    this.props.getProfileValue('public', 'job');
    this.props.getProfileValue('public', 'school');
    this.props.getProfileValue('public', 'degree');
    this.props.getProfileValue('public', 'major');
    this.props.getProfileValue('public', 'year');
    this.props.getProfileValue('public', 'emoji');
    this.props.getProfileValue('public', 'collectiblesFavorites');
    this.props.getProfileValue('private', 'email');
    this.props.getProfileValue('private', 'birthday');
    this.props.getCollectibles(currentAddress);
  }

  async directSignIn() {
    const {
      location,
    } = this.props;
    const { pathname } = location;
    const normalizedPath = normalizeURL(pathname);

    if (!this.props.hasWeb3) {
      history.push(routes.LANDING);
      this.props.requireMetaMaskModal();
      this.props.handleMobileWalletModal();
      return;
    }

    await this.props.requestAccess('directLogin');
    await this.props.checkNetwork();

    const allowSignIn = (this.props.isSignedIntoWallet && this.props.isLoggedIn);
    const notSignedIn = (this.props.isSignedIntoWallet
      && !this.props.isLoggedIn
      && matchProtectedRoutes(normalizedPath.split('/')[2]));

    if (allowSignIn) {
      await this.props.openBox();
      if (!this.props.showErrorModal) this.getMyData();
    } else if (!this.props.isSignedIntoWallet) {
      history.push(routes.LANDING);
      this.props.handleRequireWalletLoginModal();
    } else if (notSignedIn) {
      history.push(routes.LANDING);
      this.props.handleSignInModal();
    }
  }

  async handleSignInUp() {
    const {
      accessDeniedModal,
    } = this.props;

    if (this.props.hasWeb3) {
      // await this.props.checkWeb3();
      await this.props.requestAccess();
      await this.props.checkNetwork();

      if (this.props.isSignedIntoWallet) {
        await this.props.openBox('fromSignIn');
        if (!this.props.showErrorModal) this.getMyData();
      } else if (!this.props.isSignedIntoWallet && !accessDeniedModal) {
        this.props.handleRequireWalletLoginModal();
      }
    } else if (!this.props.hasWeb3) {
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
    const isMyProfilePath = matchProtectedRoutes(normalizedPath.split('/'));

    return (
      <div className="App">
        {(!isLoggedIn && !ifFetchingThreeBox && !isMyProfilePath) // show landing nav when user is not logged in, 3box is not fetching, and when route is not a protected route
          && (
            <NavLanding
              handleSignInUp={this.handleSignInUp}
              onPublicProfilePage={onPublicProfilePage}
              landing={landing}
              pathname={normalizedPath}
            />
          )}

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
            exact
            path="(^[/][0][xX]\w{40}\b)/activity"
            component={MyProfile}
          />
          <Redirect from="/profile" to="/" />
          <Redirect from="/editprofile" to="/" />

          <Route
            exact
            path="(^[/][0][xX]\w{40}\b)/details"
            component={MyProfile}
          />

          <Route
            exact
            path="(^[/][0][xX]\w{40}\b)/collectibles"
            component={MyProfile}
          />

          <Route
            exact
            path="(^[/][0][xX]\w{40}\b)/edit"
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
            path="(^[/][0][xX]\w{40}\b)"
            component={PubProfile}
          />

          <Route
            component={() => (
              <NoMatch
                isLoggedIn={isLoggedIn}
                handleSignInUp={this.handleSignInUp}
              />
            )}
          />

        </Switch>

      </div>
    );
  }
}

App.propTypes = {
  openBox: PropTypes.func.isRequired,
  requestAccess: PropTypes.func.isRequired,
  getProfileValue: PropTypes.func.isRequired,
  getCollectibles: PropTypes.func.isRequired,
  getMyMemberSince: PropTypes.func.isRequired,
  getVerifiedPublicGithub: PropTypes.func.isRequired,
  getVerifiedPublicTwitter: PropTypes.func.isRequired,
  getVerifiedPrivateEmail: PropTypes.func.isRequired,
  getActivity: PropTypes.func.isRequired,
  checkWeb3: PropTypes.func.isRequired,
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
  hasWeb3: PropTypes.bool,
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
  currentAddress: PropTypes.string,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  prevAddress: PropTypes.string,
};

App.defaultProps = {
  showDifferentNetworkModal: false,
  hasWeb3: false,
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
  currentAddress: '',
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
  currentAddress: state.threeBox.currentAddress,
  hasWeb3: state.threeBox.hasWeb3,
});

export default withRouter(connect(mapState,
  {
    openBox,
    requestAccess,
    getProfileValue,
    getCollectibles,
    getMyMemberSince,
    getVerifiedPublicGithub,
    getVerifiedPublicTwitter,
    getVerifiedPrivateEmail,
    getActivity,
    checkWeb3,
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