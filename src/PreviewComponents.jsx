import React from 'react';
import {
  Route, Switch,
} from 'react-router-dom';

import PubProfileDummy from './views/Profile/PubProfileDummy';
import PubProfileDummyTwitter from './views/Profile/PubProfileDummyTwitter';

const PreviewComponents = () => (
  <div className="App">
    <Switch>
      <Route
        exact
        path="(^[/][0][xX]\w{40}\b)/twitterRequest"
        component={PubProfileDummyTwitter}
      />

      <Route
        exact
        path="(^[/][0][xX]\w{40}\b)/previewRequest"
        component={PubProfileDummy}
      />

      <Route
        exact
        path="(^[/][0][xX]\w{40}\b)/(\w*activity|details|collectibles|following|data|edit\w*)/twitterRequest"
        component={PubProfileDummyTwitter}
      />

      <Route
        exact
        path="(^[/][0][xX]\w{40}\b)/(\w*activity|details|collectibles|following|data|edit\w*)/previewRequest"
        component={PubProfileDummy}
      />
    </Switch>
  </div>
);

export default PreviewComponents;