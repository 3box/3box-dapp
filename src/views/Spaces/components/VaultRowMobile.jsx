import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Private from '../../../assets/PrivateActivity.svg';
import Folder from '../../../assets/Folder.svg';
import Loading from '../../../assets/LoadingWhite.svg';
import '../styles/Spaces.css';

import actions from '../../../state/actions';

const { viewSpaceItem } = actions.spaces;

const VaultRowMobile = ({
  openSpace,
  spaceName,
  hasVaultOpened,
  isLoadingVault,
  vaultToOpen,
  fadeOut,
}) => (
    <div
      className={`data__items__row 
      ${(fadeOut && spaceName === vaultToOpen) ? 'fadeOutRow' : ''}
      `}
      key={spaceName}
    >
      <div className="data__items--namewrapper">
        <div className="data__name">
          <img src={Folder} alt="" className="data__items__row__vault__icon" />
          <p>
            {`Private ${spaceName} Data`}
          </p>
        </div>
        <div className="data__items__context">
          <span className="type__tag row__type__vault">
            <p className="spaceRow__tag__text">
              Vault
            </p>
          </span>
          <img src={Private} alt="Transaction Icon" className="data__items__privacyicon" />
        </div>
      </div>
      <div className="data__items--detailswrapper">
        <div className="data__content">
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
        </div>
      </div>
    </div>
  );

VaultRowMobile.propTypes = {
  openSpace: PropTypes.func.isRequired,
  spaceName: PropTypes.string.isRequired,
  vaultToOpen: PropTypes.string.isRequired,
  hasVaultOpened: PropTypes.bool.isRequired,
  isLoadingVault: PropTypes.bool.isRequired,
  fadeOut: PropTypes.bool.isRequired,
};

export default connect('', { viewSpaceItem })(VaultRowMobile);