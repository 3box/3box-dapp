import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PublicActivity from './PublicActivity';
import PublicCollectiblesGallery from './PublicCollectiblesGallery';
import '../styles/Feed.css';
import '../styles/Profile.css';
import '../../../components/styles/NetworkArray.css';

const PubContent = ({ showSignInBanner, onOtherProfilePage, showDownloadBanner, isLoggedIn }) => (
  <div className={` 
  ${onOtherProfilePage ? 'publicStatusUpdate' : ''}
  ${showSignInBanner ? 'publicStatusUpdate--bannerMargin' : ''} 
  ${isLoggedIn ? 'publicStatusUpdate-isLoggedIn' : ''} 
  ${(onOtherProfilePage && (showDownloadBanner || showSignInBanner)) ? 'publicStatusUpdate--bannerMargin' : ''} 
  pubContent`}
  >
    <PublicCollectiblesGallery />
    <PublicActivity />
  </div>
);

PubContent.propTypes = {
  showSignInBanner: PropTypes.bool,
  onOtherProfilePage: PropTypes.bool,
  showDownloadBanner: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
};

PubContent.defaultProps = {
  showSignInBanner: false,
  onOtherProfilePage: false,
  showDownloadBanner: false,
  isLoggedIn: false,
};

function mapState(state) {
  return {
    showSignInBanner: state.uiState.showSignInBanner,
    onOtherProfilePage: state.uiState.onOtherProfilePage,
    showDownloadBanner: state.uiState.showDownloadBanner,

    isLoggedIn: state.userState.isLoggedIn,
  };
}

export default withRouter(connect(mapState)(PubContent));