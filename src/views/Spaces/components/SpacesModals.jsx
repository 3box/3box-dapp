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
    <div className="modal--sync">
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

export const ViewSpaceDataItemModal = ({ viewSpaceItem, spaceItem }) => (
  <div className="modal__container modal--effect">
    <div className="modal spaceModal">
      <button onClick={() => viewSpaceItem(false, false)} type="button" className="tertiaryButton spaceModal__close">
        Close
      </button>
      <section className="spaceModal__name">
        <div className="spaceModal__name__wrapper">
          <p className="spaceModal__name__key">SPACE</p>
          <p className="spaceModal__name__value">{spaceItem.spaceName}</p>
        </div>
        <div className="spaceModal__name__wrapper">
          <p className="spaceModal__name__key">NAME</p>
          <p className="spaceModal__name__value">{spaceItem.dataKey}</p>
        </div>
      </section>

      <section className="spaceModal__content">
        {spaceItem.rowType === 'Image' && <img src={`https://ipfs.infura.io/ipfs/${spaceItem.dataValue[0].contentUrl['/']}`} className="spaceModal__content__image" alt="profile" />}
        {typeof spaceItem.dataValue === 'string' && spaceItem.dataValue}
        {(typeof spaceItem.dataValue === 'object' && spaceItem.rowType !== 'Image') && 'object'}
      </section>

      <section className="spaceModal__context">
        <div className="spaceModal__context__div">
          <span className={`type__tag ${spaceItem.rowType}`}>
            <p className="spaceRow__tag__text">
              {spaceItem.rowType}
            </p>
          </span>
          {spaceItem.privacy === 'private'
            ? <img src={Private} alt="Transaction Icon" className="spaceModal__context__privacy" />
            : <img src={Globe} alt="Transaction Icon" className="spaceModal__context__privacy" />
          }
          <p>
            {spaceItem.lastUpdated}
          </p>
        </div>

        <div className="spaceModal__context__div">
          <span
            className="spaceModal__context__delete"
            onClick={() => viewSpaceItem(false, true, spaceItem.dataKey, spaceItem.dataValue, spaceItem.spaceName, spaceItem.rowType, spaceItem.privacy)}
            tabIndex={0}
            onKeyPress={() => viewSpaceItem(false, true, spaceItem.dataKey, spaceItem.dataValue, spaceItem.spaceName, spaceItem.rowType, spaceItem.privacy)}
            role="button"
          >
            <img src={Trash} alt="Transaction Icon" className="spaceModal__context__privacy" />
            Delete
          </span>

          {spaceItem.rowType === 'Image' && (
            <a
              className="spaceModal__context__view"
              href={`https://ipfs.infura.io/ipfs/${spaceItem.dataValue[0].contentUrl['/']}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={Link} alt="Transaction Icon" className="spaceModal__context__privacy" />
              View Source
            </a>)}
        </div>
      </section>
    </div>
    <div
      className="onClickOutsideCollectibles"
      onClick={() => viewSpaceItem(false, false)}
      tabIndex={0}
      onKeyPress={() => viewSpaceItem(false, false)}
      role="button"
    />
  </div>
);

ViewSpaceDataItemModal.propTypes = {
  viewSpaceItem: PropTypes.func.isRequired,
  spaceItem: PropTypes.object.isRequired,
};

export const DeleteSpaceItemModal = ({ viewSpaceItem, spaceItem }) => (
  <div className="modal__container modal--effect">
    <div className="modal spaceDeleteModal">
      <button onClick={() => viewSpaceItem(false, false)} type="button" className="tertiaryButton spaceModal__close">
        Close
      </button>
      <section className="spaceDeleteModal__header">
        {`Delete 3Box ${spaceItem.dataKey} ?`}
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
            onClick={() => viewSpaceItem(true, false, spaceItem.dataKey, spaceItem.dataValue, spaceItem.spaceName, spaceItem.rowType, spaceItem.privacy)}
            tabIndex={0}
            onKeyPress={() => viewSpaceItem(true, false, spaceItem.dataKey, spaceItem.dataValue, spaceItem.spaceName, spaceItem.rowType, spaceItem.privacy)}
            type="button"
            className="spaceDeleteModal__body__buttons__cancel"
          >
            Cancel
          </button>
          <button
            onClick={() => console.log('delete item')}
            tabIndex={0}
            onKeyPress={() => console.log('delete item')}
            type="button"
            className="spaceDeleteModal__body__buttons__delete"
          >
            Yes, delete
          </button>
        </div>
      </section>
    </div>
    <div
      className="onClickOutsideCollectibles"
      onClick={() => viewSpaceItem(false, false)}
      tabIndex={0}
      onKeyPress={() => viewSpaceItem(false, false)}
      role="button"
    />
  </div>
);

DeleteSpaceItemModal.propTypes = {
  viewSpaceItem: PropTypes.func.isRequired,
  spaceItem: PropTypes.object.isRequired,
};
