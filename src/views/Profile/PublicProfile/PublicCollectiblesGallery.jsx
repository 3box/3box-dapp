import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import CollectiblesTile from '../CollectiblesTile';
import { CollectiblesModal, ModalBackground } from '../../../components/Modals';
import { EmptyGalleryCollectiblesTile } from '../EmptyCollectiblesTile';
import actions from '../../../state/actions';
import '../styles/Feed.css';
import '../styles/Profile.css';
import '../../../components/styles/NetworkArray.css';
import '../../../components/styles/Modal.css';

const { handleCollectiblesModal } = actions.modal;

const PublicCollectiblesGallery = ({
  otherCollectiblesFavorites,
  showCollectiblesModal,
  handleCollectiblesModal,
  selectedCollectible,
}) => (
    <>
      <ReactCSSTransitionGroup
        transitionName="app__modals"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
      >
        {showCollectiblesModal && (
          <CollectiblesModal
            handleCollectiblesModal={handleCollectiblesModal}
            selectedCollectible={selectedCollectible}
            onPublicProfile
            padded={selectedCollectible.asset_contract &&
              selectedCollectible.asset_contract.display_data &&
              selectedCollectible.asset_contract.display_data.card_display_style}
          />
        )}
        {showCollectiblesModal && (
          <ModalBackground />
        )}
      </ReactCSSTransitionGroup>

      {
        otherCollectiblesFavorites.length > 0
        && (
          <div className="collectibles">
            <p className="header" id="feed__header">Favorites</p>
            <div className="favorites__grid__wrapper">
              <div className="collectibles__grid favorites__grid">
                {otherCollectiblesFavorites.length > 0
                  ? otherCollectiblesFavorites.map(collectible => (
                    <CollectiblesTile
                      collectible={collectible}
                      image={collectible.image_preview_url}
                      description={collectible.asset_contract && collectible.asset_contract.name}
                      tokenId={collectible.token_id}
                      name={collectible.name}
                      bgStyle={collectible.background_color}
                      padded={collectible.asset_contract
                        && collectible.asset_contract.display_data
                        && collectible.asset_contract.display_data.card_display_style === 'padded'}
                      key={`${collectible.asset_contract && collectible.asset_contract.address}-${collectible.token_id}`}
                      id={`${collectible.asset_contract && collectible.asset_contract.address}-${collectible.token_id}`}
                      favorite
                      onPublicProfile
                    />
                  ))
                  : <EmptyGalleryCollectiblesTile />}
              </div>
            </div>
          </div>
        )
      }
    </>
  );

PublicCollectiblesGallery.propTypes = {
  otherCollectiblesFavorites: PropTypes.array,
  showCollectiblesModal: PropTypes.bool,
  handleCollectiblesModal: PropTypes.func.isRequired,
  selectedCollectible: PropTypes.object,
};

PublicCollectiblesGallery.defaultProps = {
  otherCollectiblesFavorites: [],
  selectedCollectible: {},
  showCollectiblesModal: false,
};

const mapState = state => ({
  otherCollectiblesFavorites: state.otherProfile.otherCollectiblesFavorites,
  showCollectiblesModal: state.uiState.showCollectiblesModal,
  selectedCollectible: state.uiState.selectedCollectible,
});

export default connect(mapState, { handleCollectiblesModal })(PublicCollectiblesGallery);
