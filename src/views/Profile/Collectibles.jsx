import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import CollectiblesTile from './CollectiblesTile';
import { CollectiblesModal, ModalBackground } from '../../components/Modals';
import EmptyGalleryCollectiblesTile from './EmptyCollectiblesTile';
import actions from '../../state/actions';
import OpenSea from '../../assets/OpenSea.png';
import Loading from '../../assets/3BoxLoading.svg';
import Private from '../../assets/Private.svg';
import { store } from '../../state/store';
import './styles/Profile.scss';
import './styles/Feed.scss';

const { handleCollectiblesModal } = actions.modal;

class Collectibles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 30,
    };

    window.onscroll = () => {
      const { isLoading } = this.state;
      const { collection } = this.props;
      const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
      const { body } = document;
      const html = document.documentElement;
      const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
      const windowBottom = windowHeight + window.pageYOffset;

      if (windowBottom >= docHeight && collection.length && !isLoading) {
        this.fetchCollectibles();
      }
    };
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

      const idx = collection.findIndex((nft) => (nft.asset_contract.address === contractAddress
        && nft.token_id === tokenId));
      collection.splice(idx, 1);
      updatedCollection = collection.slice();

      if (removedCollectible) updatedCollection.push(removedCollectible);
    } else if (removeFavorite) {
      const idx = updatedCollectiblesFavorites.findIndex((favorite) => (favorite.address === contractAddress
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

  fetchCollectibles = async () => {
    try {
      const { offset } = this.state;
      const { collection, currentAddress } = this.props;
      const updatedCollection = collection.slice();

      this.setState({ isLoading: true });

      if (updatedCollection.length === offset) {
        const updatedOffset = offset + 30;
        const collectiblesRes = await fetch(`https://api.opensea.io/api/v1/assets?owner=${currentAddress}&order_by=current_price&order_direction=asc&offset=${offset}&limit=30`);
        const collectiblesData = await collectiblesRes.json();
        console.log('collectiblesData', collectiblesData)
        const combinedArray = updatedCollection.concat(collectiblesData.assets);
        store.dispatch({
          type: 'MY_COLLECTIBLES_UPDATE',
          collection: combinedArray,
        });
        this.setState({ offset: updatedOffset, isLoading: false });
      } else {
        this.setState({ isLoading: false });
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const {
      collectiblesFavoritesToRender,
      collection,
      showCollectiblesModal,
      selectedCollectible,
      isFavorite,
      isActive,
      isFetchingCollectibles,
    } = this.props;
    const { isLoading } = this.state;

    const assetContract = selectedCollectible.asset_contract;
    const contractDiplayData = selectedCollectible.collection
      && selectedCollectible.collection.display_data
      && selectedCollectible.collection.display_data.card_display_style;

    console.log('assetContract', assetContract);
    console.log('selectedCollectibleselectedCollectible', selectedCollectible);
    return (
      <>
        <ReactCSSTransitionGroup
          transitionName="app__modals"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          {showCollectiblesModal && (
            <CollectiblesModal
              show={showCollectiblesModal}
              handleCollectiblesModal={handleCollectiblesModal}
              selectedCollectible={selectedCollectible}
              padded={contractDiplayData === 'padded'}
              cover={contractDiplayData === 'cover'}
              contain={contractDiplayData === 'contain'}
              updateGallery={this.updateGallery}
              isFavorite={isFavorite}
            />
          )}

          {showCollectiblesModal && (
            <ModalBackground />
          )}
        </ReactCSSTransitionGroup>

        <div id="myFeed" className={`profileTab ${isActive ? 'viewTab' : ''}`}>
          {/* Loading Collectibles */}
          {isFetchingCollectibles && (
            <>
              <div className="header collectiblesHeader" id="feed__header">
                <p>
                  Collectibles
                </p>
              </div>
              <div className="feed__activity__header">
                <div className="feed_activity_empty">
                  <img src={Loading} alt="loading" id="activityLoad" />
                </div>
              </div>
            </>
          )}

          {/* Collectibles tab headers */}
          {!isFetchingCollectibles && (
            (collection.length || collectiblesFavoritesToRender.length)
              ? (
                <div className="header collectiblesHeader" id="feed__header">
                  <p>
                    Favorites
                  </p>
                </div>
              ) : (
                <>
                  <div className="header collectiblesHeader" id="feed__header">
                    <p>
                      Collectibles
                    </p>
                  </div>
                  <div className="feed_activity_empty">
                    <p className="feed_activity_empty_text">
                      You don't have any collectibles
                    </p>
                  </div>
                </>
              ))}

          <div className="favorites__grid__wrapper">
            {console.log('collectiblesFavoritesToRender', collectiblesFavoritesToRender)}
            {collectiblesFavoritesToRender.length > 0 && (
              <div className="collectibles__grid favorites__grid">
                {collectiblesFavoritesToRender.map((collectible) => {
                  const collectibleDisplayData = collectible.collection
                    && collectible.collection.display_data
                    && collectible.collection.display_data.card_display_style;
                  return (
                    <CollectiblesTile
                      updateGallery={this.updateGallery}
                      collectible={collectible}
                      image={collectible.image_preview_url}
                      description={collectible.asset_contract && collectible.asset_contract.name}
                      tokenId={collectible.token_id}
                      name={collectible.name}
                      bgStyle={collectible.background_color}
                      onPublicProfile={false}
                      padded={collectibleDisplayData === 'padded'}
                      cover={collectibleDisplayData === 'cover'}
                      contain={collectibleDisplayData === 'contain'}
                      key={`${collectible.asset_contract.address}-${collectible.token_id}`}
                      favorite
                    />
                  )
                })}
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
            && (
              <div className="header collectiblesHeader" id="feed__header">
                <p>
                  Gallery
                </p>
                <img src={Private} alt="Public" className="favorites__privateIcon" title="Gallery will not appear in your public profile" />
              </div>
            )}
          {console.log('collectioncollection', collection)}
          <div className="collectibles__grid">
            {collection.length > 0 && (
              collection.map((collectible) => {
                const collectibleDisplayData = collectible.collection
                  && collectible.collection.display_data
                  && collectible.collection.display_data.card_display_style;

                return (
                  <CollectiblesTile
                    updateGallery={this.updateGallery}
                    collectible={collectible}
                    image={collectible.image_preview_url}
                    description={collectible.asset_contract && collectible.asset_contract.name}
                    tokenId={collectible.token_id}
                    name={collectible.name}
                    bgStyle={collectible.background_color}
                    onPublicProfile={false}
                    padded={collectibleDisplayData === 'padded'}
                    cover={collectibleDisplayData === 'cover'}
                    contain={collectibleDisplayData === 'contain'}
                    key={`${collectible.asset_contract && collectible.asset_contract.address}-${collectible.token_id}`}
                  />
                );
              })
            )}
          </div>

          {isLoading && (
            <div className="loading_collectibles">
              <img src={Loading} alt="Loading" />
            </div>
          )}

          <a href="https://opensea.io/" className="collectibles__opensea">
            <p>Collectibles data provided by</p>
            <img src={OpenSea} alt="OpenSea.io" />
          </a>
        </div>
      </>
    );
  }
}

Collectibles.propTypes = {
  box: PropTypes.object,
  allData: PropTypes.object,
  selectedCollectible: PropTypes.object,
  collection: PropTypes.array,
  list: PropTypes.array,
  collectiblesFavorites: PropTypes.array,
  collectiblesFavoritesToRender: PropTypes.array,
  showCollectiblesModal: PropTypes.bool.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  isActive: PropTypes.bool,
  isFetchingCollectibles: PropTypes.bool,
  currentAddress: PropTypes.string,
  currentNetwork: PropTypes.string,
};

Collectibles.defaultProps = {
  box: {},
  allData: {},
  collection: [],
  collectiblesFavorites: [],
  collectiblesFavoritesToRender: [],
  list: [],
  selectedCollectible: {},
  currentAddress: '',
  currentNetwork: '',
  isActive: false,
  isFetchingCollectibles: false,
  isFavorite: false,
  showCollectiblesModal: false,
};

function mapState(state) {
  return {
    box: state.myData.box,
    collection: state.myData.collection,
    collectiblesFavorites: state.myData.collectiblesFavorites,
    collectiblesFavoritesToRender: state.myData.collectiblesFavoritesToRender,

    currentNetwork: state.userState.currentNetwork,

    allData: state.spaces.allData,
    list: state.spaces.list,

    showCollectiblesModal: state.uiState.showCollectiblesModal,
    selectedCollectible: state.uiState.selectedCollectible,
    isFavorite: state.uiState.isFavorite,
    isFetchingCollectibles: state.uiState.isFetchingCollectibles,

    currentAddress: state.userState.currentAddress,
  };
}

export default withRouter(
  connect(mapState)(Collectibles),
);