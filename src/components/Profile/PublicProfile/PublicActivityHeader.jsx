import React from 'react';
import PropTypes from 'prop-types';

import networkArray from '../../../utils/networkArray';
import '../../styles/Feed.css';
import '../../../views/styles/Profile.css';
import '../../styles/NetworkArray.css';

const PublicActivityContext = ({
  feedAddress,
}) => (
    <div className="feed__activity__context">
      {(feedAddress.metaData && feedAddress.metaData.image)
        ? <img src={`https://ipfs.infura.io/ipfs/${feedAddress.metaData.image}`} className="feed__activity__user" alt="profile" />
        : (feedAddress.metaData && feedAddress.metaData.contractImg)
          ? <img src={feedAddress.metaData.contractImg.src} className="feed__activity__user" alt="profile" />
          : (
            <div className={`feed__activity__context__network ${networkArray[Math.floor(Math.random() * networkArray.length)]}`}>
              0x
                      </div>)}
      <div className="feed__activity__address">
        <div>
          <a href={`https://3box.io/${Object.keys(feedAddress)[0]}`}>
            <h4>
              {(feedAddress.metaData && feedAddress.metaData.name) ? feedAddress.metaData.name : ''}
              {(feedAddress.metaData && feedAddress.metaData.contractDetails) ? feedAddress.metaData.contractDetails.name : ''}
              {(feedAddress.metaData && (!feedAddress.metaData.contractDetails && !feedAddress.metaData.name)) ? Object.keys(feedAddress)[0] : ''}
            </h4>
          </a>
          <p>
            Ethereum Address
          </p>
        </div>
      </div>
    </div>
  );

PublicActivityContext.propTypes = {
  feedAddress: PropTypes.object,
};

PublicActivityContext.defaultProps = {
  feedAddress: {},
};

export default PublicActivityContext;
