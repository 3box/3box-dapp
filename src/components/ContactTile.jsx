import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ProfileHover from 'profile-hover';

import actions from '../state/actions';
import '../views/Profile/styles/Profile.css';
import FollowButton from '../views/Profile/PublicProfile/FollowButton';

const {
  saveFollowing,
  initializeSaveFollowing,
} = actions.profile;

class ContactTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  isLoading = () => {
    this.setState({ isLoading: true });
  }

  render() {
    const {
      user,
      address,
      isFollowing,
      fromModal,
      handleContactsModal,
    } = this.props;

    const { isLoading } = this.state;
    console.log('isLoading', isLoading);
    return (
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

        <div
          onClick={this.isLoading}
          onKeyPress={this.isLoading}
          role="button"
          tabIndex={0}
        >
          <FollowButton
            isFollowing={isFollowing}
            contactTileAddress={address}
            isLoading={isLoading}
            fromContactTile
          />
        </div>
      </div>
    );
  }
}

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