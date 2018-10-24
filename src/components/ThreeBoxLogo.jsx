import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as routes from '../utils/routes';
import './styles/ThreeBoxLogo.css';

const ThreeBoxLogo = () => (
  <Link to={routes.LANDING}>
    <div id="logo">
      <div id="logo__icon">
        <h2>3</h2>
      </div>
      <h2 id="logo__text"> BOX </h2>
    </div>
  </Link>
);

export default withRouter(ThreeBoxLogo);
