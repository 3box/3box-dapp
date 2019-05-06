import React, { Suspense, lazy, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

import * as routes from '../../utils/routes';
import Foam from '../../assets/FOAM.png';
import DAOstack from '../../assets/DAOstackPartner.png';
import ColorCubes from '../../assets/ColorCubes.svg';
import ColorCubesMobile from '../../assets/ColorCubesMobile.svg';
import '../styles/Landing.css';
import '../styles/NewLanding.css';
import '../../components/styles/Nav.css';
import DiscordButton from './components/DiscordButton';

const Footer = lazy(() => import('./components/Footer'));

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
        <main className="hero">
          <div className="partners_content">
            <div className="partners_content_wrapper">
              <div className="partners_content_header">
                <h4>PARTNERS</h4>
                <button className="textButton">
                  Submit your project
                </button>
              </div>

              <div className="partners_content_partners">
                <div className="partners_grid">
                  <div className="partners_tile">
                    <div className="partners_tile_image">
                      <img src={DAOstack} alt="3Box Partner" />
                      <p>Visit Project &rarr;</p>
                    </div>
                    <div className="partners_tile_name">
                      <p className="partners_tile_name_text">
                        DAOstack
                      </p>
                    </div>
                    <div className="partners_tile_whitebg" />
                    <div className="partners_tile_darkbg" />
                  </div>
                  <div className="partners_tile">
                    <div className="partners_tile_image">
                      <img src={DAOstack} alt="3Box Partner" />
                      <p>Visit Project &rarr;</p>
                    </div>
                    <div className="partners_tile_name">
                      <p className="partners_tile_name_text">
                        DAOstack
                      </p>
                    </div>
                    <div className="partners_tile_whitebg" />
                    <div className="partners_tile_darkbg" />
                  </div>
                  <div className="partners_tile">
                    <div className="partners_tile_image">
                      <img src={DAOstack} alt="3Box Partner" />
                      <p>Visit Project &rarr;</p>
                    </div>
                    <div className="partners_tile_name">
                      <p className="partners_tile_name_text">
                        DAOstack
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
            <img src={ColorCubes} alt="Color cubes" className="hero_graphic_colorcubes-dtw" />
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
