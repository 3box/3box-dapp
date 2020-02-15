import React from 'react';
import PropTypes from 'prop-types';
import ProfileHover from 'profile-hover';

import networkArray from '../../../utils/networkArray';
import { shortenEthAddr, isValidImage } from '../../../utils/funcs';
import '../styles/Feed.scss';
import '../styles/Profile.scss';
import '../../../components/styles/NetworkArray.scss';

const PublicActivityHeader = ({ feedAddress }) => {
  const { metaData } = feedAddress;
  const address = Object.keys(feedAddress)[0];
  const transactionAddress = `https://etherscan.io/address/${address}`;

  return (
    <div className="feed__activity__context">
      <div className="feed_activity_context_info">
        {(metaData && isValidImage(metaData.image))
          && <img src={`https://ipfs.infura.io/ipfs/${metaData.image[0].contentUrl['/']}`} className="feed__activity__user clear" alt="profile" />}

        {(metaData && metaData.contractImg)
          && <img src={metaData.contractImg.src} className="feed__activity__user clear" alt="profile" />}

        {(!metaData || (!metaData.image && !metaData.contractImg))
          && (
            <div className={`feed__activity__context__network ${networkArray[Math.floor(Math.random() * networkArray.length)]}`}>
              0x
            </div>
          )}

        {/* Activity with profile */}
        <>
          {(metaData && metaData.name)
            && (
              <ProfileHover
                noTheme
                orientation="top"
                address={address}
              >
                <a
                  href={`https://3box.io/${address}`}
                  className="feed__activity__address__wrapper"
                >
                  <h4>
                    {metaData.name}
                  </h4>
                  <p className="feed__activity__address__type">
                    {metaData.ensName || shortenEthAddr(address)}
                  </p>
                </a>
              </ProfileHover>
            )}

          {/* Contract Activity */}
          {(metaData && metaData.isContract)
            && (
              <a
                href={transactionAddress}
                target="_blank"
                rel="noopener noreferrer"
                className="feed__activity__address__wrapper"
              >
                <h4>
                  {metaData.contractDetails ? `${metaData.contractDetails.name.charAt(0).toUpperCase()}${metaData.contractDetails.name.slice(1).replace(/([A-Z])/g, ' $1').trim()}`
                    : address}
                </h4>
                <p className="feed__activity__address__type">
                  {metaData.contractDetails ? shortenEthAddr(address) : ''}
                </p>
              </a>
            )}

          {(!metaData || (!metaData.isContract && !metaData.name))
            && (
              <ProfileHover
                noTheme
                orientation="top"
                address={address}
              >
                <a
                  href={transactionAddress}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="feed__activity__address__wrapper"
                >
                  <h4>
                    {address}
                  </h4>
                  <p className="feed__activity__address__type">
                    {metaData.ensName || ''}
                  </p>
                </a>
              </ProfileHover>
            )}
        </>
      </div>

      <div className="feed_activity_context_type">
        <div className={`feed_activity_context_type_icon ${(metaData && metaData.isContract) ? 'Contract' : 'Address'}`}>
          <p>
            {(metaData && metaData.isContract) ? 'Contract' : 'Address'}
          </p>
        </div>
      </div>
    </div>
  );
};

PublicActivityHeader.propTypes = {
  feedAddress: PropTypes.object,
};

PublicActivityHeader.defaultProps = {
  feedAddress: {},
};

export default PublicActivityHeader;
