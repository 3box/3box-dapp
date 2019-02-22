import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { addhttp } from '../../utils/funcs';
import * as routes from '../../utils/routes';
import '../../views/styles/Profile.css';
import '../styles/Collectibles.css';
import '../styles/Feed.css';

const CollectiblesTile = () => (
  <div className="collectibles">
    <div className="collectibles__image">
      <img src="" alt="" />
      <button></button>
    </div>
    <div className="collectibles__info">

    </div>
  </div>
);

CollectiblesTile.propTypes = {
  verifiedGithub: PropTypes.string,
};

CollectiblesTile.defaultProps = {
  verifiedGithub: '',
};

function mapState(state) {
  return {
    verifiedGithub: state.threeBox.verifiedGithub,
  };
}

export default withRouter(connect(mapState)(CollectiblesTile));
