import React from 'react';
import PropTypes from 'prop-types';

import { timeSince } from '../../../../utils/time';
import { copyThreeId } from '../../../../utils/funcs';

const LinkedAccounts = ({ linkedAddresses, ensNames }) => (
  <div className="settings_mainView">
    <div className="settings_mainView_linkedAddressWrapper">
      {linkedAddresses.map((linked, i) => (
        <>
          <div className="settings_tile_context">
            <p className="settings_mainView_text">
              {`Account ${i + 1}`}
            </p>
            <p className="settings_mainView_text">
              {`Created ${timeSince(linked.timestamp * 1000)}`}
            </p>
          </div>

          <div
            key={linked.address}
            className="settings_tile settings_tile-clickableTile linkedAccountTile"
            onClick={() => copyThreeId(linked.address)}
            onKeyPress={() => copyThreeId(linked.address)}
            tabIndex={0}
            role="button"
          >
            <p>
              {linked.address}
            </p>
            <p className="settings_ensNames">
              oznekenzo.eth
            </p>
            <p className="settings_ensNames">
              pance.eth
            </p>

            {!!ensNames[i] && ensNames[i].map((ens) => (
              <p className="settings_ensNames">
                {ens.name}
              </p>
            ))}
          </div>
        </>
      ))}
    </div>
  </div>
);

LinkedAccounts.propTypes = {
  linkedAddresses: PropTypes.array.isRequired,
  ensNames: PropTypes.array.isRequired,
};

export default LinkedAccounts;