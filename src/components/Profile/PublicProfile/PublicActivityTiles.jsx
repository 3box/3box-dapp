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
  otherProfileAddress,
  otherName,
}) => (
    <React.Fragment>
      {
        Object.values(feedAddress)[0].map((item, index) => (
          (() => {
            if (item.dataType === 'Internal') {
              return (
                <FeedTileInternal
                  currentAddress={otherProfileAddress}
                  metaDataName={feedAddress.metaData
                    && (feedAddress.metaData.name
                      || (feedAddress.metaData.contractDetails
                        && (feedAddress.metaData.contractDetails.name.charAt(0).toUpperCase() + feedAddress.metaData.contractDetails.name.slice(1)).replace(/([A-Z])/g, ' $1').trim()))}
                  onOtherProfilePage
                  contractImg={feedAddress.metaData && feedAddress.metaData.contractImg && feedAddress.metaData.contractImg.src}
                  isFromProfile={item.from.toLowerCase() === otherProfileAddress.toLowerCase()}
                  name={otherName}
                  item={item}
                  key={index}
                />);
            }
            if (item.dataType === 'Token') {
              return (
                <FeedTileToken
                  currentAddress={otherProfileAddress}
                  metaDataName={feedAddress.metaData
                    && (feedAddress.metaData.name
                      || (feedAddress.metaData.contractDetails
                        && (feedAddress.metaData.contractDetails.name.charAt(0).toUpperCase() + feedAddress.metaData.contractDetails.name.slice(1)).replace(/([A-Z])/g, ' $1').trim()))}
                  onOtherProfilePage
                  contractImg={feedAddress.metaData && feedAddress.metaData.contractImg && feedAddress.metaData.contractImg.src}
                  isFromProfile={item.from.toLowerCase() === otherProfileAddress.toLowerCase()}
                  name={otherName}
                  item={item}
                  key={index}
                />);
            }
            if (item.dataType === 'Txs') {
              return (
                <FeedTileTXS
                  currentAddress={otherProfileAddress}
                  metaDataName={feedAddress.metaData
                    && (feedAddress.metaData.name
                      || (feedAddress.metaData.contractDetails
                        && (feedAddress.metaData.contractDetails.name.charAt(0).toUpperCase() + feedAddress.metaData.contractDetails.name.slice(1)).replace(/([A-Z])/g, ' $1').trim()))}
                  onOtherProfilePage
                  contractImg={feedAddress.metaData && feedAddress.metaData.contractImg && feedAddress.metaData.contractImg.src}
                  isFromProfile={item.from.toLowerCase() === otherProfileAddress.toLowerCase()}
                  name={otherName}
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
  otherProfileAddress: PropTypes.string,
  otherName: PropTypes.string,
};

PublicActivity.defaultProps = {
  feedAddress: {},
  otherProfileAddress: '',
  otherName: '',
};

const mapState = state => ({
  otherProfileAddress: state.otherProfile.otherProfileAddress,
  otherName: state.otherProfile.otherName,
});

export default connect(mapState)(PublicActivity);
