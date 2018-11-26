import React from 'react';
import PropTypes from 'prop-types';

import { timeSince } from '../utils/time';
import PrivateActivity from '../assets/PrivateActivity.svg';
import Globe from '../assets/Globe.svg';
import Image from '../assets/Image.svg';
import Save from '../assets/Save.svg';
import Delete from '../assets/Delete.svg';
import './styles/Feed.css';

const FeedTileTXS = ({ item, isEven }) => (
  <div className={`feed__activity___data ${isEven ? 'darkFeed' : 'lightFeed'}`}>
    <div className="feed__activity__address__dataType">
      {item.dataType === 'Private'
        ? <img src={PrivateActivity} alt="Transaction Icon" className="feed__activity__address__amount__image" />
        : <img src={Globe} alt="Transaction Icon" className="feed__activity__address__amount__image" />
      }
    </div>
    <div className="feed__activity__address__toFrom saveDelete">
      <img src={item.op === 'PUT' ? Save : Delete} alt="Transaction Icon" />
      <p>
        {item.op === 'PUT' ? 'Save' : 'Delete'}
      </p>
    </div>
    <p className="feed__activity__address__function">
      {item.dataType === 'Private'
        ? 'Private'
        : item.key && (item.key.charAt(0).toUpperCase() + item.key.slice(1)).replace(/([A-Z])/g, ' $1').trim()
      }
    </p>
    <p className="feed__activity__address__amount">
      {item.key === 'image' || item.key === 'coverPhoto'
        ? <img src={Image} alt="Transaction Icon" className="feed__activity__address__amount__image" />
        : item.dataType === 'Private'
          ? '*****'
          : typeof item.value === 'object'
            ? `${item.value ? Object.keys(item.value)[0] : '-----'}`
            : item.value}
    </p>
    <p className="feed__activity__address__time">
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
