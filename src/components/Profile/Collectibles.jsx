import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import '../../views/styles/Profile.css';
import '../styles/Feed.css';
import {
  CollectiblesTile,
  EmptyGalleryCollectiblesTile,
  EmptyCollectiblesTile,
} from './CollectiblesTile';

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

  favoriteCollectible = () => {
    // get id of collectible
    // add it to new array of favorites
    // send that array to 3box
  }

  render() {
    const { collection, collectionGallery } = this.props;
    console.log(collection);

    return (
      <div id="feed" className="collectibles__wrapper">
        <p className="header" id="feed__header">Gallery</p>
        <div className="collectibles__grid">
          {collectionGallery.length > 0
            ? collectionGallery.map((collectible, i) => (
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
                key={i}
              />
            ))
            : <EmptyGalleryCollectiblesTile />}
        </div>
        <p className="header" id="feed__header">Collectibles</p>
        <div className="collectibles__grid">
          {collection.length > 0
            ? collection.map((collectible, i) => (
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
                key={i}
              />
            ))
            : <EmptyCollectiblesTile />}
        </div>

      </div>
    )
  }
}

Collectibles.propTypes = {
  verifiedGithub: PropTypes.string,
  collection: PropTypes.array,
  collectionGallery: PropTypes.array,
};

Collectibles.defaultProps = {
  verifiedGithub: '',
  collection: [],
  collectionGallery: [],
};

function mapState(state) {
  return {
    verifiedGithub: state.threeBox.verifiedGithub,
    collection: state.threeBox.collection,
    collectionGallery: state.threeBox.collectionGallery,
  };
}

export default withRouter(connect(mapState)(Collectibles));
