import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter, Redirect } from 'react-router-dom';

import * as routes from '../utils/routes';
import ProfileCard from '../components/ProfileCard';
import LandingFooter from '../components/LandingFooter';
import LandingNav from '../components/LandingNav.jsx';
import { signInUp, closeErrorModal } from '../state/actions';
import { address } from '../utils/address';

import Loading from '../assets/Loading.svg';
import illustration from '../assets/Dapp.svg';
import Cristobal from '../assets/Cristobal.png';
import Michael from '../assets/Michael.png';
import Christian from '../assets/Christian.jpg';
import Gitcoin from '../assets/gitcoin.svg';
import ConsensysSVG from '../assets/consensys.svg';
import Coinbase from '../assets/coinbase.svg';
import Metamask from '../assets/metamask.svg';
import PartnersBG from '../assets/PartnersBG.svg';
import consensys from '../assets/consensys.png';
import '../components/styles/ProfileCard.css';
import './styles/Landing.css';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.handleSignInUp = this.handleSignInUp.bind(this);
  }

  async handleSignInUp() {
    localStorage.setItem(`serializedMuDID_${address}`, null); // eslint-disable-line no-undef
    await this.props.signInUp();
  }

  render() {
    const { ifFetchingThreeBox, showErrorModal, signUpSuccessful } = this.props;

    if (signUpSuccessful) {
      return <Redirect to="/Profile" />;
    }

    return (
      <div>
        <LandingNav handleSignInUp={this.handleSignInUp} />
        <div id="landing_background">
          {ifFetchingThreeBox
            && (
              <div className="loadingContainer">
                <img src={Loading} alt="loading" id="loadingPic" />
              </div>
            )}
          {showErrorModal
            && (
              <div className="loadingContainer">
                <div className="modal">
                  <p id="consentError">You must consent to sign up</p>
                  {/* <p>{errorMessage}</p> */}
                  <button onClick={this.props.closeErrorModal} type="button" className="tertiaryButton" id="closeModal">close</button>
                </div>
              </div>
            )}
          <div id="landing">
            <div id="landing_section_open">
              <div id="landing_left">
                <h1 className="ae-1">Create an Ethereum Profile</h1>
                <p className="lightOpacity">Add your information once and share it across dapps.</p>
                <div id="consensys">
                  <p className="lightOpacity">By </p>
                  <img src={consensys} alt="Consensys Logo" />
                </div>

                <button id="landing_createProfileButton" type="button" onClick={this.handleSignInUp}>
                  Create a Profile
                </button>

              </div>
              <div id="landing_right">
                <div id="landing_card_margin">
                  <ProfileCard />
                </div>
              </div>
            </div>

          </div>

          <div id="landing_section_trustedPartners">
            <h3 className="lightOpacity">Trusted by partners</h3>
            <div id="partnerList">
              <img src={Gitcoin} id="partnerCos" alt="Partners background" />
              <img src={Coinbase} id="partnerCos" alt="Partners background" />
              <img src={ConsensysSVG} id="partnerCos" alt="Partners background" />
              <img src={Metamask} id="partnerCos" alt="Partners background" />
            </div>
            <img src={PartnersBG} id="trustedPartners_bg" alt="Partners background" />
          </div>


          <div id="landing_section_build">

            <h2>Build with 3Box</h2>
            <p className="lightOpacity">Scalable, open source, distributed database infrastructure for Ethereum.</p>
            <a href="https://github.com/uport-project/3box">
              <button className="developerButton">Get started</button>
            </a>

            <div className="build_section">
              <div className="build_section_left">
                <div className="build_section_content">
                  <h3>Ethereum Profiles API</h3>
                  <p className="lightOpacity">Profiles API makes it easy to get and set information about users. Support for public and private profiles.</p>
                  <a href="https://github.com/uport-project/3box-js"><button className="developerButton">Profiles API</button></a>
                </div>
              </div>

              <div className="build_section_right">

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
              <div className="build_section_left">
                <div className="build_section_content">
                  <h3>Simple, Open Design</h3>
                  <p className="lightOpacity">Compatible with existing browsers, wallets, and dapps for a shared Web3 experience. Built on IPFS and Orbit DB.</p>
                  <a href="https://github.com/uport-project/3box"><button className="developerButton">3Box DB Overview</button></a>
                </div>
              </div>
              <div className="build_section_right">
                <img src={illustration} id="threeboxIllustration" alt="3Box Map" />
              </div>
            </div>

          </div>
          <LandingFooter />
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  signInUp: PropTypes.func,
  closeErrorModal: PropTypes.func,
  ifFetchingThreeBox: PropTypes.bool,
  signUpSuccessful: PropTypes.bool,
  showErrorModal: PropTypes.bool,
  errorMessage: PropTypes.string,
};

Landing.defaultProps = {
  signInUp: signInUp(),
  closeErrorModal: closeErrorModal(),
  ifFetchingThreeBox: false,
  signUpSuccessful: false,
  showErrorModal: false,
  errorMessage: null,
};

const mapState = state => ({
  ifFetchingThreeBox: state.threeBoxData.ifFetchingThreeBox,
  signUpSuccessful: state.threeBoxData.signUpSuccessful,
  errorMessage: state.threeBoxData.errorMessage,
  showErrorModal: state.threeBoxData.showErrorModal,
});

export default withRouter(connect(mapState, { signInUp, closeErrorModal })(Landing));
