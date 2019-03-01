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
    const { box, collection, collectiblesFavorites, isFavorite, showCollectiblesModal } = this.props;
    const contractAddress = selectedCollectible.asset_contract.address;
    const tokenId = selectedCollectible.token_id;
    const updatedCollectiblesFavorites = collectiblesFavorites;
    const updatedCollection = [];
    let removedCollectible;

    if (!removeFavorite) {
      if (updatedCollectiblesFavorites.length > 2) removedCollectible = updatedCollectiblesFavorites.pop();
      updatedCollectiblesFavorites.push(selectedCollectible); // are we popping the right one?
      collection.forEach((collectible) => {
        if (collectible.asset_contract.address !== contractAddress
          || collectible.token_id !== tokenId) {
          updatedCollection.push(collectible);
        }
      });
      if (removedCollectible) updatedCollection.push(removedCollectible);
    } else if (removeFavorite) {
      collectiblesFavorites.map((favorite, i) => {
        if (favorite.asset_contract.address === contractAddress
          && favorite.token_id === tokenId) {
          updatedCollectiblesFavorites.splice(i, 1);
        }
      });
      collection.forEach(collectible => updatedCollection.push(collectible));
      updatedCollection.push(selectedCollectible);
    }

    box.public.set('collectiblesFavorites', updatedCollectiblesFavorites);
    store.dispatch({
      type: 'GET_MY_COLLECTIBLES',
      collection: updatedCollection,
    });
    store.dispatch({
      type: 'GET_PUBLIC_COLLECTIBLESFAVORITES',
      collectiblesFavorites: updatedCollectiblesFavorites,
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
      collection, collectiblesFavorites, showCollectiblesModal, selectedCollectible, isFavorite,
    } = this.props;

    return (
      <React.Fragment>
        <CollectiblesModal
          show={showCollectiblesModal}
          handleCollectiblesModal={this.props.handleCollectiblesModal}
          selectedCollectible={selectedCollectible}
          updateGallery={this.updateGallery}
          isFavorite={isFavorite}
        />
        <div id="feed" className="collectibles__wrapper">
          {collection.length > 0
            && (
              <p className="header" id="feed__header">
                Favorites
              </p>
            )}
          {collectiblesFavorites.length > 0 && (
            <div className="collectibles__grid">
              {collectiblesFavorites.map(collectible => (
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
          {(collectiblesFavorites.length === 0 && collection.length > 0) && (
            <div className="collectibles__grid">
              <EmptyGalleryCollectiblesTile />
              <EmptyGalleryCollectiblesTile />
              <EmptyGalleryCollectiblesTile />
            </div>
          )}
          {collection.length > 0
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
          <a href="https://opensea.io/">
            <img src={OpenSea} alt="OpenSea.io" className="modal__collectibles__opensea" />
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
  handleCollectiblesModal: PropTypes.func.isRequired,
  showCollectiblesModal: PropTypes.bool.isRequired,
  isFavorite: PropTypes.bool.isRequired,
};

Collectibles.defaultProps = {
  box: {},
  collection: [],
  collectiblesFavorites: [],
  selectedCollectible: {}
};

function mapState(state) {
  return {
    box: state.threeBox.box,
    selectedCollectible: state.threeBox.selectedCollectible,
    collection: state.threeBox.collection,
    collectiblesFavorites: state.threeBox.collectiblesFavorites,
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
