import React from 'react';
import {
  NavLink, Route, Switch, withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as routes from '../../../utils/routes';
import Activity from './Activity';
import Wall from '../Wall';
import Details from '../Details';
import Collectibles from '../Collectibles';
import Following from '../Following';
import ActivityIcon from '../../../assets/Activity.svg';
import Post from '../../../assets/Post.svg';
import DetailsIcon from '../../../assets/Details.svg';
import CollectiblesIcon from '../../../assets/Collectibles.svg';
import ContactsIcon from '../../../assets/Contacts.svg';
import '../styles/Feed.css';
import '../styles/Profile.css';
import '../../../components/styles/NetworkArray.css';

const Content = ({ currentAddress, handleSignInUp, history }) => {
  const { pathname } = history.location;
  const paths = pathname.split('/');
  return (
    <div>
      <div className="profile__category--mobile">
        <div className="profile__category__sectionWrapper">
          <NavLink
            exact
            to={`/${currentAddress}/${routes.WALL}`}
            className="profile__category__section"
          >
            <img src={Post} alt="Activity" className="profile__category__tabIcon--activity--mobile" />
          </NavLink>

          <NavLink
            exact
            to={`/${currentAddress}/${routes.ACTIVITY}`}
            className="profile__category__section"
          >
            <img src={ActivityIcon} alt="Activity" className="profile__category__tabIcon--activity--mobile" />
          </NavLink>

          <NavLink
            exact
            to={`/${currentAddress}/${routes.DETAILS}`}
            className="profile__category__section "
          >
            <img src={DetailsIcon} alt="Details" className="profile__category__tabIcon--details--mobile" />
          </NavLink>

          <NavLink
            exact
            to={`/${currentAddress}/${routes.COLLECTIBLES}`}
            className="profile__category__section "
          >
            <img src={CollectiblesIcon} alt="Collectibles" className="profile__category__tabIcon--collectibles--mobile" />
          </NavLink>

          <NavLink
            exact
            to={`/${currentAddress}/${routes.FOLLOWING}`}
            className="profile__category__section "
          >
            <img src={ContactsIcon} alt="Following" className="profile__category__tabIcon--collectibles--mobile" />
          </NavLink>
        </div>
      </div>

      <>
        <Wall handleSignInUp={handleSignInUp} isActive={paths[2] === 'wall'} />

        <Activity isActive={paths[2] === 'activity'} />

        <Details isActive={paths[2] === 'details'} />

        <Collectibles isActive={paths[2] === 'collectibles'} />

        <Following isActive={paths[2] === 'following'} />
      </>
    </div>
  );
};

Content.propTypes = {
  currentAddress: PropTypes.string,
  handleSignInUp: PropTypes.func.isRequired,
  history: PropTypes.object,
};

Content.defaultProps = {
  currentAddress: '',
  history: {},
};

const mapState = (state) => ({
  currentAddress: state.userState.currentAddress,
});

export default withRouter(connect(mapState)(Content));
