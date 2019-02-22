import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import * as routes from '../../utils/routes';
import '../../views/styles/Profile.css';
import '../styles/Collectibles.css';

const CollectiblesTile = ({ collectible, image, description, name }) => (
  <div className="collectiblesTile">
    <div className="collectibles__image">
      <img src={image} alt="" />
      <button>
        <img src="" alt="" />
      </button>
    </div>

    <div className="collectibles__info">
      <h3>{name}</h3>
      <p>{description}</p>
    </div>
  </div>
);

CollectiblesTile.propTypes = {
  verifiedGithub: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
};

CollectiblesTile.defaultProps = {
  verifiedGithub: '',
  image: '',
  name: '',
  description: '',
};

function mapState(state) {
  return {
    verifiedGithub: state.threeBox.verifiedGithub,
  };
}

export default withRouter(connect(mapState)(CollectiblesTile));
