import React from 'react';
import PropTypes from 'prop-types';

import { timeSince } from '../utils/time';
import address from '../utils/address';
import Tokens from '../assets/Tokens.svg';
import Send from '../assets/Send.svg';
import Receive from '../assets/Receive.svg';
import './styles/Feed.css';

const FeedTileAddressToken = ({ item, isEven }) => (
  <div className={`feed_activity_data ${isEven ? 'darkFeed' : 'lightFeed'}`}>
    <div className="feed_activity_address_dataType">
      <img src={Tokens} alt="Token Icon" />
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
    <p className="feed_activity_address_function" title={item.tokenName}>
      {item.tokenName}
    </p>
    <p className="feed_activity_address_amount" title={(Number(item.value) / 1000000000000000000).toString()}>
      {`${item.value && (Number(item.value) / 1000000000000000000).toString().substring(0, 6)} ${item.tokenSymbol}`}
    </p>
    <p className="feed_activity_address_time">
      {timeSince(item.timeStamp * 1000)}
    </p>
  </div>
);

FeedTileAddressToken.propTypes = {
  item: PropTypes.object,
  isEven: PropTypes.bool,
};

FeedTileAddressToken.defaultProps = {
  item: {},
  isEven: false,
};

export default FeedTileAddressToken;
