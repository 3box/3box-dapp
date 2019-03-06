import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

import CollectiblesTile from './CollectiblesTile';
import { CollectiblesModal } from '../Modals';
import { EmptyGalleryCollectiblesTile, EmptyCollectiblesTile } from './EmptyCollectiblesTile';
import { handleCollectiblesModal } from '../../state/actions-modals';
import OpenSea from '../../assets/OpenSea.png';
import { store } from '../../state/store';
import '../../views/styles/Profile.css';
import '../styles/Feed.css';

class Collectibles extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  updateGallery = (e, selectedCollectible, removeFavorite, fromModal) => {
    e.stopPropagation();
    const {
      box, collection, collectiblesFavorites, isFavorite, showCollectiblesModal, collectiblesFavoritesToRender,
    } = this.props;
    const contractAddress = selectedCollectible.asset_contract.address;
    const tokenId = selectedCollectible.token_id;
    const updatedCollectiblesFavoritesToRender = collectiblesFavoritesToRender.slice() || [];
    const updatedCollectiblesFavorites = collectiblesFavorites.slice() || [];
    let updatedCollection = [];
    let removedCollectible;

    if (!removeFavorite) {
      if (updatedCollectiblesFavoritesToRender.length > 2) {
        removedCollectible = updatedCollectiblesFavoritesToRender.pop();
        updatedCollectiblesFavorites.pop();
      }
      updatedCollectiblesFavoritesToRender.unshift(selectedCollectible);
      updatedCollectiblesFavorites.unshift({
        address: contractAddress,
        token_id: tokenId,
      });
      const idx = collection.findIndex(nft => (nft.asset_contract.address === contractAddress
        && nft.token_id === tokenId));
      collection.splice(idx, 1);
      updatedCollection = collection.slice();
      if (removedCollectible) updatedCollection.push(removedCollectible);
    } else if (removeFavorite) {
      const idx = updatedCollectiblesFavorites.findIndex(favorite => (favorite.address === contractAddress
        && favorite.token_id === tokenId));

      updatedCollectiblesFavorites.splice(idx, 1);
      updatedCollectiblesFavoritesToRender.splice(idx, 1);
      updatedCollection = [...collection, selectedCollectible];
    }

    box.public.set('collectiblesFavorites', updatedCollectiblesFavorites);
    store.dispatch({
      type: 'GET_MY_COLLECTIBLES',
      collection: updatedCollection,
    });
    store.dispatch({
      type: 'GET_PUBLIC_COLLECTIBLESFAVORITES',
      collectiblesFavorites: updatedCollectiblesFavorites,
      collectiblesFavoritesToRender: updatedCollectiblesFavoritesToRender,
    });
    if (fromModal) {
      store.dispatch({
        type: 'HANDLE_COLLECTIBLES_MODAL',
        isFavorite: !isFavorite,
        showCollectiblesModal,
        selectedCollectible: this.props.selectedCollectible,
      });
    }
  };

  render() {
    const {
      collection, collectiblesFavoritesToRender, showCollectiblesModal, selectedCollectible, isFavorite,
    } = this.props;

    return (
      <React.Fragment>
        <CollectiblesModal
          show={showCollectiblesModal}
          handleCollectiblesModal={this.props.handleCollectiblesModal}
          selectedCollectible={selectedCollectible}
          padded={selectedCollectible.asset_contract &&
            selectedCollectible.asset_contract.display_data &&
            selectedCollectible.asset_contract.display_data.card_display_style}
          updateGallery={this.updateGallery}
          isFavorite={isFavorite}
        />
        <div id="feed">
          {collection.length > 0
            && (
              <p className="header" id="feed__header">
                Favorites
              </p>
            )}
          <div className="favorites__grid__wrapper">
            {collectiblesFavoritesToRender.length > 0 && (
              <div className="collectibles__grid favorites__grid">
                {collectiblesFavoritesToRender.map(collectible => (
                  <CollectiblesTile
                    updateGallery={this.updateGallery}
                    collectible={collectible}
                    image={collectible.image_preview_url}
                    description={collectible.asset_contract && collectible.asset_contract.name}
                    tokenId={collectible.token_id}
                    name={collectible.name}
                    bgStyle={collectible.background_color}
                    padded={
                      collectible.asset_contract &&
                      collectible.asset_contract.display_data &&
                      collectible.asset_contract.display_data.card_display_style
                    }
                    key={`${collectible.asset_contract.address}-${collectible.token_id}`}
                    favorite
                  />
                ))}
              </div>
            )}
          </div>

          {(collectiblesFavoritesToRender.length === 0 && collection.length > 0) && (
            <div className="favorites__grid__wrapper">
              <div className="collectibles__grid favorites__grid">
                <EmptyGalleryCollectiblesTile />
                <EmptyGalleryCollectiblesTile />
                <EmptyGalleryCollectiblesTile />
              </div>
            </div>
          )}
          {(collection.length > 0 || collectiblesFavoritesToRender.length > 0)
            ? (
              <p className="header" id="feed__header">
                Gallery
              </p>)
            : (
              <p className="header" id="feed__header">
                You don't have any collectibles
              </p>
            )}
          <div className="collectibles__grid">
            {collection.length > 0 ? (
              collection.map(collectible => (
                <CollectiblesTile
                  updateGallery={this.updateGallery}
                  collectible={collectible}
                  image={collectible.image_preview_url}
                  description={collectible.asset_contract && collectible.asset_contract.name}
                  tokenId={collectible.token_id}
                  name={collectible.name}
                  bgStyle={collectible.background_color}
                  padded={
                    collectible.asset_contract &&
                    collectible.asset_contract.display_data &&
                    collectible.asset_contract.display_data.card_display_style
                  }
                  key={`${collectible.asset_contract.address}-${collectible.token_id}`}
                />
              ))
            ) : (
                <EmptyCollectiblesTile />
              )}
          </div>
          <a href="https://opensea.io/" className="collectibles__opensea">
            <p>Collectibles data provided by</p>
            <img src={OpenSea} alt="OpenSea.io" />
          </a>
        </div>
      </React.Fragment>
    );
  }
}

Collectibles.propTypes = {
  box: PropTypes.object,
  selectedCollectible: PropTypes.object,
  collection: PropTypes.array,
  collectiblesFavorites: PropTypes.array,
  collectiblesFavoritesToRender: PropTypes.array,
  handleCollectiblesModal: PropTypes.func.isRequired,
  showCollectiblesModal: PropTypes.bool.isRequired,
  isFavorite: PropTypes.bool.isRequired,
};

Collectibles.defaultProps = {
  box: {},
  collection: [],
  collectiblesFavorites: [],
  collectiblesFavoritesToRender: [],
  selectedCollectible: {}
};

function mapState(state) {
  return {
    box: state.threeBox.box,
    selectedCollectible: state.threeBox.selectedCollectible,
    collection: state.threeBox.collection,
    collectiblesFavorites: state.threeBox.collectiblesFavorites,
    collectiblesFavoritesToRender: state.threeBox.collectiblesFavoritesToRender,
    showCollectiblesModal: state.threeBox.showCollectiblesModal,
    isFavorite: state.threeBox.isFavorite,
  };
}

export default withRouter(
  connect(
    mapState,
    { handleCollectiblesModal }
  )(Collectibles)
);
