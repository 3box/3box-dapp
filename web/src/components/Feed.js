import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import ThreeBoxActivity from '3box-activity';
import FeedTile from './FeedTile';
import FeedTileInternal from './FeedTileInternal';
import FeedTileTXS from './FeedTileTXS';
import FeedTileToken from './FeedTileToken';
// import FeedTile3 from './FeedTile3Box';
import './styles/Feed.css';

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      internal: [],
      txs: [],
      token: [],
      feed: [],
    };
  }

  componentDidMount() {
    // ThreeBoxActivity.get(web3.eth.accounts[0]) // eslint-disable-line no-undef
    ThreeBoxActivity.get('0x195EDDf7252dE8C9653F52aA5dC200D0957BA332') // eslint-disable-line no-undef
      .then((res) => {
        console.log(res);

        res.internal = res.internal.map(object => Object.assign({ dataType: 'internal' }, object));
        res.txs = res.txs.map(object => Object.assign({ dataType: 'txs' }, object));
        res.token = res.token.map(object => Object.assign({ dataType: 'token' }, object));

        const feed = res.internal.concat(res.txs).concat(res.token);

        feed.sort((a, b) => a.timeStamp - b.timeStamp);

        this.setState({
          internal: res.internal,
          txs: res.txs,
          token: res.token,
          feed,
        });
      });
  }

  render() {
    const { internal, txs, token, feed, } = this.state;
    console.log(this.state);

    return (
      <div id="feed">
        <p className="header" id="page_header">Activity</p>
        <div id="feed_activity">
          <ul id="feed_activity_header">
            <li>Network</li>
            <li>Entity</li>
            <li>Function</li>
            <li>Description</li>
            <li>Amount</li>
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
              <FeedTile />
            )
          }
        </div>
      </div>
    );
  }
}

Feed.propTypes = {
};

export default Feed;
