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
  Settings,
} from './DynamicImports';

const AppRoutes = (props) => {
  const {
    handleSignInUp,
    isLoggedIn,
    errorMessage,
    showErrorModal,
  } = props;

  return (
    <Switch>
      <Route
        exact
        path={routes.LANDING}
        render={() => (
          <LandingNew
            handleSignInUp={handleSignInUp}
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
            handleSignInUp={handleSignInUp}
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
            handleSignInUp={handleSignInUp}
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
        render={() => <MyProfile handleSignInUp={handleSignInUp} />}
      />

      <Route
        exact
        path="(^[/][0][xX]\w{40}\b)/wall"
        render={() => <MyProfile handleSignInUp={handleSignInUp} />}
      />
      <Redirect from="/profile" to="/" />
      <Redirect from="/editprofile" to="/" />

      <Route
        exact
        path="(^[/][0][xX]\w{40}\b)/details"
        render={() => <MyProfile handleSignInUp={handleSignInUp} />}
      />

      <Route
        exact
        path="(^[/][0][xX]\w{40}\b)/collectibles"
        render={() => <MyProfile handleSignInUp={handleSignInUp} />}
      />

      <Route
        exact
        path="(^[/][0][xX]\w{40}\b)/following"
        render={() => <MyProfile handleSignInUp={handleSignInUp} />}
      />

      <Route
        exact
        path="(^[/][0][xX]\w{40}\b)/data"
        render={() => <Spaces handleSignInUp={handleSignInUp} />}
      />

      <Route
        exact
        path="(^[/][0][xX]\w{40}\b)/edit"
        render={() => <EditProfile handleSignInUp={handleSignInUp} />}
      />

      <Route
        exact
        path="(^[/][0][xX]\w{40}\b)/settings"
        render={() => <Settings handleSignInUp={handleSignInUp} />}
      />

      <Route
        exact
        path={routes.LOGIN}
        render={() => (
          <LogIn
            handleSignInUp={handleSignInUp}
          />
        )}
      />

      <Route
        exact
        path={routes.PARTNERS}
        render={() => (
          <Partners />
        )}
      />

      <Route
        exact
        path={routes.PRIVACY}
        render={() => (
          <Privacy />
        )}
      />

      <Route
        exact
        path={routes.TERMS}
        render={() => (
          <Terms />
        )}
      />

      <Route
        exact
        path="(^[/][0][xX]\w{40}\b)"
        // component={PubProfile}
        render={() => (
          <PubProfile
            handleSignInUp={handleSignInUp}
          />
        )}
      />

      <Route render={() => <Redirect to={routes.LANDING} />} />
    </Switch>
  );
};

AppRoutes.propTypes = {
  handleSignInUp: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool,
  errorMessage: PropTypes.string,
  showErrorModal: PropTypes.bool,
};

AppRoutes.defaultProps = {
  isLoggedIn: false,
  errorMessage: '',
  showErrorModal: false,
};

function mapState(state) {
  return {
    verifiedGithub: state.myData.verifiedGithub,

    onOtherProfilePage: state.uiState.onOtherProfilePage,

    currentAddress: state.userState.currentAddress,
  };
}

export default withRouter(connect(mapState)(AppRoutes));
