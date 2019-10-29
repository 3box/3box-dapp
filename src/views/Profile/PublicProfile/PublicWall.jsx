import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PublicActivityHeader from './PublicActivityHeader';
import PublicActivityTiles from './PublicActivityTiles';
import Loading from '../../../assets/Loading.svg';
import '../styles/Feed.css';
import '../styles/Profile.css';
import '../../../components/styles/NetworkArray.css';

const PublicActivity = ({
  isFetchingOtherActivity,
  otherProfileActivity,
  otherCollectiblesFavorites,
}) => (
    <div id="feed" className={`${otherCollectiblesFavorites.length > 0 && 'noTopMargin'}`}>
      <div>
        <p className="header" id="feed__header">Activity</p>
        <div className="feed__activity__header">
          {(isFetchingOtherActivity)
            && (
              <div className="feed__activity__load">
                <img src={Loading} alt="loading" id="activityLoad" />
              </div>
            )}
          {otherProfileActivity.length > 0
            ? otherProfileActivity.map((feedAddress, i) => (
              <div key={i} className="feed__activity__tile">
                <PublicActivityHeader i={i} feedAddress={feedAddress} />
                <PublicActivityTiles feedAddress={feedAddress} />
              </div>
            ))
            : (!isFetchingOtherActivity && otherProfileActivity.length === 0)
            && (
              <div className="feed__activity__load">
                <p>No activity at this address yet</p>
              </div>
            )
          }
        </div>
      </div>
      <div className="feed__footer">
        <div className="logo__icon--footer">
          <h2>3</h2>
        </div>
      </div>
    </div>
  );

PublicActivity.propTypes = {
  isFetchingOtherActivity: PropTypes.bool,
  otherCollectiblesFavorites: PropTypes.array,
  otherProfileActivity: PropTypes.array,
};

PublicActivity.defaultProps = {
  isFetchingOtherActivity: false,
  otherCollectiblesFavorites: [],
  otherProfileActivity: [],
};

const mapState = (state) => ({
  isFetchingOtherActivity: state.uiState.isFetchingOtherActivity,

  otherProfileActivity: state.otherProfile.otherProfileActivity,
  otherProfileAddress: state.otherProfile.otherProfileAddress,
  otherName: state.otherProfile.otherName,
  otherCollectiblesFavorites: state.otherProfile.otherCollectiblesFavorites,
});

export default connect(mapState)(PublicActivity);
