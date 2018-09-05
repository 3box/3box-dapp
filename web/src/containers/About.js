import { connect } from 'react-redux';

import About from '../views/About';

function mapState(state) {
  return {
    web3: state.web3.web3,
  };
}

function mapDispatch(/* dispatch */) {
  return {};
}

export default connect(mapState, mapDispatch)(About);
