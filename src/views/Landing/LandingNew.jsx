import React, { Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

import * as routes from '../../utils/routes';
import ThreeBoxLogo from '../../assets/ThreeBoxLogoWhite.svg';
import ThreeBoxCloud from '../../assets/3BoxCloud.png';
import TriangleWhite from '../../assets/TriangleWhite.svg';
import TriangleBlue from '../../assets/TriangleBlue.svg';
import TriangleBlack from '../../assets/TriangleBlack.svg';
import NewProfileCard from '../../assets/NewProfileCard.png';
import Trust from '../../assets/Trust.png';
import HighFive from '../../assets/HighFive.png';
import Authentication from '../../assets/Authentication.png';
import Collaboration from '../../assets/Collaboration.png';
import Profiles from '../../assets/Profiles.png';
import Messaging from '../../assets/Messaging.png';
import Storage from '../../assets/Storage.png';
import DaoStack from '../../assets/DaoStack.png';
import Aragon from '../../assets/Aragon.png';
import Consensys from '../../assets/Consensys.png';
import MetaMask from '../../assets/MetaMask.png';
import Foam from '../../assets/FOAM.png';
import ColorCubes from '../../assets/ColorCubes.svg';
import '../styles/Landing.css';
import '../styles/NewLanding.css';
import '../../components/styles/Nav.css';
import DiscordButton from './components/DiscordButton';

const Footer = lazy(() => import('./components/Footer'));

const Landing = ({ showInfoBanner }) => (
  <div className={`landing_page ${(showInfoBanner) ? 'bannerMargin' : ''}`}>
    <main className="hero">
      <div className="hero_copy">
        <div className="hero_copy_wrapper">
          <img src={ThreeBoxCloud} className="hero_copy_cloud" alt="3Box cloud" />
          <h1>Secure Cloud Storage</h1>
          <p>
            Developers trust the decentralized 3Box cloud to secure their most important user data.  #BuildBetter
          </p>
          <div className="hero_copy_buttons">
            <Link to={routes.API}>
              <button type="button" className="hero_copy_buttons_button">
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
        <img src={ColorCubes} alt="Color cubes" className="hero_graphic_colorcubes" />
      </div>
      <DiscordButton />
    </main>

    <section className="partners">
      <div className="partners_wrapper">
        <h4>PARTNERS</h4>
        <div className="partners_list">
          <img src={DaoStack} alt="DaoStack" />
          <img src={Aragon} alt="Aragon" />
          <img src={Consensys} alt="Consensys" />
          <img src={MetaMask} alt="MetaMask" />
          <img src={Foam} alt="FOAM" />
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
          <div className="product_apis_featureList_features">
            <img src={Authentication} className="feature_icon" alt="API Feature Icon" />
            <h5>Authentication (SSO)</h5>
            <p>
              Seamlessly onboard users to your application
            </p>
            <Link to={routes.API_PROFILES}>
              Explore More
              <img src={TriangleBlue} alt="Arrow" className="feature_link_arrow" />
            </Link>
          </div>
          <div className="product_apis_featureList_features">
            <img src={Profiles} className="feature_icon" alt="API Feature Icon" />
            <h5>Profiles</h5>
            <p>
              Support social identity and basic reputation
            </p>
            <Link to={routes.API_PROFILES}>
              Explore More
              <img src={TriangleBlue} alt="Arrow" className="feature_link_arrow" />
            </Link>
          </div>
          <div className="product_apis_featureList_features">
            <img src={Messaging} className="feature_icon" alt="API Feature Icon" />
            <h5>Messaging</h5>
            <p>
              Add decentralized chat, messaging, and commenting
            </p>
            <Link to={routes.API_MESSAGING}>
              Explore More
              <img src={TriangleBlue} alt="Arrow" className="feature_link_arrow" />
            </Link>
          </div>
          <div className="product_apis_featureList_features">
            <img src={Storage} className="feature_icon" alt="API Feature Icon" />
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
      <div className="why_reason">
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
              <p>Interoperability</p>
            </div>
            <div className="why_reason_info_tag">
              <p>Scalability</p>
            </div>
            <div className="why_reason_info_tag">
              <p>Availability</p>
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
              <p>UX</p>
            </div>
            <div className="why_reason_info_tag">
              <p>Usability</p>
            </div>
            <div className="why_reason_info_tag">
              <p>Cooperation</p>
            </div>
            <div className="why_reason_info_tag">
              <p>Onboarding</p>
            </div>
          </div>
        </div>
      </div>
      <button className="secondary blueButton" type="button">
        More about 3Box
        <img src={TriangleBlue} alt="arrow" />
      </button>
    </section>

    <section className="hub">
      <div className="hub_popout">
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
