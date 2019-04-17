import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Private from '../../../assets/PrivateActivity.svg';
import Globe from '../../../assets/Globe.svg';
import Verified from '../../../assets/Verified.svg';
import { timeSince } from '../../../utils/time';
import '../styles/Spaces.css';

import actions from '../../../state/actions';

const { viewSpaceItem } = actions.spaces;

const PublicRow = ({
  dataKey,
  dataValue,
  spaceName,
  rowType,
  privacy,
  viewSpaceItem,
  did,
  fadeIn,
  spaceNameOpened,
  itemToDelete,
  spaceNameToDelete,
  lastUpdated,
}) => (
    <div
      className={`
      data__items__row 
      ${rowType}_row 
      ${(fadeIn && spaceName === spaceNameOpened && privacy === 'private') ? 'fadeInRow'
          : ''}
      ${(itemToDelete === dataKey && spaceNameToDelete === spaceName) ? 'fadeOutRow' : ''}
`}
      key={dataKey}
      onClick={() => viewSpaceItem(true, false, false, dataKey, dataValue, spaceName, rowType, privacy, null, lastUpdated)}
      role="button"
      onKeyPress={() => viewSpaceItem(true, false, false, dataKey, dataValue, spaceName, rowType, privacy, null, lastUpdated)}
      tabIndex={0}
    >
      <span
        className="data__items__row__entry spaceRow__key"
        title={`${
          (dataKey && dataKey.substring(0, 7) !== 'thread-') ?
            dataKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()) :
            dataKey.substring(7).replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} `}
      >
        <p className="data__text row__name">
          {(dataKey && dataKey.substring(0, 7) !== 'thread-') && dataKey.replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())}

          {(dataKey && dataKey.substring(0, 7) === 'thread-')
            && dataKey.substring(7).replace(/([A-Z])/g, ' $1')
              .replace(/^./, str => str.toUpperCase())}
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
            {Object.keys(dataValue).map(item => (item))}
          </p>
        )}

        {(Array.isArray(dataValue) && rowType !== 'Image' && (dataKey && dataKey.substring(0, 7) !== 'thread-')) && (
          <p className="data__text">
            {dataValue.map((item) => {
              if (Array.isArray(item)) return item[0];
              if (typeof item === 'object') return Object.keys(item)[0];
              return item;
            })}
          </p>
        )}

        {(dataKey && dataKey.substring(0, 7) === 'thread-')
          && (
            <p className="data__text">
              {(() => {
                let count = 0;
                if (dataValue.length > 0) {
                  dataValue.forEach((item) => {
                    if (item.author === did) {
                      count += 1;
                    }
                  });
                }
                return `${count} ${count === 1 ? 'message' : 'messages'}`;
              })()}
            </p>)
        }

        {rowType === 'Image' && (
          <img
            src={`https://ipfs.infura.io/ipfs/${dataValue[0].contentUrl['/']}`}
            alt=""
            className="spaceRow__content__image"
          />
        )}

        {
          rowType === 'Claim' && (
            <React.Fragment>
              <img
                src={Verified}
                alt="Verified"
                className="data__items__row__entry__verified__icon"
              />
            </React.Fragment>
          )
        }
      </span >
      <span className="data__items__row__entry spaceRow__space">
        <p className="data__text">
          {spaceName === '3Box_app' ? '3Box' : spaceName}
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
          {dataKey && dataKey.substring(0, 7) !== 'thread-' && lastUpdated}
          {(dataKey && dataKey.substring(0, 7) === 'thread-')
            && (dataValue.length > 0 ? timeSince(dataValue[dataValue.length - 1].timeStamp) : '')}
        </p>
      </span>
    </div >
  );

PublicRow.propTypes = {
  dataValue: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string,
  ]).isRequired,
  viewSpaceItem: PropTypes.func.isRequired,
  dataKey: PropTypes.string.isRequired,
  spaceName: PropTypes.string.isRequired,
  rowType: PropTypes.string.isRequired,
  privacy: PropTypes.string.isRequired,
  fadeIn: PropTypes.bool.isRequired,
  spaceNameOpened: PropTypes.string.isRequired,
  itemToDelete: PropTypes.string.isRequired,
  did: PropTypes.string.isRequired,
  spaceNameToDelete: PropTypes.string.isRequired,
  lastUpdated: PropTypes.string.isRequired,
};

export default connect('', { viewSpaceItem })(PublicRow);