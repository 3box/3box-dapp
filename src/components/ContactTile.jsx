import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import actions from '../state/actions';
import '../views/Profile/styles/Profile.css';

const {
  saveFollowing,
  initializeSaveFollowing,
} = actions.profile;

const ContactTile = ({ user, address, isFollowing, fromModal, handleContactsModal }) => (
  <Link
    className="contact_tile"
    to={`/${address}`}
    onClick={() => { if (fromModal) handleContactsModal(); }}
  >
    <div className="contact_tile_info">
      {user.image && user.image[0].contentUrl
        ? (
          <img
            src={`https://ipfs.infura.io/ipfs/${user.image[0].contentUrl['/']}`}
            className="contact_tile_info_image"
            alt="profile"
          />
        ) : <div className="contact_tile_info_image" />}

      <h3>{user.name ? user.name : ''}</h3>
    </div>

    {isFollowing ? (
      <div className="contact_tile_add">
        <button
          type="button"
          onClick={async () => {
            const shouldSave = await initializeSaveFollowing();
            if (shouldSave) saveFollowing(address, true);
          }}
          className="outlineButton"
        >
          Unfollow
        </button>
      </div>
    ) : (
        <div className="contact_tile_add">
          <button
            type="button"
            onClick={async () => {
              const shouldSave = await initializeSaveFollowing();
              if (shouldSave) saveFollowing(address);
            }}
            className="outlineButton"
          >
            Follow
          </button>
        </div>
      )}
  </Link>
);

ContactTile.propTypes = {
  user: PropTypes.object,
  isFollowing: PropTypes.bool,
  fromModal: PropTypes.bool,
  handleContactsModal: PropTypes.func.isRequired,
  address: PropTypes.string,
};

ContactTile.defaultProps = {
  user: {},
  isFollowing: false,
  fromModal: false,
  address: '',
};

export default ContactTile;