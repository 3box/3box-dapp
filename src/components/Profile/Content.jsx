import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';

import * as routes from '../../utils/routes';
import StatusUpdate from '../StatusUpdate';
import Activity from './Activity';
import Details from './Details';
import '../styles/Feed.css';
import '../../views/styles/Profile.css';
import '../styles/NetworkArray.css';

const ProfileContent = ({ location }) => (
  <div>
    <StatusUpdate />

    <div className="profile__category--mobile">
      <div className="profile__category__sectionWrapper">
        <NavLink exact to={routes.PROFILE_ACTIVITY} className="profile__category__section borderRight ">Activity</NavLink>
        <NavLink exact to={routes.PROFILE_ABOUT} className="profile__category__section">Details</NavLink>
      </div>
    </div>

    {
      location.pathname === routes.PROFILE_ACTIVITY
      && <Activity />
    }

    {
      location.pathname === routes.PROFILE_ABOUT
      && <Details />
    }

    {/* {
      location.pathname === routes.PROFILE_COLLECTIBLES
      && <Collectibles />
    } */}

    {/* <Switch>
      <Route
        exact
        path={routes.PROFILE_ACTIVITY}
        component={() => <Activity />}
      />
      <Route
        exact
        path={routes.PROFILE_ABOUT}
        component={() => <Details />}
      />
      <Route
        exact
        path={routes.PROFILE_COLLECTIBLES}
        component={() => <Collectibles />}
      />
    </Switch> */}

  </div>
);

ProfileContent.propTypes = {
  location: PropTypes.object,
};

ProfileContent.defaultProps = {
  location: {},
};

const mapState = state => ({
  feedByAddress: state.threeBox.feedByAddress,
  ifFetchingActivity: state.threeBox.ifFetchingActivity,
  verifiedGithub: state.threeBox.verifiedGithub,
});

export default withRouter(connect(mapState)(ProfileContent));
