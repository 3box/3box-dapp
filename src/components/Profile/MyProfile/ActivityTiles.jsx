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
                  currentAddress={currentAddress}
                  metaDataName={feedAddress.metaData
                    && (feedAddress.metaData.name
                      || (feedAddress.metaData.contractDetails
                        && (feedAddress.metaData.contractDetails.name.charAt(0).toUpperCase() + feedAddress.metaData.contractDetails.name.slice(1)).replace(/([A-Z])/g, ' $1').trim()))}
                  contractImg={feedAddress.metaData && feedAddress.metaData.contractImg && feedAddress.metaData.contractImg.src}
                  isFromProfile={item.from.toLowerCase() === currentAddress.toLowerCase()}
                  name={name}
                  item={item}
                  key={index}
                />);
            }

            if (item.dataType === 'Token') {
              return (
                <FeedTileToken
                  currentAddress={currentAddress}
                  metaDataName={feedAddress.metaData
                    && (feedAddress.metaData.name
                      || (feedAddress.metaData.contractDetails
                        && (feedAddress.metaData.contractDetails.name.charAt(0).toUpperCase() + feedAddress.metaData.contractDetails.name.slice(1)).replace(/([A-Z])/g, ' $1').trim()))}
                  item={item}
                  key={index}
                  isFromProfile={item.from.toLowerCase() === currentAddress.toLowerCase()}
                  contractImg={feedAddress.metaData && feedAddress.metaData.contractImg && feedAddress.metaData.contractImg.src}
                  name={name}
                />);
            }

            if (item.dataType === 'Txs') {
              return (
                <FeedTileTXS
                  currentAddress={currentAddress}
                  item={item}
                  key={index}
                  metaDataName={feedAddress.metaData
                    && (feedAddress.metaData.name
                      || (feedAddress.metaData.contractDetails
                        && (feedAddress.metaData.contractDetails.name.charAt(0).toUpperCase() + feedAddress.metaData.contractDetails.name.slice(1)).replace(/([A-Z])/g, ' $1').trim()))}
                  isFromProfile={item.from.toLowerCase() === currentAddress.toLowerCase()}
                  contractImg={feedAddress.metaData && feedAddress.metaData.contractImg && feedAddress.metaData.contractImg.src}
                  name={name}
                />);
            }

            if (item.dataType === 'Public') {
              return (
                <FeedTileActivity
                  item={item}
                  key={index}
                  verifiedGithub={verifiedGithub}
                  verifiedTwitter={verifiedTwitter}
                />);
            }

            if (item.dataType === 'Private') {
              return (
                <FeedTileActivity
                  item={item}
                  key={index}
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
