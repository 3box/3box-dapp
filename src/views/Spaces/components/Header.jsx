import React from 'react';
import PropTypes from 'prop-types';

import Info from '../../../assets/Details.svg';
import Loading from '../../../assets/Loading.svg';
import List from '../../../assets/List.svg';
import '../styles/Spaces.css';

const Header = ({
  spaceToDisplay,
  isSpacesLoading,
  sortBy,
  sortData,
  sortDirection,
  handleSpaceListView,
  show,
  showSpacesMobile,
  handleMobileSpaceListView,
  handleMobileInput,
  showMobileInput,
}) => (
    <header
      className={`data__header 
      ${show ? '' : 'data__header--wide'}
      ${showSpacesMobile ? 'data__header--wide--mobile' : ''}
    `}
    >
      <section className="data__space">
        <span className="data__space__context">
          <div className="data__space__context__name">
            <button
              className="data__space__context__icon"
              onClick={() => {
                handleSpaceListView();
                handleMobileSpaceListView();
              }}
              onKeyPress={() => {
                handleSpaceListView();
                handleMobileSpaceListView();
              }}
              tabIndex={0}
              type="button"
            >
              <img
                src={List}
                alt="list"
              />
            </button>
            <h2>{spaceToDisplay}</h2>
          </div>
          {isSpacesLoading && <img className="data__space__loading" src={Loading} alt="info" />}
        </span>
        <img className="data__space__info" src={Info} alt="info" />
      </section>

      <div className="data__categories--mobile">
        <p>
          Sort by
        </p>
        <div
          className="data__selected-sort"
          onClick={handleMobileInput}
        >
          <p>
            {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
          </p>
          {showMobileInput && (
            <div className="data__categories__picker--mobile">
              <ul>
                <li
                  onClick={() => sortData('name', false, spaceToDisplay, false)}
                  className={sortBy === 'name' ? 'activeSort' : ''}
                >
                  Name
                </li>
                <li
                  onClick={() => sortData('content', false, spaceToDisplay, false)}
                  className={sortBy === 'content' ? 'activeSort' : ''}
                >
                  Content
                </li>
                <li
                  onClick={() => sortData('space', false, spaceToDisplay, false)}
                  className={sortBy === 'space' ? 'activeSort' : ''}
                >
                  Space
                </li>
                <li
                  onClick={() => sortData('type', false, spaceToDisplay, false)}
                  className={sortBy === 'type' ? 'activeSort' : ''}
                >
                  Type
                </li>
                <li
                  onClick={() => sortData('privacy', false, spaceToDisplay, false)}
                  className={sortBy === 'privacy' ? 'activeSort' : ''}
                >
                  Privacy
                </li>
                <li
                  onClick={() => sortData('last', false, spaceToDisplay, false)}
                  className={sortBy === 'lastUpdated' ? 'activeSort' : ''}
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
          >
            &#9660;
          </p>
        ) : (
            <p
              className="data__categories__title__arrow"
              onClick={() => sortData(sortBy, false, spaceToDisplay, false)}
            >
              &#9650;
            </p>
          )}
        {/* <select
          className="data__categories__input"
          onChange={e => sortData(e.target.value, false, spaceToDisplay, false)}
        >
          <option value="name">Name</option>
          <option value="content">Content</option>
          <option value="space">Space</option>
          <option value="type">Type</option>
          <option value="privacy">Privacy</option>
          <option value="lastUpdated">Last Updated</option>
        </select> */}
      </div>

      <section className="data__categories">
        <span
          className={`data__categories__title spaceRow__key ${sortBy === 'name' ? 'activeSort' : ''} `}
          onClick={() => sortData('name', false, spaceToDisplay, false)}
          onKeyPress={() => sortData('name', false, spaceToDisplay, false)}
          role="button"
          tabIndex={0}
        >
          Name
          {sortBy === 'name' && (
            sortDirection ? (
              <p className="data__categories__title__arrow">
                &#9660;
              </p>
            ) : (
                <p className="data__categories__title__arrow">
                  &#9650;
                </p>
              )
          )}
        </span>
        <span
          className={`data__categories__title spaceRow__content ${sortBy === 'content' ? 'activeSort' : ''} `}
          onClick={() => sortData('content', false, spaceToDisplay, false)}
          onKeyPress={() => sortData('content', false, spaceToDisplay, false)}
          role="button"
          tabIndex={0}
        >
          Content
          {sortBy === 'content' && (
            sortDirection ? (
              <p className="data__categories__title__arrow">
                &#9660;
              </p>
            ) : (
                <p className="data__categories__title__arrow">
                  &#9650;
                </p>
              )
          )}
        </span>
        <span
          className={`data__categories__title spaceRow__space ${sortBy === 'space' ? 'activeSort' : ''} `}
          onClick={() => sortData('space', false, spaceToDisplay, false)}
          onKeyPress={() => sortData('space', false, spaceToDisplay, false)}
          role="button"
          tabIndex={0}
        >
          Space
          {sortBy === 'space' && (
            sortDirection ? (
              <p className="data__categories__title__arrow">
                &#9660;
              </p>
            ) : (
                <p className="data__categories__title__arrow">
                  &#9650;
                </p>
              ))}
        </span>
        <span
          className={`data__categories__title spaceRow__type ${sortBy === 'type' ? 'activeSort' : ''} `}
          onClick={() => sortData('type', false, spaceToDisplay, false)}
          onKeyPress={() => sortData('type', false, spaceToDisplay, false)}
          role="button"
          tabIndex={0}
        >
          Type
          {sortBy === 'type' && (
            sortDirection ? (
              <p className="data__categories__title__arrow">
                &#9660;
              </p>
            ) : (
                <p className="data__categories__title__arrow">
                  &#9650;
                </p>
              ))}
        </span>
        <span
          className={`data__categories__title spaceRow__privacy ${sortBy === 'privacy' ? 'activeSort' : ''} `}
          onClick={() => sortData('privacy', false, spaceToDisplay, false)}
          onKeyPress={() => sortData('privacy', false, spaceToDisplay, false)}
          role="button"
          tabIndex={0}
        >
          Privacy
          {sortBy === 'privacy' && (
            sortDirection ? (
              <p className="data__categories__title__arrow">
                &#9660;
              </p>
            ) : (
                <p className="data__categories__title__arrow">
                  &#9650;
                </p>
              ))}
        </span>
        <span
          className={`data__categories__title spaceRow__updated ${sortBy === 'lastUpdated' ? 'activeSort' : ''} `}
          onClick={() => sortData('lastUpdated', false, spaceToDisplay, false)}
          onKeyPress={() => sortData('lastUpdated', false, spaceToDisplay, false)}
          role="button"
          tabIndex={0}
        >
          Last Updated
          {sortBy === 'lastUpdated' && (
            sortDirection ? (
              <p className="data__categories__title__arrow">
                &#9660;
              </p>
            ) : (
                <p className="data__categories__title__arrow">
                  &#9650;
                </p>
              ))}
        </span>
      </section>
    </header >
  );

Header.propTypes = {
  spaceToDisplay: PropTypes.string.isRequired,
  sortBy: PropTypes.string.isRequired,
  isSpacesLoading: PropTypes.bool.isRequired,
  showSpacesMobile: PropTypes.bool.isRequired,
  show: PropTypes.bool.isRequired,
  sortDirection: PropTypes.bool.isRequired,
  showMobileInput: PropTypes.bool.isRequired,
  sortData: PropTypes.func.isRequired,
  handleSpaceListView: PropTypes.func.isRequired,
  handleMobileSpaceListView: PropTypes.func.isRequired,
  handleMobileInput: PropTypes.func.isRequired,
};

export default Header;