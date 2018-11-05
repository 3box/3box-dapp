import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import {
  checkWeb3Wallet,
  checkNetwork,
  getPrivateEmail,
  getPublicImage,
  getPublicGithub,
  getPublicName,
  getActivity,
  signInGetBox,
  requestAccess,
} from '../state/actions';

import {
  closeErrorModal,
  handleMobileWalletModal,
  handleSignInModal,
  handleRequireWalletLoginModal,
  closeConsentModal,
  requireMetaMaskModal,
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

import ThreeBoxLogo from '../components/ThreeBoxLogo';
import Nav from '../components/Nav';
import LandingFooter from '../components/LandingFooter';
import LandingBody from '../components/LandingBody';
import './styles/Landing.css';
import '../components/styles/ProfileCard.css';
import '../components/styles/Nav.css';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      retractNav: false,
      width: window.innerWidth,
    };
    this.handleSignInUp = this.handleSignInUp.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.hideBar);
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.hideBar);
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  hideBar = () => {
    if (window.scrollY < 10) {
      this.setState({ retractNav: false });
    } else {
      this.setState({ retractNav: true });
    }
  }

  async handleSignInUp() {
    if (typeof window.web3 !== 'undefined') {
      await this.props.checkWeb3Wallet();
      await this.props.checkNetwork();
      await this.props.requestAccess();

      if (this.props.isSignedIntoWallet) {
        await this.props.signInGetBox();
        if (!this.props.showErrorModal) {
          await this.props.getActivity('signIn');
          await this.props.getPublicName();
          await this.props.getPublicGithub();
          await this.props.getPublicImage();
          await this.props.getPrivateEmail();
        }
      } else if (!this.props.isSignedIntoWallet && !this.props.accessDeniedModal) {
        this.props.handleRequireWalletLoginModal();
      }
    } else if (typeof window.web3 === 'undefined') {
      this.props.requireMetaMaskModal();
      this.props.handleMobileWalletModal();
    }
  }

  render() {
    const {
      showErrorModal,
      signInModal,
      errorMessage,
      provideConsent,
      alertRequireMetaMask,
      mobileWalletRequiredModal,
      signInToWalletModal,
    } = this.props;
    
    const {
      width,
      retractNav,
    } = this.state;

    const { userAgent: ua } = navigator;
    const isIOS = ua.includes('iPhone'); // const isAndroid = ua.includes('Android');
    const isMobile = width <= 600;
    const mustConsentError = errorMessage && errorMessage.message && errorMessage.message.substring(0, 65) === 'Error: MetaMask Message Signature: User denied message signature.';
    const classHide = retractNav ? 'hide' : '';

    // let signInToWalletError = errorMessage && errorMessage.message &&
    // errorMessage.message.substring(0, 58) === 'Error: MetaMask Message Signature: 
    // from field is required.';

    return (
      <div id="landing">

        {!this.props.isLoggedIn
          ? (
            <nav id="landing__nav" className={classHide}>
              <div id="nav__logo--marginLeft">
                <ThreeBoxLogo />
              </div>
              <div id="actionButtons">
                <p onClick={this.handleSignInUp}>Sign in</p>
                <button onClick={this.handleSignInUp} className="secondaryButton" type="button">
                  Create profile
                </button>
              </div>
            </nav>)
          : (
            <Nav />
          )}

        <ProvideConsentModal
          closeConsentModal={this.props.closeConsentModal}
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
          show={mustConsentError} isMobile={isMobile}
        />

        <MobileWalletRequiredModal isIOS={isIOS}
          handleMobileWalletModal={this.props.handleMobileWalletModal}
          show={mobileWalletRequiredModal}
          isMobile={isMobile}
        />

        <SignInToThreeBox
          show={signInModal}
          handleSignInModal={this.props.handleSignInModal}
        />


        <LandingBody
          isLoggedIn={this.props.isLoggedIn}
          handleSignInUp={this.handleSignInUp}
        />

        <LandingFooter />
      </div>
    );
  }
}

Landing.propTypes = {
  closeErrorModal: PropTypes.func,
  handleMobileWalletModal: PropTypes.func,
  handleSignInModal: PropTypes.func,
  handleRequireWalletLoginModal: PropTypes.func,
  closeConsentModal: PropTypes.func,
  requireMetaMaskModal: PropTypes.func,
  getPublicGithub: PropTypes.func,
  getPublicName: PropTypes.func,
  getActivity: PropTypes.func,
  signInGetBox: PropTypes.func,
  requestAccess: PropTypes.func,
  checkWeb3Wallet: PropTypes.func,
  checkNetwork: PropTypes.func,
  getPrivateEmail: PropTypes.func,
  getPublicImage: PropTypes.func,
  closeRequireMetaMaskModal: PropTypes.func,

  showErrorModal: PropTypes.bool,
  signInModal: PropTypes.bool,
  provideConsent: PropTypes.bool,
  accessDeniedModal: PropTypes.bool,
  isSignedIntoWallet: PropTypes.bool,
  alertRequireMetaMask: PropTypes.bool,
  mobileWalletRequiredModal: PropTypes.bool,
  signInToWalletModal: PropTypes.bool,
  errorMessage: PropTypes.object,
};

Landing.defaultProps = {
  closeErrorModal: closeErrorModal(),
  handleMobileWalletModal: handleMobileWalletModal(),
  handleSignInModal: handleSignInModal(),
  handleRequireWalletLoginModal: handleRequireWalletLoginModal(),
  closeConsentModal: closeConsentModal(),
  requireMetaMaskModal: requireMetaMaskModal(),
  getPublicGithub: getPublicGithub(),
  getPublicName: getPublicName(),
  getActivity: getActivity(),
  signInGetBox: signInGetBox(),
  requestAccess: requestAccess(),
  checkWeb3Wallet: checkWeb3Wallet(),
  checkNetwork: checkNetwork(),
  getPrivateEmail: getPrivateEmail(),
  getPublicImage: getPublicImage(),
  closeRequireMetaMaskModal: closeRequireMetaMaskModal(),

  showErrorModal: false,
  signInModal: false,
  provideConsent: false,
  accessDeniedModal: false,
  alertRequireMetaMask: false,
  mobileWalletRequiredModal: false,
  signInToWalletModal: false,
  isSignedIntoWallet: false,
  errorMessage: null,
};

const mapState = state => ({
  errorMessage: state.threeBox.errorMessage,
  showErrorModal: state.threeBox.showErrorModal,
  signInModal: state.threeBox.signInModal,
  provideConsent: state.threeBox.provideConsent,
  accessDeniedModal: state.threeBox.accessDeniedModal,
  isSignedIntoWallet: state.threeBox.isSignedIntoWallet,
  alertRequireMetaMask: state.threeBox.alertRequireMetaMask,
  mobileWalletRequiredModal: state.threeBox.mobileWalletRequiredModal,
  signInToWalletModal: state.threeBox.signInToWalletModal,
  isLoggedIn: state.threeBox.isLoggedIn,
});

export default withRouter(connect(mapState, {
  closeErrorModal,
  handleMobileWalletModal,
  handleSignInModal,
  closeConsentModal,
  requireMetaMaskModal,
  getPublicGithub,
  getPublicName,
  getActivity,
  signInGetBox,
  requestAccess,
  checkWeb3Wallet,
  checkNetwork,
  getPrivateEmail,
  getPublicImage,
  closeRequireMetaMaskModal,
  handleRequireWalletLoginModal,
})(Landing));
