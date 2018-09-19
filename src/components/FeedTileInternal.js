import React from 'react';
import EthereumLogo from '../assets/Ethereum_logo_2014.svg';
import { address } from '../utils/address';

import { timeSince } from '../utils/time';
import './styles/FeedTile.css';
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
      <li id="feed_activity_entity" title={feedItem.from === address ? feedItem.to : feedItem.from}>
        {feedItem.from === address // eslint-disable-line no-undef
          ? (<p>{`To ${feedItem.to}`}</p>)
          : (<p>{`From ${feedItem.from}`}</p>)
        }
      </li>
      <li id="feed_activity_function">
        <p>
          {feedItem.type}
        </p>
      </li>
      <li id="feed_activity_description" title={`Hash ${feedItem.hash}`}>
        <p>
          {feedItem.hash}
        </p>
      </li>
      <li id="feed_activity_amount" className="feed_activity_tile_amount">
        <p>
          {(Number(feedItem.value) / 1000000000000000000)}
          ETH
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
