import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import CollectiblesTile from './CollectiblesTile';
import { CollectiblesModal, ModalBackground } from '../../components/Modals';
import { EmptyGalleryCollectiblesTile } from './EmptyCollectiblesTile';
import actions from '../../state/actions';
import OpenSea from '../../assets/OpenSea.png';
import Globe from '../../assets/Globe.svg';
import Private from '../../assets/Private.svg';
import { store } from '../../state/store';
import './styles/Profile.css';
import './styles/Feed.css';

const { handleCollectiblesModal } = actions.modal;

class Collectibles extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  updateGallery = (e, selectedCollectible, removeFavorite, fromModal) => {
    e.stopPropagation();
    const {
      box,
      collection,
      collectiblesFavorites,
      isFavorite,
      showCollectiblesModal,
      collectiblesFavoritesToRender,
      list,
      allData,
    } = this.props;

    const updatedAllData = allData;
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

    updatedCollectiblesFavorites.slice(0, 3); // Guarantee only three get saved
    box.public.set('collectiblesFavorites', updatedCollectiblesFavorites);
    store.dispatch({
      type: 'MY_COLLECTIBLES_UPDATE',
      collection: updatedCollection,
    });
    store.dispatch({
      type: 'MY_COLLECTIBLESFAVORITES_UPDATE',
      collectiblesFavorites: updatedCollectiblesFavorites,
      collectiblesFavoritesToRender: updatedCollectiblesFavoritesToRender,
    });
    updatedAllData['3Box_app'].public.collectiblesFavoritesToRender = updatedCollectiblesFavoritesToRender;
    store.dispatch({
      type: 'SPACES_DATA_UPDATE',
      list,
      allData: updatedAllData,
    });
    if (fromModal) {
      store.dispatch({
        type: 'UI_HANDLE_COLLECTIBLES_MODAL',
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
        <ReactCSSTransitionGroup
          transitionName="app__modals"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          {showCollectiblesModal && (
            <CollectiblesModal
              show={showCollectiblesModal}
              handleCollectiblesModal={this.props.handleCollectiblesModal}
              selectedCollectible={selectedCollectible}
              padded={selectedCollectible.asset_contract &&
                selectedCollectible.asset_contract.display_data &&
                selectedCollectible.asset_contract.display_data.card_display_style === 'padded'}
              cover={
                selectedCollectible.asset_contract &&
                selectedCollectible.asset_contract.display_data &&
                selectedCollectible.asset_contract.display_data.card_display_style === 'cover'
              }
              contain={
                selectedCollectible.asset_contract &&
                selectedCollectible.asset_contract.display_data &&
                selectedCollectible.asset_contract.display_data.card_display_style === 'contain'
              }
              updateGallery={this.updateGallery}
              isFavorite={isFavorite}
            />)}

          {showCollectiblesModal && (
            <ModalBackground />
          )}
        </ReactCSSTransitionGroup>
        <div id="myFeed">
          {(collection.length > 0 || collectiblesFavoritesToRender.length > 0)
            && (
              <div className="header collectiblesHeader" id="feed__header">
                <p>
                  Favorites
                </p>
                <img src={Globe} alt="Public" className="favorites__publicIcon" title="Favorites will appear in your public profile" />
              </div>
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
                      collectible.asset_contract.display_data.card_display_style === 'padded'
                    }
                    cover={
                      collectible.asset_contract &&
                      collectible.asset_contract.display_data &&
                      collectible.asset_contract.display_data.card_display_style === 'cover'
                    }
                    contain={
                      collectible.asset_contract &&
                      collectible.asset_contract.display_data &&
                      collectible.asset_contract.display_data.card_display_style === 'contain'
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
              <div className="header collectiblesHeader" id="feed__header">
                <p>
                  Gallery
                </p>
                <img src={Private} alt="Public" className="favorites__privateIcon" title="Gallery will not appear in your public profile" />
              </div>
            )
            : (
              <p className="header" id="feed__header">
                You don't have any collectibles
              </p>
            )}
          <div className="collectibles__grid">
            {collection.length > 0 && (
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
                    collectible.asset_contract.display_data.card_display_style === 'padded'
                  }
                  cover={
                    collectible.asset_contract &&
                    collectible.asset_contract.display_data &&
                    collectible.asset_contract.display_data.card_display_style === 'cover'
                  }
                  contain={
                    collectible.asset_contract &&
                    collectible.asset_contract.display_data &&
                    collectible.asset_contract.display_data.card_display_style === 'contain'
                  }
                  key={`${collectible.asset_contract.address}-${collectible.token_id}`}
                />
              ))
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
  selectedCollectible: {},
};

function mapState(state) {
  return {
    box: state.myData.box,
    collection: state.myData.collection,
    collectiblesFavorites: state.myData.collectiblesFavorites,
    collectiblesFavoritesToRender: state.myData.collectiblesFavoritesToRender,

    allData: state.spaces.allData,
    list: state.spaces.list,

    showCollectiblesModal: state.uiState.showCollectiblesModal,
    selectedCollectible: state.uiState.selectedCollectible,
    isFavorite: state.uiState.isFavorite,
  };
}

export default withRouter(
  connect(
    mapState,
    { handleCollectiblesModal },
  )(Collectibles),
);
