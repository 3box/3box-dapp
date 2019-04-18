import React from 'react';
import PropTypes from 'prop-types';

import Nav from '../../../components/Nav';
import Loading from '../../../assets/Loading.svg';
import Arrow from '../../../assets/Arrow.svg';

import '../styles/Spaces.css';

const SpacesList = ({
  sortData,
  list,
  sortBy,
  spaceToDisplay,
  show,
  hideSpacesMobile,
  handleMobileSpaceListView,
  isSpacesLoading,
  clearSpacesMobile,
}) => (
    <section className={`spaces 
      ${show ? '' : 'closeSpaces'} 
      ${hideSpacesMobile ? 'closeSpaces--mobile' : ''}
      ${clearSpacesMobile ? 'hideSpaces--mobile' : ''}
    `}>
      <div
        className={`space ${spaceToDisplay === 'All Data' ? 'activeSpace' : ''}`}
        onClick={() => {
          sortData(sortBy, false, 'All Data', true);
          handleMobileSpaceListView();
        }}
        role="button"
        onKeyDown={() => {
          sortData(sortBy, false, 'All Data', true);
          handleMobileSpaceListView();
        }}
      >
        <p className="space__name">All Data</p>
        {isSpacesLoading && <img className="data__space__loading--mobile" src={Loading} alt="info" />}
        <span className="space__arrow">
          <img src={Arrow} alt="arrow" />
        </span>
      </div>
      <div className="space__divider--mobile" />
      <div
        className={`space ${spaceToDisplay === '3Box_app' ? 'activeSpace' : ''}`}
        onClick={() => {
          sortData(sortBy, false, '3Box_app', true);
          handleMobileSpaceListView();
        }}
        role="button"
        onKeyDown={() => {
          sortData(sortBy, false, '3Box_app', true);
          handleMobileSpaceListView();
        }}
      >
        <p className="space__name">3Box Profile</p>
        <span className="space__arrow">
          <img src={Arrow} alt="arrow" />
        </span>
      </div>
      <div className="space__divider--mobile" />
      {list && list.map((space, i) => space !== '3Box_app' && (
        <React.Fragment key={`${space}-${i}`}>
          <div
            className={`space ${spaceToDisplay === space ? 'activeSpace' : ''}`}
            onClick={() => {
              sortData(sortBy, false, space, true);
              handleMobileSpaceListView();
            }}
            role="button"
            onKeyDown={() => {
              sortData(sortBy, false, space, true);
              handleMobileSpaceListView();
            }}
            title={space}
          >
            <p className="space__name">{space}</p>
            <span className="space__arrow">
              <img src={Arrow} alt="arrow" />
            </span>
          </div>
          <div className="space__divider--mobile" />
        </React.Fragment>
      ))}
    </section>
  );

SpacesList.propTypes = {
  sortData: PropTypes.func.isRequired,
  handleMobileSpaceListView: PropTypes.func.isRequired,
  list: PropTypes.array.isRequired,
  sortBy: PropTypes.string.isRequired,
  spaceToDisplay: PropTypes.string.isRequired,
  hideSpacesMobile: PropTypes.bool.isRequired,
  show: PropTypes.bool.isRequired,
  isSpacesLoading: PropTypes.bool.isRequired,
  clearSpacesMobile: PropTypes.bool.isRequired,
};

export default SpacesList;