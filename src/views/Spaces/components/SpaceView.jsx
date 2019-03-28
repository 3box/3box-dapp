import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import VaultRow from './VaultRow';
import PublicRow from './PublicRow';
import FavoriteCollectiblesRow from './FavoriteCollectiblesRow';
import '../styles/Spaces.css';

const SpaceView = ({ openSpace, spaceDataToRender, spacesOpened, vaultToOpen, isLoadingVault }) => (
  <React.Fragment>
    {console.log(spaceDataToRender)}
    {spaceDataToRender.length > 0 && spaceDataToRender.map((row) => {
      if (row.name !== 'collectiblesFavoritesToRender'
        && row.name !== 'private_space_data') {
        return (
          <PublicRow
            dataKey={row.name}
            dataValue={row.content}
            spaceName={row.space}
            privacy={row.privacy}
            rowType={row.type}
          />);
      }

      if (row.name === 'private_space_data') {
        return (
          <VaultRow
            openSpace={openSpace}
            spaceName={row.space}
            isLoadingVault={isLoadingVault}
            vaultToOpen={vaultToOpen}
            hasVaultOpened={spacesOpened[row.space]}
          />);
      }

      if (row.name === 'collectiblesFavoritesToRender') {
        return (
          <FavoriteCollectiblesRow
            dataKey={row.name}
            dataValue={row.content}
            spaceName={row.space}
            privacy={row.privacy}
            rowType={row.type}
          />);
      }
    })}
  </React.Fragment>
);

SpaceView.propTypes = {
  spaceDataToRender: PropTypes.array.isRequired,
  openSpace: PropTypes.func.isRequired,
  spacesOpened: PropTypes.bool.isRequired,
  isLoadingVault: PropTypes.bool.isRequired,
  vaultToOpen: PropTypes.string.isRequired,
};

SpaceView.defaultProps = {
  spaceDataToRender: [],
};

function mapState(state) {
  return {
    spaceDataToRender: state.spaces.spaceDataToRender,
  };
}

export default connect(mapState)(SpaceView);
