import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Switch,
  Route,
  withRouter,
  Redirect,
} from 'react-router-dom';

import * as routes from './utils/routes';

import APIs from './views/Landing/API/APIs';
import Dapp from './views/Landing/Dapp/Dapp';
import LandingNew from './views/Landing/LandingNew';
import Partners from './views/Landing/Partners';
import Team from './views/Landing/Team';
import LogIn from './views/Profile/LogIn';
import {
  MyProfile,
  Spaces,
  EditProfile,
  PubProfile,
  Careers,
  Terms,
  Privacy,
} from './DynamicImports';

const AppRoutes = props => (
  <Switch>
    <Route
      exact
      path={routes.LANDING}
      render={() => (
        <LandingNew
          handleSignInUp={props.handleSignInUp}
          isLoggedIn={props.isLoggedIn}
          errorMessage={props.errorMessage}
          showErrorModal={props.showErrorModal}
        />
      )}
    />

    <Route
      path={routes.API}
      render={() => (
        <APIs
          handleSignInUp={props.handleSignInUp}
          isLoggedIn={props.isLoggedIn}
          errorMessage={props.errorMessage}
          showErrorModal={props.showErrorModal}
        />
      )}
    />

    <Route
      exact
      path={routes.HUB}
      render={() => (
        <Dapp
          handleSignInUp={props.handleSignInUp}
          isLoggedIn={props.isLoggedIn}
          errorMessage={props.errorMessage}
          showErrorModal={props.showErrorModal}
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
      render={() => <MyProfile handleSignInUp={props.handleSignInUp} />}
    />
    <Route
      exact
      path="(^[/][0][xX]\w{40}\b)/activity"
      render={() => <MyProfile handleSignInUp={props.handleSignInUp} />}
    />
    <Redirect from="/profile" to="/" />
    <Redirect from="/editprofile" to="/" />

    <Route
      exact
      path="(^[/][0][xX]\w{40}\b)/details"
      render={() => <MyProfile handleSignInUp={props.handleSignInUp} />}
    />

    <Route
      exact
      path="(^[/][0][xX]\w{40}\b)/collectibles"
      render={() => <MyProfile handleSignInUp={props.handleSignInUp} />}
    />

    <Route
      exact
      path="(^[/][0][xX]\w{40}\b)/following"
      render={() => <MyProfile handleSignInUp={props.handleSignInUp} />}
    />

    <Route
      exact
      path="(^[/][0][xX]\w{40}\b)/data"
      render={() => <Spaces handleSignInUp={props.handleSignInUp} />}
    />

    <Route
      exact
      path="(^[/][0][xX]\w{40}\b)/edit"
      render={() => <EditProfile handleSignInUp={props.handleSignInUp} />}
    />

    <Route
      exact
      path={routes.LOGIN}
      render={() => (
        <LogIn
          handleSignInUp={props.handleSignInUp}
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
);

AppRoutes.propTypes = {
  verifiedGithub: PropTypes.string,
};

AppRoutes.defaultProps = {
  verifiedGithub: '',
};

function mapState(state) {
  return {
    verifiedGithub: state.myData.verifiedGithub,

    onOtherProfilePage: state.uiState.onOtherProfilePage,

    currentAddress: state.userState.currentAddress,
  };
}

export default withRouter(connect(mapState)(AppRoutes));
