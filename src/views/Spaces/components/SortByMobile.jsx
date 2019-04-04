import React from 'react';
import PropTypes from 'prop-types';

const sortByMobile = ({ handleMobileInput, showMobileInput, sortBy, sortData, spaceToDisplay, sortDirection }) => (
  <div className="data__categories--mobile">
    <p>
      Sort by
    </p>
    <div
      className="data__selected-sort"
      onClick={handleMobileInput}
      onKeyPress={handleMobileInput}
      role="button"
      tabIndex={0}
    >
      <p>
        {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
      </p>
      {showMobileInput && (
        <div className="data__categories__picker--mobile">
          <ul>
            <li
              onClick={() => sortData('name', false, spaceToDisplay, false)}
              onKeyPress={() => sortData('name', false, spaceToDisplay, false)}
              role="button"
              tabIndex={0}
              className={sortBy === 'name' ? 'activeSort' : ''}
            >
              Name
                </li>
            <li
              onClick={() => sortData('content', false, spaceToDisplay, false)}
              onKeyPress={() => sortData('content', false, spaceToDisplay, false)}
              role="button"
              tabIndex={0}
              className={sortBy === 'content' ? 'activeSort' : ''}
            >
              Content
                </li>
            <li
              onClick={() => sortData('space', false, spaceToDisplay, false)}
              onKeyPress={() => sortData('space', false, spaceToDisplay, false)}
              className={sortBy === 'space' ? 'activeSort' : ''}
              role="button"
              tabIndex={0}
            >
              Space
                </li>
            <li
              onClick={() => sortData('type', false, spaceToDisplay, false)}
              onKeyPress={() => sortData('type', false, spaceToDisplay, false)}
              className={sortBy === 'type' ? 'activeSort' : ''}
              role="button"
              tabIndex={0}
            >
              Type
                </li>
            <li
              onClick={() => sortData('privacy', false, spaceToDisplay, false)}
              onKeyPress={() => sortData('privacy', false, spaceToDisplay, false)}
              className={sortBy === 'privacy' ? 'activeSort' : ''}
              role="button"
              tabIndex={0}
            >
              Privacy
                </li>
            <li
              onClick={() => sortData('last', false, spaceToDisplay, false)}
              onKeyPress={() => sortData('last', false, spaceToDisplay, false)}
              className={sortBy === 'lastUpdated' ? 'activeSort' : ''}
              role="button"
              tabIndex={0}
            >
              Last
             updated
                 </li>
          </ul>
        </div>)}
    </div>
    {sortDirection ? (
      <p
        className="data__categories__title__arrow"
        onClick={() => sortData(sortBy, false, spaceToDisplay, false)}
        onKeyPress={() => sortData(sortBy, false, spaceToDisplay, false)}
        role="button"
        tabIndex={0}
      >
        &#9660;
          </p>
    ) : (
        <p
          className="data__categories__title__arrow"
          onClick={() => sortData(sortBy, false, spaceToDisplay, false)}
          onKeyPress={() => sortData(sortBy, false, spaceToDisplay, false)}
          role="button"
          tabIndex={0}
        >
          &#9650;
        </p>
      )}
  </div>
);

sortByMobile.propTypes = {
  handleMobileInput: PropTypes.func.isRequired,
  sortData: PropTypes.func.isRequired,
  showMobileInput: PropTypes.bool.isRequired,
  sortDirection: PropTypes.bool.isRequired,
  spaceToDisplay: PropTypes.string.isRequired,
  sortBy: PropTypes.string.isRequired,
};


export default sortByMobile;
