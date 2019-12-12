import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ActivityHeader from './ActivityHeader';
import ActivityTiles from './ActivityTiles';
import Loading from '../../../assets/Loading.svg';
import '../styles/Feed.scss';
import '../styles/Profile.scss';
import '../../../components/styles/NetworkArray.scss';
import { shortenEthAddr } from '../../../utils/funcs';

const Activity = ({
  isFetchingActivity,
  feedByAddress,
  otherProfileActivity,
  isActive,
  currentAddress,
  currentNetwork,
}) => (
    <div id="myFeed" className={`profileTab ${isActive ? 'viewTab' : ''}`}>
      <div>
        <div className="profile_header">
          <p className="header" id="feed__header">
            Activity
          </p>

          <div className="profile_header_address">
            <div
              className={`profile_header_loggedIn ${currentNetwork}`}
              title={`${currentNetwork} network`}
            />

            <p>
              {`Signed in as ${shortenEthAddr(currentAddress)}`}
            </p>
          </div>
        </div>

        <div className="feed__activity__header">
          {(feedByAddress.length > 0)
            ? feedByAddress.map((feedAddress, i) => (
              <div key={i} className="feed__activity__tile">
                <ActivityHeader feedAddress={feedAddress} />
                <ActivityTiles feedAddress={feedAddress} />
              </div>
            ))
            : (!isFetchingActivity && !otherProfileActivity.length)
            && (
              <div className="feed_activity_empty">
                <p className="feed_activity_empty_text">
                  No activity at this address yet
                </p>
              </div>
            )}

          {(!feedByAddress.length && isFetchingActivity) && (
            <div className="feed_activity_empty">
              <img src={Loading} alt="loading" id="activityLoad" />
            </div>
          )}
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
  isFetchingActivity: PropTypes.bool,
  isActive: PropTypes.bool,
  otherProfileActivity: PropTypes.array,
  currentAddress: PropTypes.string,
  currentNetwork: PropTypes.string,
};

Activity.defaultProps = {
  feedByAddress: [],
  isFetchingActivity: false,
  isActive: false,
  currentAddress: '',
  currentNetwork: '',
  otherProfileActivity: [],
};

const mapState = (state) => ({
  name: state.myData.name,
  feedByAddress: state.myData.feedByAddress,

  isFetchingActivity: state.uiState.isFetchingActivity,

  currentAddress: state.userState.currentAddress,
  currentNetwork: state.userState.currentNetwork,

  otherProfileActivity: state.otherProfile.otherProfileActivity,
  otherProfileAddress: state.otherProfile.otherProfileAddress,
  otherName: state.otherProfile.otherName,
});

export default connect(mapState)(Activity);
