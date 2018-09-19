import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FeedTileInternal from './FeedTileInternal';
import FeedTileTXS from './FeedTileTXS';
import FeedTileToken from './FeedTileToken';
import { getActivity } from '../state/actions';
import Loading from '../assets/Loading.svg';
import './styles/Feed.css';

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

  componentDidMount() {
    const { feed } = this.props;
    this.setState({
      renderFeed: feed.slice(0, 30),
    });
  }

  static getDerivedStateFromProps(nextProps) {
    const { feed } = nextProps;
    return {
      renderFeed: feed.slice(0, 30),
    };
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

    return (
      <div id="feed">
        <p className="header" id="page_header">Activity</p>
        <div id="feed_activity">
          <ul id="feed_activity_header">
            <li id="feed_activity_network">Network</li>
            <li id="feed_activity_type">Type</li>
            <li id="feed_activity_entity">Entity</li>
            <li id="feed_activity_function">Function</li>
            <li id="feed_activity_description">Description</li>
            <li id="feed_activity_amount">Amount</li>
            <li id="feed_activity_time">Time</li>
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
