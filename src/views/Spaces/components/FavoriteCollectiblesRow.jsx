import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Globe from '../../../assets/Globe.svg';
import '../styles/Spaces.css';

import actions from '../../../state/actions';

const { viewSpaceItem } = actions.spaces;

const FavoriteCollectiblesRow = ({
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
      onClick={() => {
        viewSpaceItem(
          true,
          false,
          false,
          dataKey,
          dataValue,
          spaceName,
          rowType,
          privacy
        )
      }}
      role="button"
      onKeyPress={() => viewSpaceItem(true, false, false, dataKey, dataValue, spaceName, rowType, privacy)}
      tabIndex={0}
    >
      <span className="data__items__row__entry spaceRow__key">
        <p className="data__text">
          Favorite Collectibles
        </p>
      </span>
      <span className="data__items__row__entry spaceRow__content">
        {
          dataValue.map(item => (
            <img src={item.image_preview_url} alt="" className="data__collectibles__tile" />
          ))
        }
      </span>
      <span className="data__items__row__entry spaceRow__space">
        <p className="data__text">
          3Box
        </p>
      </span>
      <span className="data__items__row__entry spaceRow__type">
        <div className="data__text">
          <span className="type__tag List">
            <p className="spaceRow__tag__text">
              List
            </p>
          </span>
        </div>
      </span>
      <span className="data__items__row__entry spaceRow__privacy">
        <div className="data__text">
          <img src={Globe} alt="Transaction Icon" className="feed__activity__address__dataType" />
        </div>
      </span>
      <span className="data__items__row__entry spaceRow__updated">
        <p className="data__text">
          Feb 19, 2019
      </p>
      </span>
    </div>
  );

FavoriteCollectiblesRow.propTypes = {
  dataValue: PropTypes.object.isRequired,
  viewSpaceItem: PropTypes.func.isRequired,
  dataKey: PropTypes.string.isRequired,
  spaceName: PropTypes.string.isRequired,
  rowType: PropTypes.string.isRequired,
  privacy: PropTypes.string.isRequired,
};

export default connect('', { viewSpaceItem })(FavoriteCollectiblesRow);