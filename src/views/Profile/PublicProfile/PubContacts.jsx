import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import actions from '../../../state/actions';
import Check from '../../../assets/Check.svg';
import '../styles/Feed.css';
import '../styles/Profile.css';
import '../../../components/styles/NetworkArray.css';
import '../../../components/styles/Modal.css';

const { handleContactsModal } = actions.modal;
const { saveFollowing } = actions.profile;
const { openBox } = actions.signin;

const PubContacts = ({ handleContactsModal, saveFollowing, otherProfileAddress, openBox }) => (
  <div className="public_contacts">
    <div
      className="public_contacts_list"
      onClick={handleContactsModal}
      onKeyPress={handleContactsModal}
      tabIndex={0}
      role="button"
    >
      <div className="public_contacts_list_count">
        <h3>212</h3>
        <p>Followers</p>
      </div>
      <div className="public_contacts_list_profiles">
        <div className="public_contacts_list_profiles_img first" />
        <div className="public_contacts_list_profiles_img" />
        <div className="public_contacts_list_profiles_img" />
      </div>
    </div>
    <div className="public_contacts_mutual">
      <p>37 mutual contacts including Oed, Jake Brukhman, Michael Sena, Jorge...</p>
    </div>
    <div className="public_contacts_add">
      <button
        type="button"
        onClick={async () => {
          await openBox();
          saveFollowing(otherProfileAddress);
        }}
      >
        Add to Followers
      </button>
      <button type="button" className="outlineButton">
        <img src={Check} alt="Check" />
        Added
      </button>
    </div>
  </div>
);

PubContacts.propTypes = {
  handleContactsModal: PropTypes.func.isRequired,
  selectedCollectible: PropTypes.object,
  saveFollowing: PropTypes.func.isRequired,
  otherProfileAddress: PropTypes.string,
  otherName: PropTypes.string,
};

PubContacts.defaultProps = {
  selectedCollectible: {},
  otherProfileAddress: '',
  otherName: '',
};

function mapState(state) {
  return {
    otherProfileAddress: state.otherProfile.otherProfileAddress,
  };
}

export default connect(mapState,
  {
    handleContactsModal,
    saveFollowing,
    openBox,
  })(PubContacts);
