import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash.clonedeep';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { store } from '../../state/store';
import { SpaceOpenedModal } from '../../components/Modals';
import AllView from './components/AllView';
import SpaceView from './components/SpaceView';
import Header from './components/Header';
import SpacesList from './components/SpacesList';
import Nav from '../../components/Nav';
import './styles/Spaces.css';
import { sortSpace, extractRow } from '../../utils/funcs';

class Spaces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spaceToDisplay: 'All Data',
      spaceNameOpened: '',
      sortBy: '',
      sortDirection: true,
    };
    this.openSpace = this.openSpace.bind(this);
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    const { hasUpdated } = this.props;
    const { allData } = nextProps;
    if (allData !== this.props.allData && !hasUpdated) {
      this.sortData('name', allData, 'All Data', false);
      store.dispatch({
        type: 'SPACES_HAS_UPDATED',
        hasUpdated: true,
      });
    }
  }

  sortData = (category, updatedData, spaceName, fromSpace) => {
    const { allData, sortedSpace, spaceDataToRender } = this.props;
    const { sortBy, sortDirection } = this.state;

    let updatedSortedSpace = [];

    if (fromSpace || sortBy !== category) {
      // new order of list
      if (spaceName === 'All Data') {
        Object.entries(updatedData || allData).forEach((space) => {
          extractRow(space[1], space[0], updatedSortedSpace);
        });
      } else {
        extractRow(updatedData[spaceName] || allData[spaceName], spaceName, updatedSortedSpace);
      }

      if (updatedSortedSpace.length > 0) sortSpace(updatedSortedSpace, category);
      this.setState({ sortBy: category, spaceToDisplay: spaceName });
      if (!sortDirection) updatedSortedSpace.reverse();
    } else {
      // reverse order of list
      updatedSortedSpace = spaceName === 'All Data' ? sortedSpace.slice() : spaceDataToRender.slice();
      updatedSortedSpace.reverse();
      this.setState({ sortDirection: !sortDirection });
    }

    const key = spaceName === 'All Data' ? 'sortedSpace' : 'spaceDataToRender';
    const dispatchObject = {
      type: 'SPACES_DATA_TO_RENDER_UPDATE',
      [key]: updatedSortedSpace,
    };
    store.dispatch(dispatchObject);
  }

  async openSpace(spaceName) {
    const {
      box,
      allData,
      list,
      spacesOpened,
    } = this.props;
    const {
      sortBy,
      spaceToDisplay,
    } = this.state;

    const updatedAllData = cloneDeep(allData);
    const updatedspacesOpened = cloneDeep(spacesOpened);

    const updateSpaceData = async () => {
      const publicSpace = await box.spaces[spaceName].public.all();
      const privateSpace = await box.spaces[spaceName].private.all();

      updatedAllData[spaceName].public = publicSpace;
      updatedAllData[spaceName].private = privateSpace;
      updatedspacesOpened[spaceName] = true;

      this.setState({ spaceNameOpened: spaceName });
      this.sortData(sortBy, updatedAllData, spaceToDisplay, true);

      store.dispatch({
        type: 'SPACES_DATA_UPDATE',
        list,
        allData: updatedAllData,
      });
      store.dispatch({
        type: 'UI_SPACE_OPENED',
        spacesOpened: updatedspacesOpened,
        showSpaceOpenedModal: true,
      });
      setTimeout(() => {
        store.dispatch({
          type: 'UI_HANDLE_SPACE_OPENED_MODAL',
          showSpaceOpenedModal: false,
        });
      }, 3000);
    };

    const opts = {
      onSyncDone: () => {
        updateSpaceData();
      },
    };
    box.openSpace(spaceName, opts);
  }

  render() {
    const {
      list,
      isSpacesLoading,
      spacesOpened,
      showSpaceOpenedModal,
    } = this.props;

    const {
      spaceToDisplay,
      spaceNameOpened,
      sortBy,
      sortDirection,
    } = this.state;

    return (
      <div>
        <Nav />
        <div className="data__page">
          <ReactCSSTransitionGroup
            transitionName="app__modals"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
          >
            {showSpaceOpenedModal && <SpaceOpenedModal spaceName={spaceNameOpened} />}
          </ReactCSSTransitionGroup>

          <SpacesList
            sortData={this.sortData}
            sortBy={sortBy}
            list={list}
          />

          <main className="dataExplorer">
            <Header
              spaceToDisplay={spaceToDisplay}
              isSpacesLoading={isSpacesLoading}
              sortBy={sortBy}
              sortDirection={sortDirection}
              sortData={this.sortData}
            />

            <section className="data__items">
              {spaceToDisplay === 'All Data'
                ? (
                  <AllView
                    spacesOpened={spacesOpened}
                    openSpace={this.openSpace}
                  />
                )
                : (
                  <SpaceView
                    openSpace={this.openSpace}
                    spacesOpened={spacesOpened}
                    spaceName={spaceToDisplay}
                  />
                )
              }
            </section>
          </main>
        </div>
      </div>
    );
  }
}

Spaces.propTypes = {
  list: PropTypes.array,
  spaceDataToRender: PropTypes.array,
  sortedSpace: PropTypes.array,
  allData: PropTypes.object,
  box: PropTypes.object,
  spacesOpened: PropTypes.object,
  isSpacesLoading: PropTypes.bool,
  showSpaceOpenedModal: PropTypes.bool,
  hasUpdated: PropTypes.bool,
};

Spaces.defaultProps = {
  list: [],
  sortedSpace: [],
  spaceDataToRender: [],
  allData: {},
  box: {},
  spacesOpened: {},
  isSpacesLoading: false,
  showSpaceOpenedModal: false,
  hasUpdated: false,
};

function mapState(state) {
  return {
    list: state.spaces.list,
    allData: state.spaces.allData,
    box: state.myData.box,
    isSpacesLoading: state.uiState.isSpacesLoading,
    spacesOpened: state.uiState.spacesOpened,
    showSpaceOpenedModal: state.uiState.showSpaceOpenedModal,
    currentAddress: state.userState.currentAddress,
    sortedSpace: state.spaces.sortedSpace,
    spaceDataToRender: state.spaces.spaceDataToRender,
    hasUpdated: state.spaces.hasUpdated,
  };
}

export default withRouter(connect(mapState)(Spaces));

// if (spaceName === 'All Data') {
//   store.dispatch({
//     type: 'SPACES_DATA_TO_RENDER_UPDATE',
//     sortedSpace: updatedSortedSpace,
//   });
// } else {
//   store.dispatch({
//     type: 'SPACES_DATA_TO_RENDER_UPDATE',
//     spaceDataToRender: updatedSortedSpace,
//   });
// }