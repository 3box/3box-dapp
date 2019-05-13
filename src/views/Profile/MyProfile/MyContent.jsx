import React from 'react';
import {
  NavLink, Route, Switch, withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as routes from '../../../utils/routes';
import Activity from './Activity';
import Details from '../Details';
import Collectibles from '../Collectibles';
import Contacts from '../Contacts';
import ActivityIcon from '../../../assets/Activity.svg';
import DetailsIcon from '../../../assets/Details.svg';
import CollectiblesIcon from '../../../assets/Collectibles.svg';
import ContactsIcon from '../../../assets/Contacts.svg';
import '../styles/Feed.css';
import '../styles/Profile.css';
import '../../../components/styles/NetworkArray.css';

const Content = ({ currentAddress }) => (
  <div>
    <div className="profile__category--mobile">
      <div className="profile__category__sectionWrapper">
        <NavLink
          exact
          to={`/${currentAddress}/${routes.ACTIVITY}`}
          className="profile__category__section"
        >
          <img src={ActivityIcon} alt="Activity" className="profile__category__tabIcon--activity--mobile" />
          Activity
        </NavLink>

        <NavLink
          exact
          to={`/${currentAddress}/${routes.DETAILS}`}
          className="profile__category__section "
        >
          <img src={DetailsIcon} alt="Details" className="profile__category__tabIcon--details--mobile" />
          Details
        </NavLink>

        <NavLink
          exact
          to={`/${currentAddress}/${routes.COLLECTIBLES}`}
          className="profile__category__section "
        >
          <img src={CollectiblesIcon} alt="Collectibles" className="profile__category__tabIcon--collectibles--mobile" />
          Collectibles
        </NavLink>

        <NavLink
          exact
          to={`/${currentAddress}/${routes.CONTACTS}`}
          className="profile__category__section "
        >
          <img src={ContactsIcon} alt="Contacts" className="profile__category__tabIcon--collectibles--mobile" />
          Contacts
        </NavLink>
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

      <Route
        exact
        path={routes.FORMAT_PROFILE_COLLECTIBLES}
        component={Collectibles}
      />

      <Route
        exact
        path={routes.FORMAT_PROFILE_CONTACTS}
        component={Contacts}
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
  currentAddress: state.userState.currentAddress,
});

export default withRouter(connect(mapState)(Content));
