import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import {
  closeErrorModal,
  handleMobileWalletModal,
  handleSignInModal,
  handleRequireWalletLoginModal,
  handleConsentModal,
  closeRequireMetaMaskModal,
} from '../state/actions-modals';

import {
  ProvideConsentModal,
  RequireMetaMaskModal,
  SignInToThreeBox,
  MobileWalletRequiredModal,
  ErrorModal,
  MustConsentModal,
  SignInToWalletModal,
} from '../components/Modals';

import Footer from '../components/Footer';
import LandingBody from '../components/LandingBody';
import './styles/Landing.css';
import '../components/styles/ProfileCard.css';
import '../components/styles/Nav.css';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  render() {
    const {
      showErrorModal,
      signInModal,
      errorMessage,
      provideConsent,
      alertRequireMetaMask,
      mobileWalletRequiredModal,
      signInToWalletModal,
      isLoggedIn,
      handleSignInUp,
    } = this.props;

    const {
      width,
    } = this.state;

    const { userAgent: ua } = navigator;
    const isIOS = ua.includes('iPhone');
    const isMobile = width <= 600;
    const mustConsentError = errorMessage && errorMessage.message && errorMessage.message.substring(0, 65) === 'Error: MetaMask Message Signature: User denied message signature.';

    return (
      <div id="landing">

        <ProvideConsentModal
          handleConsentModal={this.props.handleConsentModal}
          show={provideConsent}
          isMobile={isMobile}
        />

        <RequireMetaMaskModal
          closeRequireMetaMaskModal={this.props.closeRequireMetaMaskModal}
          show={alertRequireMetaMask}
          isMobile={isMobile}
        />

        <SignInToWalletModal
          handleRequireWalletLoginModal={this.props.handleRequireWalletLoginModal}
          show={signInToWalletModal}
          isMobile={isMobile}
        />

        <ErrorModal
          errorMessage={errorMessage}
          closeErrorModal={this.props.closeErrorModal}
          show={showErrorModal && !mustConsentError}
          isMobile={isMobile}
        />

        <MustConsentModal
          closeErrorModal={this.props.closeErrorModal}
          show={mustConsentError}
          isMobile={isMobile}
        />

        <MobileWalletRequiredModal
          isIOS={isIOS}
          handleMobileWalletModal={this.props.handleMobileWalletModal}
          show={mobileWalletRequiredModal}
          isMobile={isMobile}
        />

        <SignInToThreeBox
          show={signInModal}
          handleSignInModal={this.props.handleSignInModal}
        />

        <LandingBody
          isLoggedIn={isLoggedIn}
          handleSignInUp={handleSignInUp}
        />

        <Footer
          handleSignInUp={handleSignInUp}
          isLoggedIn={isLoggedIn}
        />
      </div>
    );
  }
}

Landing.propTypes = {
  closeErrorModal: PropTypes.func,
  handleMobileWalletModal: PropTypes.func,
  handleSignInModal: PropTypes.func,
  handleSignInUp: PropTypes.func.isRequired,
  handleRequireWalletLoginModal: PropTypes.func,
  handleConsentModal: PropTypes.func,
  closeRequireMetaMaskModal: PropTypes.func,

  showErrorModal: PropTypes.bool,
  signInModal: PropTypes.bool,
  provideConsent: PropTypes.bool,
  alertRequireMetaMask: PropTypes.bool,
  mobileWalletRequiredModal: PropTypes.bool,
  signInToWalletModal: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  downloadBanner: PropTypes.bool,
  errorMessage: PropTypes.string,
};

Landing.defaultProps = {
  closeErrorModal: closeErrorModal(),
  handleMobileWalletModal: handleMobileWalletModal(),
  handleSignInModal: handleSignInModal(),
  handleRequireWalletLoginModal: handleRequireWalletLoginModal(),
  handleConsentModal: handleConsentModal(),
  closeRequireMetaMaskModal: closeRequireMetaMaskModal(),

  showErrorModal: false,
  signInModal: false,
  provideConsent: false,
  alertRequireMetaMask: false,
  mobileWalletRequiredModal: false,
  signInToWalletModal: false,
  isLoggedIn: false,
  downloadBanner: false,
  errorMessage: '',
};

const mapState = state => ({
  signInModal: state.threeBox.signInModal,
  provideConsent: state.threeBox.provideConsent,
  alertRequireMetaMask: state.threeBox.alertRequireMetaMask,
  mobileWalletRequiredModal: state.threeBox.mobileWalletRequiredModal,
  signInToWalletModal: state.threeBox.signInToWalletModal,
  downloadBanner: state.threeBox.downloadBanner,
});

export default withRouter(connect(mapState, {
  closeErrorModal,
  handleMobileWalletModal,
  handleSignInModal,
  handleConsentModal,
  closeRequireMetaMaskModal,
  handleRequireWalletLoginModal,
})(Landing));
