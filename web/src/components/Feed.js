import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FeedTileInternal from './FeedTileInternal';
import FeedTileTXS from './FeedTileTXS';
import FeedTileToken from './FeedTileToken';
import { getActivity } from '../state/actions';
import Loading from '../assets/Loading.svg';
import './styles/Feed.css';
// import FeedTile from './FeedTile';
// import FeedTile3 from './FeedTile3Box';

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderFeed: [],
      page: 0,
    };

    window.onscroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight
      ) {
        this.loadActivity();
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    const { feed } = nextProps;
    this.setState({
      renderFeed: feed.slice(0, 30),
    });
  }

  loadActivity = () => {
    const { renderFeed, page } = this.state;
    const { feed } = this.props;
    const nextFeedItems = feed.slice(page * 30, (page + 1) * 30);

    this.setState({
      renderFeed: [
        ...renderFeed,
        ...nextFeedItems,
      ],
      page: page + 1,
    });
  }

  render() {
    const { feed, ifFetchingActivity } = this.props;
    const {
      renderFeed,
    } = this.state;
    console.log(feed);
    console.log(ifFetchingActivity);

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

          {ifFetchingActivity
            && (
              <div id="feed_activity_load">
                <img src={Loading} alt="loading" id="activityLoad" />
              </div>
            )
          }
          {renderFeed.length > 0
            ? renderFeed.map((feedItem, i) => (
              feedItem.dataType === 'internal'
                ? <FeedTileInternal feedItem={feedItem} key={i} />
                : feedItem.dataType === 'token'
                  ? <FeedTileToken feedItem={feedItem} key={i} />
                  : <FeedTileTXS feedItem={feedItem} key={i} />
            ))
            : null
          }
        </div>
      </div>
    );
  }
}

Feed.propTypes = {
  feed: PropTypes.array,
  ifFetchingActivity: PropTypes.bool,
};

Feed.defaultProps = {
  feed: [],
  ifFetchingActivity: false,
};

const mapState = state => ({
  feed: state.threeBoxData.feed,
  ifFetchingActivity: state.threeBoxData.ifFetchingActivity,
});

export default connect(mapState, { getActivity })(Feed);
