import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import {
  signInUp,
  checkForWeb3Wallet,
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
} from '../components/Modals.jsx';

import ThreeBoxLogo from '../components/ThreeBoxLogo.jsx';
import Nav from '../components/Nav';
import ProfileCard from '../components/ProfileCard.jsx';
import LandingFooter from '../components/LandingFooter.jsx';
import illustration from '../assets/Dapp.svg';
import Cristobal from '../assets/Cristobal.png';
import Michael from '../assets/Michael.png';
import Christian from '../assets/Christian.jpg';
import ConsensysSVG from '../assets/consensys.svg';
import ThreeBoxGraphic from '../assets/3BoxGraphic.png';
import PartnersBG from '../assets/PartnersBG.svg';
import consensys from '../assets/consensys.png';
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
    this.props.checkForWeb3Wallet(); // const { hasWallet, isSignedIntoWallet } = this.props;

    if (typeof window.web3 !== 'undefined' && this.props.isSignedIntoWallet) {
      await this.props.signInUp();
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

        <ProvideConsentModal closeConsentModal={this.props.closeConsentModal} show={provideConsent} isMobile={isMobile} />
        <RequireMetaMaskModal closeRequireMetaMaskModal={this.props.closeRequireMetaMaskModal} show={alertRequireMetaMask} isMobile={isMobile} />
        <SignInToWalletModal handleRequireWalletLoginModal={this.props.handleRequireWalletLoginModal} show={signInToWalletModal} isMobile={isMobile} />
        <ErrorModal errorMessage={errorMessage} closeErrorModal={this.props.closeErrorModal} show={showErrorModal && !mustConsentError} isMobile={isMobile} />
        <MustConsentModal closeErrorModal={this.props.closeErrorModal} show={mustConsentError} isMobile={isMobile} />
        <MobileWalletRequiredModal isIOS={isIOS} handleMobileWalletModal={this.props.handleMobileWalletModal} show={mobileWalletRequiredModal} isMobile={isMobile} />
        <SignInToThreeBox show={signInModal} handleSignInModal={this.props.handleSignInModal} />

        <img src={ThreeBoxGraphic} id="threeBoxGraphic" alt="ThreeBox Graphic" />

        <div id="landing__splash" className={this.props.isLoggedIn ? "removeBottomMargin" : undefined}>

          <div id="landing__createProfile">
            <h1 className="ae-1 landing__createProfile--text">Create an Ethereum Profile</h1>
            <p className="lightOpacity thin landing__createProfile--subtext">Add your information once and share it across dapps.</p>
            <div id="consensys">
              <p className="lightOpacity thin">By </p>
              <img src={consensys} alt="Consensys Logo" />
            </div>

            {!this.props.isLoggedIn && (
              <div id="landing__button--center">
                <button id="landing__createProfileButton" type="button" onClick={this.handleSignInUp}>
                  Create Profile
                </button>
              </div>)}
          </div>

          <div id="landing__profileCard">
            <div id="landing__profileCard--margin">
              <ProfileCard />
            </div>
          </div>

        </div>

        <div id="landing__trustedPartners">
          <h3 className="lightOpacity thin">TRUSTED BY PARTNERS</h3>
          <div id="landing__partnerList">
            <img src={ConsensysSVG} className="partnerCos" alt="Partners background" />
          </div>
          <img src={PartnersBG} id="trustedPartners--bg" alt="Partners background" />
        </div>

        <img src={ThreeBoxGraphic} id="threeBoxGraphic2" alt="ThreeBox Graphic" />

        <div id="landing__build">

          <h2>Build with 3Box</h2>
          <p className="lightOpacity thin">Scalable, open source, distributed database infrastructure for Ethereum.</p>
          <a href="https://github.com/uport-project/3box">
            <button >Get started</button>
          </a>

          <div className="build__section">
            <div className="build__section__text">
              <div className="build__section__content">
                <h3>Ethereum Profiles API</h3>
                <p className="lightOpacity thin">Profiles API makes it easy to get and set information about users, with support for public and private data..</p>
                <a href="https://github.com/uport-project/3box-js"><button >Profiles API</button></a>
              </div>
            </div>

            <div className="build__graphic__profiles">

              <div id="Michael" className="profileCardSmall">
                <img src={Michael} className="profileCardSmall__user__picture" alt="profile" />
                <div className="profileCardSmall__user__info">

                  <h4 className="profileCardSmall__user__name">Michael Sena</h4>

                  <div id="profile__network__icon" />
                  <p className="profileCardSmall__address">0x123456789</p>
                </div>
              </div>

              <div id="Christian" className="profileCardSmall">
                <img src={Christian} className="profileCardSmall__user__picture" alt="profile" />
                <div className="profileCardSmall__user__info">

                  <h4 className="profileCardSmall__user__name">Christian Lundkvist</h4>

                  <div id="profile__network__icon" />
                  <p className="profileCardSmall__address">0x123456789</p>
                </div>
              </div>

              <div id="Cristobal" className="profileCardSmall">
                <img src={Cristobal} className="profileCardSmall__user__picture" alt="profile" />
                <div className="profileCardSmall__user__info">

                  <h4 className="profileCardSmall__user__name">Cristobal Castillo</h4>

                  <div id="profile__network__icon" />
                  <p className="profileCardSmall__address">0x123456789</p>
                </div>
              </div>
            </div>
          </div>

          <div className="build__section">
            <div className="build__section__text">
              <div className="build__section__content">
                <h3>Simple, Open Design</h3>
                <p className="lightOpacity thin">Compatible with existing browsers, wallets, and dapps for a shared Web3 experience. Built on IPFS and Orbit DB.</p>
                <a href="https://github.com/uport-project/3box"><button >3Box DB Overview</button></a>
              </div>
            </div>
            <div className="build__graphic__threeBox">
              <img src={illustration} id="threeboxIllustration" alt="3Box Map" />
            </div>
          </div>

        </div>

        <LandingFooter />
      </div>
    );
  }
}

Landing.propTypes = {
  signInUp: PropTypes.func,
  closeErrorModal: PropTypes.func,
  handleMobileWalletModal: PropTypes.func,
  handleSignInModal: PropTypes.func,
  handleRequireWalletLoginModal: PropTypes.func,
  closeConsentModal: PropTypes.func,
  requireMetaMaskModal: PropTypes.func,
  checkForWeb3Wallet: PropTypes.func,
  closeRequireMetaMaskModal: PropTypes.func,

  showErrorModal: PropTypes.bool,
  signInModal: PropTypes.bool,
  provideConsent: PropTypes.bool,
  hasWallet: PropTypes.bool,
  isSignedIntoWallet: PropTypes.bool,
  alertRequireMetaMask: PropTypes.bool,
  mobileWalletRequiredModal: PropTypes.bool,
  signInToWalletModal: PropTypes.bool,
  errorMessage: PropTypes.object,
};

Landing.defaultProps = {
  signInUp: signInUp(),
  closeErrorModal: closeErrorModal(),
  handleMobileWalletModal: handleMobileWalletModal(),
  handleSignInModal: handleSignInModal(),
  handleRequireWalletLoginModal: handleRequireWalletLoginModal(),
  closeConsentModal: closeConsentModal(),
  requireMetaMaskModal: requireMetaMaskModal(),
  checkForWeb3Wallet: checkForWeb3Wallet(),
  closeRequireMetaMaskModal: closeRequireMetaMaskModal(),

  showErrorModal: false,
  signInModal: false,
  provideConsent: false,
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
  hasWallet: state.threeBox.hasWallet,
  isSignedIntoWallet: state.threeBox.isSignedIntoWallet,
  alertRequireMetaMask: state.threeBox.alertRequireMetaMask,
  mobileWalletRequiredModal: state.threeBox.mobileWalletRequiredModal,
  signInToWalletModal: state.threeBox.signInToWalletModal,
  isLoggedIn: state.threeBox.isLoggedIn,
});

export default withRouter(connect(mapState, {
  signInUp,
  closeErrorModal,
  handleMobileWalletModal,
  handleSignInModal,
  closeConsentModal,
  requireMetaMaskModal,
  checkForWeb3Wallet,
  closeRequireMetaMaskModal,
  handleRequireWalletLoginModal
})(Landing));
