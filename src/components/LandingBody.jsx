import React from 'react';

import HeroImage from '../assets/HeroImage.png';
import Diagram1 from '../assets/Diagram1.svg';
import Diagram2 from '../assets/Diagram2.svg';
import Diagram3 from '../assets/Diagram3.svg';
import ThreeBoxLogoBlue from '../assets/ThreeBoxLogoBlue.svg';
import ProfileCard from '../assets/ProfileCard.png';

import Profile1 from '../assets/Profile1.png';
import Profile2 from '../assets/Profile2.png';
import Profile3 from '../assets/Profile3.png';
import Profile4 from '../assets/Profile4.png';
import Profile5 from '../assets/Profile5.png';
import Profile6 from '../assets/Profile6.png';
import Profile7 from '../assets/Profile7.png';
import Profile8 from '../assets/Profile8.png';
import Profile9 from '../assets/Profile9.png';
import Profile10 from '../assets/Profile10.png';
import Profile11 from '../assets/Profile11.png';
import Profile12 from '../assets/Profile12.png';
import Profile13 from '../assets/Profile13.png';
import Profile14 from '../assets/Profile14.png';
import Profile15 from '../assets/Profile15.png';
import Profile16 from '../assets/Profile16.png';
import Profile17 from '../assets/Profile17.png';
import Profile18 from '../assets/Profile18.png';
import Profile19 from '../assets/Profile19.png';
import Profile20 from '../assets/Profile20.png';

import '../views/styles/Landing.css';

const LandingBody = ({ isLoggedIn, handleSignInUp }) => (
  <div className="landing">

    <div className="landing__hero">
      <div className="landing__hero__copy">
        <img src={ProfileCard} className="landing__hero__copy__profilecard--mobile" alt="Narwal Profile" />
        <h1 className="landing__hero__copy__tagline">Social profiles for <br /> web3 applications</h1>
        <p className="landing__hero__copy__text">
          Create a social profile for your Ethereum account
          to start building trust, connection, and community
          </p>
        <div className="landing__hero__copy__buttons">
          <button
            type="button"
            onClick={handleSignInUp}
          >
            Create Profile
          </button>
          <a href="https://discord.gg/bevMe7w" target="_blank" rel="noopener noreferrer">
            <button
              className="secondaryButton joinDiscord"
              type="button"
            >
              Join Discord
          </button>
          </a>
        </div>
      </div>

      <div className="landing__hero__image">
        <img src={HeroImage} alt="Network and User" />
      </div>
    </div>

    <div className="landing__overview">
      <div className="landing__overview__logo">
        <img src={ThreeBoxLogoBlue} alt="3Box Logo Blue" />
      </div>

      <div className="landing__overview__tagline">
        <h2>All of your information in your control</h2>
      </div>

      <div className="landing__overview__diagram">
        <div className="landing__overview__diagram__wrapper">
          <img src={Diagram1} alt="Empty profile" className="landing__overview__diagram__graphic" />
          <p className="landing__overview__diagram__copy">
            Create a profile to help others discover and recognize you.
          </p>
        </div>

        <div className="landing__overview__diagram__wrapper">
          <img src={Diagram2} alt="Fill out profile" className="landing__overview__diagram__graphic" />
          <p className="landing__overview__diagram__copy">
            Sign in to apps by sharing your profile with one click.
          </p>
        </div>

        <div className="landing__overview__diagram__wrapper">
          <img src={Diagram3} alt="Full profile" className="landing__overview__diagram__graphic" />
          <p className="landing__overview__diagram__copy">
            Collect data from apps to build a strong reputation.
          </p>
        </div>

      </div>
    </div>

    <div className="landing__developers">
      <h4 className="landing__developers__header">
        FOR DEVELOPERS
      </h4>

      <h2 className="landing__developers__tagline">
        3Box is a social, peer-to-peer user data network
      </h2>

      <p className="landing__developers__copy">
        Install 3box.js to begin onboarding new users today
      </p>

      <div className="landing__developers__buttonWrapper">
        <a href="https://github.com/3box/3box-js" target="_blank" rel="noopener noreferrer">
          <button className="landing__developers__buttonWrapper__button" type="button">
            Profiles API
          </button>
        </a>
        {/* <a href="" target="_blank" rel="noopener noreferrer">
          <button className="landing__developers__buttonWrapper__button" type="button">
            Data Network
        </button>
        </a> */}
      </div>

      <div className="landing__developers__graphic">
        <img src={Profile1} alt="User profile" className="landing__developers__graphic__userPic profPic1" />
        <img src={Profile2} alt="User profile" className="landing__developers__graphic__userPic profPic2" />
        <img src={Profile3} alt="User profile" className="landing__developers__graphic__userPic profPic3" />

        <img src={Profile4} alt="User profile" className="landing__developers__graphic__userPic profPic4" />
        <img src={Profile5} alt="User profile" className="landing__developers__graphic__userPic profPic5" />

        <img src={Profile6} alt="User profile" className="landing__developers__graphic__userPic profPic6" />
        <img src={Profile7} alt="User profile" className="landing__developers__graphic__userPic profPic7" />
        <img src={Profile8} alt="User profile" className="landing__developers__graphic__userPic profPic8" />
        <img src={Profile9} alt="User profile" className="landing__developers__graphic__userPic profPic9" />

        <img src={Profile10} alt="User profile" className="landing__developers__graphic__userPic profPic10" />
        <img src={Profile11} alt="User profile" className="landing__developers__graphic__userPic profPic11" />

        <img src={Profile12} alt="User profile" className="landing__developers__graphic__userPic profPic12" />
        <img src={Profile13} alt="User profile" className="landing__developers__graphic__userPic profPic13" />
        <img src={Profile14} alt="User profile" className="landing__developers__graphic__userPic profPic14" />

        <img src={Profile15} alt="User profile" className="landing__developers__graphic__userPic profPic15" />
        <img src={Profile16} alt="User profile" className="landing__developers__graphic__userPic profPic16" />
        <img src={Profile17} alt="User profile" className="landing__developers__graphic__userPic profPic17" />
        <img src={Profile18} alt="User profile" className="landing__developers__graphic__userPic profPic18" />

        <img src={Profile19} alt="User profile" className="landing__developers__graphic__userPic profPic19" />
        <img src={Profile20} alt="User profile" className="landing__developers__graphic__userPic profPic20" />
      </div>

    </div>
  </div>
);

export default LandingBody;
