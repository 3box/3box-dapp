import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FeedTileTXS from './FeedTileTXS.jsx';
import FeedTileToken from './FeedTileToken.jsx';
import FeedTileInternal from './FeedTileInternal.jsx';
import FeedTileActivity from './FeedTileActivity.jsx';
import { getActivity } from '../state/actions';
import networkArray from '../utils/networkArray';
// import Loading from '../assets/Loading.svg';
import './styles/Feed.css';
import './styles/NetworkArray.css';

const Feed = ({ ifFetchingActivity, feedByAddress }) => (
  <div id="feed">
    <p className="header" id="feed__header">Activity</p>
    <div id="feed__activity__address">
      {/* {ifFetchingActivity
        && (
          <div className="feed__activity__load">
            <img src={Loading} alt="loading" id="activityLoad" />
          </div>
        )
      } */}
      {feedByAddress.length > 0
        ? feedByAddress.map((feedAddress, i) => (
          <div key={i} className="feed__activity__tile">
            <div className="feed__activity__context">
              {Object.keys(feedAddress)[0] === 'threeBox' ? (
                <div className="logo__icon feed__activity__context__network">
                  <h2>3</h2>
                </div>
              )
                : (
                  <div className={`feed__activity__context__network ${networkArray[Math.floor(Math.random() * networkArray.length)]}`}>
                    0x
                    </div>)
              }
              <div className="feed__activity__address">
                {Object.keys(feedAddress)[0] === 'threeBox'
                  ? (
                    <div>
                      <h4>
                        3Box
                      </h4>
                      <p>
                        Activity
                      </p>
                    </div>
                  )
                  : (
                    <div>
                      <h4>
                        {Object.keys(feedAddress)[0]}
                      </h4>
                      <p>
                        Ethereum Address
                      </p>
                    </div>
                  )}
              </div>
            </div>
            {
              Object.values(feedAddress)[0].map((item, index) => (
                item.dataType === 'Internal'
                  ? <FeedTileInternal item={item} key={index} isEven={parseInt(index, 10) % 2 === 0} />
                  : item.dataType === 'Token'
                    ? <FeedTileToken item={item} key={index} isEven={parseInt(index, 10) % 2 === 0} />
                    : item.dataType === 'Txs'
                      ? <FeedTileTXS item={item} key={index} isEven={parseInt(index, 10) % 2 === 0} />
                      : <FeedTileActivity item={item} key={index} isEven={parseInt(index, 10) % 2 === 0} />
              ))
            }
          </div>
        ))
        : !ifFetchingActivity && (
          <div className="feed__activity__load">
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
  feed: state.threeBox.feed,
  feedByAddress: state.threeBox.feedByAddress,
  ifFetchingActivity: state.threeBox.ifFetchingActivity,
});

export default connect(mapState, { getActivity })(Feed);
