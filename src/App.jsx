import React, { Component } from 'react';
import {
  Route, Switch, withRouter, Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import queryString from 'query-string';

import * as routes from './utils/routes';
import { pollNetworkAndAddress, initialAddress, startPollFlag } from './utils/address';
import {
  normalizeURL,
  matchProtectedRoutes,
  checkIsEthAddress,
  checkRequestRoute,
  checkIsMobileWithoutWeb3,
} from './utils/funcs';
import { store } from './state/store';
import history from './utils/history';
import APIs from './views/Landing/API/APIs';
import Dapp from './views/Landing/Dapp/Dapp';
import LandingNew from './views/Landing/LandingNew';
import Partners from './views/Landing/Partners';
import Team from './views/Landing/Team';
import LogIn from './views/Profile/LogIn';
import PubProfileDummy from './views/Profile/PubProfileDummy';
import PubProfileDummyTwitter from './views/Profile/PubProfileDummyTwitter';

import {
  MyProfile,
  Spaces,
  EditProfile,
  PubProfile,
  AppModals,
  AppHeaders,
  NavLanding,
  Careers,
  Terms,
  Privacy,
  Nav,
} from './DynamicImports';
import actions from './state/actions';
import './index.css';

const {
  handleSignInModal,
  closeErrorModal,
  handleSwitchedNetworkModal,
  handleAccessModal,
  handleConsentModal,
  handleDeniedAccessModal,
  handleLoggedOutModal,
  handleSwitchedAddressModal,
  handleMobileWalletModal,
  handleOnboardingModal,
  handleFollowingPublicModal,
  handleContactsModal,
} = actions.modal;

const {
  getMyProfileValue,
  getMyDID,
  getCollectibles,
  getMyMemberSince,
  getVerifiedPublicGithub,
  getVerifiedPublicTwitter,
  getVerifiedPrivateEmail,
  getActivity,
  getMyFollowing,
  saveFollowing,
} = actions.profile;

const { getMySpacesData, convert3BoxToSpaces } = actions.spaces;

const {
  openBox,
  handleSignOut,
  injectWeb3,
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
      const isProtectedRoute = matchProtectedRoutes(splitRoute[2]);
      const queryParams = queryString.parse(search);
      const isRequest = checkRequestRoute(splitRoute);
      if (isRequest) return;

      const currentEthAddress = window.localStorage.getItem('userEthAddress');
      const isEtherAddress = checkIsEthAddress(splitRoute[1]);
      const isMyAddr = splitRoute[1] && splitRoute[1].toLowerCase() === currentEthAddress.toLowerCase();
      const onProfilePage = isEtherAddress;
      const isMobileWithoutWeb3 = checkIsMobileWithoutWeb3();

      const allowDirectSignIn = (
        (isEtherAddress // Lands on profile page
          && isProtectedRoute // Lands on protected page
          && isMyAddr
          && !isMobileWithoutWeb3) ||
        !!queryParams.wallet
      );

      initialAddress(); // Initial get address

      if (allowDirectSignIn) { // Begin signin
        this.directSignIn(queryParams.wallet);
      } else if (onProfilePage) { // Lands on profile page
        if (isProtectedRoute) history.push(`/${splitRoute[1]}`);
      }
    } catch (err) {
      console.error(err);
    }
  }

  componentWillReceiveProps(nextProps) {
    const onSyncDoneToTrigger = nextProps.onSyncFinished && nextProps.isSyncing;

    if (onSyncDoneToTrigger) { // get profile data again only when onSyncDone
      store.dispatch({ // end onSyncDone animation
        type: 'UI_APP_SYNC',
        onSyncFinished: true,
        isSyncing: false,
      });
      this.getMyData();
    }
  }

  getMyData = async () => {
    const { currentAddress } = this.props;
    store.dispatch({
      type: 'UI_SPACES_LOADING',
      isSpacesLoading: true,
    });
    startPollFlag();
    pollNetworkAndAddress(); // Start polling for address change

    try {
      this.props.getVerifiedPublicGithub(); // eslint-disable-line
      this.props.getVerifiedPublicTwitter(); // eslint-disable-line
      this.props.getVerifiedPrivateEmail(); // eslint-disable-line
      this.props.getMyMemberSince(); // eslint-disable-line
      this.props.getMyDID(); // eslint-disable-line
      this.props.getMyProfileValue('public', 'status'); // eslint-disable-line
      this.props.getMyProfileValue('public', 'name'); // eslint-disable-line
      this.props.getMyProfileValue('public', 'description'); // eslint-disable-line
      this.props.getMyProfileValue('public', 'image'); // eslint-disable-line
      this.props.getMyProfileValue('public', 'coverPhoto'); // eslint-disable-line
      this.props.getMyProfileValue('public', 'location'); // eslint-disable-line
      this.props.getMyProfileValue('public', 'website'); // eslint-disable-line
      this.props.getMyProfileValue('public', 'employer'); // eslint-disable-line
      this.props.getMyProfileValue('public', 'job'); // eslint-disable-line
      this.props.getMyProfileValue('public', 'school'); // eslint-disable-line
      this.props.getMyProfileValue('public', 'degree'); // eslint-disable-line
      this.props.getMyProfileValue('public', 'major'); // eslint-disable-line
      this.props.getMyProfileValue('public', 'year'); // eslint-disable-line
      this.props.getMyProfileValue('public', 'emoji'); // eslint-disable-line
      this.props.getMyProfileValue('private', 'birthday'); // eslint-disable-line

      await this.props.getMyFollowing(); // eslint-disable-line
      await this.props.getCollectibles(currentAddress); // eslint-disable-line
      await this.props.convert3BoxToSpaces(); // eslint-disable-line
      await this.props.getMySpacesData(currentAddress); // eslint-disable-line

      this.props.getActivity(); // eslint-disable-line
    } catch (err) {
      console.error(err);
    }
  }

  handleNextMobileModal = (thisModal, nextModal) => {
    this.setState({
      [`onBoardingModalMobile${thisModal}`]: false,
      [`onBoardingModalMobile${nextModal}`]: true,
    });
  }

  directSignIn = async (wallet) => {
    try {
      const { location: { pathname } } = this.props;
      const normalizedPath = normalizeURL(pathname);
      const currentUrlEthAddr = normalizedPath.split('/')[1];
      const profilePage = normalizedPath.split('/')[2];
      const doesEthAddrMatch = currentUrlEthAddr === this.props.currentAddress;

      await this.props.checkMobileWeb3(); // eslint-disable-line
      await this.props.injectWeb3('directLogin', false, wallet); // eslint-disable-line
      await this.props.checkNetwork(); // eslint-disable-line

      if (!doesEthAddrMatch) history.push(`/${this.props.currentAddress}/${profilePage || routes.ACTIVITY}`);

      await this.props.openBox(); // eslint-disable-line
      if (!this.props.showErrorModal) this.getMyData(); // eslint-disable-line
    } catch (err) {
      console.error(err);
    }
  }

  handleSignInUp = async (chooseWallet, shouldSignOut, e) => {
    try {
      if (e) e.stopPropagation();
      await this.props.checkMobileWeb3(); // eslint-disable-line
      if (checkIsMobileWithoutWeb3()) return;
      await this.props.injectWeb3(null, chooseWallet, false, shouldSignOut); // eslint-disable-line
      await this.props.checkNetwork(); // eslint-disable-line
      await this.props.openBox('fromSignIn'); // eslint-disable-line
      if (!this.props.showErrorModal) this.getMyData(); // eslint-disable-line
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
      mobileWalletRequiredModal,
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
    } = this.props;

    const {
      onBoardingModalMobileOne,
      onBoardingModalMobileTwo,
      onBoardingModalMobileThree,
    } = this.state;

    const normalizedPath = normalizeURL(pathname);
    const mustConsentError = errorMessage && errorMessage.message && errorMessage.message.substring(0, 65) === 'Error: Web3 Wallet Message Signature: User denied message signature.';
    const landing = pathname === routes.LANDING ? 'landing' : '';
    const { userAgent: ua } = navigator;
    const isIOS = ua.includes('iPhone');
    const isMyProfilePath = matchProtectedRoutes(normalizedPath.split('/')[2]);

    const splitRoute = normalizedPath.split('/');
    const isRequestRoute = checkRequestRoute(splitRoute);

    if (isRequestRoute) {
      return (
        <div className="App">
          <Switch>
            <Route
              exact
              path="(^[/][0][xX]\w{40}\b)/twitterRequest"
              component={PubProfileDummyTwitter}
            />

            <Route
              exact
              path="(^[/][0][xX]\w{40}\b)/previewRequest"
              component={PubProfileDummy}
            />

            <Route
              exact
              path="(^[/][0][xX]\w{40}\b)/(\w*activity|details|collectibles|data|edit\w*)/twitterRequest"
              component={PubProfileDummyTwitter}
            />

            <Route
              exact
              path="(^[/][0][xX]\w{40}\b)/(\w*activity|details|collectibles|data|edit\w*)/previewRequest"
              component={PubProfileDummy}
            />
          </Switch>
        </div>
      );
    }

    return (
      <div className="App">
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

        {(!isMyProfilePath && isLoggedIn) && <Nav />}

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
          handleContactsModal={this.props.handleContactsModal}
          handleSignInModal={this.props.handleSignInModal}
          handleMobileWalletModal={this.props.handleMobileWalletModal}
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
          saveFollowing={this.props.saveFollowing}
        />

        <Switch>
          <Route
            exact
            path={routes.LANDING}
            render={() => (
              <LandingNew
                handleSignInUp={this.handleSignInUp}
                isLoggedIn={isLoggedIn}
                errorMessage={errorMessage}
                showErrorModal={showErrorModal}
              />
            )}
          />

          <Route
            path={routes.API}
            render={() => (
              <APIs
                handleSignInUp={this.handleSignInUp}
                isLoggedIn={isLoggedIn}
                errorMessage={errorMessage}
                showErrorModal={showErrorModal}
              />
            )}
          />

          <Route
            exact
            path={routes.HUB}
            render={() => (
              <Dapp
                handleSignInUp={this.handleSignInUp}
                isLoggedIn={isLoggedIn}
                errorMessage={errorMessage}
                showErrorModal={showErrorModal}
              />
            )}
          />

          <Route
            exact
            path={routes.CAREERS}
            render={() => <Careers />}
          />
          <Route
            exact
            path={routes.TEAM}
            render={() => <Team />}
          />

          <Route
            exact
            path={routes.JOBS}
            render={() => <Redirect to={routes.CAREERS} />}
          />
          <Route
            exact
            path="(^[/][0][xX]\w{40}\b)/activity"
            render={() => <MyProfile handleSignInUp={this.handleSignInUp} />}
          />
          <Route
            exact
            path="(^[/][0][xX]\w{40}\b)/activity"
            render={() => <MyProfile handleSignInUp={this.handleSignInUp} />}
          />
          <Redirect from="/profile" to="/" />
          <Redirect from="/editprofile" to="/" />

          <Route
            exact
            path="(^[/][0][xX]\w{40}\b)/details"
            render={() => <MyProfile handleSignInUp={this.handleSignInUp} />}
          />

          <Route
            exact
            path="(^[/][0][xX]\w{40}\b)/collectibles"
            render={() => <MyProfile handleSignInUp={this.handleSignInUp} />}
          />

          <Route
            exact
            path="(^[/][0][xX]\w{40}\b)/following"
            render={() => <MyProfile handleSignInUp={this.handleSignInUp} />}
          />

          <Route
            exact
            path="(^[/][0][xX]\w{40}\b)/data"
            render={() => <Spaces handleSignInUp={this.handleSignInUp} />}
          />

          <Route
            exact
            path="(^[/][0][xX]\w{40}\b)/edit"
            render={() => <EditProfile handleSignInUp={this.handleSignInUp} />}
          />

          <Route
            exact
            path={routes.LOGIN}
            render={() => (
              <LogIn
                handleSignInUp={this.handleSignInUp}
              />
            )}
          />

          <Route
            exact
            path={routes.PARTNERS}
            component={() => (
              <Partners />
            )}
          />

          <Route
            exact
            path={routes.PRIVACY}
            component={() => (
              <Privacy />
            )}
          />

          <Route
            exact
            path={routes.TERMS}
            component={() => (
              <Terms />
            )}
          />

          <Route
            exact
            path="(^[/][0][xX]\w{40}\b)"
            component={PubProfile}
          />

          <Route render={() => <Redirect to={routes.LANDING} />} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  openBox: PropTypes.func.isRequired,
  injectWeb3: PropTypes.func.isRequired,
  getMyProfileValue: PropTypes.func.isRequired,
  checkMobileWeb3: PropTypes.func.isRequired,
  getMyFollowing: PropTypes.func.isRequired,
  getMyDID: PropTypes.func.isRequired,
  getCollectibles: PropTypes.func.isRequired,
  getMySpacesData: PropTypes.func.isRequired,
  convert3BoxToSpaces: PropTypes.func.isRequired,
  getMyMemberSince: PropTypes.func.isRequired,
  getVerifiedPublicGithub: PropTypes.func.isRequired,
  getVerifiedPublicTwitter: PropTypes.func.isRequired,
  getVerifiedPrivateEmail: PropTypes.func.isRequired,
  getActivity: PropTypes.func.isRequired,
  handleMobileWalletModal: PropTypes.func.isRequired,
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
  saveFollowing: PropTypes.func.isRequired,

  showDifferentNetworkModal: PropTypes.bool,
  showFollowingPublicModal: PropTypes.bool,
  onSyncFinished: PropTypes.bool,
  hasSignedOut: PropTypes.bool,
  isSyncing: PropTypes.bool,
  accessDeniedModal: PropTypes.bool,
  errorMessage: PropTypes.string,
  allowAccessModal: PropTypes.bool,
  provideConsent: PropTypes.bool,
  signInModal: PropTypes.bool,
  mobileWalletRequiredModal: PropTypes.bool,
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
};

App.defaultProps = {
  showDifferentNetworkModal: false,
  handleSignOut,
  accessDeniedModal: false,
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
  mobileWalletRequiredModal: false,
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

const mapState = state => ({
  showDifferentNetworkModal: state.uiState.showDifferentNetworkModal,
  allowAccessModal: state.uiState.allowAccessModal,
  provideConsent: state.uiState.provideConsent,
  signInModal: state.uiState.signInModal,
  mobileWalletRequiredModal: state.uiState.mobileWalletRequiredModal,
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

  onSyncFinished: state.userState.onSyncFinished,
  isSyncing: state.userState.isSyncing,
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
});

export default withRouter(connect(mapState,
  {
    openBox,
    injectWeb3,
    checkMobileWeb3,
    checkNetwork,
    getMyProfileValue,
    getMyDID,
    getCollectibles,
    getMySpacesData,
    convert3BoxToSpaces,
    getMyMemberSince,
    getVerifiedPublicGithub,
    getVerifiedPublicTwitter,
    getVerifiedPrivateEmail,
    getActivity,
    getMyFollowing,
    handleMobileWalletModal,
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
    saveFollowing,
    handleContactsModal,
  })(App));
