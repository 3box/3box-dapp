import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import '../../views/styles/Profile.css';
import '../styles/Feed.css';
import CollectiblesTile from './CollectiblesTile';

class Collectibles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collection: [],
    };
  }

  async componentDidMount() {
    const { location: { pathname } } = this.props;
    const profileAddress = pathname.split('/')[1];

    fetch(`https://api.opensea.io/api/v1/assets?owner=${profileAddress}&order_by=current_price&order_direction=asc`)
      .then(response => response.json())
      .then((collection) => {
        this.setState({ collection: collection.assets });
      });
  }

  render() {
    const { collection } = this.state;
    console.log(collection);
    return (
      <div id="feed" className="collectibles__wrapper">
        <p className="header" id="feed__header">My Collectibles</p>
        <div className="collectibles__grid">
          {collection.map((collectible, i) => (
            <CollectiblesTile
              collectible={collectible}
              image={collectible.image_preview_url}
              description={collectible.description}
              name={collectible.name}
              key={i}
            />
          ))}
        </div>

      </div>
    )
  }
}

Collectibles.propTypes = {
  verifiedGithub: PropTypes.string,
};

Collectibles.defaultProps = {
  verifiedGithub: '',
};

function mapState(state) {
  return {
    verifiedGithub: state.threeBox.verifiedGithub,
  };
}

export default withRouter(connect(mapState)(Collectibles));
