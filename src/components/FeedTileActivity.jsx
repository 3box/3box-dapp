import React from 'react';
import PropTypes from 'prop-types';

import { timeSince } from '../utils/time';
import PrivateActivity from '../assets/PrivateActivity.svg';
import Globe from '../assets/Globe.svg';
import Image from '../assets/Image.svg';
import Save from '../assets/Save.svg';
import Delete from '../assets/Delete.svg';
import './styles/Feed.css';
// import address from '../utils/address';

const FeedTileTXS = ({ item, isEven }) => (
  <div className={`feed_activity_data ${isEven ? 'darkFeed' : 'lightFeed'}`}>
    <div className="feed_activity_address_dataType">
      {item.dataType === 'Private'
        ? <img src={PrivateActivity} alt="Transaction Icon" className="feed_activity_address_amount_image" />
        : <img src={Globe} alt="Transaction Icon" className="feed_activity_address_amount_image" />
      }
    </div>
    <div className="feed_activity_address_toFrom saveDelete">
      <img src={item.op === 'PUT' ? Save : Delete} alt="Transaction Icon" />
      <p>
        {item.op === 'PUT' ? 'Save' : 'Delete'}
      </p>
    </div>
    <p className="feed_activity_address_function">
      {item.dataType === 'Private'
        ? 'Private'
        : item.key && item.key.charAt(0).toUpperCase() + item.key.slice(1)
      }
    </p>
    <p className="feed_activity_address_amount">
      {item.key === 'image'
        ? <img src={Image} alt="Transaction Icon" className="feed_activity_address_amount_image" />
        : item.value}
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
