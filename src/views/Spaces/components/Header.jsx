import React from 'react';
import PropTypes from 'prop-types';

import Info from '../../../assets/Details.svg';
import Loading from '../../../assets/Loading.svg';
import '../styles/Spaces.css';

const Header = ({ spaceToRender, isSpacesLoading, sortBy, pickSortBy, sortDirection }) => (
  <header className="data__header">
    <section className="data__space">
      <span className="data__space__context">
        <h2>{spaceToRender}</h2>
        {isSpacesLoading && <img className="data__space__loading" src={Loading} alt="info" />}
      </span>
      <img className="data__space__info" src={Info} alt="info" />
    </section>

    <section className="data__categories">
      <span
        className="data__categories__title spaceRow__key"
        onClick={() => pickSortBy('Name')}
        onKeyPress={() => pickSortBy('Name')}
        role="button"
        tabIndex={0}
      >
        Name
        {sortBy === 'Name' && (
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
        onClick={() => pickSortBy('Content')}
        onKeyPress={() => pickSortBy('Content')}
        role="button"
        tabIndex={0}
      >
        Content
        {sortBy === 'Content' && (
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
        onClick={() => pickSortBy('Space')}
        onKeyPress={() => pickSortBy('Space')}
        role="button"
        tabIndex={0}
      >
        Space
        {sortBy === 'Space' && (
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
        onClick={() => pickSortBy('Type')}
        onKeyPress={() => pickSortBy('Type')}
        role="button"
        tabIndex={0}
      >
        Type
        {sortBy === 'Type' && (
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
        onClick={() => pickSortBy('Privacy')}
        onKeyPress={() => pickSortBy('Privacy')}
        role="button"
        tabIndex={0}
      >
        Privacy
        {sortBy === 'Privacy' && (
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
        onClick={() => pickSortBy('Updated')}
        onKeyPress={() => pickSortBy('Updated')}
        role="button"
        tabIndex={0}
      >
        Last Updated
        {sortBy === 'Updated' && (
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
  spaceToRender: PropTypes.string.isRequired,
  sortBy: PropTypes.string.isRequired,
  isSpacesLoading: PropTypes.bool.isRequired,
  sortDirection: PropTypes.bool.isRequired,
  pickSortBy: PropTypes.func.isRequired,
};

export default Header;