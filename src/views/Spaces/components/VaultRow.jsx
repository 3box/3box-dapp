import React from 'react';
import PropTypes from 'prop-types';

import '../styles/Spaces.css';

const VaultRow = ({ openSpace, spaceName }) => (
  <div className="data__items__row" key={`${spaceName}vault`}>
    <span className="data__items__row__entry spaceRow__key">
      Vault
    </span>
    <span className="data__items__row__entry spaceRow__content">
      <button
        className="data__items__row__unlockButton"
        type="button"
        onClick={() => openSpace(spaceName)}
      >
        Unlock to open
      </button>
    </span>
    <span className="data__items__row__entry spaceRow__space">
      {spaceName}
    </span>
    <span className="data__items__row__entry spaceRow__type">
      Vault
    </span>
    <span className="data__items__row__entry spaceRow__privacy">
      Private
    </span>
  </div>
);

VaultRow.propTypes = {
  openSpace: PropTypes.func.isRequired,
  spaceName: PropTypes.string.isRequired,
};

// VaultRow.defaultProps = {
//   box: {},
// };

export default VaultRow;