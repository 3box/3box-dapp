import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';

const AppRoutes = () => (
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
      component={MyProfile}
    />
    <Redirect from="/profile" to="/" />
    <Redirect from="/editprofile" to="/" />

    <Route
      exact
      path="(^[/][0][xX]\w{40}\b)/details"
      component={MyProfile}
    />

    <Route
      exact
      path="(^[/][0][xX]\w{40}\b)/collectibles"
      component={MyProfile}
    />

    <Route
      exact
      path="(^[/][0][xX]\w{40}\b)/following"
      component={MyProfile}
    />

    <Route
      exact
      path="(^[/][0][xX]\w{40}\b)/data"
      component={Spaces}
    />

    <Route
      exact
      path="(^[/][0][xX]\w{40}\b)/edit"
      component={EditProfile}
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

    <Route
      component={() => (
        <NoMatch
          isLoggedIn={isLoggedIn}
          handleSignInUp={this.handleSignInUp}
        />
      )}
    />

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
