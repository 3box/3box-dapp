import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { IntlProvider } from 'react-intl';

import * as routes from './utils/routes';
import NoMatch from './components/NoMatch';
import Landing from './views/Landing';
import Profile from './views/Profile';
import EditProfile from './views/EditProfile';
import About from './views/About';
import { openBox, getPublicName, getPublicGithub, getPublicImage, getPrivateEmail, getActivity } from './state/actions';
// import { getLocale } from './locales';

class App extends Component {
  constructor(props) {
    super(props);
    this.loadData = this.loadData.bind(this);
  }

  componentWillMount() {
    const { location } = this.props;
    const { pathname } = location;
    if (pathname === '/Profile' || pathname === '/EditProfile') {
      this.loadData();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { location } = this.props;
    const { pathname } = location;
    if (pathname === '/' && nextProps.location.pathname === ('/Profile' || '/EditProfile')) {
      // load profile data when user redirects from landing page
      this.loadData();
    }
  }

  async loadData() {
    await this.props.getActivity();
    await this.props.openBox();
    await this.props.getPublicName();
    await this.props.getPublicGithub();
    await this.props.getPublicImage();
    await this.props.getPrivateEmail();
  }

  // const locale = getLocale();
  render() {
    return (
      <Router basename={routes.LANDING}>
        <div className="App">
          <Switch>
            <Route exact path={routes.LANDING} component={Landing} />
            <Route exact path={routes.PROFILE} component={Profile} />
            <Route exact path={routes.EDITPROFILE} component={EditProfile} />
            <Route exact path={routes.ABOUT} component={About} />
            <Route component={NoMatch} />
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
  location: PropTypes.object,
};

App.defaultProps = {
  openBox: openBox(),
  getPublicName: getPublicName(),
  getPublicGithub: getPublicGithub(),
  getPublicImage: getPublicImage(),
  getPrivateEmail: getPrivateEmail(),
  getActivity: getActivity(),
  location: {},
};

const mapState = state => ({
  threeBox: state.threeBox,
});

export default withRouter(connect(mapState,
  {
    openBox, getPublicName, getPublicGithub, getPublicImage, getPrivateEmail, getActivity,
  })(App));
