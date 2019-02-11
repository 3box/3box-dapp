import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import networkArray from '../../../utils/networkArray';
import '../../styles/Feed.css';
import '../../../views/styles/Profile.css';
import '../../styles/NetworkArray.css';

const Activity = ({ name, image, feedAddress }) => (
  <div className="feed__activity__context">
    {(Object.keys(feedAddress)[0] === 'threeBox')
      && (image.length > 0 && image[0].contentUrl
        ? (
          <div className="feed__activity__userWrapper">
            <img
              src={`https://ipfs.infura.io/ipfs/${image[0].contentUrl['/']}`}
              className="feed__activity__user clear"
              alt="profile"
            />
            <h5 className="feed__activity__threeBoxEmblem">
              3
            </h5>
          </div>
        )
        : (
          <div className="feed__activity__userWrapper">
            <div className="feed__activity__user" />
            <h5 className="feed__activity__threeBoxEmblem">
              3
            </h5>
          </div>
        ))
    }

    {(Object.keys(feedAddress)[0] !== 'threeBox' && feedAddress.metaData && feedAddress.metaData.image)
      && <img src={`https://ipfs.infura.io/ipfs/${feedAddress.metaData.image}`} className="feed__activity__user clear" alt="profile" />}

    {(Object.keys(feedAddress)[0] !== 'threeBox' && feedAddress.metaData && feedAddress.metaData.contractImg)
      && <img src={feedAddress.metaData.contractImg.src} className="feed__activity__user clear" alt="profile" />}

    {(Object.keys(feedAddress)[0] !== 'threeBox' && (!feedAddress.metaData
      || (!feedAddress.metaData.image
        && !feedAddress.metaData.contractImg
        && !feedAddress.metaData.contractData
        && !feedAddress.metaData.name
        && !feedAddress.metaData.contractDetails)))
      && (
        <div className={`feed__activity__context__network ${networkArray[Math.floor(Math.random() * networkArray.length)]}`}>
          0x
        </div>)}

    <div className="feed__activity__address">
      {Object.keys(feedAddress)[0] === 'threeBox'
        ? (
          <div className="feed__activity__address__wrapper">
            <h4>
              {name}
            </h4>
            <p className="feed__activity__address__type">
              3Box Profile
            </p>
          </div>
        )
        : (
          <React.Fragment>
            {(feedAddress.metaData && feedAddress.metaData.name)
              && (
                <a href={`https://3box.io/${Object.keys(feedAddress)[0]}`} target="_blank" rel="noopener noreferrer" className="feed__activity__address__wrapper">
                  <h4>
                    {feedAddress.metaData.name}
                  </h4>
                  <p className="feed__activity__address__type">
                    Address
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
                <a href={`https://ethstats.io/account/${Object.keys(feedAddress)[0]}`} target="_blank" rel="noopener noreferrer" className="feed__activity__address__wrapper">
                  <h4>
                    {Object.keys(feedAddress)[0]}
                  </h4>
                  <p className="feed__activity__address__type">
                    Address
                  </p>
                </a>
              )}
          </React.Fragment>
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
  name: state.threeBox.name,
  image: state.threeBox.image,
});

export default connect(mapState)(Activity);
