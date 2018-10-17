import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../utils/routes';
import './styles/ThreeBoxLogo.css';

const ThreeBoxLogoWhite = () => (
  <Link to={routes.LANDING}>
    <div id="logo">
      <div id="logo__icon__white">
        <h2>3</h2>
      </div>
      <h2 id="logo__text__white"> BOX </h2>
    </div>
  </Link>
);

export default ThreeBoxLogoWhite;
