import React from 'react';
import PropTypes from 'prop-types';

import networkArray from '../../../utils/networkArray';
import '../styles/Feed.css';
import '../styles/Profile.css';
import '../../../components/styles/NetworkArray.css';

const PublicActivityContext = ({ feedAddress, i }) => (
  <div className="feed__activity__context">
    {(feedAddress.metaData && feedAddress.metaData.image)
      && <img src={`https://ipfs.infura.io/ipfs/${feedAddress.metaData.image}`} className="feed__activity__user clear" alt="profile" />}

    {(feedAddress.metaData && feedAddress.metaData.contractImg)
      && <img src={feedAddress.metaData.contractImg.src} className="feed__activity__user clear" alt="profile" />}

    {(!feedAddress.metaData
      || (!feedAddress.metaData.image
        && !feedAddress.metaData.contractImg
        && !feedAddress.metaData.contractData
        && !feedAddress.metaData.name
        && !feedAddress.metaData.contractDetails))
      && (
        <div className={`feed__activity__context__network ${networkArray[Math.floor(Math.random() * networkArray.length)]}`}>
          0x
        </div>)}

    <React.Fragment>
      {(feedAddress.metaData && feedAddress.metaData.name)
        && (
          <a href={`https://3box.io/${Object.keys(feedAddress)[0]}`} className="feed__activity__address__wrapper" >
            <h4>
              {feedAddress.metaData.name}
            </h4>
            <p className="feed__activity__address__type">
              Address
              {` ${Object.keys(feedAddress)[0].substring(0, 12)}...`}
            </p>
          </a>
        )}
      {(feedAddress.metaData && feedAddress.metaData.contractDetails && feedAddress.metaData.contractDetails.name)
        && (
          <a href={`https://etherscan.io/address/${Object.keys(feedAddress)[0]}`} target="_blank" rel="noopener noreferrer" className="feed__activity__address__wrapper">
            <h4>
              {(feedAddress.metaData.contractDetails.name.charAt(0).toUpperCase() + feedAddress.metaData.contractDetails.name.slice(1)).replace(/([A-Z])/g, ' $1').trim()}
            </h4>
            <p className="feed__activity__address__type">
              Contract
              {` ${Object.keys(feedAddress)[0].substring(0, 12)}...`}
            </p>
          </a>
        )}
      {(!feedAddress.metaData || (!feedAddress.metaData.contractDetails && !feedAddress.metaData.name))
        && (
          <a href={`https://etherscan.io/address/${Object.keys(feedAddress)[0]}`} target="_blank" rel="noopener noreferrer" className="feed__activity__address__wrapper">
            <h4>
              {Object.keys(feedAddress)[0]}
            </h4>
            <p className="feed__activity__address__type">
              Address
            </p>
          </a>
        )}
    </React.Fragment>
  </div>
);

PublicActivityContext.propTypes = {
  feedAddress: PropTypes.object,
};

PublicActivityContext.defaultProps = {
  feedAddress: {},
};

export default PublicActivityContext;
