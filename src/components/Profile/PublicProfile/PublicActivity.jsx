import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PublicActivityHeader from './PublicActivityHeader';
import PublicActivityTiles from './PublicActivityTiles';
import Loading from '../../../assets/Loading.svg';
import '../../styles/Feed.css';
import '../../../views/styles/Profile.css';
import '../../styles/NetworkArray.css';

const PublicActivity = ({ ifFetchingActivity, publicProfileActivity }) => (
  <div id="feed">
    <div>
      <p className="header" id="feed__header">Activity</p>
      <div className="feed__activity__header">
        {(ifFetchingActivity)
          && (
            <div className="feed__activity__load">
              <img src={Loading} alt="loading" id="activityLoad" />
            </div>
          )}
        {publicProfileActivity.length > 0
          ? publicProfileActivity.map((feedAddress, i) => (
            <div key={i} className="feed__activity__tile">
              <PublicActivityHeader i={i} feedAddress={feedAddress} />
              <PublicActivityTiles feedAddress={feedAddress} />
            </div>
          ))
          : (!ifFetchingActivity && publicProfileActivity.length === 0)
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
  ifFetchingActivity: PropTypes.bool,
  publicProfileActivity: PropTypes.array,
};

PublicActivity.defaultProps = {
  ifFetchingActivity: false,
  publicProfileActivity: [],
};

const mapState = state => ({
  ifFetchingActivity: state.threeBox.ifFetchingActivity,
  publicProfileActivity: state.threeBox.publicProfileActivity,
  publicProfileAddress: state.threeBox.publicProfileAddress,
  publicName: state.threeBox.publicName,
});

export default connect(mapState)(PublicActivity);
