import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import VaultRow from './VaultRow';
import PublicRow from './PublicRow';
import '../styles/Spaces.css';

const SpaceView = ({ openSpace, spaceDataToRender, spacesOpened }) => (
  <React.Fragment>
    {spaceDataToRender.length > 0 && spaceDataToRender.map(row => (
      row.name === 'private_space_data' ? (
        <VaultRow
          openSpace={openSpace}
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

SpaceView.propTypes = {
  spaceDataToRender: PropTypes.array.isRequired,
  openSpace: PropTypes.func.isRequired,
  spacesOpened: PropTypes.bool.isRequired,
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
