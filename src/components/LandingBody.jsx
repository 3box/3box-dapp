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
import ThreeBoxLogo from './ThreeBoxLogo';
import '../views/styles/Landing.css';

const LandingBody = ({ isLoggedIn, handleSignInUp }) => (
  <div>
    <div className="landing__hero">
      <div className="landing__hero__copy">
        <h1 className="landing__hero__copy__tagline">Social profiles for digital communities</h1>
        <p className="landing__hero__copy__text">
          Create a social profile for your Ethereum account
          to start building trust, connection, and community
          </p>
        <div className="landing__hero__copy__buttons">
          <button type="button">
            Create Profile
          </button>
          <button type="button">
            Join Discord
          </button>
        </div>
      </div>

      <div className="landing__hero__image">
        <img src="" alt="Network and User" />
      </div>
    </div>

    <div className="landing__overview">
      <div className="landing__overview__logo">
        <ThreeBoxLogo />
      </div>

      <div className="landing__overview__tagline">
        <h2>Your social profile for web3 apps</h2>
      </div>

      <div className="landing__overview__diagram">
        <div className="landing__overview__diagram__wrapper">
          <img className="landing__overview__diagram__graphic" />
          <p className="landing__overview__diagram__copy">
            Create a profile to help others discover and recognize you.
          </p>
        </div>

        <div className="landing__overview__diagram__wrapper">
          <img className="landing__overview__diagram__graphic" />
          <p className="landing__overview__diagram__copy">
            Sign in to apps by sharing your profile with one click.
          </p>
        </div>

        <div className="landing__overview__diagram__wrapper">
          <img className="landing__overview__diagram__graphic" />
          <p className="landing__overview__diagram__copy">
            Collect data from apps to build a strong reputation.
          </p>
        </div>

      </div>
    </div>

    <div className="landing__developers">
      <div className="landing__developers__header">
        FOR DEVELOPERS
      </div>
      <div className="landing__developers__tagline">
        3Box is a social, peer-to-peer user data network
      </div>
      <div className="landing__developers__copy">
        Install 3box.js to begin onboarding new users today
      </div>
      <div className="landing__developers__buttonWrapper">
        <button type="button">
          Profiles API
        </button>
        <button type="button">
          Data Network
        </button>
      </div>
      <div className="landing__developers__graphic">

      </div>
      <div className="landing__developers__footer">
        <div className="landing__developers__footer__links">
          <ul>
            <li className="landing__developers__footer__links__logo">Logo</li>
            <li className="landing__developers__footer__links__linkWrapper">
              <img src="" alt="Profile Link" />
              Profiles
            </li>
            <li className="landing__developers__footer__links__linkWrapper">
              <img src="" alt="API Link" />
              API
            </li>
            <li className="landing__developers__footer__links__linkWrapper">
              <img src="" alt="Network Link" />
              Network
            </li>
            <li className="landing__developers__footer__links__linkWrapper">
              <img src="" alt="Jobs Link" />
              Jobs
            </li>
          </ul>
        </div>
        <div className="landing__developers__footer__buttons">
          <button type="button">Sign In</button>
          <button type="button">Create Profile</button>
        </div>
      </div>
    </div>
  </div>
);

export default LandingBody;
