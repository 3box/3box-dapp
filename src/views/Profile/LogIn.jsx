import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

import ThreeBoxLogoBlack from '../../assets/ThreeBoxLogoBlack.svg';
import Loading from '../../assets/Loading.svg';
import './styles/LogIn.scss';

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDirectLogin: false,
      directLoginWallet: '',
    };
  }

  componentDidMount() {
    const { handleSignInUp, location: { search } } = this.props;
    const queryParams = queryString.parse(search);
    if (search) {
      this.setState({
        isDirectLogin: true,
        directLoginWallet: queryParams.wallet.toUpperCase(),
      });
    } else {
      handleSignInUp(true);
    }
  }

  componentWillUnmount() {
    const { web3Connect, web3Obj } = this.props;
    if (!web3Obj.eth) web3Connect.toggleModal();
  }

  render() {
    const { isDirectLogin, directLoginWallet } = this.state;
    if (isDirectLogin) {
      return (
        <div className="modal__container">
          <div className="modal standardModal">
            <img src={ThreeBoxLogoBlack} alt="Loading" className="login_3box" />
            <p className="login_text">
              {`LOGGING IN WITH ${directLoginWallet}`}
            </p>
            <img src={Loading} alt="Loading" id="modal__loadingGraphic--access" />
          </div>
        </div>
      );
    }

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
  web3Obj: PropTypes.object,
  handleSignInUp: PropTypes.func.isRequired,
};

LogIn.defaultProps = {
  location: {},
  web3Connect: {},
  web3Obj: {},
};

const mapState = (state) => ({
  isLoggedIn: state.userState.isLoggedIn,
  web3Connect: state.userState.web3Connect,
  web3Obj: state.userState.web3Obj,
});

export default withRouter(connect(mapState)(LogIn));