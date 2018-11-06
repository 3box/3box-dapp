import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as routes from './utils/routes';
import Landing from './views/Landing';
import Profile from './views/Profile';
import EditProfile from './views/EditProfile';
import Privacy from './views/Privacy';
import Terms from './views/Terms';
import history from './history';

import {
  SwitchedAddressModal,
  SwitchedNetworksModal,
  LoggedOutModal,
  OnBoardingModalDesktop,
  LoadingThreeBoxProfileModal,
  OnBoardingModalMobile,
  ProvideAccessModal,
  AccessDeniedModal,
  ErrorModal,
} from './components/Modals';

import {
  profileGetBox,
  requestAccess,
  getPublicName,
  getPublicGithub,
  getPublicImage,
  getPrivateEmail,
  getActivity,
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
  handleDeniedAccessModal,
  handleLoggedOutModal,
  handleSwitchedAddressModal,
  requireMetaMaskModal,
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
    };
    this.loadData = this.loadData.bind(this);
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  async componentDidMount() {
    const { location } = this.props;
    const { pathname } = location;

    if (typeof window.web3 === 'undefined' && pathname !== '/') { // no wallet and lands on restricted page
      history.push(routes.LANDING);
      this.props.requireMetaMaskModal();
      this.props.handleMobileWalletModal();
    } else if (typeof window.web3 !== 'undefined' && pathname !== '/') { // has wallet and lands on restricted page
      this.loadData();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
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

  async loadData() {
    const { location } = this.props;
    const { pathname } = location;

    await this.props.checkWeb3Wallet();
    await this.props.requestAccess('directLogin');
    await this.props.checkNetwork();
    // UX has changed from landing on landing page signed in redirecting you to profile page
    // to not because seeing if you're signed in is now behind a request for access
    // it is a worse UX to ask a user right upon landing on a page if 
    // you can have access, it seems spammy

    if (this.props.isSignedIntoWallet && this.props.isLoggedIn) {
      await this.props.profileGetBox();
      if (!this.props.showErrorModal) {
        await this.props.getActivity();
        await this.props.getPublicName();
        await this.props.getPublicGithub();
        await this.props.getPublicImage();
        await this.props.getPrivateEmail();
      }
    } else if (!this.props.isSignedIntoWallet) {
      history.push(routes.LANDING);
      this.props.handleRequireWalletLoginModal();
    } else if (this.props.isSignedIntoWallet && !this.props.isLoggedIn && (pathname === '/Profile' || pathname === '/EditProfile')) {
      history.push(routes.LANDING);
      this.props.handleSignInModal();
    }
  }

  render() {
    const {
      showDifferentNetworkModal,
      accessDeniedModal,
      allowAccessModal,
      directLogin,
      loggedOutModal,
      switchedAddressModal,
      prevNetwork,
      currentNetwork,
      onBoardingModal,
      onBoardingModalTwo,
      ifFetchingThreeBox,
      errorMessage,
      showErrorModal,
    } = this.props;

    const mustConsentError = errorMessage && errorMessage.message && errorMessage.message.substring(0, 65) === 'Error: MetaMask Message Signature: User denied message signature.';

    const {
      onBoardingModalMobileOne,
      onBoardingModalMobileTwo,
      onBoardingModalMobileThree,
      width,
    } = this.state;

    const isMobile = width <= 600;

    return (
      <div className="App">
        <LoadingThreeBoxProfileModal show={ifFetchingThreeBox} />

        <ProvideAccessModal
          handleAccessModal={this.props.handleAccessModal}
          show={allowAccessModal}
          directLogin={directLogin}
          isMobile={isMobile}
        />

        <AccessDeniedModal
          handleDeniedAccessModal={this.props.handleDeniedAccessModal}
          show={accessDeniedModal}
          isMobile={isMobile}
        />

        <ErrorModal
          errorMessage={errorMessage}
          closeErrorModal={this.props.closeErrorModal}
          show={showErrorModal && !mustConsentError}
          isMobile={isMobile}
        />

        <SwitchedNetworksModal
          prevNetwork={prevNetwork}
          currentNetwork={currentNetwork}
          isMobile={isMobile}
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
        />

        <Switch>
          <Route exact path={routes.LANDING} component={Landing} />
          <Route path={routes.PROFILE} component={Profile} />
          <Route path={routes.EDITPROFILE} component={EditProfile} />
          <Route path={routes.PRIVACY} component={Privacy} />
          <Route path={routes.TERMS} component={Terms} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  profileGetBox: PropTypes.func,
  requestAccess: PropTypes.func,
  getPublicName: PropTypes.func,
  getPublicGithub: PropTypes.func,
  getPublicImage: PropTypes.func,
  getPrivateEmail: PropTypes.func,
  getActivity: PropTypes.func,
  checkWeb3Wallet: PropTypes.func,
  requireMetaMaskModal: PropTypes.func,
  handleMobileWalletModal: PropTypes.func,
  handleSwitchedNetworkModal: PropTypes.func,
  handleAccessModal: PropTypes.func,
  handleDeniedAccessModal: PropTypes.func,
  handleSignOut: PropTypes.func,
  checkNetwork: PropTypes.func,
  handleSignInModal: PropTypes.func,
  closeErrorModal: PropTypes.func,
  handleRequireWalletLoginModal: PropTypes.func,
  handleLoggedOutModal: PropTypes.func,
  handleSwitchedAddressModal: PropTypes.func,
  handleOnboardingModal: PropTypes.func,

  location: PropTypes.object,
  hasWallet: PropTypes.bool,
  showDifferentNetworkModal: PropTypes.bool,
  accessDeniedModal: PropTypes.bool,
  allowAccessModal: PropTypes.bool,
  directLogin: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  errorMessage: PropTypes.string,
  isSignedIntoWallet: PropTypes.bool,
  showErrorModal: PropTypes.bool,
  loggedOutModal: PropTypes.bool,
  switchedAddressModal: PropTypes.bool,
  onBoardingModal: PropTypes.bool,
  onBoardingModalTwo: PropTypes.bool,
  ifFetchingThreeBox: PropTypes.bool,
  prevNetwork: PropTypes.string,
  currentNetwork: PropTypes.string,
  prevPrevNetwork: PropTypes.string,
};

App.defaultProps = {
  profileGetBox: profileGetBox(),
  requestAccess: requestAccess(),
  getPublicName: getPublicName(),
  getPublicGithub: getPublicGithub(),
  getPublicImage: getPublicImage(),
  getPrivateEmail: getPrivateEmail(),
  getActivity: getActivity(),
  checkWeb3Wallet: checkWeb3Wallet(),
  requireMetaMaskModal: requireMetaMaskModal(),
  handleMobileWalletModal: handleMobileWalletModal(),
  handleSwitchedNetworkModal: handleSwitchedNetworkModal(),
  handleAccessModal: handleAccessModal(),
  handleDeniedAccessModal: handleDeniedAccessModal(),
  checkNetwork: checkNetwork(),
  handleSignInModal: handleSignInModal(),
  closeErrorModal: closeErrorModal(),
  handleRequireWalletLoginModal: handleRequireWalletLoginModal(),
  handleLoggedOutModal: handleLoggedOutModal(),
  handleSwitchedAddressModal: handleSwitchedAddressModal(),
  handleSignOut: handleSignOut(),
  handleOnboardingModal: handleOnboardingModal(),

  location: {},
  showDifferentNetworkModal: false,
  accessDeniedModal: false,
  allowAccessModal: false,
  directLogin: false,
  loggedOutModal: false,
  switchedAddressModal: false,
  onBoardingModal: false,
  onBoardingModalTwo: false,
  ifFetchingThreeBox: false,
  isLoggedIn: false,
  errorMessage: '',
  isSignedIntoWallet: false,
  showErrorModal: false,
  hasWallet: false,
  prevNetwork: '',
  currentNetwork: '',
  prevPrevNetwork: '',
};

const mapState = state => ({
  hasWallet: state.threeBox.hasWallet,
  showDifferentNetworkModal: state.threeBox.showDifferentNetworkModal,
  accessDeniedModal: state.threeBox.accessDeniedModal,
  allowAccessModal: state.threeBox.allowAccessModal,
  directLogin: state.threeBox.directLogin,
  loggedOutModal: state.threeBox.loggedOutModal,
  switchedAddressModal: state.threeBox.switchedAddressModal,
  onBoardingModal: state.threeBox.onBoardingModal,
  onBoardingModalTwo: state.threeBox.onBoardingModalTwo,
  prevNetwork: state.threeBox.prevNetwork,
  currentNetwork: state.threeBox.currentNetwork,
  prevPrevNetwork: state.threeBox.prevPrevNetwork,
  isLoggedIn: state.threeBox.isLoggedIn,
  errorMessage: state.threeBox.errorMessage,
  isSignedIntoWallet: state.threeBox.isSignedIntoWallet,
  showErrorModal: state.threeBox.showErrorModal,
  ifFetchingThreeBox: state.threeBox.ifFetchingThreeBox,
});

export default withRouter(connect(mapState,
  {
    profileGetBox,
    requestAccess,
    getPublicName,
    getPublicGithub,
    getPublicImage,
    getPrivateEmail,
    getActivity,
    checkWeb3Wallet,
    requireMetaMaskModal,
    handleMobileWalletModal,
    checkNetwork,
    handleSignInModal,
    closeErrorModal,
    handleRequireWalletLoginModal,
    handleSwitchedNetworkModal,
    handleAccessModal,
    handleDeniedAccessModal,
    handleLoggedOutModal,
    handleSignOut,
    handleSwitchedAddressModal,
    handleOnboardingModal,
  })(App));
