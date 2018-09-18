import React from 'react';
import GovernXLogo from '../assets/governX.png';
import './styles/FeedTile.css';

// import PropTypes from 'prop-types';

const FeedTile = () => (
  <div className="feed_activity_tile">
    <ul>
      <li>
        <div id="feed_network_3Box">
          <p>3</p>
        </div>
      </li>
      <li>
        <img className="feed_activity_tile_entityLogo" src={GovernXLogo} alt="Entity" />
        <p>GovernX</p>
      </li>
      <li>Save</li>
      <li>Winner</li>
      <li className="feed_activity_tile_amount">10.45 ETH</li>
    </ul>
  </div>
);

FeedTile.propTypes = {
};

export default FeedTile;
