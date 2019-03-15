import React from 'react';
import PropTypes from 'prop-types';

import Info from '../../../assets/Details.svg';
import Loading from '../../../assets/Loading.svg';
import '../styles/Spaces.css';

const Header = ({ spaceToRender, isSpacesLoading }) => (
  <header className="data__header">
    <section className="data__space">
      <span className="data__space__context">
        <h2>{spaceToRender}</h2>
        {isSpacesLoading && <img className="data__space__loading" src={Loading} alt="info" />}
      </span>
      <img className="data__space__info" src={Info} alt="info" />
    </section>

    <section className="data__categories">
      <span className="data__categories__title spaceRow__key">Name</span>
      <span className="data__categories__title spaceRow__content">Content</span>
      <span className="data__categories__title spaceRow__space">Space</span>
      <span className="data__categories__title spaceRow__type">Type</span>
      <span className="data__categories__title spaceRow__privacy">Privacy</span>
      <span className="data__categories__title spaceRow__updated">Last Updated</span>
    </section>
  </header>
);

Header.propTypes = {
  spaceToRender: PropTypes.string.isRequired,
  isSpacesLoading: PropTypes.bool.isRequired,
};

export default Header;