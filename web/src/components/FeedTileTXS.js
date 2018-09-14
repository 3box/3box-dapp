import React from 'react';
import PropTypes from 'prop-types';

import EthereumLogo from '../assets/Ethereum_logo_2014.svg';
import GovernXLogo from '../assets/governX.png';
import './styles/FeedTile.css';
// import PropTypes from 'prop-types';

const FeedTile = ({ feedItem }) => (
  <div className="feed_activity_tile">
    <ul>
      <li>
        <img className="feed_activity_tile_networkLogo" src={EthereumLogo} alt="Ethereum Logo" />
      </li>
      <li>
        <img className="feed_activity_tile_entityLogo" src={GovernXLogo} alt="Entity" />
        <p>GovernX</p>
      </li>
      <li>Save</li>
      <li>{feedItem.blockNumber}</li>
      <li className="feed_activity_tile_amount">10.45 ETH</li>
    </ul>
  </div>
);

// FeedTile.propTypes = {
//   blockNumber: PropTypes.string,
// };

// FeedTile.defaultProps = {
//   blockNumber: '',
// };

export default FeedTile;
