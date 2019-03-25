import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Private from '../../../assets/PrivateActivity.svg';
import Globe from '../../../assets/Globe.svg';
import Verified from '../../../assets/Verified.svg';
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
        {(dataKey && dataKey !== 'collectiblesFavoritesToRender') && dataKey.replace(/([A-Z])/g, ' $1')
          .replace(/^./, str => str.toUpperCase())}
        {(dataKey && dataKey === 'collectiblesFavoritesToRender') && 'Favorite Collectibles'}
      </p>
    </span>
    <span className="data__items__row__entry spaceRow__content">
      {typeof dataValue === 'string' && (
        <p className="data__text">
          {dataValue}
        </p>
      )}
      {(typeof dataValue === 'object' && rowType !== 'Image' && !Array.isArray(dataValue)) && (
        <p className="data__text">
          object2
        </p>
      )}
      {(typeof dataValue === 'object' && rowType !== 'Image' && Array.isArray(dataValue)) && (
        <p className="data__text">
          object
        </p>
      )}
      {(Array.isArray(dataValue) && rowType !== 'Image') && (
        <p className="data__text">
          {dataValue.map((item) => {
            if (Array.isArray(item)) return item[0];
            if (typeof item === 'object') return Object.keys(item)[0];
            return item;
          })}
        </p>
      )}
      {(Array.isArray(dataValue) && dataKey === 'collectiblesFavoritesToRender') && (
        <React.Fragment>
          {
            dataValue.map(item => (
              <img src={item.image_preview_url} alt="" className="data__collectibles__tile" />
            ))
          }
        </React.Fragment>
      )}
      {rowType === 'Image' && (
        <img
          src={`https://ipfs.infura.io/ipfs/${dataValue[0].contentUrl['/']}`}
          alt=""
          className="spaceRow__content__image"
        />
      )}
      {rowType === 'Claim' && (
        <React.Fragment>
          dataValue
          <img src={Verified} alt="Verified" className="profile__category__verified__icon" />
        </React.Fragment>
      )}
    </span>
    <span className="data__items__row__entry spaceRow__space">
      <p className="data__text">
        {spaceName}
      </p>
    </span>
    <span className="data__items__row__entry spaceRow__type">
      <div className="data__text">
        <span className={`type__tag ${rowType}`}>
          <p className="spaceRow__tag__text">
            {rowType}
          </p>
        </span>
      </div>
    </span>
    <span className="data__items__row__entry spaceRow__privacy">
      <div className="data__text">
        {privacy === 'private'
          ? <img src={Private} alt="Transaction Icon" className="feed__activity__address__dataType" />
          : <img src={Globe} alt="Transaction Icon" className="feed__activity__address__dataType" />
        }
      </div>
    </span>
    <span className="data__items__row__entry spaceRow__updated">
      <p className="data__text">
        Feb 19, 2019
      </p>
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