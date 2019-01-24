import React from 'react';
import { NavLink, Route } from 'react-router-dom';

import * as routes from '../../utils/routes';
import { address } from '../../utils/address';
import StatusUpdate from './StatusUpdate';
import Activity from './Activity';
import Details from './Details';
import '../styles/Feed.css';
import '../../views/styles/Profile.css';
import '../styles/NetworkArray.css';

const Content = () => (
  <div>
    <StatusUpdate />
    <div className="profile__category--mobile">
      <div className="profile__category__sectionWrapper">
        <NavLink exact to={`/${address}/${routes.ACTIVITY}`} className="profile__category__section">Activity</NavLink>
        <NavLink exact to={`/${address}/${routes.DETAILS}`} className="profile__category__section ">Details</NavLink>
      </div>
    </div>

    <Route
      exact
      path={routes.FORMAT_PROFILE_ACTIVITY}
      component={Activity}
    />

    <Route
      exact
      path={routes.FORMAT_PROFILE_ABOUT}
      component={Details}
    />
  </div>
);

export default Content;