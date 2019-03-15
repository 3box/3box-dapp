import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import StatusUpdate from '../StatusUpdate';
import PublicActivityHeader from './PublicActivityHeader';
import PublicActivityTiles from './PublicActivityTiles';
import Loading from '../../../assets/Loading.svg';
import '../styles/Feed.css';
import '../styles/Profile.css';
import '../../../components/styles/NetworkArray.css';

const PublicActivity = ({
  isFetchingActivity,
  otherProfileActivity,
  otherCollectiblesFavorites,
  otherStatus,
}) => (
    <div id="feed" className={`${otherCollectiblesFavorites.length > 0 && 'noTopMargin'}`}>
      <div>
        <p className="header" id="feed__header">Activity</p>
        {otherStatus && <StatusUpdate />}
        <div className="feed__activity__header">
          {(isFetchingActivity)
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
            : (!isFetchingActivity && otherProfileActivity.length === 0)
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
  isFetchingActivity: PropTypes.bool,
  otherCollectiblesFavorites: PropTypes.array,
  otherProfileActivity: PropTypes.array,
  otherStatus: PropTypes.string,
};

PublicActivity.defaultProps = {
  isFetchingActivity: false,
  otherCollectiblesFavorites: [],
  otherProfileActivity: [],
  otherStatus: '',
};

const mapState = state => ({
  isFetchingActivity: state.uiState.isFetchingActivity,

  otherProfileActivity: state.otherProfile.otherProfileActivity,
  otherProfileAddress: state.otherProfile.otherProfileAddress,
  otherName: state.otherProfile.otherName,
  otherStatus: state.otherProfile.otherStatus,
  otherCollectiblesFavorites: state.otherProfile.otherCollectiblesFavorites,
});

export default connect(mapState)(PublicActivity);
