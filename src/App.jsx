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
import address from './utils/address';

import {
  SwitchedAddressModal,
  SwitchedNetworksModal,
  LoggedOutModal,
} from './components/Modals.jsx';

import {
  openBox,
  getPublicName,
  getPublicGithub,
  getPublicImage,
  getPrivateEmail,
  getActivity,
  checkForMetaMask,
  checkNetworkAndAddress,
  initialCheckNetwork,
  handleSignInModal,
  closeDifferentNetwork,
  proceedWithSwitchedAddress,
  showLoggedOutModal,
  showSwitchedAddressModal,
} from './state/actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.loadData = this.loadData.bind(this);
  }

  componentDidMount() {
    const { location } = this.props;
    const { pathname } = location;

    this.props.checkForMetaMask();
    if (pathname === '/') this.props.initialCheckNetwork();

    if ((pathname === '/Profile' || pathname === '/EditProfile') && typeof web3 !== 'undefined' && ThreeBox.isLoggedIn(address)) { // eslint-disable-line no-undef
      this.loadData();
    } else if (pathname === '/' && typeof web3 !== 'undefined' && ThreeBox.isLoggedIn(address)) { // eslint-disable-line no-undef
      history.push(routes.PROFILE);
      this.loadData();
    } else if ((pathname === '/Profile' || pathname === '/EditProfile') && !ThreeBox.isLoggedIn(address)) { // eslint-disable-line no-undef
      history.push(routes.LANDING);
      this.props.handleSignInModal();
    }
  }

  async loadData() {
    await this.props.checkNetworkAndAddress();
    await this.props.openBox();
    await this.props.getActivity();
    await this.props.getPublicName();
    await this.props.getPublicGithub();
    await this.props.getPublicImage();
    await this.props.getPrivateEmail();
  }

  render() {
    const { switched, showDifferentNetworkModal, loggedOutModal, switchedAddressModal, prevNetwork, currentNetwork } = this.props;
    const switchBack = window.localStorage.getItem('switch');
    const currentEthNetwork = window.localStorage.getItem('currentNetwork');
    const prevPrevNetwork = window.localStorage.getItem('prevPrevNetwork');
    console.log(switchBack);
    console.log('currentNetwork', currentEthNetwork);
    console.log('prevPrevNetwork', prevPrevNetwork);

    return (
      <div className="App">
        {(showDifferentNetworkModal && prevPrevNetwork !== currentNetwork) // AND user is returning to the same network
          // {(showDifferentNetworkModal && switchBack && prevPrevNetwork !== currentNetwork) // AND user is returning to the same network
          && (
            <SwitchedNetworksModal
              prevNetwork={prevNetwork}
              currentNetwork={currentNetwork}
              proceedWithSwitchedAddress={this.props.proceedWithSwitchedAddress} />)}

        {loggedOutModal && <LoggedOutModal showLoggedOutModal={this.props.showLoggedOutModal} />}
        {switchedAddressModal && <SwitchedAddressModal showSwitchedAddressModal={this.props.showSwitchedAddressModal} />}

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
  checkForMetaMask: PropTypes.func,
  closeDifferentNetwork: PropTypes.func,
  proceedWithSwitchedAddress: PropTypes.func,
  checkNetworkAndAddress: PropTypes.func,
  initialCheckNetwork: PropTypes.func,
  handleSignInModal: PropTypes.func,
  showLoggedOutModal: PropTypes.func,
  showSwitchedAddressModal: PropTypes.func,

  location: PropTypes.object,
  hasWallet: PropTypes.bool,
  showDifferentNetworkModal: PropTypes.bool,
  switched: PropTypes.bool,
  loggedOutModal: PropTypes.bool,
  switchedAddressModal: PropTypes.bool,
  showChangedAddressModal: PropTypes.bool,
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
  checkForMetaMask: checkForMetaMask(),
  closeDifferentNetwork: closeDifferentNetwork(),
  proceedWithSwitchedAddress: proceedWithSwitchedAddress(),
  checkNetworkAndAddress: checkNetworkAndAddress(),
  initialCheckNetwork: initialCheckNetwork(),
  handleSignInModal: handleSignInModal(),
  showLoggedOutModal: showLoggedOutModal(),
  showSwitchedAddressModal: showSwitchedAddressModal(),

  location: {},
  hasWallet: true,
  showDifferentNetworkModal: false,
  switched: false,
  loggedOutModal: false,
  switchedAddressModal: false,
  showChangedAddressModal: false,
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
  prevNetwork: state.threeBox.prevNetwork,
  currentNetwork: state.threeBox.currentNetwork,
  prevPrevNetwork: state.threeBox.prevPrevNetwork,
  showChangedAddressModal: state.threeBox.showChangedAddressModal,
  logOut: state.threeBox.logOut,
});

export default withRouter(connect(mapState,
  {
    openBox,
    getPublicName,
    getPublicGithub,
    getPublicImage,
    getPrivateEmail,
    getActivity,
    checkForMetaMask,
    checkNetworkAndAddress,
    initialCheckNetwork,
    handleSignInModal,
    closeDifferentNetwork,
    proceedWithSwitchedAddress,
    showLoggedOutModal,
    showSwitchedAddressModal,
  })(App));
