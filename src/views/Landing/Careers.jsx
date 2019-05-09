import React, { Suspense, lazy, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

import * as routes from '../../utils/routes';
import ThreeBoxLogo from '../../assets/ThreeBoxLogoWhite.svg';
import ThreeBoxCloudWhite from '../../assets/3BoxCloudWhite.svg';
import ThreeBoxCloudWhiteNoShadow from '../../assets/3BoxCloudWhiteNoShadow.svg';
import ThreeBoxCloud from '../../assets/3BoxCloud.svg';
import TriangleWhite from '../../assets/TriangleWhite.svg';
import TriangleBlue from '../../assets/TriangleBlue.svg';
import TriangleBlack from '../../assets/TriangleBlack.svg';
import NewProfileCard from '../../assets/NewProfileCard.png';
import Trust from '../../assets/Trust.svg';
import HighFive from '../../assets/HighFive.svg';
import Authentication from '../../assets/Authentication.svg';
import Collaboration from '../../assets/Collaboration.svg';
import Profiles from '../../assets/Profiles.svg';
import Messaging from '../../assets/Messaging.svg';
import Storage from '../../assets/Storage.svg';
import DaoStack from '../../assets/DaoStack.png';
import Aragon from '../../assets/Aragon.png';
import Consensys from '../../assets/Consensys.png';
import MetaMask from '../../assets/MetaMask.png';
import Foam from '../../assets/FOAM.png';
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

class Landing extends Component {
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
          <div className="hero_text">
            <div className="hero_copy_wrapper">
              <h1>Careers</h1>
              <p>
                Join us in building the uture of distributed consumer applications
              </p>
              <div className="hero_copy_buttons">
                <Link to={routes.API}>
                  <button type="button" className="hero_copy_buttons_button primaryMarketing">
                    Meet the Team
                    <img src={TriangleWhite} alt="arrow" />
                  </button>
                </Link>
                <Link to={routes.HUB}>
                  <button type="button" className="secondary">
                    Our Culture
                    <img src={TriangleBlack} alt="arrow" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="hero_graphic">
            <div style={styles} className="hero_graphic_colorcubes-dtw" />
            <img src={ColorCubesMobile} alt="Color cubes" className="hero_graphic_colorcubes-mobile" />
          </div>
          <DiscordButton />
        </main>

        <section className="careers">
          <div className="careers_wrapper">
            <div className="careers_header">
              <h2>
                Open Positions
              </h2>
              <p>
                To apply, submit your resume along with a short note and relevant online social profiles.
              </p>
            </div>
            <div className="careers_positions">
              <div className="careers_positions_content">
                <h4>
                  Technical Product Marketing Manager
                </h4>
                <p>
                  3Box is looking for a proven technical product marketing manager to help developers more easily engage with our products. Ideal candidates will be  dependable, humble, technical, team players who are committed to excellence and have a proven track record of marketing technical products to developers.
                </p>
                <button className="textButton">
                  View full description
                </button>
              </div>
              <div className="careers_positions_button">
                <button type="button" className="primaryMarketing">
                  Apply Now
                  <img src={TriangleWhite} alt="arrow" />
                </button>
              </div>
            </div>
            {/* <div className="careers_positions">
              <div className="careers_positions_content">
                <h4>
                  JavaScript Distributed Systems Engineer
                </h4>
                <p>
                  3Box is looking for a proven technical product marketing manager to help developers more easily engage with our products. Ideal candidates will be  dependable, humble, technical, team players who are committed to excellence and have a proven track record of marketing technical products to developers.
                </p>
                <button className="textButton">
                  View full description
                </button>
              </div>
              <div className="careers_positions_button">
                <button type="button" className="primaryMarketing">
                  Apply Now
                  <img src={TriangleWhite} alt="arrow" />
                </button>
              </div>
            </div> */}
            <div className="careers_open">
              <h5>Don't see your position?</h5>
              <p>Email us a note and tell us about your superpower.</p>
            </div>
          </div>
        </section>

        <Suspense fallback={<div>Loading...</div>}>
          <Footer />
        </Suspense>
      </div >
    );
  }
}

Landing.propTypes = {
  handleSignInUp: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool,
};

Landing.defaultProps = {
  isLoggedIn: false,
};

const mapState = state => ({
  isLoggedIn: state.userState.isLoggedIn,
});

export default withRouter(connect(mapState)(Landing));
