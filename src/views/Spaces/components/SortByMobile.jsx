import React from 'react';
import PropTypes from 'prop-types';

const sortByMobile = ({ handleMobileInput, showMobileInput, sortBy, sortData, spaceToDisplay, sortDirection }) => (
  <div className="data__categories--mobile">
    <p>
      SORT BY
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
      {sortDirection && <p className="sortArrow">&uarr;</p>}
      {!sortDirection && <p className="sortArrow">&darr;</p>}
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
              {(sortBy === 'name' && sortDirection) && <p className="sortArrow">&uarr;</p>}
              {(sortBy === 'name' && !sortDirection) && <p className="sortArrow">&darr;</p>}
            </li>
            <li
              onClick={() => sortData('content', false, spaceToDisplay, false)}
              onKeyPress={() => sortData('content', false, spaceToDisplay, false)}
              role="button"
              tabIndex={0}
              className={sortBy === 'content' ? 'activeSort' : ''}
            >
              Content
              {(sortBy === 'content' && sortDirection) && <p className="sortArrow">&uarr;</p>}
              {(sortBy === 'content' && !sortDirection) && <p className="sortArrow">&darr;</p>}
            </li>
            <li
              onClick={() => sortData('space', false, spaceToDisplay, false)}
              onKeyPress={() => sortData('space', false, spaceToDisplay, false)}
              className={sortBy === 'space' ? 'activeSort' : ''}
              role="button"
              tabIndex={0}
            >
              Space
              {(sortBy === 'space' && sortDirection) && <p className="sortArrow">&uarr;</p>}
              {(sortBy === 'space' && !sortDirection) && <p className="sortArrow">&darr;</p>}
            </li>
            <li
              onClick={() => sortData('type', false, spaceToDisplay, false)}
              onKeyPress={() => sortData('type', false, spaceToDisplay, false)}
              className={sortBy === 'type' ? 'activeSort' : ''}
              role="button"
              tabIndex={0}
            >
              Type
              {(sortBy === 'type' && sortDirection) && <p className="sortArrow">&uarr;</p>}
              {(sortBy === 'type' && !sortDirection) && <p className="sortArrow">&darr;</p>}
            </li>
            <li
              onClick={() => sortData('privacy', false, spaceToDisplay, false)}
              onKeyPress={() => sortData('privacy', false, spaceToDisplay, false)}
              className={sortBy === 'privacy' ? 'activeSort' : ''}
              role="button"
              tabIndex={0}
            >
              Privacy
              {(sortBy === 'privacy' && sortDirection) && <p className="sortArrow">&uarr;</p>}
              {(sortBy === 'privacy' && !sortDirection) && <p className="sortArrow">&darr;</p>}
            </li>
            <li
              onClick={() => sortData('lastUpdated', false, spaceToDisplay, false)}
              onKeyPress={() => sortData('lastUpdated', false, spaceToDisplay, false)}
              className={sortBy === 'lastUpdated' ? 'activeSort' : ''}
              role="button"
              tabIndex={0}
            >
              Last
              updated
            {(sortBy === 'lastUpdated' && sortDirection) && <p className="sortArrow">&uarr;</p>}
              {(sortBy === 'lastUpdated' && !sortDirection) && <p className="sortArrow">&darr;</p>}
            </li>
          </ul>
        </div>)}
    </div>
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
