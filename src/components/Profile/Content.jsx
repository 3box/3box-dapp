import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, NavLink, Route } from 'react-router-dom';

import * as routes from '../../utils/routes';
import StatusUpdate from '../StatusUpdate';
import Activity from './Activity';
import Details from './Details';
import '../styles/Feed.css';
import '../../views/styles/Profile.css';
import '../styles/NetworkArray.css';

const ProfileContent = ({ location, publicProfileActivity, publicProfile, publicVerifiedAccounts }) => (
  <div>
    <StatusUpdate />
    <div className="profile__category--mobile">
      <div className="profile__category__sectionWrapper">
        <NavLink exact to={routes.PROFILE_ACTIVITY} className="profile__category__section borderRight ">Activity</NavLink>
        <NavLink exact to={routes.PROFILE_ABOUT} className="profile__category__section">Details</NavLink>
      </div>
    </div>
    {/* 
    {
      (location.pathname === routes.PROFILE_ACTIVITY
        || location.pathname.substring(6, 8) === '0x')
      && <Activity publicProfileActivity={publicProfileActivity} />
    }

    {
      (location.pathname === routes.PROFILE_ABOUT
        || location.pathname.substring(6, 8) === '0x')
      && <Details publicProfile={publicProfile} />
    } */}

    <Route
      exact
      path={routes.PROFILE_ACTIVITY}
      component={() => <Activity />}
    />

    <Route
      exact
      path={routes.PUBLIC_ACTIVITY}
      component={() => <Activity publicProfileActivity={publicProfileActivity} publicVerifiedAccounts={publicVerifiedAccounts} />}
    />

    <Route
      exact
      path={routes.PROFILE_ABOUT}
      component={() => <Details />}
    />

    <Route
      exact
      path={routes.PUBLIC_ABOUT}
      component={() => <Details publicProfile={publicProfile} publicVerifiedAccounts={publicVerifiedAccounts} />}
    />


  </div>
);

ProfileContent.propTypes = {
  location: PropTypes.object,
  publicProfile: PropTypes.object,
  publicVerifiedAccounts: PropTypes.object,
  publicProfileActivity: PropTypes.array,
};

ProfileContent.defaultProps = {
  location: {},
  publicProfile: {},
  publicVerifiedAccounts: {},
  publicProfileActivity: [],
};

const mapState = state => ({
  feedByAddress: state.threeBox.feedByAddress,
  ifFetchingActivity: state.threeBox.ifFetchingActivity,
  verifiedGithub: state.threeBox.verifiedGithub,
  publicVerifiedAccounts: state.threeBox.publicVerifiedAccounts,
});

export default withRouter(connect(mapState)(ProfileContent));
