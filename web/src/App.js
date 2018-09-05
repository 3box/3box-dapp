import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import * as routes from './utils/routes';

import { getLocale } from './locales';
import NoMatch from './components/NoMatch';
import Nav from './components/Nav';
import Footer from './components/Footer';

import Landing from './containers/Landing';
import Profile from './containers/Profile';
import EditProfile from './containers/EditProfile';
import About from './containers/About';

function App() {
  const locale = getLocale();

  return (
    <IntlProvider locale={locale.locale} messages={locale.messages}>
      <Router basename={routes.LANDING}>
        <div className="App">
          <Nav />
          <Switch>
            <Route exact path={routes.LANDING} component={Landing} />
            <Route exact path={routes.PROFILE} component={Profile} />
            <Route exact path={routes.EDITPROFILE} component={EditProfile} />
            <Route exact path={routes.ABOUT} component={About} />
            <Route component={NoMatch} />
          </Switch>
          <Footer />
        </div>
      </Router>
    </IntlProvider>
  );
}

export default App;
