import React, { Component } from 'react';
import { Route, Switch, withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as routes from './utils/routes';
import Nav from './components/Nav.js';
import Landing from './views/Landing.jsx';
import Profile from './views/Profile.jsx';
import EditProfile from './views/EditProfile.jsx';
import Privacy from './views/Privacy.jsx';
import Terms from './views/Terms.jsx';
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
    return (
      <div className="App">
        <Nav />

        {this.props.showDifferentNetworkModal
          && (
            <div className="loadingContainer">
              <div className="differentNetwork__modal">
                <h4>
                  You've switched Ethereum networks
                  </h4>
                <p>
                  {`You must sign back in with your current
                      ${this.props.currentNetwork} network`}
                  {/* {`Revert back to the
                      ${this.props.prevNetwork}
                      network you signed in with`}
                  <br />
                  {`or sign out and sign back in with the current
                      ${this.props.currentNetwork} network`} */}
                </p>
                <Link to={routes.LANDING}>
                  <button onClick={this.props.closeDifferentNetwork} type="button">Sign back in</button>
                </Link>
              </div>
            </div>)}

        {this.props.loggedOutModal
          && (
            <div className="loadingContainer">
              <div className="differentNetwork__modal">
                <h4>
                  You've logged out of your web3 provider.
                </h4>
                <br />
                <p>
                  You must sign back in to your wallet then sign in to 3Box to continue.
                </p>
                <Link to={routes.LANDING}>
                  <button onClick={this.props.showLoggedOutModal} type="button">Sign back in</button>
                </Link>
              </div>
            </div>)}

        {this.props.switchedAddressModal
          && (
            <div className="loadingContainer">
              <div className="differentNetwork__modal">
                <h4>
                  You've switched Ethereum addresses.
                </h4>
                <br />
                <p>
                  You must sign back in with your new address.
                </p>
                <Link to={routes.LANDING}>
                  <button onClick={this.props.showSwitchedAddressModal} type="button">Sign back in</button>
                </Link>
              </div>
            </div>)}

        <Switch>
          <Route exact path={routes.LANDING} component={Landing} />
          <Route exact path={routes.PROFILE} component={Profile} />
          <Route exact path={routes.EDITPROFILE} component={EditProfile} />
          <Route exact path={routes.PRIVACY} component={Privacy} />
          <Route exact path={routes.TERMS} component={Terms} />
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
  checkNetworkAndAddress: PropTypes.func,
  showLoggedOutModal: PropTypes.func,
  showSwitchedAddressModal: PropTypes.func,

  location: PropTypes.object,
  hasWallet: PropTypes.bool,
  showDifferentNetworkModal: PropTypes.bool,
  loggedOutModal: PropTypes.bool,
  switchedAddressModal: PropTypes.bool,
  showChangedAddressModal: PropTypes.bool,
  prevNetwork: PropTypes.string,
  currentNetwork: PropTypes.string,
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
  checkNetworkAndAddress: checkNetworkAndAddress(),
  showLoggedOutModal: showLoggedOutModal(),
  showSwitchedAddressModal: showSwitchedAddressModal(),

  location: {},
  hasWallet: true,
  showDifferentNetworkModal: false,
  loggedOutModal: false,
  switchedAddressModal: false,
  showChangedAddressModal: false,
  prevNetwork: '',
  currentNetwork: '',
};

const mapState = state => ({
  hasWallet: state.threeBox.hasWallet,
  showDifferentNetworkModal: state.threeBox.showDifferentNetworkModal,
  loggedOutModal: state.threeBox.loggedOutModal,
  switchedAddressModal: state.threeBox.switchedAddressModal,
  prevNetwork: state.threeBox.prevNetwork,
  currentNetwork: state.threeBox.currentNetwork,
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
    showLoggedOutModal,
    showSwitchedAddressModal,
  })(App));
