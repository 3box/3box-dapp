import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AllView from './components/AllView';
import SpaceView from './components/SpaceView';
import Columns from './components/Columns';
import SpacesList from './components/SpacesList';
import Nav from '../../components/Nav';
import './styles/Spaces.css';

class Spaces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spaceToRender: 'All Data',
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  pickSpace = (spaceName) => {
    this.setState({ spaceToRender: spaceName });
  }


  openSpace = (spaceName) => {
    const { box } = this.props;
    const updateSpaceData = () => {
      box.spaces[spaceName].public.all().then((entries) => {
        console.log(entries);
      });
      box.spaces[spaceName].private.all().then((entries) => {
        console.log(entries);
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
    const { list, allData } = this.props;
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
            <Columns
              spaceToRender={spaceToRender}
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
};

Spaces.defaultProps = {
  list: [],
  allData: {},
  box: {},
};

function mapState(state) {
  return {
    list: state.spaces.list,
    allData: state.spaces.allData,
    box: state.myData.box,
  };
}

export default withRouter(connect(mapState, {})(Spaces));
