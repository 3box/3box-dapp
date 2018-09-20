import React from 'react';
import EthereumLogo from '../assets/Ethereum_logo_2014.svg';
import { address } from '../utils/address';
import { timeSince } from '../utils/time';
import './styles/Feed.css';
// import PropTypes from 'prop-types';

const FeedTile = ({ feedItem }) => (
  <div className="feed_activity_tile">
    <ul>
      <li id="feed_activity_network">
        <img className="feed_activity_tile_networkLogo" src={EthereumLogo} alt="Ethereum Logo" />
      </li>
      <li id="feed_activity_type">
        <p>
          {feedItem.dataType}
        </p>
      </li>
      <li id="feed_activity_function">
        {feedItem.from === address
          ? <p>Send</p>
          : <p>Receive</p>
        }
      </li>
      <li id="feed_activity_entity" title={feedItem.from === address ? feedItem.to : feedItem.from}>
        {feedItem.from === address
          ? (
            <p>
              {`To  ${feedItem.to.substring(0, 10)}...`}
            </p>)
          : (
            <p>
              {`From  ${feedItem.from.substring(0, 10)}...`}
            </p>)
        }
      </li>
      <li id="feed_activity_description" title={`Hash ${feedItem.hash}`}>
        <p>
          {`Hash  ${feedItem.hash}`}
        </p>
      </li>
      <li id="feed_activity_amount" className="feed_activity_tile_amount" title={`${Number(feedItem.value) / 1000000000000000000} ETH`}>
        <p>
          {feedItem.value && (Number(feedItem.value) / 1000000000000000000).toString().substring(0, 6)}
          ...ETH
        </p>
      </li>
      <li id="feed_activity_time">
        <p>
          {timeSince(feedItem.timeStamp * 1000)}
        </p>
      </li>
    </ul>
  </div>
);

FeedTile.propTypes = {
};

export default FeedTile;
