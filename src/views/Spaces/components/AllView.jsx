import React from 'react';
import PropTypes from 'prop-types';

import VaultRow from './VaultRow';
import PublicRow from './PublicRow';
import '../styles/Spaces.css';

const AllView = ({ allData, openSpace }) => (
  <React.Fragment>
    {
      Object.entries(allData).map(spaceData => (
        <React.Fragment>
          <VaultRow openSpace={openSpace} spaceName={spaceData[0]} />
          {Object.entries(spaceData[1]).map(value => (
            <PublicRow
              dataKey={value[0]}
              dataValue={value[1]}
              spaceName={spaceData[0]}
            />
          ))}
        </React.Fragment>
      ))
    }
  </React.Fragment>
);

AllView.propTypes = {
  allData: PropTypes.object.isRequired,
  openSpace: PropTypes.func.isRequired,
};

// VaultRow.defaultProps = {
//   box: {},
// };

export default AllView;