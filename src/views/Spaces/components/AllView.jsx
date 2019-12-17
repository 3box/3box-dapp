import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import VaultRow from './VaultRow';
import VaultRowMobile from './VaultRowMobile';
import PublicRow from './PublicRow';
import PublicRowMobile from './PublicRowMobile';
import FavoriteCollectiblesRow from './FavoriteCollectiblesRow';
import FavoriteCollectiblesRowMobile from './FavoriteCollectiblesRowMobile';
import Mollie from '../../../assets/Mollie.png';
import { timeSince } from '../../../utils/time';
import '../styles/Spaces.scss';

const AllView = ({
  openSpace,
  sortedSpace,
  isLoadingVault,
  vaultToOpen,
  width,
  fadeIn,
  fadeOut,
  did,
  spaceNameOpened,
  itemToDelete,
  spaceNameToDelete,
}) => (
    <>
      {sortedSpace.length > 0 && sortedSpace.map((row) => {
        const date = timeSince(row.lastUpdated);
        if (row.name !== 'collectiblesFavoritesToRender'
          && row.name !== 'proof_did'
          && row.name !== 'private_space_data'
          && width >= 600) {
          return (
            <PublicRow
              dataKey={row.name}
              dataValue={row.content}
              spaceName={row.space}
              privacy={row.privacy}
              rowType={row.type}
              lastUpdated={date}
              fadeIn={fadeIn}
              did={did}
              spaceNameOpened={spaceNameOpened}
              itemToDelete={itemToDelete}
              spaceNameToDelete={spaceNameToDelete}
              key={`${row.space}-${row.name}`}
            />
          );
        }

        if (row.name !== 'collectiblesFavoritesToRender'
          && row.name !== 'proof_did'
          && row.name !== 'private_space_data'
          && width <= 600) {
          return (
            <PublicRowMobile
              dataKey={row.name}
              dataValue={row.content}
              spaceName={row.space}
              privacy={row.privacy}
              lastUpdated={date}
              rowType={row.type}
              did={did}
              fadeIn={fadeIn}
              spaceNameOpened={spaceNameOpened}
              itemToDelete={itemToDelete}
              spaceNameToDelete={spaceNameToDelete}
              key={`${row.space}-${row.name}`}
            />
          );
        }

        if (row.name === 'private_space_data' && width >= 600) {
          return (
            <VaultRow
              openSpace={openSpace}
              spaceName={row.space}
              fadeOut={fadeOut}
              isLoadingVault={isLoadingVault}
              vaultToOpen={vaultToOpen}
              key={`vault-${row.space}`}
            />
          );
        }

        if (row.name === 'private_space_data' && width <= 600) {
          return (
            <VaultRowMobile
              openSpace={openSpace}
              spaceName={row.space}
              fadeOut={fadeOut}
              isLoadingVault={isLoadingVault}
              vaultToOpen={vaultToOpen}
              key={`vault-${row.space}`}
            />
          );
        }

        if (row.name === 'collectiblesFavoritesToRender' && width >= 600) {
          return (
            <FavoriteCollectiblesRow
              dataKey={row.name}
              dataValue={row.content}
              spaceName={row.space}
              privacy={row.privacy}
              rowType={row.type}
              lastUpdated={date}
              spaceNameOpened={spaceNameOpened}
              itemToDelete={itemToDelete}
              spaceNameToDelete={spaceNameToDelete}
              key={`${row.space}-${row.name}`}
            />
          );
        }

        if (row.name === 'collectiblesFavoritesToRender' && width <= 600) {
          return (
            <FavoriteCollectiblesRowMobile
              dataKey={row.name}
              dataValue={row.content}
              spaceName={row.space}
              privacy={row.privacy}
              rowType={row.type}
              lastUpdated={date}
              itemToDelete={itemToDelete}
              spaceNameToDelete={spaceNameToDelete}
              key={`${row.space}-${row.name}`}
            />
          );
        }
      })}

      {sortedSpace.length === 0 && (
        <div className="emptySpace">
          <img src={Mollie} alt="Mollie" className="emptySpace_mollie" />
          <p>There's no data in this space</p>
        </div>
      )}
    </>
  );

AllView.propTypes = {
  spacesOpened: PropTypes.object.isRequired,
  isLoadingVault: PropTypes.bool.isRequired,
  openSpace: PropTypes.func.isRequired,
  vaultToOpen: PropTypes.string.isRequired,
  itemToDelete: PropTypes.string.isRequired,
  spaceNameToDelete: PropTypes.string.isRequired,
  fadeIn: PropTypes.bool.isRequired,
  fadeOut: PropTypes.bool.isRequired,
  spaceNameOpened: PropTypes.string.isRequired,
  did: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
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