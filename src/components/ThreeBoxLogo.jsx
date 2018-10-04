import React from 'react';
import { Link } from 'react-router-dom';
import './styles/ThreeBoxLogo.css';

const ThreeBoxLogo = () => (
  <Link to="/">
    <div id="logo">
      <div id="logo_icon">
        <h2>3</h2>
      </div>
      <h2 id="logo_text"> BOX </h2>
    </div>
  </Link>
);

export default ThreeBoxLogo;
