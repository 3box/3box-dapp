import React from 'react';
import PropTypes from 'prop-types';

import '../../views/styles/Profile.css';
import '../styles/Collectibles.css';

export const EmptyCollectiblesTile = () => (
  <div className="emptyCollectiblesTile">
    <h4>Add a collectible to your public gallery</h4>
  </div>
);

EmptyCollectiblesTile.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  padded: PropTypes.string,
  favoriteCollectible: PropTypes.func.isRequired,
  tokenId: PropTypes.string,
  bgStyle: PropTypes.string,
};

EmptyCollectiblesTile.defaultProps = {
  image: '',
  name: '',
  description: '',
  padded: '',
  tokenId: '',
  bgStyle: '',
};

export const EmptyGalleryCollectiblesTile = () => (
  <div className="emptyCollectiblesTile collectiblesTile">
    <h4>Add to favorites</h4>
  </div>
);

EmptyGalleryCollectiblesTile.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  padded: PropTypes.string,
  favoriteCollectible: PropTypes.func.isRequired,
  tokenId: PropTypes.string,
  bgStyle: PropTypes.string,
};

EmptyGalleryCollectiblesTile.defaultProps = {
  image: '',
  name: '',
  description: '',
  padded: '',
  tokenId: '',
  bgStyle: '',
};
