import React from 'react';
import {
  NavLink, Route, Switch, withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as routes from '../../utils/routes';
import StatusUpdate from './StatusUpdate';
import Activity from './Activity';
import Details from './Details';
import '../styles/Feed.css';
import '../../views/styles/Profile.css';
import '../styles/NetworkArray.css';

const Content = ({ currentAddress }) => (
  <div>
    <StatusUpdate />
    <div className="profile__category--mobile">
      <div className="profile__category__sectionWrapper">
        <NavLink exact to={`/${currentAddress}/${routes.ACTIVITY}`} className="profile__category__section">Activity</NavLink>
        <NavLink exact to={`/${currentAddress}/${routes.DETAILS}`} className="profile__category__section ">Details</NavLink>
      </div>
    </div>

    <Switch>
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
    </Switch>


  </div>
);

Content.propTypes = {
  currentAddress: PropTypes.string,
};

Content.defaultProps = {
  currentAddress: '',
};

const mapState = state => ({
  currentAddress: state.threeBox.currentAddress,
});

export default withRouter(connect(mapState)(Content));
