import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash.clonedeep';

import { store } from '../../state/store';
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
    };
    this.openSpace = this.openSpace.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  pickSpace = (spaceName) => {
    this.setState({ spaceToRender: spaceName });
  }

  async openSpace(spaceName) {
    const { box, allData, list } = this.props;
    const updatedAllData = cloneDeep(allData);

    const updateSpaceData = async () => {
      const publicSpace = await box.spaces[spaceName].public.all();
      const privateSpace = await box.spaces[spaceName].private.all();

      console.log('publicSpace', publicSpace);
      console.log('privateSpace', privateSpace);

      updatedAllData[spaceName].public = publicSpace;
      updatedAllData[spaceName].private = privateSpace;

      store.dispatch({
        type: 'MY_SPACES_DATA_UPDATE',
        list,
        allData: updatedAllData,
      });
    };

    const opts = {
      onSyncDone: () => {
        console.log('sync done in space', spaceName);
        updateSpaceData();
      },
    };
    box.openSpace(spaceName, opts);
  }

  render() {
    const { list, allData, isSpacesLoading } = this.props;
    const { spaceToRender } = this.state;

    return (
      <div>
        <Nav />
        <div className="data__page">
          <SpacesList
            pickSpace={this.pickSpace}
            list={list}
          />

          <main className="dataExplorer">
            <Header
              spaceToRender={spaceToRender}
              isSpacesLoading={isSpacesLoading}
            />

            <section className="data__items">
              {spaceToRender === 'All Data'
                ? (
                  <AllView
                    allData={allData}
                    openSpace={this.openSpace}
                  />
                )
                : (
                  <SpaceView
                    openSpace={this.openSpace}
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
  isSpacesLoading: PropTypes.bool,
};

Spaces.defaultProps = {
  list: [],
  allData: {},
  box: {},
  isSpacesLoading: false,
};

function mapState(state) {
  return {
    list: state.spaces.list,
    allData: state.spaces.allData,
    box: state.myData.box,
    isSpacesLoading: state.uiState.isSpacesLoading,
  };
}

export default withRouter(connect(mapState, {})(Spaces));
