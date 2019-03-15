import React from 'react';
import PropTypes from 'prop-types';

import Private from '../../../assets/PrivateActivity.svg';
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
      <span className="type__tag row__type__vault">
        <p>
          Vault
        </p>
      </span>
    </span>
    <span className="data__items__row__entry spaceRow__privacy">
      <img src={Private} alt="Transaction Icon" className="spaceRow__privacy__icon" />
      {/* {item.dataType === 'Private'
        ? <img src={PrivateActivity} alt="Transaction Icon" className="feed__activity__address__dataType" />
        : <img src={Globe} alt="Transaction Icon" className="feed__activity__address__dataType" />
      } */}
    </span>
    <span className="data__items__row__entry spaceRow__updated">
      Feb 19, 2019
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