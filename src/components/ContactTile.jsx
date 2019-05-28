import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import '../views/Profile/styles/Profile.css';

const ContactTile = ({ user, onMyProfile, address }) => (
  <Link className="contact_tile" to={`/${address}`}>
    <div className="contact_tile_info">
      {user.image && user.image[0].contentUrl
        ? (
          <img
            src={`https://ipfs.infura.io/ipfs/${user.image[0].contentUrl['/']}`}
            className="contact_tile_info_image"
            alt="profile"
          />
        ) : <div className="contact_tile_info_image" />}

      <h3>{user.name}</h3>
    </div>

    {!onMyProfile && (
      <div className="contact_tile_add">
        <button
          type="button"
          onClick={() => console.log('hit')}
          className="outlineButton"
        >
          Add
        </button>
      </div>)}
  </Link>
);

ContactTile.propTypes = {
  user: PropTypes.object,
  onMyProfile: PropTypes.bool,
  address: PropTypes.string,
};

ContactTile.defaultProps = {
  user: {},
  onMyProfile: false,
  address: '',
};

export default ContactTile;