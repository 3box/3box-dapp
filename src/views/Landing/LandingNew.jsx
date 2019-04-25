import React, { Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

import ThreeBoxLogo from '../../assets/ThreeBoxLogoWhite.svg';
import ThreeBoxCloud from '../../assets/3BoxCloud.png';
import TriangleWhite from '../../assets/TriangleWhite.svg';
import TriangleBlue from '../../assets/TriangleBlue.svg';
import TriangleBlack from '../../assets/TriangleBlack.svg';
import Trust from '../../assets/Trust.png';
import HighFive from '../../assets/HighFive.png';
import DiscordChat from '../../assets/DiscordChat.png';
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

const Footer = lazy(() => import('../../components/Footer'));

const Landing = () => (
  <div className="landing_page">
    <main className="hero">
      <div className="hero_copy">
        <div className="hero_copy_wrapper">
          <img src={ThreeBoxCloud} className="hero_copy_cloud" alt="3Box cloud" />
          <h1>Secure Cloud Storage</h1>
          <p>
            Developers trust the decentralized 3Box cloud to secure their most important user data.  #BuildBetter
          </p>
          <div className="hero_copy_buttons">
            <button type="button" className="hero_copy_buttons_button">
              For Developers
              <img src={TriangleWhite} alt="arrow" />
            </button>
            <button type="button" className="secondary">
              For Users
              <img src={TriangleBlack} alt="arrow" />
            </button>
          </div>
        </div>
      </div>
      <div className="hero_graphic">
        <button type="button" className="hero_graphic_discord">
          <img src={DiscordChat} alt="Discord button" />
        </button>
        <img src={ColorCubes} alt="Color cubes" className="hero_graphic_colorcubes" />
      </div>
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
            <Link>
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
            <Link>
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
            <Link>
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
            <Link>
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
        <p>SIMPLE APIS</p>
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
        <div className="why_reason_icon">
          <img src={HighFive} alt="High Five" />
        </div>
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
          <div className="profile_card" />
        </div>
        <div className="hub_popout_info">
          <h5>
            3BOX HUB
          </h5>
          <h3>
            Start building your social identity and reputation on web3
          </h3>
          <p>
            Create an account to experience the internet like never before.
          </p>
          <button type="button">
            Sign In
          </button>
        </div>
      </div>
    </section>

    <section className="join">
      <h3>
        Towards a better web for all
      </h3>
      <p>
        Join our mailing list to never miss an update.
      </p>
      <input type="text" placeholder="Subscribe to email" />
      <button type="button">
        Join
      </button>
    </section>
    <footer>
      <div className="footer_wrapper">
        {/* <div className="footer_section" /> */}
        <div className="footer_lane">
          <img src={ThreeBoxLogo} alt="3Box logo" className="footer_logo" />
        </div>
        <div className="footer_lane">
          <h5>
            PRODUCTS
        </h5>
          <p>
            Profiles API
        </p>
          <p>
            Messaging API
        </p>
          <p>
            Storage API
        </p>
          <p>
            Hub App
        </p>
        </div>
        <div className="footer_lane">
          <h5>
            DOCS
        </h5>
          <p>
            Overview
        </p>
        </div>
        <div className="footer_lane">
          <h5>
            MORE
        </h5>
          <p>
            Partners
        </p>
          <p>
            About
        </p>
          <p>
            Team
        </p>
          <p>
            Careers
        </p>
          <p>
            Chat
        </p>
        </div>
        <div className="footer_lane">
          <div>
            <button type="button">
              Sign in to Hub
          </button>
          </div>
          <div>

          </div>
        </div>
      </div>
    </footer>
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
