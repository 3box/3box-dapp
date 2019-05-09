import React, { Suspense, lazy, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

import * as routes from '../../utils/routes';
import Foam from '../../assets/FOAM.png';
import DAOstack from '../../assets/DAOstackPartner.png';
import NiftyFootball from '../../assets/NiftyFootball.png';
import Totem from '../../assets/Totem.png';
import Aragon from '../../assets/aragon_icon.png';
import MolochDAO from '../../assets/MolochDAO.png';
import ConsensysLogo from '../../assets/ConsensysLogo.png';
import Giveth from '../../assets/Giveth.png';
import ColorCubes from '../../assets/ColorCubes.svg';
import MetaMask from '../../assets/MetaMask.svg';
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

class Partners extends Component {
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
        <main className="hero partners_hero">
          <div className="partners_content">
            <div className="partners_content_wrapper">
              <div className="partners_content_header">
                <h4>PARTNERS</h4>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSd8TuQQQGsTzjngR4seYEKN-vB2ygUoDugATdcomJzQdeWjdA/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="textButton">
                    Submit your project
                  </button>
                </a>
              </div>

              <div className="partners_content_partners">
                <div className="partners_grid">
                  <a
                    className="partners_tile"
                    href="https://map.foam.space/leaderboard"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="partners_tile_image">
                      <img src={Foam} alt="3Box Partner" />
                      <div className="partners_tile_image_text">
                        <p>Visit Project</p>
                        <p className="arrow">&rarr;</p>
                      </div>
                    </div>
                    <div className="partners_tile_name">
                      <p className="partners_tile_name_text">
                        FOAM
                      </p>
                    </div>
                    <div className="partners_tile_whitebg" />
                    <div className="partners_tile_darkbg" />
                  </a>
                  <a
                    className="partners_tile"
                    href="https://niftyfootball.cards/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="partners_tile_image">
                      <img src={NiftyFootball} alt="3Box Partner" />
                      <div className="partners_tile_image_text">
                        <p>Visit Project</p>
                        <p className="arrow">&rarr;</p>
                      </div>
                    </div>
                    <div className="partners_tile_name">
                      <p className="partners_tile_name_text">
                        NiftyFootball
                      </p>
                    </div>
                    <div className="partners_tile_whitebg" />
                    <div className="partners_tile_darkbg" />
                  </a>
                  <a
                    className="partners_tile"
                    href="https://totem.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="partners_tile_image">
                      <img src={Totem} alt="3Box Partner" />
                      <div className="partners_tile_image_text">
                        <p>Visit Project</p>
                        <p className="arrow">&rarr;</p>
                      </div>
                    </div>
                    <div className="partners_tile_name">
                      <p className="partners_tile_name_text">
                        Totem
                      </p>
                    </div>
                    <div className="partners_tile_whitebg" />
                    <div className="partners_tile_darkbg" />
                  </a>
                  <div
                    className="partners_tile"
                  >
                    <div className="partners_tile_image">
                      <img src={MetaMask} alt="3Box Partner" />
                      <div className="partners_tile_image_text">
                        <p>Coming soon</p>
                      </div>
                    </div>
                    <div className="partners_tile_name">
                      <p className="partners_tile_name_text">
                        MetaMask
                      </p>
                    </div>
                    <div className="partners_tile_whitebg" />
                    <div className="partners_tile_darkbg" />
                  </div>
                  <div
                    className="partners_tile"
                  >
                    <div className="partners_tile_image">
                      <img src={Aragon} alt="3Box Partner" />
                      <div className="partners_tile_image_text">
                        <p>Coming soon</p>
                      </div>
                    </div>
                    <div className="partners_tile_name">
                      <p className="partners_tile_name_text">
                        Aragon
                      </p>
                    </div>
                    <div className="partners_tile_whitebg" />
                    <div className="partners_tile_darkbg" />
                  </div>
                  <div
                    className="partners_tile"
                  >
                    <div className="partners_tile_image">
                      <img src={MolochDAO} alt="3Box Partner" />
                      <div className="partners_tile_image_text">
                        <p>Coming soon</p>
                      </div>
                    </div>
                    <div className="partners_tile_name">
                      <p className="partners_tile_name_text">
                        MolochDAO
                      </p>
                    </div>
                    <div className="partners_tile_whitebg" />
                    <div className="partners_tile_darkbg" />
                  </div>
                  <div
                    className="partners_tile"
                  >
                    <div className="partners_tile_image">
                      <img src={Giveth} alt="3Box Partner" />
                      <div className="partners_tile_image_text">
                        <p>Coming soon</p>
                      </div>
                    </div>
                    <div className="partners_tile_name">
                      <p className="partners_tile_name_text">
                        Giveth
                      </p>
                    </div>
                    <div className="partners_tile_whitebg" />
                    <div className="partners_tile_darkbg" />
                  </div>
                  <div
                    className="partners_tile"
                  >
                    <div className="partners_tile_image">
                      <img src={ConsensysLogo} alt="3Box Partner" />
                      <div className="partners_tile_image_text">
                        <p>Coming soon</p>
                      </div>
                    </div>
                    <div className="partners_tile_name">
                      <p className="partners_tile_name_text">
                        ConsenSys MeshHub
                      </p>
                    </div>
                    <div className="partners_tile_whitebg" />
                    <div className="partners_tile_darkbg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="hero_graphic">
            <div style={styles} className="hero_graphic_colorcubes-dtw" />
            {/* <img src={ColorCubes} alt="Color cubes" className="hero_graphic_colorcubes-dtw" /> */}
            <img src={ColorCubesMobile} alt="Color cubes" className="hero_graphic_colorcubes-mobile" />
          </div>
          <DiscordButton />
        </main>

        <Suspense fallback={<div>Loading...</div>}>
          <Footer />
        </Suspense>
      </div >
    );
  }
}

Partners.propTypes = {
  handleSignInUp: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool,
};

Partners.defaultProps = {
  isLoggedIn: false,
};

const mapState = state => ({
  isLoggedIn: state.userState.isLoggedIn,
});

export default withRouter(connect(mapState)(Partners));
