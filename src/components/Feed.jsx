import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FeedTileAddressTXS from './FeedTileAddressTXS.jsx';
import FeedTileAddressToken from './FeedTileAddressToken.jsx';
import FeedTileAddressInternal from './FeedTileAddressInternal.jsx';
import { getActivity } from '../state/actions';
import Loading from '../assets/Loading.svg';
import EthereumNetwork from '../assets/EthereumNetwork.svg';
import './styles/Feed.css';

const Feed = ({ ifFetchingActivity, feedByAddress }) => (
  <div id="feed">
    <p className="header" id="page_header">Activity</p>
    <div id="feed_activity_address">
      {ifFetchingActivity
        && (
          <div className="feed_activity_load">
            <img src={Loading} alt="loading" id="activityLoad" />
          </div>
        )
      }
      {feedByAddress
        ? feedByAddress.map((feedAddress, i) => (
          <div key={i} className="feed_activity_address_tile">
            <div className="feed_activity_context">
              {/* <div className="feed_activity_network_icon" /> */}
              <img src={EthereumNetwork} alt="Ethereum Network" />
              <h5>
                {Object.keys(feedAddress)[0]}
              </h5>
            </div>
            {
              Object.values(feedAddress)[0].map((item, index) => (
                item.dataType === 'Internal'
                  ? <FeedTileAddressInternal item={item} key={index} isEven={parseInt(index) % 2 === 0} />
                  : item.dataType === 'Token'
                    ? <FeedTileAddressToken item={item} key={index} isEven={parseInt(index) % 2 === 0} />
                    : <FeedTileAddressTXS item={item} key={index} isEven={parseInt(index) % 2 === 0} />
              ))
            }
          </div>
        ))
        : !ifFetchingActivity && (
          <div className="feed_activity_load">
            <p>No activity at this address yet</p>
          </div>
        )
      }
    </div>
  </div>
);

Feed.propTypes = {
  feed: PropTypes.array,
  feedByAddress: PropTypes.array,
  ifFetchingActivity: PropTypes.bool,
};

Feed.defaultProps = {
  feed: [],
  feedByAddress: [],
  ifFetchingActivity: false,
};

const mapState = state => ({
  feed: state.threeBoxData.feed,
  feedByAddress: state.threeBoxData.feedByAddress,
  ifFetchingActivity: state.threeBoxData.ifFetchingActivity,
});

export default connect(mapState, { getActivity })(Feed);
