import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import '../views/Profile/styles/Profile.css';

const ContactTile = ({ user, address, isFollowing }) => (
  <Link className="contact_tile" to={`/${address}`}>
    <div className="contact_tile_info">
      {console.log('isFollowing', isFollowing)}
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

    {isFollowing ? (
      <div className="contact_tile_add">
        <button
          type="button"
          onClick={() => console.log('hit')}
          className="outlineButton"
        >
          Unfollow
        </button>
      </div>
    ) : (
        <div className="contact_tile_add">
          <button
            type="button"
            onClick={() => console.log('hit')}
            className="outlineButton"
          >
            Follow
          </button>
        </div>)}
  </Link>
);

ContactTile.propTypes = {
  user: PropTypes.object,
  isFollowing: PropTypes.bool,
  address: PropTypes.string,
};

ContactTile.defaultProps = {
  user: {},
  isFollowing: false,
  address: '',
};

export default ContactTile;