import React, { Suspense, lazy, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

import * as routes from '../../utils/routes';
import ThreeBoxLogo from '../../assets/ThreeBoxLogoWhite.svg';
import ThreeBoxCloudWhite from '../../assets/3BoxCloudWhite.svg';
import ThreeBoxCloudWhiteNoShadow from '../../assets/3BoxCloudWhiteNoShadow.svg';
import ThreeBoxCloud from '../../assets/3BoxCloud.svg';
import TriangleWhite from '../../assets/TriangleWhite.svg';
import TriangleBlue from '../../assets/TriangleBlue.svg';
import TriangleBlack from '../../assets/TriangleBlack.svg';
import NewProfileCard from '../../assets/NewProfileCard.png';
import Trust from '../../assets/Trust.svg';
import HighFive from '../../assets/HighFive.svg';
import Authentication from '../../assets/Authentication.svg';
import Collaboration from '../../assets/Collaboration.svg';
import Profiles from '../../assets/Profiles.svg';
import Messaging from '../../assets/Messaging.svg';
import Storage from '../../assets/Storage.svg';
import DaoStack from '../../assets/DaoStack.png';
import Aragon from '../../assets/Aragon.png';
import Consensys from '../../assets/Consensys.png';
import MetaMask from '../../assets/MetaMask.png';
import Foam from '../../assets/FOAMpartner.png';
import ColorCubes from '../../assets/ColorCubes.svg';
import ColorCubesMobile from '../../assets/ColorCubesMobile.svg';
import '../styles/Landing.css';
import '../styles/NewLanding.css';
import '../../components/styles/Nav.css';
import DiscordButton from './components/DiscordButton';

const Footer = lazy(() => import('./components/Footer'));

const styles = {
  backgroundImage: `url("${ColorCubes}")`,
  backgroundRepeat: 'absolute',
};

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="landing_page">
        <main className="hero">
          <div className="hero_text">
            <div className="hero_copy_wrapper">
              <img src={ThreeBoxCloudWhite} className="hero_copy_cloud desktop" alt="3Box cloud" />
              <img src={ThreeBoxCloudWhiteNoShadow} className="hero_copy_cloud mobile" alt="3Box cloud" />
              <h1>Secure Cloud Storage</h1>
              <p>
                Developers trust the decentralized 3Box cloud to secure their most important user data.  #BuildBetter
              </p>
              <div className="hero_copy_buttons">
                <Link to={routes.API}>
                  <button type="button" className="hero_copy_buttons_button primaryMarketing">
                    For Developers
                    <img src={TriangleWhite} alt="arrow" />
                  </button>
                </Link>
                <Link to={routes.HUB}>
                  <button type="button" className="secondary">
                    For Users
                    <img src={TriangleBlack} alt="arrow" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="hero_graphic">
            <div style={styles} className="hero_graphic_colorcubes-dtw" />
            <img src={ColorCubesMobile} alt="Color cubes" className="hero_graphic_colorcubes-mobile" />
          </div>
          <DiscordButton />
        </main>

        <section className="partners">
          <div className="partners_wrapper">
            <h4>PARTNERS</h4>
            <div className="partners_list desktop">
              <img src={DaoStack} alt="DaoStack" className="partners_list-daostack" />
              <img src={Consensys} alt="Consensys" className="partners_list-consensys" />
              <img src={Foam} alt="FOAM" className="partners_list-foam" />
              <img src={MetaMask} alt="MetaMask" />
              <img src={Aragon} alt="Aragon" />
            </div>
            <div className="partners_list mobile">
              <div className="partners_list_wrapper">
                <img src={DaoStack} alt="DaoStack" className="partners_list-daostack" />
                <img src={Consensys} alt="Consensys" className="partners_list-consensys" />
                <img src={Foam} alt="FOAM" className="partners_list-foam" />
              </div>
              <div className="partners_list_wrapper">
                <img src={MetaMask} alt="MetaMask" />
                <img src={Aragon} alt="Aragon" />
              </div>
            </div>
          </div>
        </section>

        <section className="apis">
          <div className="apis_popout">
            <div className="section_header">
              <div className="section_line" />
              <p>SIMPLE APIS</p>
            </div>
            <div className="section_blurb">
              <h3>
                Build secure, lightweight, interactive distributed applications with our APIs
          </h3>
            </div>
            <div className="product_apis_featureList">
              {/* <div className="product_apis_featureList_features">
            <img src={Authentication} className="feature_icon" alt="API Feature Icon" />
            <div className="product_apis_featureList_features_copy">
              <h5>Authentication (SSO)</h5>
              <p>
                Seamlessly onboard users to your application
            </p>
              <Link to={routes.API_PROFILES}>
                Explore More
              <img src={TriangleBlue} alt="Arrow" className="feature_link_arrow" />
              </Link>
            </div>
          </div> */}
              <div className="product_apis_featureList_features">
                <img src={Profiles} className="feature_icon" alt="API Feature Icon" />
                <div className="product_apis_featureList_features_copy">
                  <h5>Profiles</h5>
                  <p>
                    Support social identity and basic reputation
              </p>
                  <Link to={routes.API_PROFILES}>
                    Explore More
              <img src={TriangleBlue} alt="Arrow" className="feature_link_arrow" />
                  </Link>
                </div>
              </div>
              <div className="product_apis_featureList_features">
                <img src={Messaging} className="feature_icon" alt="API Feature Icon" />
                <div className="product_apis_featureList_features_copy">
                  <h5>Messaging</h5>
                  <p>
                    Add decentralized chat, messaging, and commenting
              </p>
                  <Link to={routes.API_MESSAGING}>
                    Explore More
              <img src={TriangleBlue} alt="Arrow" className="feature_link_arrow" />
                  </Link>
                </div>
              </div>
              <div className="product_apis_featureList_features">
                <img src={Storage} className="feature_icon" alt="API Feature Icon" />
                <div className="product_apis_featureList_features_copy">
                  <h5>Storage</h5>
                  <p>
                    Store user data in a private database just for your app
              </p>
                  <Link to={routes.API_STORAGE}>
                    Explore More
              <img src={TriangleBlue} alt="Arrow" className="feature_link_arrow" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="api_buildBetter">
              <p>#BuildBetter</p>
            </div>
          </div>
        </section>

        <section className="why">
          <div className="section_header">
            <div className="section_line" />
            <p>WHY 3BOX?</p>
          </div>
          <div className="section_blurb">
            <h3>
              A next-generation framework for managing user data on the internet
          </h3>
          </div>

          <div className="why_reason">
            <div className="why_reason_icon">
              <img src={Trust} alt="Trust" />
            </div>
            <div className="why_reason_info">
              <h4>
                Reduce risk and build trust by storing data and content directly with users.
          </h4>
              <div className="section_line turquoise_line" />
              <p>
                3Box storage is simple, secure, and private by design.  Apps that store data
                with users on 3Box are lighter, more trustworthy, and enjoy reduced data management liability.
          </p>
              <div className="why_reason_info_tags">
                <div className="why_reason_info_tag">
                  <p>Security</p>
                </div>
                <div className="why_reason_info_tag">
                  <p>Privacy</p>
                </div>
                <div className="why_reason_info_tag">
                  <p>Decentralization</p>
                </div>
                <div className="why_reason_info_tag">
                  <p>Compliance</p>
                </div>
              </div>
            </div>
          </div>
          <div className="why_reason switch_why">
            <div className="why_reason_info">
              <h4>
                Engage and delight users with interactive, social experiences.
              </h4>
              <div className="section_line pink_line" />
              <p>
                The suite of 3Box APIs enable delightful user experiences on web3.  Build with social profiles, messaging, single sign on, data storage and sharing.
              </p>
              <div className="why_reason_info_tags">
                <div className="why_reason_info_tag">
                  <p>UX</p>
                </div>
                <div className="why_reason_info_tag">
                  <p>Usability</p>
                </div>
                <div className="why_reason_info_tag">
                  <p>Onboarding</p>
                </div>
                <div className="why_reason_info_tag">
                  <p>Social</p>
                </div>
              </div>
            </div>
            <div className="why_reason_icon-right">
              <img src={HighFive} alt="High Five" />
            </div>
          </div>
          <div className="why_reason">
            <div className="why_reason_icon">
              <img src={Collaboration} alt="Collaboration" />
            </div>
            <div className="why_reason_info">
              <h4>
                Grow your community by tapping into a vibrant, collaborative data ecosystem.
              </h4>
              <div className="section_line purple_line" />
              <p>
                Collaborative user data enables network effects, identity, reputation, and a social graph that travels with users from app to app, making it easy to grow your business.
              </p>
              <div className="why_reason_info_tags">
                <div className="why_reason_info_tag">
                  <p>Interoperability</p>
                </div>
                <div className="why_reason_info_tag">
                  <p>Cooperation</p>
                </div>
                <div className="why_reason_info_tag">
                  <p>Community</p>
                </div>
                <div className="why_reason_info_tag">
                  <p>Growth</p>
                </div>
              </div>
            </div>
          </div>
          {/* <button className="secondary blueButton" type="button">
        More about 3Box
        <img src={TriangleBlue} alt="arrow" />
      </button> */}
        </section>

        <section className="hub">
          <div className="hub_popout">
            <img src={ThreeBoxCloud} alt="ThreeBox Cloud" className="hub_popout_cloud desktop" />
            <div className="hub_popout_profile">
              <img src={NewProfileCard} alt="Profile card" className="hub_popout_profile_card" />
            </div>
            <div className="hub_popout_info">
              <div className="hub_popout_info_wrapper">
                <h5>
                  3BOX HUB
                </h5>
                <h3>
                  Start building your social identity and reputation on web3
                </h3>
                <p>
                  Create an account to experience the internet like never before.
                </p>
                <Link to={routes.HUB}>
                  <button type="button">
                    Sign In
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <Suspense fallback={<div>Loading...</div>}>
          <Footer />
        </Suspense>
      </div >
    );
  }
}

Landing.propTypes = {
  handleSignInUp: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool,
};

Landing.defaultProps = {
  isLoggedIn: false,
};

const mapState = state => ({
  isLoggedIn: state.userState.isLoggedIn,
});

export default withRouter(connect(mapState)(Landing));
