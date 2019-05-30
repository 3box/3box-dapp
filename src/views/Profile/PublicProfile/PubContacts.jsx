import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import actions from '../../../state/actions';
import FollowButton from './FollowButton';
import '../styles/Feed.css';
import '../styles/Profile.css';
import '../../../components/styles/NetworkArray.css';
import '../../../components/styles/Modal.css';

const { handleContactsModal } = actions.modal;

const PubContacts = (
  {
    handleContactsModal,
    otherFollowing,
    isFollowing,
    otherMutualFollowing,
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
            if (user[0].image) {
              return (
                <img
                  src={`https://ipfs.infura.io/ipfs/${user[0].image[0].contentUrl['/']}`}
                  className={`public_contacts_list_profiles_img ${i === 0 ? 'first' : ''}`}
                  alt="profile"
                  key={`${user[0].name}${i}`}
                />
              );
            }

            return <div className="public_contacts_list_profiles_img" key={`${user[0].name}${i}`} />;
          })}
        </div>
      </div>

      {otherMutualFollowing.length > 0 && (
        <div className="public_contacts_mutual">
          <p>
            {`${otherMutualFollowing.length} mutual contacts including 
          ${otherMutualFollowing[0] ? otherMutualFollowing[0][0].name : ''},
          ${otherMutualFollowing[1] ? otherMutualFollowing[1][0].name : ''}, 
          ${otherMutualFollowing[2] ? otherMutualFollowing[2][0].name : ''}, 
          ${otherMutualFollowing[3] ? otherMutualFollowing[3][0].name : ''}...`}
          </p>
        </div>)}

      <div className="public_contacts_add">
        <FollowButton isFollowing={isFollowing} />
      </div>
    </div>
  );

PubContacts.propTypes = {
  handleContactsModal: PropTypes.func.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  otherFollowing: PropTypes.array,
  otherMutualFollowing: PropTypes.array,
};

PubContacts.defaultProps = {
  otherFollowing: [],
  otherMutualFollowing: [],
};

function mapState(state) {
  return {
    otherFollowing: state.otherProfile.otherFollowing,
    otherMutualFollowing: state.otherProfile.otherMutualFollowing,
  };
}

export default connect(mapState,
  {
    handleContactsModal,
  })(PubContacts);
