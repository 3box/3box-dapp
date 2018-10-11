import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as routes from './utils/routes';
import Nav from './components/Nav.js';
import Landing from './views/Landing.jsx';
import Profile from './views/Profile.jsx';
import EditProfile from './views/EditProfile.jsx';
import Privacy from './views/Privacy.jsx';
import Terms from './views/Terms.jsx';
import { openBox, getPublicName, getPublicGithub, getPublicImage, getPrivateEmail, getActivity, checkForMetaMask, closeRequireMetaMask } from './state/actions';

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
    await this.props.openBox();
    await this.props.getActivity();
    await this.props.getPublicName();
    await this.props.getPublicGithub();
    await this.props.getPublicImage();
    await this.props.getPrivateEmail();
  }

  render() {
    return (
      <Router basename={routes.LANDING}>
        <div className="App">
          <Nav />
          <Switch>
            <Route exact path={routes.LANDING} component={Landing} />
            <Route exact path={routes.PROFILE} component={Profile} />
            <Route exact path={routes.EDITPROFILE} component={EditProfile} />
            <Route exact path={routes.PRIVACY} component={Privacy} />
            <Route exact path={routes.TERMS} component={Terms} />
          </Switch>
        </div>
      </Router>
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
  closeRequireMetaMask: PropTypes.func,

  location: PropTypes.object,
  hasWallet: PropTypes.bool,
};

App.defaultProps = {
  openBox: openBox(),
  getPublicName: getPublicName(),
  getPublicGithub: getPublicGithub(),
  getPublicImage: getPublicImage(),
  getPrivateEmail: getPrivateEmail(),
  getActivity: getActivity(),
  checkForMetaMask: checkForMetaMask(),
  closeRequireMetaMask: closeRequireMetaMask(),
  location: {},
  hasWallet: true,
};

const mapState = state => ({
  hasWallet: state.threeBox.hasWallet,
});

export default withRouter(connect(mapState,
  {
    openBox, getPublicName, getPublicGithub, getPublicImage, getPrivateEmail, getActivity, checkForMetaMask, closeRequireMetaMask,
  })(App));
