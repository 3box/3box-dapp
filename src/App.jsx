import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as routes from './utils/routes';
import Landing from './views/Landing.jsx';
import Profile from './views/Profile.jsx';
import EditProfile from './views/EditProfile.jsx';
import Privacy from './views/Privacy.jsx';
import Terms from './views/Terms.jsx';
import history from './history';

import {
  SwitchedAddressModal,
  SwitchedNetworksModal,
  LoggedOutModal,
  OnBoardingModalDesktop,
  LoadingThreeBoxProfileModal,
  OnBoardingModalMobile,
} from './components/Modals.jsx';

import {
  openBox,
  getPublicName,
  getPublicGithub,
  getPublicImage,
  getPrivateEmail,
  getActivity,
  checkForWeb3Wallet,
  initialCheckNetworkAndAddress,
  handleSignOut,
} from './state/actions';

import {
  handleSignInModal,
  closeDifferentNetworkModal,
  proceedWithSwitchedAddressModal,
  handleLoggedOutModal,
  handleSwitchedAddressModal,
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
    }
    this.loadData = this.loadData.bind(this);
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  async componentDidMount() {
    const { location } = this.props;
    const { pathname } = location;

    // window.addEventListener('load',
    await this.props.checkForWeb3Wallet()
    // )
    const loginStatus = this.props.isLoggedIn;

    this.props.hasWallet && await this.props.initialCheckNetworkAndAddress();

    if ((pathname === '/Profile' || pathname === '/EditProfile') && typeof window.web3 !== 'undefined' && loginStatus) { // eslint-disable-line no-undef
      this.loadData();
    } else if (pathname === '/' && typeof window.web3 !== 'undefined' && loginStatus) { // eslint-disable-line no-undef
      history.push(routes.PROFILE);
      this.loadData();
    } else if ((pathname === '/Profile' || pathname === '/EditProfile') && !loginStatus) {
      history.push(routes.LANDING);
      this.props.handleSignInModal();
    }
  }

  handleNextMobileModal = (thisModal, nextModal) => {
    this.setState({
      [`onBoardingModalMobile${thisModal}`]: false,
      [`onBoardingModalMobile${nextModal}`]: true
    })
  }

  async loadData() {
    // await this.props.checkNetworkAndAddress();
    await this.props.openBox();
    await this.props.getActivity();
    await this.props.getPublicName();
    await this.props.getPublicGithub();
    await this.props.getPublicImage();
    await this.props.getPrivateEmail();
  }

  render() {
    const {
      showDifferentNetworkModal,
      loggedOutModal,
      switchedAddressModal,
      prevNetwork,
      currentNetwork,
      onBoardingModal,
      onBoardingModalTwo,
      ifFetchingThreeBox,
    } = this.props;
    const { onBoardingModalMobileOne, onBoardingModalMobileTwo, onBoardingModalMobileThree } = this.state;
    const prevPrevNetwork = window.localStorage.getItem('prevPrevNetwork');
    const currentNetworkState = window.localStorage.getItem('currentNetwork');

    const { width } = this.state;
    const isMobile = width <= 600;

    return (
      <div className="App">
        <LoadingThreeBoxProfileModal show={ifFetchingThreeBox} />

        <SwitchedNetworksModal
          prevNetwork={prevNetwork}
          currentNetwork={currentNetwork}
          isMobile={isMobile}
          proceedWithSwitchedAddressModal={this.props.proceedWithSwitchedAddressModal}
          show={(showDifferentNetworkModal && prevPrevNetwork !== currentNetworkState)}
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
          handleOnboardingModal={this.props.handleOnboardingModal} />

        <OnBoardingModalMobile
          isMobile={isMobile}
          handleOnboardingModal={this.props.handleOnboardingModal}
          showOne={onBoardingModal}
          showTwo={onBoardingModalMobileOne}
          showThree={onBoardingModalMobileTwo}
          showFour={onBoardingModalMobileThree}
          handleNextMobileModal={this.handleNextMobileModal} />

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
  openBox: PropTypes.func,
  getPublicName: PropTypes.func,
  getPublicGithub: PropTypes.func,
  getPublicImage: PropTypes.func,
  getPrivateEmail: PropTypes.func,
  getActivity: PropTypes.func,
  checkForWeb3Wallet: PropTypes.func,
  closeDifferentNetworkModal: PropTypes.func,
  proceedWithSwitchedAddressModal: PropTypes.func,
  handleSignOut: PropTypes.func,
  initialCheckNetworkAndAddress: PropTypes.func,
  handleSignInModal: PropTypes.func,
  handleLoggedOutModal: PropTypes.func,
  handleSwitchedAddressModal: PropTypes.func,
  handleOnboardingModal: PropTypes.func,

  location: PropTypes.object,
  hasWallet: PropTypes.bool,
  showDifferentNetworkModal: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  hasWallet: PropTypes.bool,
  switched: PropTypes.bool,
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
  openBox: openBox(),
  getPublicName: getPublicName(),
  getPublicGithub: getPublicGithub(),
  getPublicImage: getPublicImage(),
  getPrivateEmail: getPrivateEmail(),
  getActivity: getActivity(),
  checkForWeb3Wallet: checkForWeb3Wallet(),
  closeDifferentNetworkModal: closeDifferentNetworkModal(),
  proceedWithSwitchedAddressModal: proceedWithSwitchedAddressModal(),
  initialCheckNetworkAndAddress: initialCheckNetworkAndAddress(),
  handleSignInModal: handleSignInModal(),
  handleLoggedOutModal: handleLoggedOutModal(),
  handleSwitchedAddressModal: handleSwitchedAddressModal(),
  handleSignOut: handleSignOut(),
  handleOnboardingModal: handleOnboardingModal(),

  location: {},
  hasWallet: true,
  showDifferentNetworkModal: false,
  switched: false,
  loggedOutModal: false,
  switchedAddressModal: false,
  onBoardingModal: false,
  onBoardingModalTwo: false,
  ifFetchingThreeBox: false,
  isLoggedIn: false,
  hasWallet: false,
  prevNetwork: '',
  currentNetwork: '',
  prevPrevNetwork: '',
};

const mapState = state => ({
  hasWallet: state.threeBox.hasWallet,
  showDifferentNetworkModal: state.threeBox.showDifferentNetworkModal,
  switched: state.threeBox.switched,
  loggedOutModal: state.threeBox.loggedOutModal,
  switchedAddressModal: state.threeBox.switchedAddressModal,
  onBoardingModal: state.threeBox.onBoardingModal,
  onBoardingModalTwo: state.threeBox.onBoardingModalTwo,
  prevNetwork: state.threeBox.prevNetwork,
  currentNetwork: state.threeBox.currentNetwork,
  prevPrevNetwork: state.threeBox.prevPrevNetwork,
  isLoggedIn: state.threeBox.isLoggedIn,
  hasWallet: state.threeBox.hasWallet,
  ifFetchingThreeBox: state.threeBox.ifFetchingThreeBox,
});

export default withRouter(connect(mapState,
  {
    openBox,
    getPublicName,
    getPublicGithub,
    getPublicImage,
    getPrivateEmail,
    getActivity,
    checkForWeb3Wallet,
    initialCheckNetworkAndAddress,
    handleSignInModal,
    closeDifferentNetworkModal,
    proceedWithSwitchedAddressModal,
    handleLoggedOutModal,
    handleSignOut,
    handleSwitchedAddressModal,
    handleOnboardingModal,
  })(App));
