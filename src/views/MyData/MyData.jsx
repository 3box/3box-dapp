import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Info from '../../assets/Details.svg';
import Nav from '../../components/Nav';
import './styles/MyData.css';

class MyData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // dataItems: [],
      spaceToRender: 'All Data',
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  pickSpace = (spaceName) => {
    this.setState({ spaceToRender: spaceName });
  }

  render() {
    const { spaces, spaceData } = this.props;
    const { spaceToRender } = this.state;

    return (
      <div>
        <Nav />
        <div className="data__page">
          <section className="spaces">
            <div
              className="space"
              onClick={() => this.pickSpace('All Data')}
              role="button"
              onKeyDown={() => this.pickSpace('All Data')}
              tabIndex={0}
            >
              <p className="space__name">All data</p>
              <span className="space__arrow">&#x3e;</span>
            </div>

            <div
              className="space"
              onClick={() => this.pickSpace('3Box')}
              role="button"
              onKeyDown={() => this.pickSpace('3Box')}
              tabIndex={0}
            >
              <p className="space__name">3Box</p>
              <span className="space__arrow">&#x3e;</span>
            </div>

            {spaces && spaces.map(space => (
              <div
                className="space"
                onClick={() => this.pickSpace(space)}
                role="button"
                onKeyDown={() => this.pickSpace(space)}
                tabIndex={0}
              >
                <p className="space__name">{space}</p>
                <span className="space__arrow">&#x3e;</span>
              </div>
            ))}
          </section>

          <main className="dataExplorer">
            <section className="data__space">
              <h2 className="data__space__title">{spaceToRender}</h2>
              <img className="data__space__info" src={Info} alt="info" />
            </section>

            <section className="data__categories">
              <span className="data__categories__title">Name</span>
              <span className="data__categories__title">Content</span>
              <span className="data__categories__title">Space</span>
              <span className="data__categories__title">Type</span>
              <span className="data__categories__title">Privacy</span>
              <span className="data__categories__title">Last Updated</span>
            </section>

            <section className="data__items">
              {spaceData[spaceToRender] && Object.entries(spaceData[spaceToRender]).map(row => (
                <div className="data__items__row">
                  <span className="data__items__row__entry">{row[0]}</span>
                  <span className="data__items__row__entry">{row[1]}</span>
                </div>
              ))}
            </section>
          </main>
        </div>
      </div>
    );
  }
}

MyData.propTypes = {
  spaces: PropTypes.array,
  spaceData: PropTypes.object,
};

MyData.defaultProps = {
  spaces: [],
  spaceData: {},
};

function mapState(state) {
  return {
    spaces: state.myData.spaces,
    spaceData: state.myData.spaceData,
  };
}

export default withRouter(connect(mapState, {})(MyData));
