import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProfileHover from 'profile-hover';

import ProfilePicture from '../../../components/ProfilePicture';
import Space from '../../../assets/Space.svg';
import networkArray from '../../../utils/networkArray';
import { checkIsEthAddress, shortenEthAddr, isValidImage } from '../../../utils/funcs';

import '../styles/Feed.scss';
import '../styles/Profile.scss';
import '../../../components/styles/NetworkArray.scss';

const ActivityHeader = ({ name, image, feedAddress }) => {
  const { metaData } = feedAddress;
  const address = Object.keys(feedAddress)[0];
  const transactionAddress = `https://ethstats.io/account/${address}`;
  const isThreeBoxActivity = address === 'threeBox';
  const isEthAddr = checkIsEthAddress(address);

  return (
    <div className="feed__activity__context">
      <div className="feed_activity_context_info">
        {isThreeBoxActivity
          && (
            <div className="feed__activity__userWrapper">
              <ProfilePicture
                pictureClass="feed__activity__user clear"
                imageToRender={image}
              />
              <h5 className="feed__activity__threeBoxEmblem">
                3
              </h5>
            </div>
          )}

        {(!isThreeBoxActivity && isValidImage(metaData.image))
          && <img src={`https://ipfs.infura.io/ipfs/${metaData.image[0].contentUrl['/']}`} className="feed__activity__user clear" alt="profile" />}

        {(!isThreeBoxActivity && metaData && metaData.contractImg)
          && <img src={metaData.contractImg.src} className="feed__activity__user clear" alt="profile" />}

        {(isEthAddr && (!metaData || (!metaData.image && !metaData.contractImg)))
          && (
            <div className={`feed__activity__context__network ${networkArray[Math.floor(Math.random() * networkArray.length)]}`}>
              0x
            </div>
          )}

        {(!isEthAddr && !isThreeBoxActivity)
          && (
            <div className="feed__activity__user">
              <img
                src={Space}
                className="feed__activity__spaceIcon"
                alt="space icon"
              />
            </div>
          )}

        <div className="feed__activity__address">
          {/* 3Box Activity */}
          {isThreeBoxActivity && (
            <div className="feed__activity__address__wrapper">
              <h4>
                {name}
              </h4>
              <p className="feed__activity__address__type 3BoxActivity">
                3Box Profile
              </p>
            </div>
          )}

          {isEthAddr && (
            <>
              {/* ETH Activity w/ 3Box Profile */}
              {(metaData && metaData.name && !metaData.isContract)
                && (
                  <ProfileHover
                    noTheme
                    orientation="top"
                    address={address}
                  >
                    <a
                      href={`https://3box.io/${address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="feed__activity__address__wrapper ethAddresW3BoxProfile"
                    >
                      <h4>
                        {metaData.name}
                      </h4>
                      <p className="feed__activity__address__type" title={address}>
                        {metaData.ensName || shortenEthAddr(address)}
                      </p>
                    </a>
                  </ProfileHover>
                )}

              {/* ETH Activity: Contract */}
              {(metaData && metaData.isContract)
                && (
                  <a
                    href={`https://etherscan.io/address/${address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="feed__activity__address__wrapper contractAddress"
                  >
                    <h4>
                      {metaData.contractDetails ? `${metaData.contractDetails.name.charAt(0).toUpperCase()}${metaData.contractDetails.name.slice(1).replace(/([A-Z])/g, ' $1').trim()}`
                        : address}
                    </h4>
                    <p className="feed__activity__address__type" title={address}>
                      {metaData.contractDetails ? shortenEthAddr(address) : ''}
                    </p>
                  </a>
                )}

              {/* ETH Activity: */}
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
                      className="feed__activity__address__wrapper ethAddress"
                    >
                      <h4>
                        {address}
                      </h4>
                      <p className="feed__activity__address__type" title={address}>
                        {metaData.ensName || ''}
                      </p>
                    </a>
                  </ProfileHover>
                )}
            </>
          )}

          {/* 3Box Space Activity */}
          {(!isEthAddr && !isThreeBoxActivity) && (
            <div className="feed__activity__address__wrapper spaceActivity">
              <h4>
                {address}
              </h4>
              <p className="feed__activity__address__type">
                3Box Space
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Transaction type */}
      {!isThreeBoxActivity && (
        <div className="feed_activity_context_type">
          <div className={`feed_activity_context_type_icon ${(metaData && metaData.isContract) ? 'Contract' : 'Address'}`}>
            <p>
              {(metaData && metaData.isContract) ? 'Contract' : 'Address'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

ActivityHeader.propTypes = {
  feedAddress: PropTypes.object,
  name: PropTypes.string,
  image: PropTypes.array,
};

ActivityHeader.defaultProps = {
  feedAddress: {},
  image: [],
  name: '',
};

const mapState = (state) => ({
  name: state.myData.name,
  image: state.myData.image,
});

export default connect(mapState)(ActivityHeader);
