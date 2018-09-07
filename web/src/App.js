import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { IntlProvider } from 'react-intl';
import ThreeBox from '3box';

import * as routes from './utils/routes';
// import { getLocale } from './locales';
import NoMatch from './components/NoMatch';
import Landing from './views/Landing';
import Profile from './views/Profile';
import EditProfile from './views/EditProfile';
import About from './views/About';

class App extends Component {
  componentDidMount() {
    ThreeBox
      .openBox(web3.eth.accounts[0], web3.currentProvider) // eslint-disable-line no-undef
      .then((threeBox) => {
        console.log('in threebox', threeBox); // eslint-disable-line no-console
        // threeBox.profileStore.set('name', 'kenzo').then(res => console.log(res));
        // threeBox.privateStore.set('email', 'kenzo@nyu.edu').then(res => console.log(res));

        threeBox.profileStore.get('name').then(res => console.log(res));
        // threeBox.privateStore.get('email').then(res => console.log(res));
      }).catch(error => console.log(error)); // eslint-disable-line no-console
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

export default App;
