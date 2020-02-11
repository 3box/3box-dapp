import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { copyThreeId } from '../../../../utils/funcs';

class ThreeId extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { did, copyDIDSuccessful } = this.props;

    return (
      <div className="settings_mainView">
        <p className="settings_mainView_text">
          {`${copyDIDSuccessful ? 'Success' : 'Click to copy'}`}
        </p>

        <div
          className="settings_tile settings_tile-clickableTile"
          onClick={() => copyThreeId(did)}
          onKeyPress={() => copyThreeId(did)}
          tabIndex={0}
          role="button"
        >
          <p>
            {did}
          </p>
        </div>
      </div>
    );
  }
}

ThreeId.propTypes = {
  did: PropTypes.string,
  copyDIDSuccessful: PropTypes.bool,
};

ThreeId.defaultProps = {
  did: '',
  copyDIDSuccessful: false,
};

function mapState(state) {
  return {
    did: state.myData.did,

    copyDIDSuccessful: state.uiState.copyDIDSuccessful,
  };
}

export default connect(mapState)(ThreeId);