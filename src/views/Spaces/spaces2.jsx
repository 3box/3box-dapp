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
      sortedSpace: [],
      spaceDataToRender: [],
    };
    this.openSpace = this.openSpace.bind(this);
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    const { allData } = nextProps;
    if (allData !== this.props.allData) this.sortAllData('name', allData);
  }

  pickSpace = (spaceName) => {
    const { sortBy } = this.state;
    this.setState({ spaceToDisplay: spaceName }, this.sortAllData(sortBy, false, spaceName, true));
  }

  pickSortBy = (sortBy) => {
    const { spaceToDisplay } = this.state;
    this.setState({ sortBy }, this.sortAllData(sortBy, false, spaceToDisplay));
  }

  sortAllData = (category, nextPropsAllData, spaceName, fromSpace) => {
    const { allData } = this.props;
    const {
      sortedSpace,
      sortBy,
      sortDirection,
      spaceToDisplay,
      spaceDataToRender,
    } = this.state;

    let updatedSortedSpace = [];

    console.log('fromSpace', fromSpace);
    console.log('spaceName', spaceName);

    if (fromSpace || sortBy !== category) {
      if (spaceName === 'All Data' || spaceToDisplay === 'All Data') {
        Object.entries(nextPropsAllData || allData).forEach((space) => {
          extractRow(space[1], space[0], updatedSortedSpace);
        });
      } else {
        extractRow(allData[spaceName || spaceToDisplay], spaceName || spaceToDisplay, updatedSortedSpace);
      }

      console.log('updatedSortedSpace 1', updatedSortedSpace);

      if (updatedSortedSpace.length > 0) sortSpace(updatedSortedSpace, category);
      this.setState({ sortBy: category, sortDirection: true });
    } else if (spaceName === 'All Data' || spaceToDisplay === 'All Data') {
      updatedSortedSpace = sortedSpace.reverse();
      this.setState({ sortDirection: !sortDirection });
    } else {
      updatedSortedSpace = spaceDataToRender.reverse();
      this.setState({ sortDirection: !sortDirection });
    }

    console.log('updatedSortedSpace 2', updatedSortedSpace);

    if (spaceName === 'All Data' || spaceToDisplay === 'All Data') {
      this.setState({ sortedSpace: updatedSortedSpace });
    } else {
      this.setState({ spaceDataToRender: updatedSortedSpace });
    }
  }

  async openSpace(spaceName) {
    const {
      box,
      allData,
      list,
      spacesOpened,
    } = this.props;

    const updatedAllData = cloneDeep(allData);
    const updatedspacesOpened = cloneDeep(spacesOpened);

    const updateSpaceData = async () => {
      const publicSpace = await box.spaces[spaceName].public.all();
      const privateSpace = await box.spaces[spaceName].private.all();

      updatedAllData[spaceName].public = publicSpace;
      updatedAllData[spaceName].private = privateSpace;
      updatedspacesOpened[spaceName] = true;

      this.setState({ spaceNameOpened: spaceName });
      store.dispatch({
        type: 'SPACES_DATA_UPDATE',
        list,
        allData: updatedAllData,
      }, this.sortAllData());
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
      sortedSpace,
      spaceDataToRender,
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
            pickSpace={this.pickSpace}
            list={list}
          />

          <main className="dataExplorer">
            <Header
              spaceToDisplay={spaceToDisplay}
              isSpacesLoading={isSpacesLoading}
              sortBy={sortBy}
              sortDirection={sortDirection}
              pickSortBy={this.pickSortBy}
            />

            <section className="data__items">
              {spaceToDisplay === 'All Data'
                ? (
                  <AllView
                    spacesOpened={spacesOpened}
                    sortedSpace={sortedSpace}
                    openSpace={this.openSpace}
                  />
                )
                : (
                  <SpaceView
                    openSpace={this.openSpace}
                    spacesOpened={spacesOpened}
                    spaceName={spaceToDisplay}
                    sortedSpace={spaceDataToRender}
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
  allData: PropTypes.object,
  box: PropTypes.object,
  spacesOpened: PropTypes.object,
  isSpacesLoading: PropTypes.bool,
  showSpaceOpenedModal: PropTypes.bool,
};

Spaces.defaultProps = {
  list: [],
  allData: {},
  box: {},
  spacesOpened: {},
  isSpacesLoading: false,
  showSpaceOpenedModal: false,
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
  };
}

export default withRouter(connect(mapState)(Spaces));
