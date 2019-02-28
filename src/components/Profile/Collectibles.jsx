import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

import '../../views/styles/Profile.css';
import '../styles/Feed.css';
import {
  CollectiblesTile,
  EmptyGalleryCollectiblesTile,
  EmptyCollectiblesTile,
} from './CollectiblesTile';
import { store } from '../../state/store';

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
  addToGallery = (collectibleID, remove) => {
    const { box, collection, collectiblesGallery } = this.props;
    let updatedCollectiblesGallery = collectiblesGallery;
    let removedCollectible;
    let updatedCollection = [];

    const contractAddress = collectibleID.split('-')[0];
    const tokenId = collectibleID.split('-')[1];
    const selectedCollectible = !remove
      ? collection.filter(collectible => collectible.asset_contract.address === contractAddress
        && collectible.token_id === tokenId)[0]
      : collectiblesGallery.filter(collectible => collectible.asset_contract.address === contractAddress
        && collectible.token_id === tokenId)[0];

    // update favorites
    if (!remove) {
      if (updatedCollectiblesGallery.length > 2) removedCollectible = updatedCollectiblesGallery.pop();
      // are we popping the right one?
      updatedCollectiblesGallery.push(selectedCollectible);
    } else {
      updatedCollectiblesGallery = updatedCollectiblesGallery.filter((collectible) => {
        if (!_.isEqual(collectible, selectedCollectible)) return collectible;
      });
    }

    // update collection
    if (!remove) {
      updatedCollection = collection.filter((collectible) => {
        return (collectible.asset_contract.address !== contractAddress
          && collectible.token_id !== tokenId);
      });
      if (removedCollectible) updatedCollection.push(removedCollectible);
    } else {
      updatedCollection.push(selectedCollectible);
    }

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
    const { collection, collectiblesGallery } = this.props;

    return (
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
    );
  }
}

Collectibles.propTypes = {
  box: PropTypes.object,
  collection: PropTypes.array,
  collectiblesGallery: PropTypes.array,
};

Collectibles.defaultProps = {
  box: {},
  collection: [],
  collectiblesGallery: [],
};

function mapState(state) {
  return {
    box: state.threeBox.box,
    collection: state.threeBox.collection,
    collectiblesGallery: state.threeBox.collectiblesGallery,
  };
}

export default withRouter(connect(mapState)(Collectibles));
