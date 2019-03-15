import React from 'react';
import PropTypes from 'prop-types';

import VaultRow from './VaultRow';
import PublicRow from './PublicRow';
import '../styles/Spaces.css';

const SpaceView = ({ openSpace, spaceData, spaceName, spacesOpened }) => (
  <React.Fragment>
    {spaceName !== '3Box' && (
      <VaultRow
        openSpace={openSpace}
        spaceName={spaceName}
        hasVaultOpened={spacesOpened[spaceName]}
      />)
    }
    {spaceData && Object.entries(spaceData).map(privacyLevel => (
      Object.entries(privacyLevel[1]).map(row => (
        <PublicRow
          dataKey={row[0]}
          dataValue={row[1]}
          spaceName={spaceName}
          key={row[0]}
          privacy={privacyLevel[0]}
        />
      ))
    ))}
  </React.Fragment>
);

SpaceView.propTypes = {
  spaceData: PropTypes.object.isRequired,
  openSpace: PropTypes.func.isRequired,
  spaceName: PropTypes.string.isRequired,
  spacesOpened: PropTypes.bool.isRequired,
};


export default SpaceView;
