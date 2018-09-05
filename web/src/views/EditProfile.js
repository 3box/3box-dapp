import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Michael from '../assets/me.jpg';
import './styles/EditProfile.css';

export function EditProfile() {
  return (
    <div id="edit">
      <p className="header">Edit Profile</p>

      <div id="edit_user_picture_edit">
        <img src={Michael} id="edit_user_picture" alt="profile" />
        <p>Edit</p>
      </div>

      <div id="edit_field">
      
        <p className="subheader">PUBLIC</p>
        <p className="subtext">This information will be public for all to see.</p>
        
        <div className="edit_form">
          <h3>Ethereum Address</h3>
          <p>0x123897912837912749817</p>
          <div className="edit_form_spacing" />
          <h3>Name</h3>
          <input />
          <div className="edit_form_spacing" />
          <h3>Github</h3>
          <input />
        </div>

        <p className="subheader">PRIVATE</p>
        <p className="subtext">This information will be public for all to see.</p>

        <div className="edit_form">
          <h3>Email Address</h3>
          <input />
        </div>

      </div>

      <Link to="/Profile">
        <button id="profile_edit_button" type="button">
          Save
          </button>
      </Link>
      <Link to="/Profile" className="subtext" id="edit_cancel">
        Cancel
      </Link>
    </div>
  );
}

EditProfile.propTypes = {
  web3: PropTypes.object,
};

EditProfile.defaultProps = {
  web3: null,
};

export default EditProfile;
