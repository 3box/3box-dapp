import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import actions from '../../../state/actions';
import '../styles/Feed.css';
import '../styles/Profile.css';
import '../../../components/styles/NetworkArray.css';
import '../../../components/styles/Modal.css';

const { handleContactsModal } = actions.modal;

const PubContacts = ({ handleContactsModal }) => (
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
        <p>Contacts</p>
      </div>
      <div className="public_contacts_list_profiles">

      </div>
    </div>
    <div className="public_contacts_mutual">
      <p>37 mutual contacts including Oed, Jake Brukhman, Michael Sena, Jorge...</p>
    </div>
    <div className="public_contacts_add">
      <button type="button">
        Add to Contacts
      </button>
    </div>
  </div>
);

PubContacts.propTypes = {
  handleContactsModal: PropTypes.func.isRequired,
  selectedCollectible: PropTypes.object,
};

PubContacts.defaultProps = {
  selectedCollectible: {},
};

const mapState = state => ({
  selectedCollectible: state.uiState.selectedCollectible,
});

export default connect(mapState, { handleContactsModal })(PubContacts);
