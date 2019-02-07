import React from 'react';
import PropTypes from 'prop-types';

import { timeSince } from '../../utils/time';
import PrivateActivity from '../../assets/PrivateActivity.svg';
import Globe from '../../assets/Globe.svg';
import '../styles/Feed.css';

export const FeedTileContext = ({ item }) => (
  <div className="feed__activity__metaData">
    <p className="feed__activity__address__time">
      {timeSince(item.timeStamp * 1000)}
    </p>
    {item.dataType === 'Private'
      ? <img src={PrivateActivity} alt="Transaction Icon" className="feed__activity__address__dataType" />
      : <img src={Globe} alt="Transaction Icon" className="feed__activity__address__dataType" />
    }
  </div>
);

FeedTileContext.propTypes = {
  item: PropTypes.object,
};

FeedTileContext.defaultProps = {
  item: {},
};

export default FeedTileContext;