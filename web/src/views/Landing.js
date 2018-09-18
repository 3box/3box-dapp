import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import ThreeBox from '3box';
import { Link, withRouter } from 'react-router-dom';

import * as routes from '../utils/routes';
import ProfileCard from '../components/ProfileCard';
import LandingFooter from '../components/LandingFooter';
import LandingNav from '../components/LandingNav';
import ScrollingUsers from '../components/ScrollingUsers';

import Loading from '../assets/Loading.svg';
import downArrow from '../assets/Arrow.svg';
import illustration from '../assets/Dapp.svg';
import Gitcoin from '../assets/gitcoin.svg';
import ConsensysSVG from '../assets/consensys.svg';
import Coinbase from '../assets/coinbase.svg';
import Metamask from '../assets/metamask.svg';
import PartnersBG from '../assets/PartnersBG.svg';
import Partners from '../assets/Partners.svg';
import consensys from '../assets/consensys.png';
import './styles/Landing.css';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginLoading: false,
    };
    // this.loadData = this.loadData.bind(this);
  }

  CreateProfile = () => {
    localStorage.setItem(`serializedMuDID_${web3.eth.accounts[0]}`, null); // eslint-disable-line no-undef
    this.setState({ loginLoading: true });
    ThreeBox // eslint-disable-line no-undef
      .openBox(web3.eth.accounts[0], web3.currentProvider) // eslint-disable-line no-undef
      .then((threeBox) => {
        const { history } = this.props;
        this.setState({ loginLoading: false });
        history.push(routes.PROFILE);
      }).catch((error) => {
        console.log(error);
        this.setState({ loginLoading: false });
      });
  }

  // async loadData() {
  //   localStorage.setItem(`serializedMuDID_${web3.eth.accounts[0]}`, null); // eslint-disable-line no-undef
  //   this.setState({ loginLoading: true });
  //   await this.props.openBox();
  //   await this.props.getPublicName();
  //   await this.props.getPublicGithub();
  //   await this.props.getPublicImage();
  //   await this.props.getPrivateEmail();
  //   await this.props.getActivity();
  //   // will user sign in from landing page if you've already created an account?
  // }

  render() {
    const { loginLoading } = this.state;
    return (
      <div>
        <LandingNav loginLoading={loginLoading} createProfile={this.CreateProfile} />
        <div id="landing_background">
          {loginLoading
            && (
              <div className="loadingContainer">
                <img src={Loading} alt="loading" id="loadingPic" />
              </div>
            )}
          <div id="landing">
            <div id="landing_section_open">
              <div id="landing_left">
                <h1 className="ae-1">Create an Ethereum Profile</h1>
                <p className="lightOpacity">Add your information once and share it across dapps.</p>
                <button id="landing_createProfileButton" type="button" onClick={this.CreateProfile}>
                  Create a Profile
              </button>

                <div id="consensys">
                  <p className="lightOpacity">By </p>
                  <img src={consensys} alt="Consensys Logo" />
                </div>

              </div>
              <div id="landing_right">
                <div id="landing_card_margin">
                  <ProfileCard />
                </div>
              </div>
            </div>

            {/* <div id="landing_section_scroll">
            <p className="">
              Scroll for more
            </p>
            <img src={downArrow} id="landing_arrow" alt="down arrow" />
          </div> */}
          </div>

          <div id="landing_section_trustedPartners">
            <h3 className="lightOpacity">Trusted by partners</h3>
            <div id="partnerList">
              {/* <img src={Partners} id="partners" alt="3Box Partners" /> */}
              <img src={Gitcoin} id="partnerCos" alt="Partners background" />
              <img src={Coinbase} id="partnerCos" alt="Partners background" />
              <img src={ConsensysSVG} id="partnerCos" alt="Partners background" />
              <img src={Metamask} id="partnerCos" alt="Partners background" />
            </div>
            <img src={PartnersBG} id="trustedPartners_bg" alt="Partners background" />
          </div>


          <div id="landing_section_build">

            <h2>Build with 3Box</h2>
            <p className="lightOpacity">Scalable, open source, distributed database infrastructure for Ethereum.</p>
            <a href="https://github.com/uport-project/3box">
              <button className="developerButton">Get started</button>
            </a>

            <div className="build_section">
              <div className="build_section_left">
                <div className="build_section_content">
                  <h3>Ethereum Profiles API</h3>
                  <p className="lightOpacity">Profiles API makes it easy to get and set information about users. Support for public and private profiles.</p>
                  <a href="https://github.com/uport-project/3box-js"><button className="developerButton">Profiles API</button></a>
                </div>
              </div>
              <div className="build_section_right">
                <img src={illustration} alt="3Box Map" />
              </div>
            </div>

            <div className="build_section">
              <div className="build_section_left">
                <div className="build_section_content">
                  <h3>Simple, Open Design</h3>
                  <p className="lightOpacity">Compatible with existing browsers, wallets, and dapps for a shared Web3 experience. Built on IPFS and Orbit DB.</p>
                  <a href="https://github.com/uport-project/3box"><button className="developerButton">3Box DB Overview</button></a>
                </div>
              </div>
              <div className="build_section_right">
                <img src={illustration} alt="3Box Map" />
              </div>
            </div>

          </div>

          {/* <div id="landing_section_developers">
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
          </div> */}
          <LandingFooter />
        </div>
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
  };
}

function mapDispatch(/* dispatch */) {
  return {};
}

export default withRouter(connect(mapState, mapDispatch)(Landing));

//<button id="landing_floatingButtong" type="button" onClick={CreateProfile}>
//          Create a Profile
//        </button>