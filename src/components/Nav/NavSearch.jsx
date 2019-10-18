import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import * as routes from '../../utils/routes';

const NavSearch = (props) => (
  <input
    type="text"
    className="nav_input"
    placeholder="Search user by Ethereum address..."
  />
);

export default NavSearch;