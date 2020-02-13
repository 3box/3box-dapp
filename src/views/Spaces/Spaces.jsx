import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash.clonedeep';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { store } from '../../state/store';
import {
  SpaceOpenedModal,
  ViewSpaceDataItemModal,
  DeleteSpaceItemModal,
  OpenSpaceModal,
  ListSpaceItemModal,
  EmptyListItemModal,
} from './components/SpacesModals';
import MyProfileHeaders from '../Profile/MyProfile/MyProfileHeaders';
import { ModalBackground } from '../../components/Modals';
import AllView from './components/AllView';
import SpaceView from './components/SpaceView';
import SortByMobile from './components/SortByMobile';
import Header from './components/Header';
import SpacesList from './components/SpacesList';
import Nav from '../../components/Nav/Nav';
import './styles/Spaces.scss';
import { sortSpace, extractRow } from '../../utils/funcs';
import actions from '../../state/actions';

const { viewSpaceItem } = actions.spaces;
const { getActivity } = actions.profile;

class Spaces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spaceToDisplay: 'All Data',
      spaceNameOpened: '',
      vaultToOpen: '',
      itemToDelete: '',
      spaceNameToDelete: '',
      sortBy: 'lastUpdated',
      width: 700,
      sortDirection: true,
      showSpaceList: true,
      isLoadingVault: false,
      hideSpacesMobile: false,
      showMobileInput: false,
      fadeIn: false,
      fadeOut: false,
    };
    this.openSpace = this.openSpace.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
    this.setState({ width: window.innerWidth });
    const { allData } = this.props;
    this.sortData('lastUpdated', allData, 'All Data', true);
  }

  componentWillReceiveProps(nextProps) {
    const { sortBy, spaceToDisplay } = this.state;
    const { hasUpdated } = this.props;
    const { allData } = nextProps;

    if (allData !== this.props.allData && !hasUpdated) {
      this.sortData(sortBy, allData, spaceToDisplay, true);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  }

  handleSpaceListView = () => {
    const { showSpaceList } = this.state;
    this.setState({ showSpaceList: !showSpaceList });
  }

  handleMobileSpaceListView = () => {
    const { hideSpacesMobile, clearSpacesMobile, showMainMobile } = this.state;

    if (!hideSpacesMobile) {
      this.setState({
        hideSpacesMobile: !hideSpacesMobile,
        showMainMobile: !showMainMobile,
      });
      setTimeout(() => {
        this.setState({ clearSpacesMobile: !clearSpacesMobile });
      }, 500);
    } else {
      this.setState({ clearSpacesMobile: !clearSpacesMobile });
      setTimeout(() => {
        this.setState({ hideSpacesMobile: !hideSpacesMobile });
      }, 20);
      setTimeout(() => {
        this.setState({ showMainMobile: !showMainMobile });
      }, 500);
    }
  }

  handleMobileInput = () => {
    const { showMobileInput } = this.state;
    this.setState({ showMobileInput: !showMobileInput });
  }

  sortData = async (category, updatedData, spaceName, newSort) => {
    try {
      const { allData, sortedSpace, spaceDataToRender } = this.props;
      const { sortBy, sortDirection } = this.state;
      let updatedSortedSpace = [];

      if (newSort || sortBy !== category) {
        if (spaceName === 'All Data') {
          const extractCalls = [];
          Object.entries(updatedData || allData).forEach((space) => {
            const promise = extractRow(space[1], space[0], updatedSortedSpace);
            extractCalls.push(promise);
          });

          const extractPromise = Promise.all(extractCalls);
          await extractPromise;
        } else {
          await extractRow(updatedData[spaceName] || allData[spaceName], spaceName, updatedSortedSpace);
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
      this.spacesDataToRenderUpdate(spaceName, updatedSortedSpace, sortedSpace);
    } catch (err) {
      console.error(err);
    }
  }

  reverseSort = (spaceName) => {
    const { sortedSpace, spaceDataToRender } = this.props;
    const { sortDirection } = this.state;
    let updatedSortedSpace = [];
    updatedSortedSpace = spaceName === 'All Data' ? sortedSpace.slice() : spaceDataToRender.slice();
    updatedSortedSpace.reverse();
    this.setState({ sortDirection: !sortDirection });

    this.spacesDataToRenderUpdate(spaceName, updatedSortedSpace, sortedSpace);
  }

  spacesDataToRenderUpdate = (spaceName, updatedSortedSpace, sortedSpace) => {
    let dispatchObject = {};

    if (spaceName === 'All Data') {
      dispatchObject = {
        type: 'SPACES_DATA_TO_RENDER_UPDATE',
        sortedSpace: updatedSortedSpace,
      };
    } else {
      dispatchObject = {
        type: 'SPACES_DATA_TO_RENDER_UPDATE',
        spaceDataToRender: updatedSortedSpace,
        sortedSpace: sortedSpace.slice(),
      };
    }
    store.dispatch(dispatchObject);
  }

  updateAndSort = (sortBy, updatedAllData, spaceToDisplay, list) => {
    // start fade out
    store.dispatch({
      type: 'SPACES_DATA_UPDATE',
      list,
      allData: updatedAllData,
    });

    // delete
    setTimeout(() => {
      this.sortData(sortBy, updatedAllData, spaceToDisplay, true);
      this.setState({ itemToDelete: '', spaceNameToDelete: '' });
    }, 1500);
  }

  deleteThreeBoxItem = () => {

  }

  async deleteItem(spaceName, key, privacy, listIndex) {
    const {
      box,
      allData,
      list,
      collectiblesFavorites,
      collectiblesFavoritesToRender,
      collection,
    } = this.props;
    const { sortBy, spaceToDisplay } = this.state;
    const updatedAllData = cloneDeep(allData);
    const updatedCollection = collection && collection.slice();
    const updatedCollectiblesFavorites = collectiblesFavorites && collectiblesFavorites.slice();
    const updatedCollectiblesFavoritesToRender = collectiblesFavoritesToRender && collectiblesFavoritesToRender.slice();

    this.setState({ itemToDelete: key, spaceNameToDelete: spaceName });

    if (spaceName === '3Box_app') {
      let proof;
      let keyUppercase;

      if (key === 'verifiedGithub') {
        proof = 'proof_github';
        keyUppercase = 'VERIFIED_GITHUB';
      } else if (key === 'verifiedTwitter') {
        proof = 'proof_twitter';
        keyUppercase = 'VERIFIED_TWITTER';
      } else if (key === 'verifiedEmail') {
        proof = 'proof_email';
        keyUppercase = 'VERIFIED_EMAIL';
      } else {
        keyUppercase = key.toUpperCase();
      }

      if (key === 'collectiblesFavoritesToRender' && updatedCollectiblesFavorites.length === 1) {
        const replaced = updatedCollectiblesFavoritesToRender.splice(0, 1);
        updatedCollection.push(replaced[0]);
        box[privacy].remove('collectiblesFavorites');
        store.dispatch({
          type: 'MY_COLLECTIBLES_UPDATE',
          collection: updatedCollection,
        });
        store.dispatch({
          type: 'MY_COLLECTIBLESFAVORITES_UPDATE',
          collectiblesFavorites: [],
          collectiblesFavoritesToRender: [],
        });
        delete updatedAllData[spaceName][privacy][key];
        this.updateAndSort(sortBy, updatedAllData, spaceToDisplay, list);
      } else if (key === 'collectiblesFavoritesToRender' && typeof listIndex === 'number') {
        updatedCollectiblesFavorites.splice(listIndex, 1);
        const replaced = updatedCollectiblesFavoritesToRender.splice(listIndex, 1);
        updatedCollection.push(replaced[0]);
        updatedAllData['3Box_app'].public.collectiblesFavoritesToRender.splice(listIndex, 1);
        box.public.set('collectiblesFavorites', updatedCollectiblesFavorites);
        store.dispatch({
          type: 'MY_COLLECTIBLESFAVORITES_UPDATE',
          collectiblesFavorites: updatedCollectiblesFavorites,
          collectiblesFavoritesToRender: updatedCollectiblesFavoritesToRender,
        });
        store.dispatch({
          type: 'MY_COLLECTIBLES_UPDATE',
          collection: updatedCollection,
        });
        this.updateAndSort(sortBy, updatedAllData, spaceToDisplay, list);
      } else {
        box[privacy].remove(proof || key);
        store.dispatch({
          type: `MY_${keyUppercase}_UPDATE`,
          [key]: null,
        });
        delete updatedAllData[spaceName][privacy][key];
        this.updateAndSort(sortBy, updatedAllData, spaceToDisplay, list);
      }
    } else if (typeof listIndex === 'number') {
      if (updatedAllData[spaceName][privacy][key].length === 1) {
        box.spaces[spaceName][privacy].remove(key);
        delete updatedAllData[spaceName][privacy][key];
      } else {
        updatedAllData[spaceName][privacy][key].splice(listIndex, 1);
        box.spaces[spaceName][privacy].set(key, updatedAllData[spaceName][privacy][key]);
      }
      this.updateAndSort(sortBy, updatedAllData, spaceToDisplay, list);
    } else {
      box.spaces[spaceName][privacy].remove(key);
      delete updatedAllData[spaceName][privacy][key];
      this.updateAndSort(sortBy, updatedAllData, spaceToDisplay, list);
    }
  }

  async openSpace(spaceName, key, privacy) {
    const {
      box,
      allData,
      list,
      spacesOpened,
      showDeleteItemModal,
    } = this.props;
    const {
      sortBy,
      spaceToDisplay,
    } = this.state;

    this.setState({ isLoadingVault: true, vaultToOpen: spaceName, fadeOut: true });

    const updatedAllData = cloneDeep(allData);
    const updatedspacesOpened = cloneDeep(spacesOpened);

    const updateSpaceData = async () => {
      try {
        const privateSpace = await box.spaces[spaceName].private.all();

        const privateMetadataCalls = [];
        const privateValues = [];

        Object.entries(privateSpace).forEach((value) => {
          const metaData = store.getState().myData.box.spaces[spaceName].private.getMetadata(value[0]);
          privateMetadataCalls.push(metaData);
          privateValues.push([value[0], value[1]]);
        });

        if (privateMetadataCalls.length > 0) {
          const privateMetaDataPromises = Promise.all(privateMetadataCalls);
          const privateMetaData = await privateMetaDataPromises;

          privateValues.forEach((value, i) => {
            privateSpace[value[0]] = {
              timestamp: privateMetaData[i].timestamp,
              value: value[1],
            };
          });
        }

        updatedAllData[spaceName].private = privateSpace;
        updatedspacesOpened[spaceName] = true;

        this.setState({
          spaceNameOpened: spaceName,
          fadeIn: true,
          fadeOut: false,
          isLoadingVault: false,
        });
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

        if (showDeleteItemModal) {
          this.deleteItem(
            spaceName,
            key,
            privacy,
          );
          this.props.viewSpaceItem(false, false, false);
        }

        getActivity();

        setTimeout(() => {
          store.dispatch({
            type: 'UI_HANDLE_SPACE_OPENED_MODAL',
            showSpaceOpenedModal: false,
          });
          this.setState({ fadeIn: false });
        }, 2000);
      } catch (err) {
        this.setState({ fadeIn: false, fadeOut: false, isLoadingVault: false });
        console.error(err);
      }
    };

    const opts = {
      onSyncDone: () => {
        setTimeout(() => {
          updateSpaceData();
        }, 1000);
      },
    };

    try {
      await box.openSpace(spaceName, opts);
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const {
      list,
      isSpacesLoading,
      spacesOpened,
      showSpaceOpenedModal,
      showSpaceDataItemModal,
      spaceItem,
      showDeleteItemModal,
      showOpenSpaceModal,
      did,
      image,
      name,
      currentAddress,
      handleSignInUp,
    } = this.props;

    const {
      spaceToDisplay,
      spaceNameOpened,
      sortBy,
      sortDirection,
      isLoadingVault,
      vaultToOpen,
      showSpaceList,
      hideSpacesMobile,
      showMobileInput,
      width,
      fadeIn,
      fadeOut,
      itemToDelete,
      spaceNameToDelete,
      clearSpacesMobile,
      showMainMobile,
    } = this.state;

    return (
      <>
        <MyProfileHeaders
          image={image}
          name={name}
          currentAddress={currentAddress}
        />

        <div className="data__nav--desktop">
          <Nav handleSignInUp={handleSignInUp} />
        </div>
        <div className="data__page">
          <ReactCSSTransitionGroup
            transitionName="app__modals"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
          >
            {showSpaceOpenedModal && <SpaceOpenedModal spaceName={spaceNameOpened} />}

            {/* threads */}
            {(showSpaceDataItemModal
              && Array.isArray(spaceItem.dataValue)
              && spaceItem.dataValue.length > 0
              && spaceItem.dataKey.substring(0, 7) === 'thread-'
              && spaceItem.rowType !== 'Image')
              && (
                <div className="modal__container list__container">
                  <div className="list__scrollable-wrapper">
                    {(() => {
                      let count = 0;
                      const threadArray = [];

                      if (spaceItem.dataValue.length > 0) {
                        spaceItem.dataValue.forEach((item, i) => {
                          if (item.author === did) {
                            count += 1;
                            threadArray.push([i, item]);
                          }
                        });

                        const injectData = (i, item, total) => (
                          <ListSpaceItemModal
                            viewSpaceItem={this.props.viewSpaceItem}
                            spaceName={spaceItem.spaceName}
                            dataKey={spaceItem.dataKey}
                            rowType="Thread"
                            dataValue={spaceItem.dataValue}
                            privacy={spaceItem.privacy}
                            lastUpdated={spaceItem.lastUpdated}
                            index={i}
                            length={total}
                            item={item}
                            key={`${spaceItem.spaceName}-${spaceItem.dataKey}`}
                          />
                        );

                        return threadArray.map((item, i) => {
                          return injectData(i, item[1], count);
                        });
                      }

                      return <EmptyListItemModal />;
                    })()}
                  </div>
                </div>
              )}

            {/* general array */}
            {(showSpaceDataItemModal
              && Array.isArray(spaceItem.dataValue)
              && spaceItem.dataValue.length > 0
              && spaceItem.dataKey.substring(0, 7) !== 'thread-'
              && spaceItem.rowType !== 'Image')
              && (
                <div className="modal__container list__container">
                  <div className="list__scrollable-wrapper">
                    {spaceItem.dataValue.map((item, i) => (
                      <ListSpaceItemModal
                        viewSpaceItem={this.props.viewSpaceItem}
                        spaceName={spaceItem.spaceName}
                        dataKey={spaceItem.dataKey}
                        rowType="List"
                        dataValue={spaceItem.dataValue}
                        privacy={spaceItem.privacy}
                        lastUpdated={spaceItem.timestamp}
                        index={i}
                        length={spaceItem.dataValue.length}
                        item={item}
                        key={`${spaceItem.spaceName}-${spaceItem.dataKey}`}
                      />
                    ))}
                  </div>
                </div>
              )}

            {(showSpaceDataItemModal
              && !Array.isArray(spaceItem.dataValue)
            )
              && (
                <ViewSpaceDataItemModal
                  viewSpaceItem={this.props.viewSpaceItem}
                  spaceName={spaceItem.spaceName}
                  dataKey={spaceItem.dataKey}
                  rowType={spaceItem.rowType}
                  dataValue={spaceItem.dataValue}
                  privacy={spaceItem.privacy}
                  lastUpdated={spaceItem.timestamp}
                />
              )}

            {(showSpaceDataItemModal
              && Array.isArray(spaceItem.dataValue)
              && spaceItem.rowType === 'Image'
            )
              && (
                <ViewSpaceDataItemModal
                  viewSpaceItem={this.props.viewSpaceItem}
                  spaceName={spaceItem.spaceName}
                  dataKey={spaceItem.dataKey}
                  rowType={spaceItem.rowType}
                  dataValue={spaceItem.dataValue}
                  privacy={spaceItem.privacy}
                  lastUpdated={spaceItem.timestamp}
                />
              )}

            {showDeleteItemModal && (
              <DeleteSpaceItemModal
                spaceItem={spaceItem}
                viewSpaceItem={this.props.viewSpaceItem}
                spacesOpened={spacesOpened}
                openSpace={this.openSpace}
                deleteItem={this.deleteItem}
              />
            )}

            {showOpenSpaceModal && (
              <OpenSpaceModal
                spaceItem={spaceItem}
                viewSpaceItem={this.props.viewSpaceItem}
              />
            )}

            {(showSpaceDataItemModal || showDeleteItemModal || showOpenSpaceModal) && <ModalBackground viewSpaceItem={this.props.viewSpaceItem} />}
          </ReactCSSTransitionGroup>

          <SpacesList
            spaceToDisplay={spaceToDisplay}
            sortData={this.sortData}
            handleMobileSpaceListView={this.handleMobileSpaceListView}
            isSpacesLoading={isSpacesLoading}
            sortBy={sortBy}
            list={list}
            show={showSpaceList}
            hideSpacesMobile={hideSpacesMobile}
            clearSpacesMobile={clearSpacesMobile}
          />

          <main
            className={`
            finderWindow 
            ${showSpaceList ? '' : 'wideDataExplorer'} 
            ${!hideSpacesMobile ? 'outRight' : 'wideDataExplorer--mobile'} 
            ${showMainMobile ? '' : 'clearDataExplorer'}`}
          >
            <Header
              spaceToDisplay={spaceToDisplay}
              isSpacesLoading={isSpacesLoading}
              sortBy={sortBy}
              handleSpaceListView={this.handleSpaceListView}
              handleMobileSpaceListView={this.handleMobileSpaceListView}
              handleMobileInput={this.handleMobileInput}
              sortDirection={sortDirection}
              sortData={this.sortData}
              show={showSpaceList}
              showMobileInput={showMobileInput}
              hideSpacesMobile={hideSpacesMobile}
            />

            <SortByMobile
              spaceToDisplay={spaceToDisplay}
              showMobileInput={showMobileInput}
              handleMobileInput={this.handleMobileInput}
              sortData={this.sortData}
              sortDirection={sortDirection}
              sortBy={sortBy}
            />

            <section className="data__items">
              {spaceToDisplay === 'All Data'
                ? (
                  <AllView
                    spacesOpened={spacesOpened}
                    isLoadingVault={isLoadingVault}
                    vaultToOpen={vaultToOpen}
                    width={width}
                    fadeIn={fadeIn}
                    fadeOut={fadeOut}
                    did={did}
                    spaceNameOpened={spaceNameOpened}
                    itemToDelete={itemToDelete}
                    spaceNameToDelete={spaceNameToDelete}
                    openSpace={this.openSpace}
                  />
                )
                : (
                  <SpaceView
                    openSpace={this.openSpace}
                    isLoadingVault={isLoadingVault}
                    vaultToOpen={vaultToOpen}
                    fadeIn={fadeIn}
                    fadeOut={fadeOut}
                    did={did}
                    width={width}
                    spaceNameOpened={spaceNameOpened}
                    itemToDelete={itemToDelete}
                    spaceNameToDelete={spaceNameToDelete}
                    spacesOpened={spacesOpened}
                    spaceName={spaceToDisplay}
                  />
                )
              }
              <div className="spaceView__gap" />
            </section>
          </main>
        </div>
      </ >
    );
  }
}

Spaces.propTypes = {
  list: PropTypes.array,
  viewSpaceItem: PropTypes.func.isRequired,
  spaceDataToRender: PropTypes.array,
  sortedSpace: PropTypes.array,
  allData: PropTypes.object,
  spaceItem: PropTypes.object,
  box: PropTypes.object,
  spacesOpened: PropTypes.object,
  isSpacesLoading: PropTypes.bool,
  showSpaceOpenedModal: PropTypes.bool,
  showSpaceDataItemModal: PropTypes.bool,
  showDeleteItemModal: PropTypes.bool,
  hasUpdated: PropTypes.bool,
  showOpenSpaceModal: PropTypes.bool,
  did: PropTypes.string,
  name: PropTypes.string,
  currentAddress: PropTypes.string,
  image: PropTypes.array,
};

Spaces.defaultProps = {
  list: [],
  sortedSpace: [],
  spaceDataToRender: [],
  allData: {},
  spaceItem: {},
  box: {},
  spacesOpened: {},
  did: '',
  isSpacesLoading: false,
  showSpaceOpenedModal: false,
  showSpaceDataItemModal: false,
  showOpenSpaceModal: false,
  showDeleteItemModal: false,
  hasUpdated: false,
  name: '',
  currentAddress: '',
  image: null,
};

function mapState(state) {
  return {
    list: state.spaces.list,
    allData: state.spaces.allData,
    box: state.myData.box,
    did: state.myData.did,
    collectiblesFavorites: state.myData.collectiblesFavorites,
    collection: state.myData.collection,
    collectiblesFavoritesToRender: state.myData.collectiblesFavoritesToRender,
    isSpacesLoading: state.uiState.isSpacesLoading,
    spacesOpened: state.uiState.spacesOpened,
    showSpaceOpenedModal: state.uiState.showSpaceOpenedModal,
    currentAddress: state.userState.currentAddress,
    sortedSpace: state.spaces.sortedSpace,
    spaceDataToRender: state.spaces.spaceDataToRender,
    hasUpdated: state.spaces.hasUpdated,
    spaceItem: state.uiState.spaceItem,
    showSpaceDataItemModal: state.uiState.showSpaceDataItemModal,
    showDeleteItemModal: state.uiState.showDeleteItemModal,
    showOpenSpaceModal: state.uiState.showOpenSpaceModal,
    name: state.myData.name,
    image: state.myData.image,
  };
}

export default withRouter(connect(mapState, { viewSpaceItem })(Spaces));