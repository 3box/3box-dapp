import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { alphabetize } from '../../utils/funcs';

import FollowingTile from '../../components/FollowingTile';
import Loading from '../../assets/3BoxLoading.svg';
import Globe from '../../assets/Globe.svg';
import './styles/Profile.scss';
import './styles/Feed.scss';

const Following = ({ following, isLoadingMyFollowing, isActive }) => (
  <div id="myFeed" className={`profileTab ${isActive ? 'viewTab' : ''}`}>
    <div>
      <div className="profile_header">
        <div className="followingHeader_title" id="feed__header">
          {`Following (${following.length})`}
          {/* <img src={Globe} alt="Public" className="favorites__publicIcon" title="Following will appear in your public profile" /> */}
        </div>
        <div className="followingHeader_warning">
          <p className="followingHeader_warning_text">Addresses you follow are public</p>
        </div>
      </div>

      {
        following.length > 0 ? (
          <div className="contact_list">
            {alphabetize(following).map((user) => (
              <FollowingTile
                user={user[0]}
                isFollowing
                address={user[1]}
              />
            ))}
          </div>
        ) : <EmptyContact isLoadingMyFollowing={isLoadingMyFollowing} />
      }
    </div>
  </div>
);

Following.propTypes = {
  following: PropTypes.array,
  isLoadingMyFollowing: PropTypes.bool,
  isActive: PropTypes.bool,
};

Following.defaultProps = {
  following: [],
  isLoadingMyFollowing: false,
  isActive: false,
};

function mapState(state) {
  return {
    following: state.myData.following,

    isLoadingMyFollowing: state.uiState.isLoadingMyFollowing,
  };
}

export default withRouter(connect(mapState)(Following));

const EmptyContact = ({ isLoadingMyFollowing }) => (
  <div className="feed_activity_empty">
    {isLoadingMyFollowing ? (
      <img src={Loading} alt="loading" id="activityLoad" />
    ) : (
        <p className="feed_activity_empty_text">
          You're not following anyone yet
        </p>
      )}
  </div>
);

EmptyContact.propTypes = {
  isLoadingMyFollowing: PropTypes.bool,
};

EmptyContact.defaultProps = {
  isLoadingMyFollowing: false,
};