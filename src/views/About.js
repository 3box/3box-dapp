import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProfileCard from '../components/ProfileCard';
import ProfileCardSmall from '../components/ProfileCardSmall';
import './styles/Landing.css';
import downArrow from '../assets/Arrow.svg';
import illustration from '../assets/Dapp.svg';

export function About(props) {
  return (
    <div>
      <div id="landing">

        <div id="landing_section_open">
          <div id="landing_left">
            <h1>Create an Ethereum Profile</h1>
            <p>Edit your information, view your activity, and much more.</p>
            <Link to="/Profile">
              <button id="landing_createProfileButton" type="button">
                Create a Profile
              </button>
            </Link>
          </div>
          <div id="landing_right">
            <div id="landing_card_margin">
              <ProfileCard />
            </div>
          </div>
        </div>

      </div>

      <div id="landing_section_rest">
        <div id="landing_section_scroll">
          <p>
            Scroll for more
          </p>
          <img src={downArrow} id="landing_arrow" alt="down arrow" />
        </div>

        <div id="landing_section_oneClick">

          <h2>Log in to dapps with one click</h2>
          <p>Control your data in one central hub.</p>

          <img src={illustration} alt="3Box Map" />

        </div>

        <div id="landing_section_developers">
          <div id="landing_section_developers_inner">
            <div id="landing_section_developers_copy">
              <p className="bold grey" id="developers">FOR DEVELOPERS</p>
              <h2>Built using 3Box DB</h2>
              <p>A distributed database that allows Ethereum users to store public and private data on the decentralized web. Open source.</p>
              <Link to="https://github.com/uport-project/3box">
                <p className="bold blue" id="explore">Explore 3Box on Github</p>
              </Link>
            </div>
            <div id="landing_section_developers_illustration" />
          </div>
        </div>

        <div id="landing_section_join">
          <h1>Join our network of 1,000+ members</h1>
          <p>Already achieving more with their data.</p>

          <div id="users">
            <div id="users_tile">
              <ProfileCardSmall />
            </div>
            <div id="users_tile">
              <ProfileCardSmall />
            </div>
            <div id="users_tile">
              <ProfileCardSmall />
            </div>
            <div id="users_tile">
              <ProfileCardSmall />
            </div>
            <div id="users_tile">
              <ProfileCardSmall />
            </div>
            <div id="users_tile">
              <ProfileCardSmall />
            </div>
            <div id="users_tile">
              <ProfileCardSmall />
            </div>
            <div id="users_tile">
              <ProfileCardSmall />
            </div>
            <div id="users_tile">
              <ProfileCardSmall />
            </div>
          </div>

        </div>
      </div>
    </div>

  );
}

About.propTypes = {
  web3: PropTypes.object,
};

About.defaultProps = {
  web3: null,
};

function mapState(state) {
  return {
    web3: state.web3.web3,
  };
}

function mapDispatch(/* dispatch */) {
  return {};
}

export default connect(mapState, mapDispatch)(About);
