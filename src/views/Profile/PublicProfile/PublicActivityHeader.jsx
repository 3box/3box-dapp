import React from 'react';
import PropTypes from 'prop-types';
import ProfileHover from 'profile-hover';

import networkArray from '../../../utils/networkArray';
import '../styles/Feed.scss';
import '../styles/Profile.scss';
import '../../../components/styles/NetworkArray.scss';

const PublicActivityContext = ({ feedAddress, i }) => {
  const { metaData } = feedAddress;
  const transactionAddress = `https://etherscan.io/address/${Object.keys(feedAddress)[0]}`;
  return (
    <div className="feed__activity__context">
      {(metaData && metaData.image)
        && <img src={`https://ipfs.infura.io/ipfs/${metaData.image}`} className="feed__activity__user clear" alt="profile" />}

      {(metaData && metaData.contractImg)
        && <img src={metaData.contractImg.src} className="feed__activity__user clear" alt="profile" />}

      {(!metaData
        || (!metaData.image
          && !metaData.contractImg
          && !metaData.contractData
          && !metaData.name
          && !metaData.contractDetails))
        && (
          <div className={`feed__activity__context__network ${networkArray[Math.floor(Math.random() * networkArray.length)]}`}>
            0x
          </div>
        )}

      <>
        {(metaData && metaData.name)
          && (
            <ProfileHover
              noTheme
              orientation="top"
              address={Object.keys(feedAddress)[0]}
            >
              <a
                href={`https://3box.io/${Object.keys(feedAddress)[0]}`}
                className="feed__activity__address__wrapper"
              >
                <h4>
                  {metaData.name}
                </h4>
                <p className="feed__activity__address__type">
                  {metaData.ensName || Object.keys(feedAddress)[0].substring(0, 12)}
                </p>
              </a>
            </ProfileHover>
          )}

        {(metaData && metaData.contractDetails && metaData.contractDetails.name)
          && (
            <a
              href={transactionAddress}
              target="_blank"
              rel="noopener noreferrer"
              className="feed__activity__address__wrapper"
            >
              <h4>
                {(metaData.contractDetails.name.charAt(0).toUpperCase() + metaData.contractDetails.name.slice(1)).replace(/([A-Z])/g, ' $1').trim()}
              </h4>
              <p className="feed__activity__address__type">
                {`Contract ${metaData.ensName || Object.keys(feedAddress)[0].substring(0, 12)}...`}
              </p>
            </a>
          )}

        {(!metaData || (!metaData.contractDetails && !metaData.name))
          && (
            <ProfileHover
              noTheme
              orientation="top"
              address={Object.keys(feedAddress)[0]}
            >
              <a
                href={transactionAddress}
                target="_blank"
                rel="noopener noreferrer"
                className="feed__activity__address__wrapper"
              >
                <h4>
                  {Object.keys(feedAddress)[0]}
                </h4>
                <p className="feed__activity__address__type">
                  {metaData.ensName || Object.keys(feedAddress)[0].substring(0, 12)}
                </p>
              </a>
            </ProfileHover>
          )}
      </>
    </div>
  );
}

PublicActivityContext.propTypes = {
  feedAddress: PropTypes.object,
};

PublicActivityContext.defaultProps = {
  feedAddress: {},
};

export default PublicActivityContext;
