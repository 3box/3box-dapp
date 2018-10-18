import React, { Component } from 'react';
import { Route, Switch, withRouter, Link } from 'react-router-dom';
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
  openBox,
  getPublicName,
  getPublicGithub,
  getPublicImage,
  getPrivateEmail,
  getActivity,
  checkForMetaMask,
  checkNetworkAndAddress,
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

    if ((pathname === '/Profile' || pathname === '/EditProfile') && web3) { // eslint-disable-line no-undef
      this.loadData();
    }

    console.log(localStorage);

    // if user is not logged in and on not the landing page, redirect them back to the landing page
    // if () {
    //   this.props.history.push(`${routes.USER_BASE}/${username}/list/${urlName}`)
    // } 
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
    const { switched, showDifferentNetworkModal, loggedOutModal, switchedAddressModal } = this.props;
    const switchBack = window.localStorage.getItem('switch');
    const currentNetwork = window.localStorage.getItem('currentNetwork');
    const prevPrevNetwork = window.localStorage.getItem('prevPrevNetwork');
    console.log(switchBack);
    console.log(currentNetwork);
    console.log(prevPrevNetwork);
    return (
      <div className="App">
        {(showDifferentNetworkModal && prevPrevNetwork !== currentNetwork) // AND user is returning to the same network
          // {(showDifferentNetworkModal && switchBack && prevPrevNetwork !== currentNetwork) // AND user is returning to the same network
          && (
            <div className="loadingContainer">
              <div className="differentNetwork__modal">
                <h4>
                  You've switched Ethereum networks
                  </h4>
                <p>
                  3Box profiles are stored on IPFS.
                  <br />
                  This allows you to use the same profile on different Ethereum networks.
                  <br />
                  Your 3Box information is the same across networks, but your Ethereum activity changes.
                  <br />
                  <br />
                  {`Switch back to
                      ${this.props.prevNetwork} in MetaMask or continue on
                      ${this.props.currentNetwork}`}
                </p>
                <button onClick={() => { this.props.proceedWithSwitchedAddress(); window.localStorage.setItem('switch', true); }} type="button">
                  Continue on
                  {` ${this.props.currentNetwork}`}
                </button>
              </div>
            </div>)}

        {loggedOutModal
          && (
            <div className="loadingContainer">
              <div className="differentNetwork__modal">
                <h4>
                  You've logged out of your web3 provider
                </h4>
                <br />
                <p>
                  Sign back in to your wallet or exit 3Box
                </p>
                <Link to={routes.LANDING}>
                  <button onClick={() => { this.props.showLoggedOutModal(); history.push(routes.LANDING); }} type="button">Exit</button>
                </Link>
              </div>
            </div>)}

        {switchedAddressModal
          && (
            <div className="loadingContainer">
              <div className="differentNetwork__modal">
                <h4>
                  You've switched Ethereum addresses
                </h4>
                <br />
                <p>
                  Revert to the previous address or login in the new address
                </p>
                <Link to={routes.LANDING}>
                  <button onClick={this.props.showSwitchedAddressModal} type="button">Sign back in</button>
                </Link>
              </div>
            </div>)}

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
    closeDifferentNetwork,
    proceedWithSwitchedAddress,
    showLoggedOutModal,
    showSwitchedAddressModal,
  })(App));
