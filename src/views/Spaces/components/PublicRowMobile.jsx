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

const PublicRowMobile = ({
  dataKey,
  dataValue,
  spaceName,
  rowType,
  privacy,
  viewSpaceItem,
  did,
  spaceNameOpened,
  fadeIn,
  itemToDelete,
  spaceNameToDelete,
  lastUpdated,
}) => (
    <div
      className={`
      data__items__row 
      ${(itemToDelete === dataKey && spaceNameToDelete === spaceName) ? 'fadeOutRow' : ''}
      ${(fadeIn && spaceName === spaceNameOpened && privacy === 'private') ? 'fadeInRow'
          : ''}
      ${rowType}_row
      `}
      key={dataKey}
      onClick={() => viewSpaceItem(true, false, false, dataKey, dataValue, spaceName, rowType, privacy, null, lastUpdated)}
      role="button"
      onKeyPress={() => viewSpaceItem(true, false, false, dataKey, dataValue, spaceName, rowType, privacy, null, lastUpdated)}
      tabIndex={0}
    >
      <div className="data__items--namewrapper">
        <div className="data__name">
          <p className="data__items__spacename">
            {spaceName === '3Box_app' ? '3Box' : spaceName}
          </p>
          <p>
            {(dataKey && dataKey.substring(0, 7) !== 'thread-') && dataKey.replace(/([A-Z])/g, ' $1')
              .replace(/^./, str => str.toUpperCase())}

            {(dataKey && dataKey.substring(0, 7) === 'thread-')
              && dataKey.substring(7).replace(/([A-Z])/g, ' $1')
                .replace(/^./, str => str.toUpperCase())}
          </p>
        </div>

        <div className="data__items__context">
          <p className="data__items__lastUpdated__mobile">
            {dataKey && dataKey.substring(0, 7) !== 'thread-' && lastUpdated}
            {(dataKey && dataKey.substring(0, 7) === 'thread-')
              && (dataValue.length > 0 ? timeSince(dataValue[dataValue.length - 1].timeStamp) : '')}
          </p>
          {privacy === 'private'
            ? <img src={Private} alt="Transaction Icon" className="data__items__privacyicon" />
            : <img src={Globe} alt="Transaction Icon" className="data__items__privacyicon" />
          }
          <span className={`type__tag ${rowType}`}>
            <p className="spaceRow__tag__text">
              {rowType}
            </p>
          </span>
        </div>
      </div>
      <div className="data__items--detailswrapper">
        <div className="data__content">
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
                  return `${count} messages`;
                })()}
              </p>)
          }

          {typeof dataValue === 'string' && (
            dataValue
          )}

          {(typeof dataValue === 'object' && rowType !== 'Image' && !Array.isArray(dataValue) && dataKey.substring(0, 7) !== 'thread-') && (
            Object.keys(dataValue).map(item => (item))
          )}

          {(Array.isArray(dataValue) && rowType !== 'Image' && (dataKey && dataKey.substring(0, 7) !== 'thread-')) && (
            dataValue.map((item) => {
              if (Array.isArray(item)) return item[0];
              if (typeof item === 'object') return Object.keys(item)[0];
              return item;
            })
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
              <img
                src={Verified}
                alt="Verified"
                className="profile__category__verified__icon"
              />
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );

PublicRowMobile.propTypes = {
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
  spaceNameOpened: PropTypes.string.isRequired,
  fadeIn: PropTypes.bool.isRequired,
  itemToDelete: PropTypes.string.isRequired,
  spaceNameToDelete: PropTypes.string.isRequired,
  lastUpdated: PropTypes.string.isRequired,
  did: PropTypes.string.isRequired,
};

export default connect('', { viewSpaceItem })(PublicRowMobile);