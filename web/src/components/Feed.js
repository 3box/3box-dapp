import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import ThreeBoxActivity from '3box-activity';

import FeedTileInternal from './FeedTileInternal';
import FeedTileTXS from './FeedTileTXS';
import FeedTileToken from './FeedTileToken';
import { getActivity } from '../state/actions';
import './styles/Feed.css';
// import FeedTile from './FeedTile';
// import FeedTile3 from './FeedTile3Box';

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFeedModal: false,
    };
  }

  render() {
    // const { showFeedModal } = this.state;
    const { feed } = this.props;
    console.log(this.state);

    return (
      <div id="feed">
        <p className="header" id="page_header">Activity</p>
        <div id="feed_activity">
          <ul id="feed_activity_header">
            <li>Network</li>
            <li>Type</li>
            <li>Entity</li>
            <li>Function</li>
            <li>Description</li>
            <li>Amount</li>
            <li>Time</li>
          </ul>

          {feed.length > 0
            ? feed.map((feedItem, i) => (
              feedItem.dataType === 'internal'
                ? <FeedTileInternal feedItem={feedItem} key={i} />
                : feedItem.dataType === 'token'
                  ? <FeedTileToken feedItem={feedItem} key={i} />
                  : <FeedTileTXS feedItem={feedItem} key={i} />
            ))
            : (
              null
            )
          }
        </div>

        {/* {showFeedModal
          && (
            <div className="container">
              <div className="modal">
                <div>

                </div>
              </div>
            </div>)} */}
      </div>
    );
  }
}

Feed.propTypes = {
  feed: PropTypes.array,
};

Feed.defaultProps = {
  feed: [],
};

const mapState = state => ({
  feed: state.threeBoxData.feed,
});

export default connect(mapState, { getActivity })(Feed);
