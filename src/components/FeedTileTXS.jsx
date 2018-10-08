import React from 'react';
import PropTypes from 'prop-types';

import { timeSince } from '../utils/time';
import address from '../utils/address';
import EthereumLine from '../assets/EthereumLine.svg';
import Send from '../assets/Send.svg';
import Receive from '../assets/Receive.svg';
import './styles/Feed.css';

const FeedTileTXS = ({ item, isEven }) => (
  <div className={`feed_activity_data ${isEven ? 'darkFeed' : 'lightFeed'}`}>
    <div className="feed_activity_address_dataType">
      <img src={EthereumLine} alt="Transaction Icon" className="feed_activity_address_dataType_ethereum" />
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
      Ethereum
    </p>
    <p className="feed_activity_address_amount" title={(Number(item.value) / 1000000000000000000).toString()}>
      {`${item.value && (Number(item.value) / 1000000000000000000).toString().substring(0, 6)} ETH`}
    </p>
    <p className="feed_activity_address_time">
      {timeSince(item.timeStamp * 1000)}
    </p>
  </div>
);

FeedTileTXS.propTypes = {
  item: PropTypes.object,
  isEven: PropTypes.bool,
};

FeedTileTXS.defaultProps = {
  item: {},
  isEven: false,
};

export default FeedTileTXS;
