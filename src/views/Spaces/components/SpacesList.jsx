import React from 'react';
import PropTypes from 'prop-types';

import '../styles/Spaces.css';

const SpacesList = ({ pickSpace, list }) => (
  <section className="spaces">
    <div
      className="space"
      onClick={() => pickSpace('All Data')}
      role="button"
      onKeyDown={() => pickSpace('All Data')}
      tabIndex={0}
    >
      <p className="space__name">All data</p>
      <span className="space__arrow">&#x3e;</span>
    </div>

    <div
      className="space"
      onClick={() => pickSpace('3Box')}
      role="button"
      onKeyDown={() => pickSpace('3Box')}
      tabIndex={0}
    >
      <p className="space__name">3Box</p>
      <span className="space__arrow">&#x3e;</span>
    </div>

    {list && list.map(space => (
      <div
        className="space"
        onClick={() => pickSpace(space)}
        role="button"
        onKeyDown={() => pickSpace(space)}
        tabIndex={0}
      >
        <p className="space__name">{space}</p>
        <span className="space__arrow">&#x3e;</span>
      </div>
    ))}
  </section>);

SpacesList.propTypes = {
  pickSpace: PropTypes.func.isRequired,
  list: PropTypes.array.isRequired,
  spaceName: PropTypes.string.isRequired,
};

// VaultRow.defaultProps = {
//   box: {},
// };

export default SpacesList;