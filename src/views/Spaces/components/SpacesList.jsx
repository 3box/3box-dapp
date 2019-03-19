import React from 'react';
import PropTypes from 'prop-types';

import '../styles/Spaces.css';

const SpacesList = ({ sortData, list, sortBy }) => (
  <section className="spaces">
    <div
      className="space"
      onClick={() => sortData(sortBy, false, 'All Data', true)}
      role="button"
      onKeyDown={() => sortData(sortBy, false, 'All Data', true)}
      tabIndex={0}
    >
      <p className="space__name">All data</p>
      <span className="space__arrow">&#x3e;</span>
    </div>

    <div
      className="space"
      onClick={() => sortData(sortBy, false, '3Box', true)}
      role="button"
      onKeyDown={() => sortData(sortBy, false, '3Box', true)}
      tabIndex={0}
    >
      <p className="space__name">3Box</p>
      <span className="space__arrow">&#x3e;</span>
    </div>

    {list && list.map(space => space !== '3Box' && (
      <div
        className="space"
        onClick={() => sortData(sortBy, false, space, true)}
        role="button"
        onKeyDown={() => sortData(sortBy, false, space, true)}
        tabIndex={0}
      >
        <p className="space__name">{space}</p>
        <span className="space__arrow">&#x3e;</span>
      </div>
    ))}
  </section>);

SpacesList.propTypes = {
  sortData: PropTypes.func.isRequired,
  list: PropTypes.array.isRequired,
  spaceName: PropTypes.string.isRequired,
  sortBy: PropTypes.string.isRequired,
};

export default SpacesList;