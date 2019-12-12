import React from 'react';
import PropTypes from 'prop-types';

import Private from '../../../assets/PrivateActivity.svg';
import Folder from '../../../assets/Folder.svg';
import Loading from '../../../assets/LoadingWhite.svg';
import '../styles/Spaces.scss';

const VaultRow = ({
  openSpace,
  spaceName,
  isLoadingVault,
  vaultToOpen,
  fadeOut,
}) => (
    <div
      className={`data__items__row ${(fadeOut && spaceName === vaultToOpen) ? 'fadeOutRow' : ''}`}
      key={`${spaceName}vault`}
    >
      <span className="data__items__row__entry spaceRow__key" title={`Private ${spaceName} Data`}>
        <div className="data__text row__vault">
          <img src={Folder} alt="" className="data__items__row__vault__icon" />
        </div>
        <p className="data__text row__name row__vault__name">
          {`Private ${spaceName} Data`}
        </p>
      </span>
      <span className="data__items__row__entry spaceRow__content">
        <button
          className={`
        data__items__row__unlockButton 
        ${(isLoadingVault && vaultToOpen === spaceName)
              ? 'data__items__row__unlockButton--loading'
              : ''
            }`}
          type="button"
          onClick={() => openSpace(spaceName)}
        >
          {(isLoadingVault && vaultToOpen === spaceName) ? 'Approve request' : 'Unlock to open'}
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
      <span className="data__items__row__entry spaceRow__updated" />
    </div>
  );

VaultRow.propTypes = {
  openSpace: PropTypes.func.isRequired,
  spaceName: PropTypes.string.isRequired,
  vaultToOpen: PropTypes.string.isRequired,
  isLoadingVault: PropTypes.bool.isRequired,
  fadeOut: PropTypes.bool.isRequired,
};

export default VaultRow;