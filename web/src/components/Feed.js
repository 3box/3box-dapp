import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import ThreeBoxActivity from '3box-activity';
import FeedTileInternal from './FeedTileInternal';
import FeedTileTXS from './FeedTileTXS';
import FeedTileToken from './FeedTileToken';
// import FeedTile from './FeedTile';
// import FeedTile3 from './FeedTile3Box';
import address from '../utils/address';
import './styles/Feed.css';

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feed: [],
      showFeedModal: false,
    };
  }

  componentDidMount() {
    // ThreeBoxActivity.get(web3.eth.accounts[0]) // eslint-disable-line no-undef
    ThreeBoxActivity.get(address) // eslint-disable-line no-undef
      .then((res) => {
        res.internal = res.internal.map(object => Object.assign({ dataType: 'internal' }, object));
        res.txs = res.txs.map(object => Object.assign({ dataType: 'txs' }, object));
        res.token = res.token.map(object => Object.assign({ dataType: 'token' }, object));

        const feed = res.internal.concat(res.txs).concat(res.token);
        feed.sort((a, b) => b.timeStamp - a.timeStamp);

        this.setState({
          feed,
        });
      });
  }

  render() {
    const { feed, showFeedModal } = this.state;
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
};

export default Feed;
