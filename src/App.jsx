import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as routes from './utils/routes';
import normalizeURL from './utils/funcs';
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
import Nav from './components/Nav.jsx';
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
      width: window.innerWidth,
      retractNav: false,
      showSideNav: false,
    };
    this.loadData = this.loadData.bind(this);
    this.handleSignInUp = this.handleSignInUp.bind(this);
  }

  componentWillMount() {
    // window.addEventListener('resize', this.handleWindowSizeChange);
    // window.addEventListener('scroll', this.hideBar);
  }

  async componentDidMount() {
    const { location } = this.props;
    const { pathname } = location;
    const normalizedPath = normalizeURL(pathname);

    if (typeof window.web3 === 'undefined') {
      this.props.handleDownloadMetaMaskBanner();
      this.props.handleMobileWalletModal();
    }

    if (pathname.substring(6, 8) === '0x') {
      // 1. fetch public profile
      // 2. can you openBox?
      // 3. fetch box & show signedin profile

      // await Box // eslint-disable-line no-undef
      //   .openBox(
      //     store.getState().threeBox.accountAddress || address,
      //     window.web3.currentProvider, // eslint-disable-line no-undef
      //     opts,
      //   );
    } else if (typeof window.web3 !== 'undefined'
      && (normalizedPath === routes.PROFILE
        || normalizedPath === routes.EDITPROFILE
        || normalizedPath === routes.PROFILE_ABOUT
        || normalizedPath === routes.PROFILE_ACTIVITY
        || normalizedPath === routes.PROFILE_COLLECTIBLES)) { // no wallet and lands on restricted page
      this.loadData();
    } else if (typeof window.web3 === 'undefined'
      && (normalizedPath === routes.PROFILE
        || normalizedPath === routes.EDITPROFILE
        || normalizedPath === routes.PROFILE_ABOUT
        || normalizedPath === routes.PROFILE_ACTIVITY
        || normalizedPath === routes.PROFILE_COLLECTIBLES)) { // has wallet and lands on restricted page
      history.push(routes.LANDING);
      this.props.requireMetaMaskModal();
      this.props.handleMobileWalletModal();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { location } = this.props;
    const { pathname } = location;
    const normalizedPath = normalizeURL(pathname);

    // check previous route for banner behavior on /Create & /Profiles
    if (nextProps.location.pathname !== normalizedPath) {
      store.dispatch({
        type: 'PREVIOUS_ROUTE',
        previousRoute: normalizedPath,
      });
    }

    // get profile data again only when onSyncDone
    if (nextProps.onSyncFinished && nextProps.isSyncing) {
      // end onSyncDone animation
      store.dispatch({
        type: 'APP_SYNC',
        onSyncFinished: true,
        isSyncing: false,
      });

      this.loadCalls();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
    window.removeEventListener('scroll', this.hideBar);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  handleNextMobileModal = (thisModal, nextModal) => {
    this.setState({
      [`onBoardingModalMobile${thisModal}`]: false,
      [`onBoardingModalMobile${nextModal}`]: true,
    });
  }

  hideBar = () => {
    if (window.scrollY < 1) {
      this.setState({ retractNav: false });
    } else {
      this.setState({ retractNav: true });
    }
  }

  handleSideNav = () => {
    const { showSideNav } = this.state;
    this.setState({
      showSideNav: !showSideNav,
    });
  }

  loadCalls = () => {
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
    const { location } = this.props;
    const { pathname } = location;
    const normalizedPath = normalizeURL(pathname);

    await this.props.checkWeb3Wallet();
    await this.props.requestAccess('directLogin');
    await this.props.checkNetwork();

    if (this.props.isSignedIntoWallet && this.props.isLoggedIn) {
      await this.props.getBox();
      if (!this.props.showErrorModal) {
        this.loadCalls();
      }
    } else if (!this.props.isSignedIntoWallet) {
      history.push(routes.LANDING);
      this.props.handleRequireWalletLoginModal();
    } else if (this.props.isSignedIntoWallet
      && !this.props.isLoggedIn
      && (normalizedPath === routes.PROFILE
        || normalizedPath === routes.EDITPROFILE
        || normalizedPath === routes.PROFILE_ABOUT
        || normalizedPath === routes.PROFILE_ACTIVITY
        || normalizedPath === routes.PROFILE_COLLECTIBLES)) {
      history.push(routes.LANDING);
      this.props.handleSignInModal();
    }
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
      downloadBanner,
      location,
      onSyncFinished,
      isSyncing,
      hasSignedOut,
    } = this.props;

    const {
      onBoardingModalMobileOne,
      onBoardingModalMobileTwo,
      onBoardingModalMobileThree,
      width,
      retractNav,
      showSideNav,
    } = this.state;

    const { pathname } = location;
    const normalizedPath = normalizeURL(pathname);
    const isMobile = width <= 812; // 600
    const classHide = retractNav ? 'hide' : '';
    const mustConsentError = errorMessage && errorMessage.message && errorMessage.message.substring(0, 65) === 'Error: MetaMask Message Signature: User denied message signature.';
    const isLandingPage = pathname === routes.LANDING && 'landing';
    const { userAgent: ua } = navigator;
    const isIOS = ua.includes('iPhone');

    return (
      <div className="App">
        {(!isLoggedIn && !ifFetchingThreeBox)
          ? (
            <NavLanding
              downloadBanner={downloadBanner}
              classHide={classHide}
              handleSignInUp={this.handleSignInUp}
              handleSideNav={this.handleSideNav}
              landing={isLandingPage}
              showSideNav={showSideNav}
              pathname={normalizedPath}
            />
          )
          : (
            <Nav />
          )}

        <AppModals
          downloadBanner={downloadBanner}
          ifFetchingThreeBox={ifFetchingThreeBox}
          onSyncFinished={onSyncFinished}
          isSyncing={isSyncing}
          hasSignedOut={hasSignedOut}
          allowAccessModal={allowAccessModal}
          directLogin={directLogin}
          isMobile={isMobile}
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
            path={routes.PUBLIC_PROFILE}
            component={ProfilePublic}
          />

          <Route
            path={routes.PROFILE}
            component={Profile}
          />

          <Route
            path={routes.EDITPROFILE}
            component={EditProfile}
          />

          <Route
            path={routes.JOBS}
            component={() => (
              <Jobs
                isLoggedIn={isLoggedIn}
                handleSignInUp={this.handleSignInUp}
                classHide={classHide}
              />
            )}
          />

          <Route
            path={routes.PRIVACY}
            component={() => (
              <Privacy
                isLoggedIn={isLoggedIn}
                handleSignInUp={this.handleSignInUp}
                classHide={classHide}
              />
            )}
          />

          <Route
            path={routes.TERMS}
            component={() => (
              <Terms
                isLoggedIn={isLoggedIn}
                handleSignInUp={this.handleSignInUp}
                classHide={classHide}
              />
            )}
          />

          <Route
            path={routes.CREATE}
            component={() => (
              <Create
                isLoggedIn={isLoggedIn}
                handleSignInUp={this.handleSignInUp}
                classHide={classHide}
              />
            )}
          />

          <Route
            path={routes.PROFILES}
            component={() => (
              <Profiles
                isLoggedIn={isLoggedIn}
                handleSignInUp={this.handleSignInUp}
                classHide={classHide}
              />
            )}
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
  directLogin: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  isSignedIntoWallet: PropTypes.bool,
  loggedOutModal: PropTypes.bool,
  switchedAddressModal: PropTypes.bool,
  onBoardingModal: PropTypes.bool,
  onBoardingModalTwo: PropTypes.bool,
  ifFetchingThreeBox: PropTypes.bool,
  downloadBanner: PropTypes.bool,
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
  isSyncing: false,
  errorMessage: '',
  allowAccessModal: false,
  alertRequireMetaMask: false,
  provideConsent: false,
  signInToWalletModal: false,
  signInModal: false,
  mobileWalletRequiredModal: false,
  showErrorModal: false,
  downloadBanner: false,
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
  directLogin: false,
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
  downloadBanner: state.threeBox.downloadBanner,
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


{/* <div className={`${!downloadBanner ? 'hideBanner' : ''} webThreeBanner`}>
  <p>
    3Box requires web3.  Download the MetaMask extension to continue.
  </p>
  <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer">
    <button type="button" className="webThreeBanner__link">
      Download
    </button>
  </a>
  <p onClick={this.props.handleDownloadMetaMaskBanner} className="webThreeBanner__close">
    &#10005;
  </p>
</div>

  <LoadingThreeBoxProfileModal show={ifFetchingThreeBox} />

  <SyncingModal
    show={!onSyncFinished && !ifFetchingThreeBox && isSyncing && !hasSignedOut}
  />

  <ProvideAccessModal
    handleAccessModal={this.props.handleAccessModal}
    show={allowAccessModal}
    directLogin={directLogin}
    isMobile={isMobile}
  />

  <RequireMetaMaskModal
    closeRequireMetaMaskModal={this.props.closeRequireMetaMaskModal}
    show={alertRequireMetaMask}
    isMobile={isMobile}
  />

  <ProvideConsentModal
    handleConsentModal={this.props.handleConsentModal}
    show={provideConsent}
    isMobile={isMobile}
  />

  <AccessDeniedModal
    handleDeniedAccessModal={this.props.handleDeniedAccessModal}
    show={accessDeniedModal}
    isMobile={isMobile}
  />

  <SignInToWalletModal
    handleRequireWalletLoginModal={this.props.handleRequireWalletLoginModal}
    show={signInToWalletModal}
    isMobile={isMobile}
  />

  <SignInToThreeBox
    show={signInModal}
    handleSignInModal={this.props.handleSignInModal}
  />

  <MobileWalletRequiredModal
    isIOS={isIOS}
    handleMobileWalletModal={this.props.handleMobileWalletModal}
    show={mobileWalletRequiredModal}
    isMobile={isMobile}
  />

  <ErrorModal
    errorMessage={errorMessage}
    closeErrorModal={this.props.closeErrorModal}
    show={showErrorModal && !mustConsentError}
    isMobile={isMobile}
  />

  <MustConsentModal
    closeErrorModal={this.props.closeErrorModal}
    show={mustConsentError}
    isMobile={isMobile}
  />

  <SwitchedNetworksModal
    prevNetwork={prevNetwork}
    currentNetwork={currentNetwork}
    handleSwitchedNetworkModal={this.props.handleSwitchedNetworkModal}
    show={showDifferentNetworkModal}
  />

  <LoggedOutModal
    isMobile={isMobile}
    handleLoggedOutModal={this.props.handleLoggedOutModal}
    handleSignOut={this.props.handleSignOut}
    show={loggedOutModal}
  />

  <SwitchedAddressModal
    handleSwitchedAddressModal={this.props.handleSwitchedAddressModal}
    show={switchedAddressModal}
    isMobile={isMobile}
    handleSignOut={this.props.handleSignOut}
    prevAddress={prevAddress}
  />

  <OnBoardingModalDesktop
    isMobile={isMobile}
    showOne={onBoardingModal}
    showTwo={onBoardingModalTwo}
    handleOnboardingModal={this.props.handleOnboardingModal}
  />

  <OnBoardingModalMobile
    isMobile={isMobile}
    handleOnboardingModal={this.props.handleOnboardingModal}
    showOne={onBoardingModal}
    showTwo={onBoardingModalMobileOne}
    showThree={onBoardingModalMobileTwo}
    showFour={onBoardingModalMobileThree}
    handleNextMobileModal={this.handleNextMobileModal}
  /> */}