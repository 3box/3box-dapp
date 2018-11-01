import React from 'react';

import ProfileCard from './ProfileCard.jsx';
import illustration from '../assets/Dapp.svg';
import Cristobal from '../assets/Cristobal.png';
import Michael from '../assets/Michael.png';
import Christian from '../assets/Christian.jpg';
import ConsensysSVG from '../assets/consensys.svg';
import ThreeBoxGraphic from '../assets/3BoxGraphic.png';
import PartnersBG from '../assets/PartnersBG.svg';
import consensys from '../assets/consensys.png';
import '../views/styles/Landing.css';

const LandingBody = ({ isLoggedIn, handleSignInUp }) => (
  <div>
    <img src={ThreeBoxGraphic} id="threeBoxGraphic" alt="ThreeBox Graphic" />

    <div id="landing__splash" className={isLoggedIn ? 'removeBottomMargin' : undefined}>

      <div id="landing__createProfile">
        <h1 className="ae-1 landing__createProfile--text">Create an Ethereum Profile</h1>
        <p className="lightOpacity thin landing__createProfile--subtext">Add your information once and share it across dapps.</p>
        <div id="consensys">
          <p className="lightOpacity thin">By </p>
          <img src={consensys} alt="Consensys Logo" />
        </div>

        {!isLoggedIn && (
          <div id="landing__button--center">
            <button id="landing__createProfileButton" type="button" onClick={handleSignInUp}>
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
        <button type="button">Get started</button>
      </a>

      <div className="build__section">
        <div className="build__section__text">
          <div className="build__section__content">
            <h3>Ethereum Profiles API</h3>
            <p className="lightOpacity thin">Profiles API makes it easy to get and set information about users, with support for public and private data..</p>
            <a href="https://github.com/uport-project/3box-js"><button type="button">Profiles API</button></a>
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
            <a href="https://github.com/uport-project/3box"><button type="button">3Box DB Overview</button></a>
          </div>
        </div>
        <div className="build__graphic__threeBox">
          <img src={illustration} id="threeboxIllustration" alt="3Box Map" />
        </div>
      </div>

    </div>
  </div>
);

export default LandingBody;
