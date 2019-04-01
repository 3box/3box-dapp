import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../../../assets/Loading.svg';

import '../styles/Spaces.css';

const SpacesList = ({
  sortData,
  list,
  sortBy,
  spaceToDisplay,
  show,
  showSpacesMobile,
  handleSpaceListView,
  isSpacesLoading,
}) => (
    <section className={`spaces ${show ? '' : 'closeSpaces'} ${showSpacesMobile ? 'closeSpaces' : ''}`}>
      <div
        className={`space ${spaceToDisplay === 'All Data' ? 'activeSpace' : ''}`}
        onClick={() => {
          sortData(sortBy, false, 'All Data', true);
          handleSpaceListView();
        }}
        role="button"
        onKeyDown={() => {
          sortData(sortBy, false, 'All Data', true);
          handleSpaceListView();
        }}
        tabIndex={0}
      >
        <p className="space__name">All data</p>
        {isSpacesLoading && <img className="data__space__loading" src={Loading} alt="info" />}
        <span className="space__arrow">&#x3e;</span>
      </div>

      <div
        className={`space ${spaceToDisplay === '3Box' ? 'activeSpace' : ''}`}
        onClick={() => {
          sortData(sortBy, false, '3Box', true);
          handleSpaceListView();
        }}
        role="button"
        onKeyDown={() => {
          sortData(sortBy, false, '3Box', true);
          handleSpaceListView();
        }}
        tabIndex={0}
      >
        <p className="space__name">3Box</p>
        <span className="space__arrow">&#x3e;</span>
      </div>

      {list && list.map(space => space !== '3Box' && (
        <div
          className={`space ${spaceToDisplay === space ? 'activeSpace' : ''}`}
          onClick={() => {
            sortData(sortBy, false, space, true);
            handleSpaceListView();
          }}
          role="button"
          onKeyDown={() => {
            sortData(sortBy, false, space, true);
            handleSpaceListView();
          }}
          tabIndex={0}
        >
          <p className="space__name">{space}</p>
          <span className="space__arrow">&#x3e;</span>
        </div>
      ))}
    </section>);

SpacesList.propTypes = {
  sortData: PropTypes.func.isRequired,
  handleSpaceListView: PropTypes.func.isRequired,
  list: PropTypes.array.isRequired,
  spaceName: PropTypes.string.isRequired,
  sortBy: PropTypes.string.isRequired,
  spaceToDisplay: PropTypes.string.isRequired,
  showSpacesMobile: PropTypes.bool.isRequired,
  isSpacesLoading: PropTypes.bool.isRequired,
};

export default SpacesList;