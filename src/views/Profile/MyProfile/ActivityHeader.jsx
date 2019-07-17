import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProfileHover from 'profile-hover';

import ProfilePicture from '../../../components/ProfilePicture';
import Space from '../../../assets/Space.svg';
import networkArray from '../../../utils/networkArray';
import { checkIsEthAddress } from '../../../utils/funcs';
import '../styles/Feed.css';
import '../styles/Profile.css';
import '../../../components/styles/NetworkArray.css';

const Activity = ({ name, image, feedAddress }) => (
  <div className="feed__activity__context">
    {(Object.keys(feedAddress)[0] === 'threeBox')
      && (
        <div className="feed__activity__userWrapper">
          <ProfilePicture
            pictureClass="feed__activity__user clear"
            imageToRender={image}
          />
          <h5 className="feed__activity__threeBoxEmblem">
            3
          </h5>
        </div>)
    }
    
    {(Object.keys(feedAddress)[0] !== 'threeBox' && feedAddress.metaData && feedAddress.metaData.image)
      && <img src={`https://ipfs.infura.io/ipfs/${feedAddress.metaData.image}`} className="feed__activity__user clear" alt="profile" />}

    {(Object.keys(feedAddress)[0] !== 'threeBox' && feedAddress.metaData && feedAddress.metaData.contractImg)
      && <img src={feedAddress.metaData.contractImg.src} className="feed__activity__user clear" alt="profile" />}

    {(checkIsEthAddress(Object.keys(feedAddress)[0]) &&
      (!feedAddress.metaData || (!feedAddress.metaData.image
        && !feedAddress.metaData.contractImg
        && !feedAddress.metaData.contractData
        && !feedAddress.metaData.name
        && !feedAddress.metaData.contractDetails)))
      && (
        <div className={`feed__activity__context__network ${networkArray[Math.floor(Math.random() * networkArray.length)]}`}>
          0x
        </div>)}

    {(!checkIsEthAddress(Object.keys(feedAddress)[0]) && Object.keys(feedAddress)[0] !== 'threeBox')
      && (
        <div className={`feed__activity__user`}>
          <img src={Space} className="feed__activity__spaceIcon" alt="space icon" />
        </div>
      )}

    <div className="feed__activity__address">
      {/* 3Box Activity */}
      {Object.keys(feedAddress)[0] === 'threeBox'
        && (
          <div className="feed__activity__address__wrapper">
            <h4>
              {name}
            </h4>
            <p className="feed__activity__address__type">
              3Box Profile
            </p>
          </div>
        )}

      {checkIsEthAddress(Object.keys(feedAddress)[0]) && (
        <React.Fragment>
          {/* ETH Activity w/ 3Box Profile */}
          {(feedAddress.metaData && feedAddress.metaData.name)
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
                    {feedAddress.metaData.name}
                  </h4>
                  <p className="feed__activity__address__type">
                    Address
                  </p>
                </a>
              </ProfileHover>
            )}

          {/* ETH Activity: Contract */}
          {(feedAddress.metaData && feedAddress.metaData.contractDetails && feedAddress.metaData.contractDetails.name)
            && (
              <a
                href={`https://etherscan.io/address/${Object.keys(feedAddress)[0]}`}
                target="_blank"
                rel="noopener noreferrer"
                className="feed__activity__address__wrapper"
              >
                <h4>
                  {(feedAddress.metaData.contractDetails.name.charAt(0).toUpperCase() + feedAddress.metaData.contractDetails.name.slice(1)).replace(/([A-Z])/g, ' $1').trim()}
                </h4>
                <p className="feed__activity__address__type">
                  Contract
                    {` ${Object.keys(feedAddress)[0].substring(0, 12)}...`}
                </p>
              </a>
            )}

          {/* ETH Activity: */}
          {(!feedAddress.metaData || (!feedAddress.metaData.contractDetails && !feedAddress.metaData.name))
            && (
              <ProfileHover
                noTheme
                orientation="top"
                address={Object.keys(feedAddress)[0]}
              >
                <a
                  href={`https://ethstats.io/account/${Object.keys(feedAddress)[0]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="feed__activity__address__wrapper"
                >
                  <h4>
                    {Object.keys(feedAddress)[0]}
                  </h4>
                  <p className="feed__activity__address__type">
                    Address
                  </p>
                </a>
              </ProfileHover>
            )}
        </React.Fragment>
      )}

      {/* 3Box Space Activity */}
      {(!checkIsEthAddress(Object.keys(feedAddress)[0]) && Object.keys(feedAddress)[0] !== 'threeBox') && (
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
