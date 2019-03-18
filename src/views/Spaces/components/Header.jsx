import React from 'react';
import PropTypes from 'prop-types';

import Info from '../../../assets/Details.svg';
import Loading from '../../../assets/Loading.svg';
import '../styles/Spaces.css';

const Header = ({ spaceToDisplay, isSpacesLoading, sortBy, sortAllData, sortDirection }) => (
  <header className="data__header">
    <section className="data__space">
      <span className="data__space__context">
        <h2>{spaceToDisplay}</h2>
        {isSpacesLoading && <img className="data__space__loading" src={Loading} alt="info" />}
      </span>
      <img className="data__space__info" src={Info} alt="info" />
    </section>

    <section className="data__categories">
      <span
        className="data__categories__title spaceRow__key"
        onClick={() => sortAllData('name', false, spaceToDisplay, false)}
        onKeyPress={() => sortAllData('name', false, spaceToDisplay, false)}
        role="button"
        tabIndex={0}
      >
        Name
        {sortBy === 'name' && (
          sortDirection ? (
            <p className="data__categories__title__arrow">
              &#9660;
            </p>
          ) : (
              <p className="data__categories__title__arrow">
                &#9650;
              </p>
            )
        )}
      </span>
      <span
        className="data__categories__title spaceRow__content"
        onClick={() => sortAllData('content', false, spaceToDisplay, false)}
        onKeyPress={() => sortAllData('content', false, spaceToDisplay, false)}
        role="button"
        tabIndex={0}
      >
        Content
        {sortBy === 'content' && (
          sortDirection ? (
            <p className="data__categories__title__arrow">
              &#9660;
            </p>
          ) : (
              <p className="data__categories__title__arrow">
                &#9650;
              </p>
            )
        )}
      </span>
      <span
        className="data__categories__title spaceRow__space"
        onClick={() => sortAllData('space', false, spaceToDisplay, false)}
        onKeyPress={() => sortAllData('space', false, spaceToDisplay, false)}
        role="button"
        tabIndex={0}
      >
        Space
        {sortBy === 'space' && (
          sortDirection ? (
            <p className="data__categories__title__arrow">
              &#9660;
            </p>
          ) : (
              <p className="data__categories__title__arrow">
                &#9650;
              </p>
            ))}
      </span>
      <span
        className="data__categories__title spaceRow__type"
        onClick={() => sortAllData('type', false, spaceToDisplay, false)}
        onKeyPress={() => sortAllData('type', false, spaceToDisplay, false)}
        role="button"
        tabIndex={0}
      >
        Type
        {sortBy === 'type' && (
          sortDirection ? (
            <p className="data__categories__title__arrow">
              &#9660;
            </p>
          ) : (
              <p className="data__categories__title__arrow">
                &#9650;
              </p>
            ))}
      </span>
      <span
        className="data__categories__title spaceRow__privacy"
        onClick={() => sortAllData('privacy', false, spaceToDisplay, false)}
        onKeyPress={() => sortAllData('privacy', false, spaceToDisplay, false)}
        role="button"
        tabIndex={0}
      >
        Privacy
        {sortBy === 'privacy' && (
          sortDirection ? (
            <p className="data__categories__title__arrow">
              &#9660;
            </p>
          ) : (
              <p className="data__categories__title__arrow">
                &#9650;
              </p>
            ))}
      </span>
      <span
        className="data__categories__title spaceRow__updated"
        onClick={() => sortAllData('lastUpdated', false, spaceToDisplay, false)}
        onKeyPress={() => sortAllData('lastUpdated', false, spaceToDisplay, false)}
        role="button"
        tabIndex={0}
      >
        Last Updated
        {sortBy === 'lastUpdated' && (
          sortDirection ? (
            <p className="data__categories__title__arrow">
              &#9660;
            </p>
          ) : (
              <p className="data__categories__title__arrow">
                &#9650;
              </p>
            ))}
      </span>
    </section>
  </header >
);

Header.propTypes = {
  spaceToDisplay: PropTypes.string.isRequired,
  sortBy: PropTypes.string.isRequired,
  isSpacesLoading: PropTypes.bool.isRequired,
  sortDirection: PropTypes.bool.isRequired,
  sortAllData: PropTypes.func.isRequired,
};

export default Header;