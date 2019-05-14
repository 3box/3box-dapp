import React, { Suspense, lazy, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import ProfileHover from 'profile-hover';

import ColorCubes from '../../assets/ColorCubes.svg';
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
                <h4>TEAM</h4>
              </div>

              <div className="team_mates">
                {/* <ProfileHover address="0xFF326878D13b33591D286372E67B4AF05cD100bd" displayFull />
                <ProfileHover address="0xC5adAC2938d9Ea3474cdD6f9E6D72D35665380B6" displayFull />
                <ProfileHover address="0x258DDD84abf61ba1D1E39f95D8863ee9ca218c06" displayFull />
                <ProfileHover address="0x59B5fbC62519DBF9B7044fd0eCb6442aC16FAe2A" displayFull /> */}
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
