import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  FeedTileTXS,
  FeedTileToken,
  FeedTileInternal,
  FeedTileActivity,
} from '../FeedTile';
import '../../styles/Feed.css';
import '../../../views/styles/Profile.css';
import '../../styles/NetworkArray.css';

const ActivityTiles = ({
  verifiedGithub,
  verifiedTwitter,
  currentAddress,
  name,
  feedAddress,
}) => (
    <React.Fragment>
      {
        Object.values(feedAddress)[0].map((item, index) => (
          (() => {
            if (item.dataType === 'Internal') {
              return (
                <FeedTileInternal
                  item={item}
                  key={index}
                  metaDataName={feedAddress.metaData
                    && (feedAddress.metaData.name
                      || (feedAddress.metaData.contractDetails && feedAddress.metaData.contractDetails.name))}
                  name={name}
                  isFromProfile={item.from.toLowerCase() === currentAddress.toLowerCase()}
                  isEven={parseInt(index, 10) % 2 === 0} />
              );
            }

            if (item.dataType === 'Token') {
              return (
                <FeedTileToken
                  item={item}
                  key={index}
                  metaDataName={feedAddress.metaData
                    && (feedAddress.metaData.name
                      || (feedAddress.metaData.contractDetails && feedAddress.metaData.contractDetails.name))}
                  isFromProfile={item.from.toLowerCase() === currentAddress.toLowerCase()}
                  name={name}
                  isEven={parseInt(index, 10) % 2 === 0}
                />);
            }

            if (item.dataType === 'Txs') {
              return (
                <FeedTileTXS
                  item={item}
                  key={index}
                  metaDataName={feedAddress.metaData
                    && (feedAddress.metaData.name
                      || (feedAddress.metaData.contractDetails && feedAddress.metaData.contractDetails.name))}
                  isFromProfile={item.from.toLowerCase() === currentAddress.toLowerCase()}
                  name={name}
                  isEven={parseInt(index, 10) % 2 === 0}
                />);
            }

            if (item.dataType === 'Public') {
              return (
                <FeedTileActivity
                  item={item}
                  key={index}
                  verifiedGithub={verifiedGithub}
                  verifiedTwitter={verifiedTwitter}
                  isEven={parseInt(index, 10) % 2 === 0}
                />);
            }

            if (item.dataType === 'Private') {
              return (
                <FeedTileActivity
                  item={item}
                  key={index}
                  isEven={parseInt(index, 10) % 2 === 0}
                />);
            }
          })()
        ))
      }

    </React.Fragment>
  );

ActivityTiles.propTypes = {
  feedAddress: PropTypes.object,
  verifiedGithub: PropTypes.string,
  verifiedTwitter: PropTypes.string,
  currentAddress: PropTypes.string,
  name: PropTypes.string,
};

ActivityTiles.defaultProps = {
  feedAddress: {},
  name: '',
  verifiedGithub: '',
  verifiedTwitter: '',
  currentAddress: '',
};

const mapState = state => ({
  verifiedGithub: state.threeBox.verifiedGithub,
  verifiedTwitter: state.threeBox.verifiedTwitter,
  currentAddress: state.threeBox.currentAddress,
  name: state.threeBox.name,
});

export default connect(mapState)(ActivityTiles);
