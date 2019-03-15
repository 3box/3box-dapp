import React from 'react';
import PropTypes from 'prop-types';

import VaultRow from './VaultRow';
import PublicRow from './PublicRow';
import '../styles/Spaces.css';

const SpaceView = ({ openSpace, spaceData, spaceName }) => (
  <React.Fragment>
    {spaceName !== '3Box' && (
      <VaultRow
        openSpace={openSpace}
        spaceName={spaceName}
      />)
    }
    {spaceData && Object.entries(spaceData).map(row => (
      <PublicRow
        dataKey={row[0]}
        dataValue={row[1]}
        spaceName={spaceName}
      />
    ))}
  </React.Fragment>
);

SpaceView.propTypes = {
  allData: PropTypes.object.isRequired,
  openSpace: PropTypes.func.isRequired,
  spaceData: PropTypes.object.isRequired,
  spaceName: PropTypes.string.isRequired,
};

// VaultRow.defaultProps = {
//   box: {},
// };

export default SpaceView;