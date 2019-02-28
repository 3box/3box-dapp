import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

import CollectiblesTile from './CollectiblesTile';
import { CollectiblesModal } from '../Modals';
import {
  EmptyGalleryCollectiblesTile,
  EmptyCollectiblesTile,
} from './EmptyCollectiblesTile';
import { handleCollectiblesModal } from '../../state/actions-modals';
import { store } from '../../state/store';
import '../../views/styles/Profile.css';
import '../styles/Feed.css';

class Collectibles extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  async componentDidMount() {
    // const { location: { pathname } } = this.props;
    // const profileAddress = pathname.split('/')[1];

    // fetch(`https://api.opensea.io/api/v1/assets?owner=${profileAddress}&order_by=current_price&order_direction=asc`)
    //   .then(response => response.json())
    //   .then((collection) => {
    //     this.setState({ collection: collection.assets });
    //   });
  }

  // only visible on myprofile
  addToGallery = (collectibleID, removeFavorite) => {
    const { box, collection, collectiblesGallery } = this.props;
    let updatedCollectiblesGallery = collectiblesGallery;
    let removedCollectible;
    let updatedCollection = [];

    console.log(updatedCollection);

    const contractAddress = collectibleID.split('-')[0];
    const tokenId = collectibleID.split('-')[1];
    const selectedCollectible = !removeFavorite
      ? collection.filter(collectible => collectible.asset_contract.address === contractAddress
        && collectible.token_id === tokenId)[0]
      : collectiblesGallery.filter(collectible => collectible.asset_contract.address === contractAddress
        && collectible.token_id === tokenId)[0];

    // update favorites
    if (!removeFavorite) {
      if (updatedCollectiblesGallery.length > 2) removedCollectible = updatedCollectiblesGallery.pop();
      // are we popping the right one?
      updatedCollectiblesGallery.push(selectedCollectible);
    } else {
      updatedCollectiblesGallery = updatedCollectiblesGallery.filter((collectible) => {
        if (!_.isEqual(collectible, selectedCollectible)) return collectible;
      });
    }

    // update collection
    if (!removeFavorite) {
      updatedCollection = collection.filter((collectible) => {
        return (collectible.asset_contract.address !== contractAddress
          && collectible.token_id !== tokenId);
      });
      if (removedCollectible) updatedCollection.push(removedCollectible);
    } else {
      updatedCollection.push(selectedCollectible);
    }

    console.log(updatedCollection);

    box.public.set('collectiblesGallery', updatedCollectiblesGallery);
    store.dispatch({
      type: 'GET_MY_COLLECTIBLES',
      collection: updatedCollection,
    });
    store.dispatch({
      type: 'GET_PUBLIC_COLLECTIBLESGALLERY',
      collectiblesGallery: updatedCollectiblesGallery,
    });
  }

  render() {
    const { collection, collectiblesGallery, showCollectiblesModal, selectedCollectible } = this.props;
    console.log(collection);
    
    return (
      <React.Fragment>
        <CollectiblesModal show={showCollectiblesModal} handleCollectiblesModal={this.props.handleCollectiblesModal} selectedCollectible={selectedCollectible} />
        <div id="feed" className="collectibles__wrapper">
          <p className="header" id="feed__header">Gallery</p>
          <div className="collectibles__grid">
            {collectiblesGallery.length > 0
              ? collectiblesGallery.map(collectible => (
                <CollectiblesTile
                  addToGallery={this.addToGallery}
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
                />
              ))
              : <EmptyGalleryCollectiblesTile />}
          </div>
          <p className="header" id="feed__header">Collectibles</p>
          <div className="collectibles__grid">
            {collection.length > 0
              ? collection.map(collectible => (
                <CollectiblesTile
                  addToGallery={this.addToGallery}
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
                />
              ))
              : <EmptyCollectiblesTile />}
          </div>

        </div>
      </React.Fragment>
    );
  }
}

Collectibles.propTypes = {
  box: PropTypes.object,
  selectedCollectible: PropTypes.object,
  collection: PropTypes.array,
  collectiblesGallery: PropTypes.array,
  handleCollectiblesModal: PropTypes.func.isRequired,
  showCollectiblesModal: PropTypes.bool.isRequired,
};

Collectibles.defaultProps = {
  box: {},
  collection: [],
  collectiblesGallery: [],
  selectedCollectible: {},
};

function mapState(state) {
  return {
    box: state.threeBox.box,
    selectedCollectible: state.threeBox.selectedCollectible,
    collection: state.threeBox.collection,
    collectiblesGallery: state.threeBox.collectiblesGallery,
    showCollectiblesModal: state.threeBox.showCollectiblesModal,
  };
}

export default withRouter(connect(mapState, { handleCollectiblesModal })(Collectibles));
