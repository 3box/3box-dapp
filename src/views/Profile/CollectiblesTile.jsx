import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import actions from '../../state/actions';
// import HeartGrey from '../../assets/HeartGrey.svg';
import HeartBlue from '../../assets/HeartBlue.svg';
import './styles/Profile.css';
import './styles/Collectibles.css';

const {
  handleCollectiblesModal,
} = actions.modal;

const CollectiblesTile = ({
  image,
  description,
  name,
  updateGallery,
  padded,
  bgStyle,
  tokenId,
  favorite,
  onPublicProfile,
  handleCollectiblesModal,
  collectible,
}) => (
    <div className="collectiblesTile" onClick={() => handleCollectiblesModal(collectible, favorite)}>
      <div
        className="collectibles__image__wrapper"
        style={{ backgroundColor: `#${bgStyle}` }}
      >
        {padded && <span className="collectibles__image__shadow" />}
        <img
          className={`
          collectibles__image 
          ${padded && 'padded'} 
          `}
          src={image}
          alt=""
        />

        {(!onPublicProfile && !favorite) && (
          <button
            type="button"
            className="collectibles__like"
            title="Add to favorites"
            onClick={e => updateGallery(e, collectible)}
          >
            <img src={HeartBlue} alt="" className="collectibles__like__heart gallery__like" />
          </button>
        )}

        {(!onPublicProfile && favorite) && (
          <button
            type="button"
            className="collectibles__like"
            title="Remove from favorites"
            onClick={e => updateGallery(e, collectible, 'remove')}
          >
            <img src={HeartBlue} alt="" className="collectibles__like__heart" />
          </button>
        )}
      </div>

      <div className="collectibles__info">
        <h3>{name}</h3>
        <p>{`${description} ${tokenId}`}</p>
      </div>
    </div>
  );

CollectiblesTile.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  padded: PropTypes.bool,
  updateGallery: PropTypes.func,
  handleCollectiblesModal: PropTypes.func.isRequired,
  favorite: PropTypes.bool.isRequired,
  onPublicProfile: PropTypes.bool.isRequired,
  tokenId: PropTypes.string,
  bgStyle: PropTypes.string,
  collectible: PropTypes.object,
};

CollectiblesTile.defaultProps = {
  image: '',
  name: '',
  description: '',
  padded: false,
  tokenId: '',
  bgStyle: '',
  collectible: {},
  updateGallery: {},
};

function mapState(state) {
  return {
  };
}

export default withRouter(connect(mapState, { handleCollectiblesModal })(CollectiblesTile));
