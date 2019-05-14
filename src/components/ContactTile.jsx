import React from 'react';
import { Link } from 'react-router-dom';

import Discord from '../assets/discordWhite.svg';
import * as routes from '../utils/routes';
import '../views/Profile/styles/Profile.css';

const ContactTile = ({ handleSignInUp, isLoggedIn }) => (
  <Link className="contact_tile" to="/username">
    <div className="contact_tile_info">
      <div src="" className="contact_tile_info_image" />
      {/* <img src="" alt="User" className="contact_tile_image" /> */}
      <h3>Username</h3>
    </div>
    <div className="contact_tile_add">
      <button
        type="button"
        onClick={() => console.log('hit')}
        className="outlineButton"
      >
        Add
      </button>
    </div>
  </Link>
);

export default ContactTile;