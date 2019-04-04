import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Globe from '../../../assets/Globe.svg';
import '../styles/Spaces.css';

import actions from '../../../state/actions';

const { viewSpaceItem } = actions.spaces;

const FavoriteCollectiblesRowMobile = ({
  dataKey,
  dataValue,
  spaceName,
  rowType,
  privacy,
  viewSpaceItem,
}) => (
    <div
      className="data__items__row"
      key={dataKey}
      onClick={() => viewSpaceItem(true, false, false, dataKey, dataValue, spaceName, rowType, privacy)}
      role="button"
      onKeyPress={() => viewSpaceItem(true, false, false, dataKey, dataValue, spaceName, rowType, privacy)}
      tabIndex={0}
    >
      <div className="data__items--namewrapper">
        <div className="data__name">
          <p className="data__items__spacename">
            3Box
          </p>
          <p>
            Favorite Collectibles
          </p>
        </div>
        <div className="data__items__context">
          <span className="type__tag List">
            <p className="spaceRow__tag__text">
              List
           </p>
          </span>
          <img src={Globe} alt="Transaction Icon" className="data__items__privacyicon" />
          {/* Feb 19, 2019 */}
        </div>
      </div>
      <div className="data__items--detailswrapper">
        <div className="data__content">
          {
            dataValue.map(item => (
              <img src={item.image_preview_url} alt="" className="data__collectibles__tile" />
            ))
          }
        </div>
      </div>
    </div>
  );

FavoriteCollectiblesRowMobile.propTypes = {
  dataValue: PropTypes.object.isRequired,
  viewSpaceItem: PropTypes.func.isRequired,
  dataKey: PropTypes.string.isRequired,
  spaceName: PropTypes.string.isRequired,
  rowType: PropTypes.string.isRequired,
  privacy: PropTypes.string.isRequired,
};

export default connect('', { viewSpaceItem })(FavoriteCollectiblesRowMobile);