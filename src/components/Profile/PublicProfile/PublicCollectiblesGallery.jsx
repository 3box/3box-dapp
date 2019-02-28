import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CollectiblesTile from '../CollectiblesTile';
import { CollectiblesModal } from '../../Modals';
import { EmptyGalleryCollectiblesTile } from '../EmptyCollectiblesTile';
import { handleCollectiblesModal } from '../../../state/actions-modals';
import '../../styles/Feed.css';
import '../../../views/styles/Profile.css';
import '../../styles/NetworkArray.css';

const PublicActivity = ({
  publicCollectiblesGallery,
  showCollectiblesModal,
  handleCollectiblesModal,
  selectedCollectible,
}) => (
    <React.Fragment>
      <CollectiblesModal show={showCollectiblesModal} handleCollectiblesModal={handleCollectiblesModal} selectedCollectible={selectedCollectible} />
      {
        publicCollectiblesGallery.length > 0
        && (
          <div className="gallery">
            <p className="header" id="feed__header">Gallery</p>
            <div className="collectibles__grid">
              {publicCollectiblesGallery.length > 0
                ? publicCollectiblesGallery.map(collectible => (
                  <CollectiblesTile
                    collectible={collectible}
                    image={collectible.image_preview_url}
                    description={collectible.asset_contract && collectible.asset_contract.name}
                    tokenId={collectible.token_id}
                    name={collectible.name}
                    bgStyle={collectible.background_color}
                    padded={collectible.asset_contract
                      && collectible.asset_contract.display_data
                      && collectible.asset_contract.display_data.card_display_style}
                    key={`${collectible.asset_contract.address}-${collectible.token_id}`}
                    id={`${collectible.asset_contract.address}-${collectible.token_id}`}
                    favorite
                    onPublicProfile
                  />
                ))
                : <EmptyGalleryCollectiblesTile />}
            </div>
          </div>)
      }
    </React.Fragment>
  );

PublicActivity.propTypes = {
  publicCollectiblesGallery: PropTypes.array,
  showCollectiblesModal: PropTypes.bool.isRequired,
  handleCollectiblesModal: PropTypes.func.isRequired,
  selectedCollectible: PropTypes.object,
};

PublicActivity.defaultProps = {
  publicCollectiblesGallery: [],
  selectedCollectible: {},
};

const mapState = state => ({
  publicCollectiblesGallery: state.threeBox.publicCollectiblesGallery,
  showCollectiblesModal: state.threeBox.showCollectiblesModal,
  selectedCollectible: state.threeBox.selectedCollectible,
});

export default connect(mapState, { handleCollectiblesModal })(PublicActivity);
