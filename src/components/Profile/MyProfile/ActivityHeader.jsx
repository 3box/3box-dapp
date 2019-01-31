import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import networkArray from '../../../utils/networkArray';
import '../../styles/Feed.css';
import '../../../views/styles/Profile.css';
import '../../styles/NetworkArray.css';

const Activity = ({
  name,
  image,
  feedAddress,
}) => (
    <div className="feed__activity__context">
      {Object.keys(feedAddress)[0] === 'threeBox' ?
        image.length > 0 && image[0].contentUrl
          ? <img src={`https://ipfs.infura.io/ipfs/${image[0].contentUrl['/']}`} className="feed__activity__user" alt="profile" />
          : <div className="feed__activity__user" />
        : (
          <div className={`feed__activity__context__network ${networkArray[Math.floor(Math.random() * networkArray.length)]}`}>
            0x
          </div>)
      }
      <div className="feed__activity__address">
        {Object.keys(feedAddress)[0] === 'threeBox'
          ? (
            <div>
              <h4>
                {name}
              </h4>
              <p>
                3Box Profile
              </p>
            </div>
          )
          : (
            <div>
              <a href={`https://3box.io/${Object.keys(feedAddress)[0]}`} >
                <h4>
                  {(feedAddress.metaData && feedAddress.metaData.name) ? feedAddress.metaData.name : Object.keys(feedAddress)[0]}
                </h4>
              </a>
              <p>
                Ethereum Address
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
  name: state.threeBox.name,
  image: state.threeBox.image,
});

export default connect(mapState)(Activity);
