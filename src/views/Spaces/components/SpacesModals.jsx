import React from 'react';
import PropTypes from 'prop-types';

import Space from '../../../assets/Space.svg';
import Private from '../../../assets/Private.svg';
import Globe from '../../../assets/Globe.svg';
import Trash from '../../../assets/Trash.svg';
import Link from '../../../assets/Link.svg';
import '../../../components/styles/Modal.css';

export const SpaceOpenedModal = ({ spaceName }) => (
  <div className="modal__container--copied modal--effect">
    <div className="modal--sync spaceOpenedModal--mobile">
      <div className="modal--space__copy__wrapper">
        <img src={Space} className="modal__space__icon" alt="Copied" />
        <p>{`${spaceName.toUpperCase()} SPACE OPENED`}</p>
      </div>
    </div>
  </div>
);

SpaceOpenedModal.propTypes = {
  spaceName: PropTypes.string,
};

SpaceOpenedModal.defaultProps = {
  spaceName: '',
};

export const ViewSpaceDataItemModal = ({
  viewSpaceItem,
  spaceName,
  dataKey,
  rowType,
  dataValue,
  privacy,
  lastUpdated,
}) => (
    <div className="modal__container modal--effect spaceModal__container">
      <div className="spaceModalWrapper">
        <div className="modal spaceModal">
          <button onClick={() => viewSpaceItem(false, false, false)} type="button" className="tertiaryButton spaceModal__close">
            Close
        </button>
          <section className="spaceModal__data">
            <div className="spaceModal__name__wrapper">
              <p className="spaceModal__space__value">{spaceName}</p>
            </div>
            <div className="spaceModal__name__wrapper">
              <p className="spaceModal__name__value">
                {(dataKey !== 'collectiblesFavoritesToRender' && dataKey.substring(0, 14) !== 'follow-thread-')
                  && dataKey.replace(/([A-Z])/g, ' $1')
                    .replace(/^./, str => str.toUpperCase())}

                {(dataKey === 'collectiblesFavoritesToRender' && dataKey.substring(0, 14) !== 'follow-thread-')
                  && 'Favorite Collectibles'}

                {dataKey.substring(0, 14) === 'follow-thread-' && 'Thread'}
              </p>
            </div>
          </section>

          <section className="spaceModal__content">
            {dataKey.substring(0, 14) === 'follow-thread-' && dataValue.name.replace(/([A-Z])/g, ' $1')
              .replace(/^./, str => str.toUpperCase())}

            {rowType === 'Image' && (
              <img
                src={`https://ipfs.infura.io/ipfs/${dataValue[0].contentUrl['/']}`}
                className="spaceModal__content__image"
                alt="profile"
              />)}

            {typeof dataValue === 'string' && dataValue}

            {(typeof dataValue === 'object'
              && rowType !== 'Image'
              && dataKey !== 'collectiblesFavoritesToRender'
              && dataKey.substring(0, 14) !== 'follow-thread-') && (
                <React.Fragment>
                  {
                    Object.keys(dataValue).map(content => (
                      <p className="spaceModal__content__object-keys">{content}</p>
                    ))
                  }
                </React.Fragment>)}
          </section>

          <section className="spaceModal__context">
            <div className="spaceModal__context__div">
              <span className={`type__tag ${rowType}`}>
                <p className="spaceRow__tag__text">
                  {rowType}
                </p>
              </span>
              {privacy === 'private'
                ? <img src={Private} alt="Transaction Icon" className="spaceModal__context__privacy" />
                : <img src={Globe} alt="Transaction Icon" className="spaceModal__context__privacy" />
              }
              <p>
                {lastUpdated}
              </p>
            </div>

            <div className="spaceModal__context__div">
              <span
                className="spaceModal__context__delete"
                onClick={() => {
                  viewSpaceItem(
                    false,
                    true,
                    false,
                    dataKey,
                    dataValue,
                    spaceName,
                    rowType,
                    privacy,
                  );
                }}
                tabIndex={0}
                onKeyPress={() => {
                  viewSpaceItem(
                    false,
                    true,
                    false,
                    dataKey,
                    dataValue,
                    spaceName,
                    rowType,
                    privacy,
                  );
                }}
                role="button"
              >
                <img src={Trash} alt="Transaction Icon" className="spaceModal__context__privacy" />
                Delete
            </span>

              {rowType === 'Image' && (
                <a
                  className="spaceModal__context__view"
                  href={`https://ipfs.infura.io/ipfs/${dataValue[0].contentUrl['/']}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={Link} alt="Transaction Icon" className="spaceModal__context__viewIcon" />
                  View Source
              </a>)}
            </div>
          </section>
        </div>
        <div
          className="onClickOutsideCollectibles--mobile"
          onClick={() => viewSpaceItem(false, false, false)}
          tabIndex={0}
          onKeyPress={() => viewSpaceItem(false, false, false)}
          role="button"
        />
      </div>
      <div
        className="onClickOutsideCollectibles"
        onClick={() => viewSpaceItem(false, false, false)}
        tabIndex={0}
        onKeyPress={() => viewSpaceItem(false, false, false)}
        role="button"
      />
    </div>
  );

ViewSpaceDataItemModal.propTypes = {
  viewSpaceItem: PropTypes.func.isRequired,
  spaceName: PropTypes.string.isRequired,
  dataKey: PropTypes.string.isRequired,
  rowType: PropTypes.string.isRequired,
  dataValue: PropTypes.object.isRequired,
  privacy: PropTypes.string.isRequired,
  lastUpdated: PropTypes.string.isRequired,
};

export const ListSpaceItemModal = ({
  viewSpaceItem,
  spaceName,
  dataKey,
  rowType,
  dataValue,
  privacy,
  lastUpdated,
  index,
  item,
  length,
}) => (
    <React.Fragment>
      <div className="modal listSpaceModal">
        {index === 0 && (
          <button
            onClick={() => viewSpaceItem(false, false, false)}
            type="button"
            className="tertiaryButton spaceModal__close"
          >
            Close
          </button>)}
        <section className="spaceModal__name">
          <div className="spaceModal__names">
            <div className="spaceModal__name__wrapper">
              <p className="spaceModal__space__value">
                {spaceName === '3Box' ? '3Box' : spaceName.replace(/([A-Z])/g, ' $1')
                  .replace(/^./, str => str.toUpperCase())}
              </p>
            </div>

            <div className="spaceModal__name__wrapper">
              <p className="spaceModal__name__value">
                {dataKey !== 'collectiblesFavoritesToRender'
                  ? dataKey.replace(/([A-Z])/g, ' $1')
                    .replace(/^./, str => str.toUpperCase())
                  : 'Favorite Collectibles'}
              </p>
            </div>
          </div>
          <h4>{`${index + 1} of ${length}`}</h4>
        </section>

        <section className="spaceModal__content">
          {(typeof item === 'object' && dataKey !== 'collectiblesFavoritesToRender') && (
            <div className="spaceModal__listContent">
              {Object.entries(item).map(kv => (
                <div className="spaceModal__listContent__kv">
                  <p className="spaceModal__listContent__kv__key">{`${kv[0]}:`}</p>
                  <p className="spaceModal__listContent__kv__value">{kv[1]}</p>
                </div>
              ))}
            </div>
          )}

          {dataKey === 'collectiblesFavoritesToRender' && (
            <div className="spaceModal__listWrapper">
              <img
                src={item.image_preview_url}
                alt="favorite collectibles"
                className="spaceModal__content__collectibles"
              />
              <div className="spaceModal__content__collectibles__info">
                <p>Contract:</p>
                <p>{item.asset_contract.address}</p>
                <p>Token ID:</p>
                <p>{item.token_id}</p>
              </div>
            </div>
          )}
        </section>

        <section className="spaceModal__context">
          <div className="spaceModal__context__div">
            <span className={`type__tag ${rowType}`}>
              <p className="spaceRow__tag__text">
                {rowType}
              </p>
            </span>
            {privacy === 'private'
              ? <img src={Private} alt="Transaction Icon" className="spaceModal__context__privacy" />
              : <img src={Globe} alt="Transaction Icon" className="spaceModal__context__privacy" />
            }
            <p>
              {lastUpdated}
            </p>
          </div>

          <div className="spaceModal__context__div">
            <span
              className="spaceModal__context__delete"
              onClick={() => {
                viewSpaceItem(
                  false,
                  true,
                  false,
                  dataKey,
                  dataValue,
                  spaceName,
                  rowType,
                  privacy,
                  index,
                );
              }}
              tabIndex={0}
              onKeyPress={() => {
                viewSpaceItem(
                  false,
                  true,
                  false,
                  dataKey,
                  dataValue,
                  spaceName,
                  rowType,
                  privacy,
                  index,
                );
              }}
              role="button"
            >
              <img src={Trash} alt="Transaction Icon" className="spaceModal__context__privacy" />
              Delete
            </span>

            {rowType === 'Favorite Collectibles To Render' && (
              <a
                className="spaceModal__context__view"
                href={item.external_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={Link} alt="Transaction Icon" className="spaceModal__context__privacy" />
                View Source
              </a>)}
          </div>
        </section>
        <div
          className="onClickOutsideCollectibles--mobile"
          onClick={() => viewSpaceItem(false, false, false)}
          tabIndex={0}
          onKeyPress={() => viewSpaceItem(false, false, false)}
          role="button"
        />
      </div>
      <div
        className="onClickOutsideCollectibles"
        onClick={() => viewSpaceItem(false, false, false)}
        tabIndex={0}
        onKeyPress={() => viewSpaceItem(false, false, false)}
        role="button"
      />
    </React.Fragment>
  );

ListSpaceItemModal.propTypes = {
  viewSpaceItem: PropTypes.func.isRequired,
  spaceName: PropTypes.string.isRequired,
  dataKey: PropTypes.string.isRequired,
  rowType: PropTypes.string.isRequired,
  dataValue: PropTypes.object.isRequired,
  privacy: PropTypes.string.isRequired,
  lastUpdated: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
};

export const DeleteSpaceItemModal = ({
  viewSpaceItem,
  spaceItem,
  spacesOpened,
  openSpace,
  deleteItem,
}) => (
    <div className="modal__container modal--effect">
      <div className="modal spaceDeleteModal">
        <button
          onClick={() => viewSpaceItem(false, false, false)}
          type="button"
          className="tertiaryButton spaceModal__close"
        >
          Close
        </button>

        <section className="spaceDeleteModal__header">
          {`Delete ${spaceItem.dataKey} ?`}
        </section>

        <section className="spaceDeleteModal__body">
          <p className="spaceDeleteModal__body__explanantion">
            {`You are about to permanently delete the item ${spaceItem.dataKey}.
          You will no longer have access to this data in 3Box or any other dapp.
          This action cannot be undone.`}
          </p>
          <p className="spaceDeleteModal__body__warning">Are you sure you want to proceed?</p>
          <div className="spaceDeleteModal__body__buttons">
            <button
              onClick={() => viewSpaceItem(true, false, false, spaceItem.dataKey, spaceItem.dataValue, spaceItem.spaceName, spaceItem.rowType, spaceItem.privacy)}
              tabIndex={0}
              onKeyPress={() => viewSpaceItem(true, false, false, spaceItem.dataKey, spaceItem.dataValue, spaceItem.spaceName, spaceItem.rowType, spaceItem.privacy)}
              type="button"
              className="spaceDeleteModal__body__buttons__cancel"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if ((spaceItem.spaceName === '3Box')
                  || (spacesOpened && spacesOpened[spaceItem.spaceName])) {
                  deleteItem(
                    spaceItem.spaceName,
                    spaceItem.dataKey,
                    spaceItem.privacy,
                    spaceItem.listIndex,
                  );

                  viewSpaceItem(
                    false,
                    false,
                    false,
                    spaceItem.dataKey,
                    spaceItem.dataValue,
                    spaceItem.spaceName,
                    spaceItem.rowType,
                    spaceItem.privacy,
                  );
                } else {
                  openSpace(
                    spaceItem.spaceName,
                    spaceItem.dataKey,
                    spaceItem.privacy,
                  );
                  viewSpaceItem(
                    false,
                    false,
                    true,
                    spaceItem.dataKey,
                    spaceItem.dataValue,
                    spaceItem.spaceName,
                    spaceItem.rowType,
                    spaceItem.privacy,
                  );
                }
              }}
              tabIndex={0}
              onKeyPress={() => {
                if ((spaceItem.spaceName === '3Box')
                  || (spacesOpened && spacesOpened[spaceItem.spaceName])) {
                  deleteItem(
                    spaceItem.spaceName,
                    spaceItem.dataKey,
                    spaceItem.privacy,
                  );

                  viewSpaceItem(
                    false,
                    false,
                    false,
                    spaceItem.dataKey,
                    spaceItem.dataValue,
                    spaceItem.spaceName,
                    spaceItem.rowType,
                    spaceItem.privacy,
                  );
                } else {
                  openSpace(spaceItem.spaceName, spaceItem.dataKey, spaceItem.privacy);
                  viewSpaceItem(
                    false,
                    false,
                    true,
                    spaceItem.dataKey,
                    spaceItem.dataValue,
                    spaceItem.spaceName,
                    spaceItem.rowType,
                    spaceItem.privacy,
                  );
                }
              }}
              type="button"
              className="spaceDeleteModal__body__buttons__delete"
            >
              Yes, delete
            </button>
          </div>
        </section>
      </div>
      <div
        className="onClickOutsideCollectibles--mobile"
        onClick={() => viewSpaceItem(false, false, false)}
        tabIndex={0}
        onKeyPress={() => viewSpaceItem(false, false, false)}
        role="button"
      />
      <div
        className="onClickOutsideCollectibles"
        onClick={() => viewSpaceItem(false, false, false)}
        tabIndex={0}
        onKeyPress={() => viewSpaceItem(false, false, false)}
        role="button"
      />
    </div>
  );

DeleteSpaceItemModal.propTypes = {
  viewSpaceItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  openSpace: PropTypes.func.isRequired,
  spaceItem: PropTypes.object.isRequired,
  spacesOpened: PropTypes.object.isRequired,
};

export const OpenSpaceModal = ({ viewSpaceItem, spaceItem }) => (
  <div className="modal__container modal--effect">
    <div className="modal spaceDeleteModal">
      <button onClick={() => viewSpaceItem(false, false, false)} type="button" className="tertiaryButton spaceModal__close">
        Close
      </button>
      <section className="spaceDeleteModal__header">
        {`You must open the space ${spaceItem.spaceName} before you can edit it`}
      </section>
      <section className="spaceDeleteModal__body">
        <p className="spaceDeleteModal__body__explanantion">
          Approve the message in your web3 wallet to delete this item.
        </p>
        <button
          onClick={() => viewSpaceItem(true, false, false, spaceItem.dataKey, spaceItem.dataValue, spaceItem.spaceName, spaceItem.rowType, spaceItem.privacy)}
          tabIndex={0}
          onKeyPress={() => viewSpaceItem(true, false, false, spaceItem.dataKey, spaceItem.dataValue, spaceItem.spaceName, spaceItem.rowType, spaceItem.privacy)}
          type="button"
          className="spaceDeleteModal__body__buttons__cancel"
        >
          Cancel
        </button>
      </section>
      <div
        className="onClickOutsideCollectibles--mobile"
        onClick={() => viewSpaceItem(false, false, false)}
        tabIndex={0}
        onKeyPress={() => viewSpaceItem(false, false, false)}
        role="button"
      />
    </div>
    <div
      className="onClickOutsideCollectibles"
      onClick={() => viewSpaceItem(false, false, false)}
      tabIndex={0}
      onKeyPress={() => viewSpaceItem(false, false, false)}
      role="button"
    />
  </div>
);

OpenSpaceModal.propTypes = {
  viewSpaceItem: PropTypes.func.isRequired,
  spaceItem: PropTypes.object.isRequired,
};
