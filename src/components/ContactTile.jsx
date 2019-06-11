import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ProfileHover from 'profile-hover';

import actions from '../state/actions';
import '../views/Profile/styles/Profile.css';

const {
  saveFollowing,
  initializeSaveFollowing,
} = actions.profile;

const ContactTile = ({
  user,
  address,
  isFollowing,
  fromModal,
  handleContactsModal,
  initializeSaveFollowing,
  saveFollowing,
}) => (
    <div className="contact_tile">
      <ProfileHover
        address={address}
        noTheme
        orientation="right"
      >
        <Link
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

            <h3>{user.name ? user.name : address}</h3>
          </div>
        </Link>
      </ProfileHover>

      {isFollowing ? (
        <div className="contact_tile_add">
          <button
            type="button"
            onClick={async () => {
              await initializeSaveFollowing(address);
              saveFollowing(address, true);
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
                const shouldSave = await initializeSaveFollowing(address);
                if (shouldSave) saveFollowing(address);
              }}
              className="outlineButton"
            >
              Follow
            </button>
          </div>
        )}
    </div>
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

function mapState() {
  return {};
}

export default connect(mapState, {
  initializeSaveFollowing,
  saveFollowing,
})(ContactTile);