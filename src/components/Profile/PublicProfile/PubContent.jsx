import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PublicActivity from './PublicActivity';
import PublicCollectiblesGallery from './PublicCollectiblesGallery';
import '../../styles/Feed.css';
import '../../../views/styles/Profile.css';
import '../../styles/NetworkArray.css';

const PubContent = ({ showSignInBanner, onPublicProfilePage, showDownloadBanner }) => (
  <div className={` 
  ${onPublicProfilePage ? 'publicStatusUpdate' : ''}
  ${showSignInBanner ? 'publicStatusUpdate--bannerMargin' : ''} 
  ${(onPublicProfilePage && (showDownloadBanner || showSignInBanner)) ? 'publicStatusUpdate--bannerMargin' : ''} 
  pubContent`}
  >
    <PublicCollectiblesGallery />
    <PublicActivity />
  </div>
);

PubContent.propTypes = {
  showSignInBanner: PropTypes.bool,
  onPublicProfilePage: PropTypes.bool,
  showDownloadBanner: PropTypes.bool,
};

PubContent.defaultProps = {
  showSignInBanner: false,
  onPublicProfilePage: false,
  showDownloadBanner: false,
};

function mapState(state) {
  return {
    showSignInBanner: state.threeBox.showSignInBanner,
    onPublicProfilePage: state.threeBox.onPublicProfilePage,
    showDownloadBanner: state.threeBox.onPublicProfilePage,
  };
}

export default withRouter(connect(mapState)(PubContent));