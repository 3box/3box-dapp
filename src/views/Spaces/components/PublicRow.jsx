import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Private from '../../../assets/PrivateActivity.svg';
import Globe from '../../../assets/Globe.svg';
import '../styles/Spaces.css';

import actions from '../../../state/actions';

const { viewSpaceItem } = actions.spaces;

const PublicRow = ({ dataKey, dataValue, spaceName, rowType, privacy, viewSpaceItem }) => (
  <div
    className="data__items__row"
    key={dataKey}
    onClick={() => viewSpaceItem(true, false, false, dataKey, dataValue, spaceName, rowType, privacy)}
    role="button"
    onKeyPress={() => viewSpaceItem(true, false, false, dataKey, dataValue, spaceName, rowType, privacy)}
    tabIndex={0}
  >
    <span className="data__items__row__entry spaceRow__key">
      <p className="data__text">
        {dataKey && dataKey.replace(/([A-Z])/g, ' $1')
          .replace(/^./, str => str.toUpperCase())}
      </p>
    </span>
    <span className="data__items__row__entry spaceRow__content">
      {typeof dataValue === 'string' && dataValue}
      {typeof dataValue === 'object' && 'object'}
    </span>
    <span className="data__items__row__entry spaceRow__space">
      {spaceName}
    </span>
    <span className="data__items__row__entry spaceRow__type">
      <span className={`type__tag ${rowType}`}>
        <p className="spaceRow__tag__text">
          {rowType}
        </p>
      </span>
    </span>
    <span className="data__items__row__entry spaceRow__privacy">
      {privacy === 'private'
        ? <img src={Private} alt="Transaction Icon" className="feed__activity__address__dataType" />
        : <img src={Globe} alt="Transaction Icon" className="feed__activity__address__dataType" />
      }
    </span>
    <span className="data__items__row__entry spaceRow__updated">
      Feb 19, 2019
    </span>
  </div>
);

PublicRow.propTypes = {
  dataValue: PropTypes.object.isRequired,
  viewSpaceItem: PropTypes.func.isRequired,
  dataKey: PropTypes.string.isRequired,
  spaceName: PropTypes.string.isRequired,
  rowType: PropTypes.string.isRequired,
  privacy: PropTypes.string.isRequired,
};

export default connect('', { viewSpaceItem })(PublicRow);