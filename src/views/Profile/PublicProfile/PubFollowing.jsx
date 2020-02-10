import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { shortenEthAddr } from '../../../utils/funcs';

import actions from '../../../state/actions';
import FollowButton from './FollowButton';
import DefaultProfile from '../../../assets/DefaultProfile.svg';
import '../styles/Feed.scss';
import '../styles/Profile.scss';
import '../../../components/styles/NetworkArray.scss';
import '../../../components/styles/Modal.scss';

const { handleContactsModal } = actions.modal;

const PubFollowing = (
  {
    handleContactsModal,
    otherFollowing,
    isFollowing,
    isMe,
    otherMutualFollowing,
    showSignInBanner,
  }) => (
    <div className="public_contacts">
      <div
        className="public_contacts_list"
        onClick={handleContactsModal}
        onKeyPress={handleContactsModal}
        tabIndex={0}
        role="button"
      >
        <div className="public_contacts_list_count">
          <h3>{otherFollowing.length}</h3>
          <p>Following</p>
        </div>

        <div className="public_contacts_list_profiles">
          {otherFollowing.slice().splice(0, 5).map((user, i) => {
            return (
              <img
                src={user[0].image && user[0].image ? `https://ipfs.infura.io/ipfs/${user[0].image[0].contentUrl['/']}` : DefaultProfile}
                className={`public_contacts_list_profiles_img ${i === 0 ? 'first' : ''}`}
                alt="profile"
                key={`${user[0].name}${i}`}
              />
            );
          })}
        </div>
      </div>

      {(otherMutualFollowing.length > 0 && !showSignInBanner && !isMe) && (
        <div className="public_contacts_mutual">
          <p>
            {`
              ${otherMutualFollowing.length} mutual including 
              ${otherMutualFollowing[0] ? `${otherMutualFollowing[0][0].name || shortenEthAddr(otherMutualFollowing[0][1])}` : ''}
              ${otherMutualFollowing[1] ? `, ${otherMutualFollowing[1][0].name || shortenEthAddr(otherMutualFollowing[0][1])}` : ''} 
              ${otherMutualFollowing[2] ? `, ${otherMutualFollowing[2][0].name || shortenEthAddr(otherMutualFollowing[0][1])}` : ''} 
              ${otherMutualFollowing[3] ? `, ${otherMutualFollowing[3][0].name || shortenEthAddr(otherMutualFollowing[0][1])}` : ''}
              ${otherMutualFollowing.length > 3 ? '...' : ''}
            `}
          </p>
        </div>
      )}

      {(!showSignInBanner && !isMe) && (
        <div className="public_contacts_add">
          <FollowButton isFollowing={isFollowing} />
        </div>
      )}
    </div>
  );

PubFollowing.propTypes = {
  handleContactsModal: PropTypes.func.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  showSignInBanner: PropTypes.bool,
  otherFollowing: PropTypes.array,
  otherMutualFollowing: PropTypes.array,
};

PubFollowing.defaultProps = {
  otherFollowing: [],
  otherMutualFollowing: [],
  showSignInBanner: false,
};

function mapState(state) {
  return {
    otherFollowing: state.otherProfile.otherFollowing,
    otherMutualFollowing: state.otherProfile.otherMutualFollowing,
    showSignInBanner: state.uiState.showSignInBanner,
  };
}

export default connect(mapState,
  {
    handleContactsModal,
  })(PubFollowing);
