import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ThreeId extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copyDIDSuccessful: false,
    };
  }

  copyThreeId = (did) => {
    const textArea = document.createElement('textarea');

    textArea.value = did;

    document.body.appendChild(textArea);
    textArea.focus({
      preventScroll: true,
    });
    textArea.select();
    document.execCommand('copy');

    setTimeout(() => {
      this.setState({ copyDIDSuccessful: true });
    }, 1);
    setTimeout(() => {
      this.setState({ copyDIDSuccessful: false });
    }, 2000);

    document.body.removeChild(textArea);
  }

  render() {
    const { did } = this.props;
    const { copyDIDSuccessful } = this.state;

    return (
      <div className="settings_mainView">
        <div className="settings_tile_context">
          <p
            className="settings_mainView_text"
          >
            Learn more about
            <a
              className="settings_mainView_text-3id"
              href="https://docs.3box.io/faq/data-identity#how-does-3box-use-decentralized-identity"
              target="_blank"
              rel="noopener noreferrer"
            >
              3ID
            </a>
          </p>
        </div>

        <div
          className="settings_tile settings_tile-clickableTile"
          onClick={() => this.copyThreeId(did)}
          onKeyPress={() => this.copyThreeId(did)}
          tabIndex={0}
          role="button"
        >
          <p>
            {did}
          </p>
        </div>

        <p className="settings_mainView_text">
          {`${copyDIDSuccessful ? 'Success' : 'Click to copy'}`}
        </p>
      </div>
    );
  }
}

ThreeId.propTypes = {
  did: PropTypes.string,
};

ThreeId.defaultProps = {
  did: '',
};

function mapState(state) {
  return {
    did: state.myData.did,
  };
}

export default connect(mapState)(ThreeId);