import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';

import PubProfileDummy from './views/Profile/PubProfileDummy';
import PubProfileDummyTwitter from './views/Profile/PubProfileDummyTwitter';

const AppPreviewRoutes = () => (
  <div className="App">
    <Switch>
      <Route
        exact
        path="(^[/][0][xX]\w{40}\b)/twitterRequest"
        render={PubProfileDummyTwitter}
      />

      <Route
        exact
        path="(^[/][0][xX]\w{40}\b)/previewRequest"
        render={PubProfileDummy}
      />

      <Route
        exact
        path="(^[/][0][xX]\w{40}\b)/(\w*activity|details|collectibles|data|edit\w*)/twitterRequest"
        render={PubProfileDummyTwitter}
      />

      <Route
        exact
        path="(^[/][0][xX]\w{40}\b)/(\w*activity|details|collectibles|data|edit\w*)/previewRequest"
        render={PubProfileDummy}
      />
    </Switch>
  </div>
);

AppPreviewRoutes.propTypes = {
  verifiedGithub: PropTypes.string,
};

AppPreviewRoutes.defaultProps = {
  verifiedGithub: '',
};

function mapState(state) {
  return {
    verifiedGithub: state.myData.verifiedGithub,

    onOtherProfilePage: state.uiState.onOtherProfilePage,

    currentAddress: state.userState.currentAddress,
  };
}

export default withRouter(connect(mapState)(AppPreviewRoutes));
