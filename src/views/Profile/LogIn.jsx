import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import './styles/LogIn.css';

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { handleSignInUp } = this.props;
    handleSignInUp(true);
  }

  componentWillUnmount() {
    const { web3Connect } = this.props;
    web3Connect.toggleModal();
  }

  render() {
    return (
      <div className="login">
        <div className="mock_web3c">
          <h2>Sign in to 3Box Hub</h2>
        </div>
      </div>
    );
  }
}

LogIn.propTypes = {
  location: PropTypes.object,
  web3Connect: PropTypes.object,
  handleSignInUp: PropTypes.func.isRequired,
};

LogIn.defaultProps = {
  location: {},
  web3Connect: {},
};

const mapState = state => ({
  isLoggedIn: state.userState.isLoggedIn,
  web3Connect: state.userState.web3Connect,
});

export default withRouter(connect(mapState)(LogIn));