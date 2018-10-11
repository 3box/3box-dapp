import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';

import { signInUp, closeErrorModal, closeConsentModal, requireMetaMask, closeRequireMetaMask } from '../state/actions';
import { address } from '../utils/address';
import ThreeBoxLogo from '../components/ThreeBoxLogo.jsx';
import ProfileCard from '../components/ProfileCard.jsx';
import LandingFooter from '../components/LandingFooter.jsx';
import LandingNav from '../components/LandingNav.jsx';
import Loading from '../assets/Loading.svg';
import illustration from '../assets/Dapp.svg';
import Cristobal from '../assets/Cristobal.png';
import Michael from '../assets/Michael.png';
import Christian from '../assets/Christian.jpg';
import ConsensysSVG from '../assets/consensys.svg';
import Consent from '../assets/Consent.png';
import ThreeBoxGraphic from '../assets/3BoxGraphic.png';
import PartnersBG from '../assets/PartnersBG.svg';
import getCoinbaseWallet from '../assets/getCoinbaseWallet.svg';
import Status from '../assets/Status.png';
import consensys from '../assets/consensys.png';
import './styles/Landing.css';
import '../components/styles/ProfileCard.css';
// import Gitcoin from '../assets/gitcoin.svg';
// import Coinbase from '../assets/coinbase.svg';
// import Metamask from '../assets/metamask.svg';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHide: false,
      showMobileWalletPrompt: true,
    };
    this.handleSignInUp = this.handleSignInUp.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.hideBar);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.hideBar);
  }

  hideBar = () => {
    window.scrollY < 10 ?
      this.setState({ isHide: false })
      :
      this.setState({ isHide: true });
  }

  async handleSignInUp() {
    const { hasWallet } = this.props;
    localStorage.setItem(`serializedMuDID_${address}`, null);
    if (hasWallet) {
      await this.props.signInUp();
    } else {
      this.props.requireMetaMask();
    }
  }

  render() {
    const { ifFetchingThreeBox, showErrorModal, signUpSuccessful, errorMessage, provideConsent, alertRequireMetaMask, hasWallet } = this.props;
    const classHide = this.state.isHide ? 'hide' : '';

    const { showMobileWalletPrompt } = this.state;

    const { userAgent: ua } = navigator
    const isIOS = ua.includes('iPhone') // “iPhone OS”
    const isAndroid = ua.includes('Android')

    if (signUpSuccessful) {
      return <Redirect to="/Profile" />;
    }

    return (
      <div id="landing">
        <LandingNav handleSignInUp={this.handleSignInUp} classHide={classHide} ref="elem" />

        {provideConsent
          && (
            <div className="loadingContainer">
              <div className="consentModal">
                <img src={Consent} alt="Partners background" />
                <h3>Provide consent to 3Box in the MetaMask popup</h3>
                <button onClick={this.props.closeConsentModal} type="button" className="tertiaryButton" id="closeModal">close</button>
              </div>
            </div>
          )}

        {ifFetchingThreeBox
          && (
            <div className="loadingContainer">
              <img src={Loading} alt="loading" id="loadingPic" />
            </div>
          )}

        {
          alertRequireMetaMask
          && (
            <div className="loadingContainer">
              <div className="consentModal">
                <h3>You must have metamask</h3>
                <button onClick={this.props.closeRequireMetaMask} type="button" className="tertiaryButton" id="closeModal">close</button>
              </div>
            </div>)
        }

        {showErrorModal
          && (
            <div className="loadingContainer">
              <div className="modal">
                {/* <p id="consentError">You must consent to sign up</p> */}
                <div id="consentError">
                  <h4>{errorMessage}</h4>
                </div>
                <button onClick={this.props.closeErrorModal} type="button" className="tertiaryButton" id="closeModal">close</button>
              </div>
            </div>
          )}

        {(showMobileWalletPrompt && !hasWallet)
          && (
            <div id="mobile__landing__prompt">
              <div id="mobile__landing__prompt__logo">
                <ThreeBoxLogo />
              </div>

              <div id="mobile__landing__prompt__text">
                <p>3box requires a mobile dApp browser in order to work</p>
                <br />
                <p>Download Coinbase Wallet or Status.im then revisit this site in the mobile dApp browser to continue</p>
              </div>

              <div id="mobile__landing__prompt__buttons">
                <a href={isIOS ? 'https://itunes.apple.com/app/coinbase-wallet/id1278383455?ls=1&mt=8' : 'https://play.google.com/store/apps/details?id=org.toshi'}>
                  <img src={getCoinbaseWallet} alt="Get Coinbase wallet" />
                </a>

                <a href='https://play.google.com/store/apps/details?id=im.status.ethereum&hl=en_US'>
                  <img src={Status} alt="Get Status wallet" />
                </a>
              </div>

              <button onClick={() => this.setState({ showMobileWalletPrompt: false })} type="button" className="tertiaryButton" id="closeModal">X</button>
            </div>
          )
        }

        <img src={ThreeBoxGraphic} id="threeBoxGraphic" alt="ThreeBox Graphic" />

        <div id="landing__splash">

          <div id="landing__createProfile">
            <h1 className="ae-1">Create an Ethereum Profile</h1>
            <p className="lightOpacity thin">Add your information once and share it across dapps.</p>
            <div id="consensys">
              <p className="lightOpacity thin">By </p>
              <img src={consensys} alt="Consensys Logo" />
            </div>

            <div id="landing__button--center">
              <button id="landing__createProfileButton" type="button" onClick={this.handleSignInUp}>
                Create a Profile
            </button>
            </div>
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
            {/* <img src={Gitcoin} className="partnerCos" alt="Partners background" /> */}
            {/* <img src={Coinbase} className="partnerCos" alt="Partners background" /> */}
            <img src={ConsensysSVG} className="partnerCos" alt="Partners background" />
            {/* <img src={Metamask} className="partnerCos" alt="Partners background" /> */}
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

          <div className="build_section">
            <div className="build_section_text">
              <div className="build_section_content">
                <h3>Ethereum Profiles API</h3>
                <p className="lightOpacity thin">Profiles API makes it easy to get and set information about users. Support for public and private profiles.</p>
                <a href="https://github.com/uport-project/3box-js"><button >Profiles API</button></a>
              </div>
            </div>

            <div className="build__graphic__profiles">

              <div id="Michael" className="profileCardSmall">
                <img src={Michael} className="profileCardSmall_user_picture" alt="profile" />
                <div className="profileCard_user_info">

                  <h4 className="profileCardSmall_user_name">Michael Sena</h4>

                  <div id="profile_network_icon" />
                  <p className="profileCardSmall_address">0x123456789</p>
                </div>
              </div>

              <div id="Christian" className="profileCardSmall">
                <img src={Christian} className="profileCardSmall_user_picture" alt="profile" />
                <div className="profileCard_user_info">

                  <h4 className="profileCardSmall_user_name">Christian Lundkvist</h4>

                  <div id="profile_network_icon" />
                  <p className="profileCardSmall_address">0x123456789</p>
                </div>
              </div>

              <div id="Cristobal" className="profileCardSmall">
                <img src={Cristobal} className="profileCardSmall_user_picture" alt="profile" />
                <div className="profileCard_user_info">

                  <h4 className="profileCardSmall_user_name">Cristobal Castillo</h4>

                  <div id="profile_network_icon" />
                  <p className="profileCardSmall_address">0x123456789</p>
                </div>
              </div>
            </div>
          </div>

          <div className="build_section">
            <div className="build_section_text">
              <div className="build_section_content">
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
  closeConsentModal: PropTypes.func,
  requireMetaMask: PropTypes.func,
  closeRequireMetaMask: PropTypes.func,

  ifFetchingThreeBox: PropTypes.bool,
  signUpSuccessful: PropTypes.bool,
  showErrorModal: PropTypes.bool,
  provideConsent: PropTypes.bool,
  hasWallet: PropTypes.bool,
  alertRequireMetaMask: PropTypes.bool,
  errorMessage: PropTypes.string,
};

Landing.defaultProps = {
  signInUp: signInUp(),
  closeErrorModal: closeErrorModal(),
  closeConsentModal: closeConsentModal(),
  requireMetaMask: requireMetaMask(),
  closeRequireMetaMask: closeRequireMetaMask(),

  ifFetchingThreeBox: false,
  signUpSuccessful: false,
  showErrorModal: false,
  provideConsent: false,
  alertRequireMetaMask: false,
  hasWallet: true,
  errorMessage: null,
};

const mapState = state => ({
  ifFetchingThreeBox: state.threeBox.ifFetchingThreeBox,
  signUpSuccessful: state.threeBox.signUpSuccessful,
  errorMessage: state.threeBox.errorMessage,
  showErrorModal: state.threeBox.showErrorModal,
  provideConsent: state.threeBox.provideConsent,
  hasWallet: state.threeBox.hasWallet,
  alertRequireMetaMask: state.threeBox.alertRequireMetaMask,
});

export default withRouter(connect(mapState, { signInUp, closeErrorModal, closeConsentModal, requireMetaMask, closeRequireMetaMask })(Landing));
