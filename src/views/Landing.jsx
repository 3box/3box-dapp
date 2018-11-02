import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import {
  checkWeb3Wallet,
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
  handleAccessModal,
  handleDeniedAccessModal,
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
  ProvideAccessModal,
  AccessDeniedModal,
} from '../components/Modals.jsx';

import ThreeBoxLogo from '../components/ThreeBoxLogo.jsx';
import Nav from '../components/Nav';
import LandingFooter from '../components/LandingFooter.jsx';
import LandingBody from '../components/LandingBody.jsx';
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
    window.scrollY < 10 ?
      this.setState({ retractNav: false })
      :
      this.setState({ retractNav: true });
  }

  async handleSignInUp() {
    this.props.checkWeb3Wallet(); // const { hasWallet, isSignedIntoWallet } = this.props;
    // remove isSignedIntoWallet, accounts, and isLoggedIn from checkWeb3Wallet

    if (typeof window.web3 !== 'undefined' && this.props.isSignedIntoWallet) {
      // await this.props.requestAccess();
      await this.props.signInGetBox();
      await this.props.getActivity('signIn');
      await this.props.getPublicName();
      await this.props.getPublicGithub();
      await this.props.getPublicImage();
      await this.props.getPrivateEmail();

    } else if (typeof window.web3 === 'undefined') {
      this.props.requireMetaMaskModal();
      // this.props.handleMobileWalletModal();
    } else if (typeof window.web3 !== 'undefined' && !this.props.isSignedIntoWallet) {
      this.props.handleRequireWalletLoginModal();
    }
  }

  render() {
    const {
      showErrorModal,
      signInModal,
      errorMessage,
      provideConsent,
      allowAccessModal,
      accessDeniedModal,
      alertRequireMetaMask,
      mobileWalletRequiredModal,
      signInToWalletModal,
    } = this.props;

    const { userAgent: ua } = navigator;
    const isIOS = ua.includes('iPhone'); // const isAndroid = ua.includes('Android');

    const { width } = this.state;
    const isMobile = width <= 600;

    // let signInToWalletError = errorMessage && errorMessage.message && errorMessage.message.substring(0, 58) === 'Error: MetaMask Message Signature: from field is required.';
    let mustConsentError =
      errorMessage && errorMessage.message && errorMessage.message.substring(0, 65) === 'Error: MetaMask Message Signature: User denied message signature.';

    const classHide = this.state.retractNav ? 'hide' : '';

    return (
      <div id="landing">

        {!this.props.isLoggedIn ?
          (<nav id="landing__nav" className={classHide}>
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

        <ProvideAccessModal handleAccessModal={this.props.handleAccessModal} show={allowAccessModal} isMobile={isMobile} />
        <AccessDeniedModal handleDeniedAccessModal={this.props.handleDeniedAccessModal} show={accessDeniedModal} isMobile={isMobile} />

        <ProvideConsentModal closeConsentModal={this.props.closeConsentModal} show={provideConsent} isMobile={isMobile} />
        <RequireMetaMaskModal closeRequireMetaMaskModal={this.props.closeRequireMetaMaskModal} show={alertRequireMetaMask} isMobile={isMobile} />
        <SignInToWalletModal handleRequireWalletLoginModal={this.props.handleRequireWalletLoginModal} show={signInToWalletModal} isMobile={isMobile} />
        <ErrorModal errorMessage={errorMessage} closeErrorModal={this.props.closeErrorModal} show={showErrorModal && !mustConsentError} isMobile={isMobile} />
        <MustConsentModal closeErrorModal={this.props.closeErrorModal} show={mustConsentError} isMobile={isMobile} />
        <MobileWalletRequiredModal isIOS={isIOS} handleMobileWalletModal={this.props.handleMobileWalletModal} show={mobileWalletRequiredModal} isMobile={isMobile} />
        <SignInToThreeBox show={signInModal} handleSignInModal={this.props.handleSignInModal} />


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
  handleAccessModal: PropTypes.func,
  handleDeniedAccessModal: PropTypes.func,
  requireMetaMaskModal: PropTypes.func,
  getPublicGithub: PropTypes.func,
  getPublicName: PropTypes.func,
  getActivity: PropTypes.func,
  signInGetBox: PropTypes.func,
  requestAccess: PropTypes.func,
  checkWeb3Wallet: PropTypes.func,
  getPrivateEmail: PropTypes.func,
  getPublicImage: PropTypes.func,
  closeRequireMetaMaskModal: PropTypes.func,

  showErrorModal: PropTypes.bool,
  signInModal: PropTypes.bool,
  provideConsent: PropTypes.bool,
  allowAccessModal: PropTypes.bool,
  accessDeniedModal: PropTypes.bool,
  hasWallet: PropTypes.bool,
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
  handleAccessModal: handleAccessModal(),
  handleDeniedAccessModal: handleDeniedAccessModal(),
  requireMetaMaskModal: requireMetaMaskModal(),
  getPublicGithub: getPublicGithub(),
  getPublicName: getPublicName(),
  getActivity: getActivity(),
  signInGetBox: signInGetBox(),
  requestAccess: requestAccess(),
  checkWeb3Wallet: checkWeb3Wallet(),
  getPrivateEmail: getPrivateEmail(),
  getPublicImage: getPublicImage(),
  closeRequireMetaMaskModal: closeRequireMetaMaskModal(),

  showErrorModal: false,
  signInModal: false,
  provideConsent: false,
  allowAccessModal: false,
  accessDeniedModal: false,
  alertRequireMetaMask: false,
  mobileWalletRequiredModal: false,
  signInToWalletModal: false,
  hasWallet: false,
  isSignedIntoWallet: false,
  errorMessage: null,
};

const mapState = state => ({
  errorMessage: state.threeBox.errorMessage,
  showErrorModal: state.threeBox.showErrorModal,
  signInModal: state.threeBox.signInModal,
  provideConsent: state.threeBox.provideConsent,
  allowAccessModal: state.threeBox.allowAccessModal,
  accessDeniedModal: state.threeBox.accessDeniedModal,
  hasWallet: state.threeBox.hasWallet,
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
  handleAccessModal,
  handleDeniedAccessModal,
  requireMetaMaskModal,
  getPublicGithub,
  getPublicName,
  getActivity,
  signInGetBox,
  requestAccess,
  checkWeb3Wallet,
  getPrivateEmail,
  getPublicImage,
  closeRequireMetaMaskModal,
  handleRequireWalletLoginModal
})(Landing));
