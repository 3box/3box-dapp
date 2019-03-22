import React from 'react';
import PropTypes from 'prop-types';

import Private from '../../../assets/PrivateActivity.svg';
import Folder from '../../../assets/Folder.svg';
import Loading from '../../../assets/LoadingWhite.svg';
import '../styles/Spaces.css';

const VaultRow = ({ openSpace, spaceName, hasVaultOpened, isLoadingVault, vaultToOpen }) => (
  <div className={`data__items__row ${hasVaultOpened ? 'hideVault' : ''}`} key={`${spaceName}vault`}>
    <span className="data__items__row__entry spaceRow__key">
      <div className="data__text">
        <img src={Folder} alt="" className="data__items__row__vault__icon" />
      </div>
      <p className="data__text">
        {`Private ${spaceName} Data`}
      </p>
    </span>
    <span className="data__items__row__entry spaceRow__content">
      <button
        className="data__items__row__unlockButton"
        type="button"
        onClick={() => openSpace(spaceName)}
      >
        {(isLoadingVault && vaultToOpen === spaceName) ? 'Approve in your wallet' : 'Unlock to open'}
        {(isLoadingVault && vaultToOpen === spaceName) && <img src={Loading} alt="" className="vault__loading" />}
      </button>
    </span>
    <span className="data__items__row__entry spaceRow__space">
      <p className="data__text">
        {spaceName}
      </p>
    </span>
    <span className="data__items__row__entry spaceRow__type">
      <div className="data__text">
        <span className="type__tag row__type__vault">
          Vault
        </span>
      </div>
    </span>
    <span className="data__items__row__entry spaceRow__privacy">
      <div className="data__text">
        <img src={Private} alt="Transaction Icon" className="spaceRow__privacy__icon" />
      </div>
    </span>
    <span className="data__items__row__entry spaceRow__updated">
      <p className="data__text">
        Feb 19, 2019
      </p>
    </span>
  </div>
);

VaultRow.propTypes = {
  openSpace: PropTypes.func.isRequired,
  spaceName: PropTypes.string.isRequired,
  vaultToOpen: PropTypes.string.isRequired,
  hasVaultOpened: PropTypes.bool.isRequired,
  isLoadingVault: PropTypes.bool.isRequired,
};

// VaultRow.defaultProps = {
//   box: {},
// };

export default VaultRow;