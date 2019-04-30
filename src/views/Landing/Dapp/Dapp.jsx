import React, { Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

import ThreeBoxCloud from '../../../assets/3BoxCloud.png';
import DappScreensBG from '../../../assets/DappScreensBG.svg';
import DiscordChat from '../../../assets/DiscordChat.png';
import DappScreens from '../../../assets/DappScreens.png';
import NewProfileCard from '../../../assets/NewProfileCard.png';
import ProfilesSmall from '../../../assets/ProfilesSmall.png';
import SSOSmall from '../../../assets/SSOSmall.png';
import StorageSmall from '../../../assets/StorageSmall.png';
import DiscordButton from '../components/DiscordButton';
import '../../styles/Landing.css';
import '../../styles/NewLanding.css';
import '../../../components/styles/Nav.css';

const Footer = lazy(() => import('../components/Footer'));

const Landing = ({ showInfoBanner, handleSignInUp }) => (
  <div className={`landing_page ${(showInfoBanner) ? 'bannerMargin' : ''}`}>
    <main className="dapp_main">
      <div className="main_wrapper">
        <div className="main_copy">
          <p className="main_section">3BOX HUB</p>
          <h1>Your new home online.</h1>
          <p>
            Experience the internet like never before with your new all-in-one sign-in, profile, and cloud storage.
          </p>
          <div className="dapp_usp">
            <div className="dapp_usp_feature">
              <img src={SSOSmall} alt="Single sign on" />
              <h3>
                Ethereum Single Sign On
              </h3>
            </div>
            <div className="dapp_usp_feature">
              <img src={ProfilesSmall} alt="Profiles" />
              <h3>
                Social Identity and Reputation
              </h3>
            </div>
            <div className="dapp_usp_feature">
              <img src={StorageSmall} alt="Storage" />
              <h3>
                Personal Cloud Storage
              </h3>
            </div>
          </div>
        </div>
        <div className="main_profileCard">
          <img src={NewProfileCard} alt="Profile card" className="main_profileCard_card" />
          <button type="button" onClick={handleSignInUp}>
            Sign In to Hub
          </button>
        </div>
      </div>
      <DiscordButton />
    </main>

    <section className="dapp_screens">
      <img src={ThreeBoxCloud} className="hero_copy_cloud" alt="3Box cloud" />
      <img src={DappScreens} alt="Dapp Screens" />
      <img src={DappScreensBG} alt="Dapp Screens BG" className="dapp_screens_bg" />
    </section>

    <Suspense fallback={<div>Loading...</div>}>
      <Footer />
    </Suspense>
  </div>
);

Landing.propTypes = {
  handleSignInUp: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool,
  showInfoBanner: PropTypes.bool,
};

Landing.defaultProps = {
  isLoggedIn: false,
  showInfoBanner: false,
};

const mapState = state => ({
  isLoggedIn: state.userState.isLoggedIn,
  showInfoBanner: state.uiState.showInfoBanner,
});

export default withRouter(connect(mapState)(Landing));
