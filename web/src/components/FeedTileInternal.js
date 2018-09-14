import React from 'react';
import EthereumLogo from '../assets/Ethereum_logo_2014.svg';
import address from '../utils/address';

import './styles/FeedTile.css';
// import PropTypes from 'prop-types';

const FeedTile = ({ feedItem }) => (
  <div className="feed_activity_tile">
    <ul>
      <li>
        <img className="feed_activity_tile_networkLogo" src={EthereumLogo} alt="Ethereum Logo" />
      </li>
      <li>
        {feedItem.dataType}
      </li>
      <li title={feedItem.from === address ? feedItem.to : feedItem.from}>
        {feedItem.from === address // eslint-disable-line no-undef
          ? (<p>{`To ${feedItem.to}`}</p>)
          : (<p>{`From ${feedItem.from}`}</p>)
        }
      </li>
      <li>{feedItem.type}</li>
      <li title={`Hash ${feedItem.hash}`}>{feedItem.hash}</li>
      <li className="feed_activity_tile_amount">
        {(Number(feedItem.value) / 1000000000000000000)}
        ETH
      </li>
      <li>{feedItem.timeStamp}</li>
    </ul>
  </div>
);

FeedTile.propTypes = {
};

export default FeedTile;
