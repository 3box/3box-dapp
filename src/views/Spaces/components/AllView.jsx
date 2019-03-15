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
          {(spaceData[0] !== '3box') && (
            <VaultRow
              openSpace={openSpace}
              spaceName={spaceData[0]}
            />)}
          {Object.entries(spaceData[1]).map(value => (
            <PublicRow
              dataKey={value[0]}
              dataValue={value[1]}
              spaceName={spaceData[0]}
              rowType={typeof value[1] === 'string' ? 'Text' :
                (Array.isArray(value[1])
                  && value[1][0]
                  && value[1][0]['@type'] === 'ImageObject')
                  ? 'Image' :
                  (Array.isArray(value[1])
                    && (!value[1][0] || (value[1][0]
                      && value[1][0]['@type']
                      !== 'ImageObject')))
                  && 'List'
              }
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

export default AllView;