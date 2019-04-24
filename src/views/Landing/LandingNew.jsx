import React, { Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

import LandingBody from '../../components/LandingBody';
import '../styles/Landing.css';
import '../../components/styles/Nav.css';

const Footer = lazy(() => import('../../components/Footer'));

const Landing = () => (
  <div className="landing_page">
    <nav>

    </nav>
    <main className="hero">
      <div className="hero_copy">
        <img src="" className="" alt="3Box cloud" />
        <h1>Secure Cloud Storage</h1>
        <p>
          Developers trust the decentralized 3Box cloud to secure their most important user data.  #BuildBetter
        </p>
        <div>
          <button type="button">
            For Developers
            <img src="" alt="" />
          </button>
          <button type="button">
            For Users
            <img src="" alt="" />
          </button>
        </div>
      </div>
      <div className="hero_graphic">
        <button type="button">
          <img src="" alt="Discord button" />
        </button>
      </div>
    </main>

    <section className="partners">
      <div>
        <h4>PARTNERS</h4>
        <div>
          <img src="" alt="" />
          <img src="" alt="" />
          <img src="" alt="" />
          <img src="" alt="" />
          <img src="" alt="" />
        </div>
      </div>
    </section>

    <section className="apis">
      <div>
        <div className="section_line" />
        <p>SIMPLE APIS</p>
      </div>
      <div>
        <h3>
          Build secure, lightweight, interactive distributed applications with our APIs
        </h3>
      </div>
      <div className="product_apis_featureList">
        <div className="product_apis_featureList_features">
          <img src="" alt="API Feature Icon" />
          <h5>Authentication (SSO)</h5>
          <p>
            Seamlessly onboard users to your application
            </p>
          <Link>
            Explore More
            </Link>
        </div>
        <div className="product_apis_featureList_features">
          <img src="" alt="API Feature Icon" />
          <h5>Profiles</h5>
          <p>
            Support social identity and basic reputation
            </p>
          <Link>
            Explore More
            </Link>
        </div>
        <div className="product_apis_featureList_features">
          <img src="" alt="API Feature Icon" />
          <h5>Messaging</h5>
          <p>
            Add decentralized chat, messaging, and commenting
            </p>
          <Link>
            Explore More
            </Link>
        </div>
        <div className="product_apis_featureList_features">
          <img src="" alt="API Feature Icon" />
          <h5>Storage</h5>
          <p>
            Store user data in a private database just for your app
            </p>
          <Link>
            Explore More
            </Link>
        </div>
      </div>
      <div>
        <p>#BuildBetter</p>
      </div>
    </section>

    <section className="why">
      <div className="why_header">
        <div>
          <div className="section_line" />
          <p>WHY 3BOX</p>
        </div>
        <h3>
          A next-generation framework for managing user data on the internet
        </h3>
      </div>

      <div className="why_reason">
        <div>
          <img src="" alt="" />
        </div>
        <div className="why_reason_info">
          <h4>
            Reduce risk and build trust by storing data and content directly with users.
          </h4>
          <div className="section_line" />
          <p>
            3Box storage is simple, secure, and private by design.  Apps that store data
            with users on 3Box are lighter, more trustworthy, and enjoy reduced data management liability.
          </p>
          <div className="why_reason_info_tags">
            <div>
              <p>Security</p>
            </div>
            <div>
              <p>Privacy</p>
            </div>
            <div>
              <p>Decentralization</p>
            </div>
            <div>
              <p>Compliance</p>
            </div>
          </div>
        </div>
      </div>
      <div className="why_reason">
        <div>
          <img src="" alt="" />
        </div>
        <div className="why_reason_info">
          <h4>
            Engage and delight users with interactive, social experiences.
          </h4>
          <div className="section_line" />
          <p>
            The suite of 3Box APIs enable delightful user experiences on web3.  Build with social profiles, messaging, single sign on, data storage and sharing.
          </p>
          <div className="why_reason_info_tags">
            <div>
              <p>Interoperability</p>
            </div>
            <div>
              <p>Scalability</p>
            </div>
            <div>
              <p>Availability</p>
            </div>
          </div>
        </div>
      </div>
      <div className="why_reason">
        <div>
          <img src="" alt="" />
        </div>
        <div className="why_reason_info">
          <h4>
            Grow your community by tapping into a vibrant, collaborative data ecosystem.
          </h4>
          <div className="section_line" />
          <p>
            Collaborative user data enables network effects, identity, reputation, and a social graph that travels with users from app to app, making it easy to grow your business.
          </p>
          <div className="why_reason_info_tags">
            <div>
              <p>UX</p>
            </div>
            <div>
              <p>Usability</p>
            </div>
            <div>
              <p>Cooperation</p>
            </div>
            <div>
              <p>Onboarding</p>
            </div>
          </div>
        </div>
      </div>
      <button type="button">
        More about 3Box
      </button>
    </section>

    <section className="hub">
      <div className="hub_popout">
        <div className="hub_popout_profile">
          <img src="" alt="" />
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
      <div>
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
      </div>
    </section>

    <footer>
      <div>
        <img src="" alt="3Box logo" />
      </div>
      <div>
        <h5>
          PRODUCTS
        </h5>
      </div>
      <div>
        <h5>
          DOCS
        </h5>
      </div>
      <div>
        <h5>
          MORE
        </h5>
      </div>
      <div>
        <div>
          <button type="button">
            Sign in to Hub
          </button>
        </div>
        <div>

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
