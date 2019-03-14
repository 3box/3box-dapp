import React from 'react';
import PropTypes from 'prop-types';

import '../styles/Spaces.css';

const PublicRow = ({ dataKey, dataValue, spaceName }) => (
  <div className="data__items__row" key={dataKey}>
    <span className="data__items__row__entry  spaceRow__key">{dataKey}</span>
    <span className="data__items__row__entry spaceRow__content">
      {typeof dataValue === 'string' && dataValue}
      {typeof dataValue === 'object' && 'object'}
    </span>
    <span className="data__items__row__entry spaceRow__space">
      {spaceName}
    </span>
    <span className="data__items__row__entry spaceRow__type">
      Claim / Text / Image / List
  </span>
    <span className="data__items__row__entry spaceRow__privacy">
      Public
  </span>
  </div>
);

PublicRow.propTypes = {
  dataValue: PropTypes.object.isRequired,
  dataKey: PropTypes.string.isRequired,
  spaceName: PropTypes.string.isRequired,
};

// VaultRow.defaultProps = {
//   box: {},
// };

export default PublicRow;