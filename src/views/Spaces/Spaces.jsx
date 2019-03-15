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

class Spaces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spaceToRender: 'All Data',
      spaceNameOpened: '',
      sortBy: 'Name',
      sortDirection: true,
      sortedSpace: [],
    };
    this.openSpace = this.openSpace.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  pickSpace = (spaceName) => {
    this.setState({ spaceToRender: spaceName });
  }

  pickSortBy = (category) => {
    const { sortBy, sortDirection } = this.state;
    console.log(category, sortDirection);
    if (category === sortBy) {
      this.setState({ sortDirection: !sortDirection });
    } else {
      this.setState({ sortBy: category, sortDirection: true });
    }
    this.sortSpace();
  }

  sortSpace = () => {
    this.setState({ sortedSpace: [] });
  }

  async openSpace(spaceName) {
    const { box, allData, list, spacesOpened } = this.props;
    const updatedAllData = cloneDeep(allData);
    const updatedspacesOpened = cloneDeep(spacesOpened);

    const updateSpaceData = async () => {
      const publicSpace = await box.spaces[spaceName].public.all();
      const privateSpace = await box.spaces[spaceName].private.all();

      updatedAllData[spaceName].public = publicSpace;
      updatedAllData[spaceName].private = privateSpace;
      updatedspacesOpened[spaceName] = true;

      this.setState({ spaceNameOpened: spaceName })
      store.dispatch({
        type: 'MY_SPACES_DATA_UPDATE',
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
    const { list, allData, isSpacesLoading, spacesOpened, showSpaceOpenedModal } = this.props;
    const { spaceToRender, spaceNameOpened, sortBy, sortDirection } = this.state;

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
              spaceToRender={spaceToRender}
              isSpacesLoading={isSpacesLoading}
              sortBy={sortBy}
              sortDirection={sortDirection}
              pickSortBy={this.pickSortBy}
            />

            <section className="data__items">
              {spaceToRender === 'All Data'
                ? (
                  <AllView
                    allData={allData}
                    spacesOpened={spacesOpened}
                    openSpace={this.openSpace}
                  />
                )
                : (
                  <SpaceView
                    openSpace={this.openSpace}
                    spacesOpened={spacesOpened}
                    spaceName={spaceToRender}
                    spaceData={allData[spaceToRender]}
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
  };
}

export default withRouter(connect(mapState, {})(Spaces));
