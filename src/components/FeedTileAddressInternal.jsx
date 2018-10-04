import React from 'react';
import PropTypes from 'prop-types';

import { timeSince } from '../utils/time';
import address from '../utils/address';
import Internal from '../assets/Internal.svg';
import Send from '../assets/Send.svg';
import Receive from '../assets/Receive.svg';
import './styles/Feed.css';

const FeedTileInternal = ({ item, isEven }) => (
  <div className={`feed_activity_data ${isEven ? 'darkFeed' : 'lightFeed'}`}>
    <div className="feed_activity_address_dataType">
      <img src={Internal} alt="Transaction Icon" />
    </div>
    {item.from === address
      ? (
        <div className="feed_activity_address_toFrom">
          <img src={Send} alt="Transaction Icon" />
          <p>
            Send
          </p>
        </div>
      )
      : (
        <div className="feed_activity_address_toFrom">
          <img src={Receive} alt="Transaction Icon" />
          <p>
            Receive
          </p>
        </div>
      )
    }
    <p className="feed_activity_address_function">
      {item.type && item.type.charAt(0).toUpperCase() + item.type.slice(1)}
    </p>
    <p className="feed_activity_address_amount" title={(Number(item.value) / 1000000000000000000).toString()}>
      {`${item.value && (Number(item.value) / 1000000000000000000).toString().substring(0, 6)} ETH`}
    </p>
    <p className="feed_activity_address_time">
      {timeSince(item.timeStamp * 1000)}
    </p>
  </div>
);

FeedTileInternal.propTypes = {
  item: PropTypes.object,
  isEven: PropTypes.bool,
};

FeedTileInternal.defaultProps = {
  item: {},
  isEven: false,
};

export default FeedTileInternal;
