import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ProfileHover from 'profile-hover';

import { isValidImage } from '../utils/funcs';

import '../views/Profile/styles/Profile.scss';
import FollowButton from '../views/Profile/PublicProfile/FollowButton';
import DefaultProfile from '../assets/DefaultProfile.svg';

class FollowingTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  handleTileLoading = (isLoading) => {
    this.setState({ isLoading });
  }

  render() {
    const {
      user,
      address,
      isFollowing,
      fromModal,
      handleContactsModal,
      currentAddress,
    } = this.props;

    const { isLoading } = this.state;
    const myAddress = currentAddress || window.localStorage.getItem('userEthAddress');

    return (
      <div className="contact_tile">
        {fromModal ? (
          <Link
            to={`/${address}`}
            onClick={() => { if (fromModal) handleContactsModal(); }}
          >
            <div className="contact_tile_info">
              <img
                src={user && isValidImage(user.image) ? `https://ipfs.infura.io/ipfs/${user.image[0].contentUrl['/']}` : DefaultProfile}
                className="contact_tile_info_image"
                alt="profile"
              />

              <h3>{user.name ? user.name : address}</h3>
            </div>
          </Link>
        ) : (
            <ProfileHover
              address={address}
              noTheme
              orientation="top"
            >
              <Link
                to={`/${address}`}
                onClick={() => { if (fromModal) handleContactsModal(); }}
              >
                <div className="contact_tile_info">
                  <img
                    src={user && isValidImage(user.image) ? `https://ipfs.infura.io/ipfs/${user.image[0].contentUrl['/']}` : DefaultProfile}
                    className="contact_tile_info_image"
                    alt="profile"
                  />

                  <h3>{user.name ? user.name : address}</h3>
                </div>
              </Link>
            </ProfileHover>
          )}

        <div
          onClick={() => this.handleTileLoading(true)}
          onKeyPress={() => this.handleTileLoading(true)}
          role="button"
          tabIndex={0}
        >
          {(address && address.toLowerCase() !== myAddress) && (
            <FollowButton
              isFollowing={isFollowing}
              contactTileAddress={address}
              isLoading={isLoading}
              handleTileLoading={this.handleTileLoading}
              fromContactTile
            />
          )}
        </div>
      </div>
    );
  }
}

FollowingTile.propTypes = {
  user: PropTypes.object,
  isFollowing: PropTypes.bool,
  fromModal: PropTypes.bool,
  handleContactsModal: PropTypes.func.isRequired,
  address: PropTypes.string,
  currentAddress: PropTypes.string,
};

FollowingTile.defaultProps = {
  user: {},
  isFollowing: false,
  fromModal: false,
  address: '',
  currentAddress: '',
};

function mapState(state) {
  return {
    currentAddress: state.userState.currentAddress,
  };
}

export default connect(mapState)(FollowingTile);