import React from 'react';
import { Link } from 'react-router-dom';

import Discord from '../assets/discordWhite.svg';
import * as routes from '../utils/routes';
import '../views/Profile/styles/Profile.css';

const ContactTile = ({ handleSignInUp, isLoggedIn }) => (
  <div className="contact_tile">
    <div className="contact_tile_info">
      <div src="" className="contact_tile_info_image" />
      {/* <img src="" alt="User" className="contact_tile_image" /> */}
      <h3>Username</h3>
    </div>
    <div className="contact_tile_add">
      <button>
        Add
      </button>
    </div>
  </div>
);

export default ContactTile;