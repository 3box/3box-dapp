import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  FeedTileTXS,
  FeedTileToken,
  FeedTileInternal,
} from '../FeedTile';

import '../../styles/Feed.css';
import '../../../views/styles/Profile.css';
import '../../styles/NetworkArray.css';

const PublicActivity = ({
  feedAddress,
  publicProfileAddress,
  publicName,
}) => (
    <React.Fragment>
      {
        Object.values(feedAddress)[0].map((item, index) => (
          (() => {
            if (item.dataType === 'Internal') {
              return (
                <FeedTileInternal
                  currentAddress={publicProfileAddress}
                  metaDataName={feedAddress.metaData
                    && (feedAddress.metaData.name
                      || (feedAddress.metaData.contractDetails
                        && (feedAddress.metaData.contractDetails.name.charAt(0).toUpperCase() + feedAddress.metaData.contractDetails.name.slice(1)).replace(/([A-Z])/g, ' $1').trim()))}
                  onPublicProfilePage
                  contractImg={feedAddress.metaData && feedAddress.metaData.contractImg && feedAddress.metaData.contractImg.src}
                  isFromProfile={item.from.toLowerCase() === publicProfileAddress.toLowerCase()}
                  name={publicName}
                  item={item}
                  key={index}
                />);
            }
            if (item.dataType === 'Token') {
              return (
                <FeedTileToken
                  currentAddress={publicProfileAddress}
                  metaDataName={feedAddress.metaData
                    && (feedAddress.metaData.name
                      || (feedAddress.metaData.contractDetails
                        && (feedAddress.metaData.contractDetails.name.charAt(0).toUpperCase() + feedAddress.metaData.contractDetails.name.slice(1)).replace(/([A-Z])/g, ' $1').trim()))}
                  onPublicProfilePage
                  contractImg={feedAddress.metaData && feedAddress.metaData.contractImg && feedAddress.metaData.contractImg.src}
                  isFromProfile={item.from.toLowerCase() === publicProfileAddress.toLowerCase()}
                  name={publicName}
                  item={item}
                  key={index}
                />);
            }
            if (item.dataType === 'Txs') {
              return (
                <FeedTileTXS
                  currentAddress={publicProfileAddress}
                  metaDataName={feedAddress.metaData
                    && (feedAddress.metaData.name
                      || (feedAddress.metaData.contractDetails
                        && (feedAddress.metaData.contractDetails.name.charAt(0).toUpperCase() + feedAddress.metaData.contractDetails.name.slice(1)).replace(/([A-Z])/g, ' $1').trim()))}
                  onPublicProfilePage
                  contractImg={feedAddress.metaData && feedAddress.metaData.contractImg && feedAddress.metaData.contractImg.src}
                  isFromProfile={item.from.toLowerCase() === publicProfileAddress.toLowerCase()}
                  name={publicName}
                  item={item}
                  key={index}
                />);
            }
          })()
        ))
      }
    </React.Fragment>
  );

PublicActivity.propTypes = {
  feedAddress: PropTypes.object,
  publicProfileAddress: PropTypes.string,
  publicName: PropTypes.string,
};

PublicActivity.defaultProps = {
  feedAddress: {},
  publicProfileAddress: '',
  publicName: '',
};

const mapState = state => ({
  publicProfileAddress: state.threeBox.publicProfileAddress,
  publicName: state.threeBox.publicName,
});

export default connect(mapState)(PublicActivity);
