import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import ThreeBoxCloud from '../../../assets/3BoxCloud.svg';
import DappScreensBG from '../../../assets/DappScreensBG.svg';
import DappScreens from '../../../assets/DappScreens.png';
import NewProfileCard from '../../../assets/NewProfileCard.png';
import ProfilesSmall from '../../../assets/Profiles.svg';
import SSOSmall from '../../../assets/Authentication.svg';
import StorageSmall from '../../../assets/Storage.svg';
import DiscordButton from '../components/DiscordButton';
import '../../styles/NewLanding.css';
import '../../../components/styles/Nav.css';
import Footer from '../components/Footer';

class Dapp extends Component {
  constructor(props) {
    super(props);;
    this.state = {}
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { handleSignInUp } = this.props;

    return (
      <div className="landing_page">
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
                  <h3 className="dapp_usp_feature_sso">
                    Ethereum Single Sign On
                  </h3>
                </div>
                <div className="dapp_usp_feature">
                  <img src={ProfilesSmall} alt="Profiles" />
                  <h3 className="dapp_usp_feature_profiles">
                    Identity and Reputation
                  </h3>
                </div>
                <div className="dapp_usp_feature">
                  <img src={StorageSmall} alt="Storage" />
                  <h3 className="dapp_usp_feature_storage">
                    Personal Cloud Storage
                  </h3>
                </div>
              </div>
            </div>
            <div className="main_profileCard">
              <img src={NewProfileCard} alt="Profile card" className="main_profileCard_card" />
              <button type="button" onClick={handleSignInUp} className="main_profileCard_card_login">
                Log In
              </button>
              <button type="button" onClick={handleSignInUp} className="textButton">
                Create profile
              </button>
            </div>
          </div>
          <DiscordButton />
        </main>

        <section className="dapp_screens">
          <img src={ThreeBoxCloud} className="hero_copy_cloud desktop" alt="3Box cloud" />
          <img src={DappScreens} alt="Dapp Screens" className="dapp_screens_devices" />
          <img src={DappScreensBG} alt="Dapp Screens BG" className="dapp_screens_bg" />
        </section>

        <Footer />
      </div>
    );
  }
}

Dapp.propTypes = {
  handleSignInUp: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool,
};

Dapp.defaultProps = {
  isLoggedIn: false,
};

const mapState = state => ({
  isLoggedIn: state.userState.isLoggedIn,
});

export default withRouter(connect(mapState)(Dapp));
