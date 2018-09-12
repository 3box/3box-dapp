import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './styles/Modal.css';

const Modal = props => (
  <div className="container">
    <div className="modal">
      <p>stuff</p>
      <button onClick={() => console.log(props)} type="button">close</button>
    </div>
  </div>
);

function mapState(state) {
  return {
    threeBox: state.threeBox,
    name: state.name,
    github: state.github,
  };
}

function mapDispatch(/* dispatch */) {
  return {};
}

export default connect(mapState, mapDispatch)(Modal);
