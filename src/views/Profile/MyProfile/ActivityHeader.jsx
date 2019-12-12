import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProfileHover from 'profile-hover';

import ProfilePicture from '../../../components/ProfilePicture';
import Space from '../../../assets/Space.svg';
import networkArray from '../../../utils/networkArray';
import { checkIsEthAddress } from '../../../utils/funcs';
import '../styles/Feed.scss';
import '../styles/Profile.scss';
import '../../../components/styles/NetworkArray.scss';

const Activity = ({ name, image, feedAddress }) => {
  const { metaData } = feedAddress;
  const transactionAddress = `https://ethstats.io/account/${Object.keys(feedAddress)[0]}`;
  const isThreeBoxActivity = Object.keys(feedAddress)[0] === 'threeBox';
  const isEthAddr = checkIsEthAddress(Object.keys(feedAddress)[0]);

  return (
    <div className="feed__activity__context">
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

      {(!isThreeBoxActivity && metaData && metaData.image)
        && <img src={`https://ipfs.infura.io/ipfs/${metaData.image}`} className="feed__activity__user clear" alt="profile" />}

      {(!isThreeBoxActivity && metaData && metaData.contractImg)
        && <img src={metaData.contractImg.src} className="feed__activity__user clear" alt="profile" />}

      {(isEthAddr &&
        (!metaData || (!metaData.image
          && !metaData.contractImg
          && !metaData.contractData
          && !metaData.name
          && !metaData.contractDetails)))
        && (
          <div className={`feed__activity__context__network ${networkArray[Math.floor(Math.random() * networkArray.length)]}`}>
            0x
          </div>
        )}

      {(!isEthAddr && !isThreeBoxActivity)
        && (
          <div className={`feed__activity__user`}>
            <img src={Space} className="feed__activity__spaceIcon" alt="space icon" />
          </div>
        )}

      <div className="feed__activity__address">
        {/* 3Box Activity */}
        {isThreeBoxActivity && (
          <div className="feed__activity__address__wrapper">
            <h4>
              {name}
            </h4>
            <p className="feed__activity__address__type">
              3Box Profile
            </p>
          </div>
        )}

        {isEthAddr && (
          <>
            {/* ETH Activity w/ 3Box Profile */}
            {(metaData && metaData.name)
              && (
                <ProfileHover
                  noTheme
                  orientation="top"
                  address={Object.keys(feedAddress)[0]}
                >
                  <a
                    href={`https://3box.io/${Object.keys(feedAddress)[0]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="feed__activity__address__wrapper"
                  >
                    <h4>
                      {metaData.name}
                    </h4>
                    <p className="feed__activity__address__type" title={Object.keys(feedAddress)[0]}>
                      {metaData.ensName || Object.keys(feedAddress)[0]}
                    </p>
                  </a>
                </ProfileHover>
              )}

            {/* ETH Activity: Contract */}
            {(metaData && metaData.contractDetails && metaData.contractDetails.name)
              && (
                <a
                  href={`https://etherscan.io/address/${Object.keys(feedAddress)[0]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="feed__activity__address__wrapper"
                >
                  <h4>
                    {(metaData.contractDetails.name.charAt(0).toUpperCase() + metaData.contractDetails.name.slice(1)).replace(/([A-Z])/g, ' $1').trim()}
                  </h4>
                  <p className="feed__activity__address__type" title={Object.keys(feedAddress)[0]}>
                    {`Contract ${metaData.ensName || Object.keys(feedAddress)[0].substring(0, 12)}...`}
                  </p>
                </a>
              )}

            {/* ETH Activity: */}
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
                    <p className="feed__activity__address__type" title={Object.keys(feedAddress)[0]}>
                      {metaData.ensName || Object.keys(feedAddress)[0]}
                    </p>
                  </a>
                </ProfileHover>
              )}
          </>
        )}

        {/* 3Box Space Activity */}
        {(!isEthAddr && !isThreeBoxActivity) && (
          <div className="feed__activity__address__wrapper">
            <h4>
              {Object.keys(feedAddress)[0]}
            </h4>
            <p className="feed__activity__address__type">
              3Box Space
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

Activity.propTypes = {
  feedAddress: PropTypes.object,
  name: PropTypes.string,
  image: PropTypes.array,
};

Activity.defaultProps = {
  feedAddress: {},
  image: [],
  name: '',
};

const mapState = state => ({
  name: state.myData.name,
  image: state.myData.image,
});

export default connect(mapState)(Activity);
