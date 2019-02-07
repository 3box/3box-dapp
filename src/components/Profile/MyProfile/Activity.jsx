import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ActivityHeader from './ActivityHeader';
import ActivityTiles from './ActivityTiles';
import Loading from '../../../assets/Loading.svg';
import '../../styles/Feed.css';
import '../../../views/styles/Profile.css';
import '../../styles/NetworkArray.css';

const Activity = ({
  ifFetchingActivity,
  feedByAddress,
  publicProfileActivity,
}) => (
    <div id="feed">
      <div>
        <p className="header publicHeader" id="feed__header">Activity</p>
        <div className="feed__activity__header">
          {(ifFetchingActivity)
            && (
              <div className="feed__activity__load">
                <img src={Loading} alt="loading" id="activityLoad" />
              </div>
            )}
          {(feedByAddress.length > 0)
            ? feedByAddress.map((feedAddress, i) => (
              <div key={i} className="feed__activity__tile">
                <ActivityHeader feedAddress={feedAddress} />
                <ActivityTiles feedAddress={feedAddress} />
              </div>
            ))
            : (!ifFetchingActivity && !publicProfileActivity.length)
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

Activity.propTypes = {
  feedByAddress: PropTypes.array,
  ifFetchingActivity: PropTypes.bool,
  currentAddress: PropTypes.string,
  name: PropTypes.string,
  publicProfileAddress: PropTypes.string,
  publicProfileActivity: PropTypes.array,
  location: PropTypes.object,
  publicName: PropTypes.string,
};

Activity.defaultProps = {
  feedByAddress: [],
  name: '',
  ifFetchingActivity: false,
  publicProfileAddress: '',
  currentAddress: '',
  publicName: '',
  publicProfileActivity: [],
  location: {},
};

const mapState = state => ({
  feedByAddress: state.threeBox.feedByAddress,
  ifFetchingActivity: state.threeBox.ifFetchingActivity,
  publicProfileActivity: state.threeBox.publicProfileActivity,
  currentAddress: state.threeBox.currentAddress,
  publicProfileAddress: state.threeBox.publicProfileAddress,
  name: state.threeBox.name,
  publicName: state.threeBox.publicName,
});

export default connect(mapState)(Activity);
