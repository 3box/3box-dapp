import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

export function Block(props) {
  const {
    intl,
    web3 = null,
  } = props;
  const web3Status = web3 ? 'Connected' : 'NotConnected';
  return (
    <header className="App-header">
      <h1 className="App-title">
        {intl.formatMessage({ id: web3Status })}
      </h1>
    </header>
  );
}

Block.propTypes = {
  web3: PropTypes.object,
  intl: PropTypes.object.isRequired,
};

Block.defaultProps = {
  web3: null,
};

export default injectIntl(Block);
