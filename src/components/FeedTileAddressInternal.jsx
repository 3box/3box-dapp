import React from 'react';
import PropTypes from 'prop-types';

import { timeSince } from '../utils/time';
import address from '../utils/address';
import Internal from '../assets/Internal.svg';
import './styles/Feed.css';

const FeedTileInternal = ({ item, isEven }) => (
  <div className={`feed_activity_data ${isEven ? 'darkFeed' : 'lightFeed'}`}>
    {/* <p className="feed_activity_address_dataType">
      {item.dataType}
    </p> */}
    <div className="feed_activity_address_dataType">
      <img src={Internal} alt="Transaction Icon" />
    </div>
    <p className="feed_activity_address_function">
      {item.type}
    </p>
    <p className="feed_activity_address_toFrom">
      {item.from === address
        ? ('To')
        : ('From')
      }
    </p>
    <p title={`Hash ${item.hash}`} className="feed_activity_address_description">
      {`Hash  ${item.hash && item.hash.substring(0, 10)}...`}
    </p>
    <p className="feed_activity_address_amount">
      {item.value && (Number(item.value) / 1000000000000000000).toString().substring(0, 6)}
      ETH
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
