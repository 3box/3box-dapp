import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import VaultRow from './VaultRow';
import PublicRow from './PublicRow';
import '../styles/Spaces.css';

const AllView = ({ openSpace, spacesOpened, sortedSpace, isLoadingVault, vaultToOpen }) => (
  <React.Fragment>
    {sortedSpace.length > 0 && sortedSpace.map(row => (
      row.name === 'private_space_data' ? (
        <VaultRow
          openSpace={openSpace}
          isLoadingVault={isLoadingVault}
          vaultToOpen={vaultToOpen}
          spaceName={row.space}
          hasVaultOpened={spacesOpened[row.space]}
        />
      ) : (<PublicRow
        dataKey={row.name}
        dataValue={row.content}
        spaceName={row.space}
        privacy={row.privacy}
        rowType={row.type}
      />
        )))}
  </React.Fragment>
);

AllView.propTypes = {
  spacesOpened: PropTypes.object.isRequired,
  isLoadingVault: PropTypes.bool.isRequired,
  openSpace: PropTypes.func.isRequired,
  vaultToOpen: PropTypes.string.isRequired,
  sortedSpace: PropTypes.array,
};

AllView.defaultProps = {
  sortedSpace: [],
};

function mapState(state) {
  return {
    sortedSpace: state.spaces.sortedSpace,
  };
}

export default connect(mapState)(AllView);