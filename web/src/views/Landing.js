import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ThreeBox from '3box';
import { Link, withRouter } from 'react-router-dom';

import * as routes from '../utils/routes';
import Footer from '../components/Footer';
import ProfileCard from '../components/ProfileCard';
import ScrollingUsers from '../components/ScrollingUsers';
import downArrow from '../assets/Arrow.svg';
import illustration from '../assets/Dapp.svg';
import consensys from '../assets/consensys.png';
import './styles/Landing.css';

class Landing extends Component {
  CreateProfile = () => {
    localStorage.setItem(`serializedMuDID_${web3.eth.accounts[0]}`, null); // eslint-disable-line no-undef
    ThreeBox
      .openBox(web3.eth.accounts[0], web3.currentProvider) // eslint-disable-line no-undef
      .then((threeBox) => {
        const { history } = this.props;
        history.push(routes.PROFILE);
        console.log(threeBox);
      }).catch(error => console.log(error));
  }

  // EditProfile = () => {
  // ThreeBox
  //   .openBox(web3.eth.accounts[0], web3.currentProvider) // eslint-disable-line no-undef
  //   .then((threeBox) => {
  //     // threeBoxAction(threeBox);
  //     // threeBox.profileStore.set('name', 'kenzo').then(res => console.log(res));
  //     console.log('in here', threeBox.profileStore.profile.name);
  //     // threeBox.profileStore.get('name').then(res => console.log(res)); // eslint-disable-line no-console
  //     // threeBox.privateStore.set('email', 'kenzo@nyu.edu').then(res => console.log(res));
  //     // threeBox.privateStore.get('email').then(res => console.log(res));
  //   }).catch(error => console.log(error)); // eslint-disable-line no-console
  // }

  render() {
    return (
      <div id="landing_background">
        <div id="landing">

          <div id="landing_section_open">
            <div id="landing_left">
              <h1 className="white ae-1">Create an Ethereum Profile with 3Box</h1>
              <p className="white lightOpacity ">Edit your information, view your activity, and much more.</p>
              <button id="landing_createProfileButton" type="button" onClick={this.CreateProfile}>
                Create a Profile
              </button>

              <div id="consensys">
                <p className="white lightOpacity ">By </p>
                <img src={consensys} alt="Consensys Logo" />
              </div>

            </div>
            <div id="landing_right">
              <div id="landing_card_margin">
                <ProfileCard />
              </div>
            </div>
          </div>

          <div id="landing_section_scroll">
            <p className="white ">
              Scroll for more
            </p>
            <img src={downArrow} id="landing_arrow" alt="down arrow" />
          </div>
        </div>

        <div id="landing_section_rest">

          <div id="landing_section_oneClick">

            <h2>Control your data in one central hub</h2>
            <p className=" lightOpacity">Log in to dapps with one click.</p>

            <img src={illustration} alt="3Box Map" />

          </div>

          <div id="landing_section_developers">
            <div id="landing_section_developers_inner">
              <div id="landing_section_developers_copy">
                <p className="bold grey" id="developers">FOR DEVELOPERS</p>
                <h2>Built using 3Box DB</h2>
                <p className="light">A distributed database that allows Ethereum users to store public and private data on the decentralized web. Open source.</p>
                <div id="explore">
                  <a href="https://github.com/uport-project/3box" >
                    <p className="bold blue">Explore 3Box on Github</p>
                  </a>
                </div>
              </div>
              <div id="landing_section_developers_illustration">
                <div id="card" />
              </div>
            </div>
          </div>

          <div id="landing_section_join">
            <h1>Join our network of 1,000+ members</h1>
            <p className="light">Already achieving more with their data.</p>

            <ScrollingUsers />
          </div>
        </div>
        <Footer />
      </div>

    );
  }
}

Landing.propTypes = {
  CreateProfile: PropTypes.func,
};

Landing.defaultProps = {
  CreateProfile: null,
};

function mapState(state) {
  return {
    web3: state.web3.web3,
  };
}

function mapDispatch(/* dispatch */) {
  return {};
}

export default withRouter(connect(mapState, mapDispatch)(Landing));

//<button id="landing_floatingButtong" type="button" onClick={CreateProfile}>
//          Create a Profile
//        </button>