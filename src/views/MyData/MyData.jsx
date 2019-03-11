import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux'

import Info from '../../assets/Details.svg';
import Nav from '../../components/Nav';
import './styles/MyData.css';

class MyData extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div>
        <Nav />
        <div className="data__page">
          <section className="spaces">
            <div className="space">
              <p className="space__name">All data</p>
              <span className="space__arrow">&#x3e;</span>
            </div>

            <div className="space">
              <p className="space__name">3Box</p>
              <span className="space__arrow">&#x3e;</span>
            </div>
          </section>

          <main className="dataExplorer">
            <section className="data__space">
              <h2 className="data__space__title">ALL DATA</h2>
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
              <div className="data__items__row">
                File
              </div>
              <div className="data__items__row">
                File
              </div>
              <div className="data__items__row">
                File
              </div>
              <div className="data__items__row">
                File
              </div>
              <div className="data__items__row">
                File
              </div>
              <div className="data__items__row">
                File
              </div>
              <div className="data__items__row">
                File
              </div>
            </section>
          </main>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  return {
  };
}

export default withRouter(connect(mapState, {})(MyData));
