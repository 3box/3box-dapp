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
        ? <img src={`https://ipfs.infura.io/ipfs/${feedAddress.metaData.image}`} className="feed__activity__user clear" alt="profile" />
        : (feedAddress.metaData && feedAddress.metaData.contractImg)
          ? <img src={feedAddress.metaData.contractImg.src} className="feed__activity__user clear" alt="profile" />
          : (
            <div className={`feed__activity__context__network ${networkArray[Math.floor(Math.random() * networkArray.length)]}`}>
              0x
                      </div>)}
      <div className="feed__activity__address">
        <div>
          {(feedAddress.metaData && feedAddress.metaData.name)
            && (
              <a href={`https://3box.io/${Object.keys(feedAddress)[0]}`}>
                <h4>
                  {feedAddress.metaData.name}
                </h4>
              </a>
            )}
          {(feedAddress.metaData && feedAddress.metaData.contractDetails && feedAddress.metaData.contractDetails.name)
            && (
              <a href={`https://etherscan.io/tx/${Object.keys(feedAddress)[0]}`} target="_blank" rel="noopener noreferrer">
                <h4>
                  {feedAddress.metaData.contractDetails.name}
                </h4>
              </a>
            )}
          {(!feedAddress.metaData || (!feedAddress.metaData.contractDetails && !feedAddress.metaData.name))
            && (
              <a href={`https://ethstats.io/account/${Object.keys(feedAddress)[0]}`} target="_blank" rel="noopener noreferrer">
                <h4>
                  {Object.keys(feedAddress)[0]}
                </h4>
              </a>
            )}
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
