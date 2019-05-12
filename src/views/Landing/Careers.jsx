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
                  Javascript Engineer, Distributed Systems
                </h4>
                <p>
                  For our next phase, we are seeking a javascript engineer, with focus on distributed systems, to drive the development of our database infrastructure and our developer API, contribute to exceptional developer operations, and anchor a stellar backend engineering team. Responsibilities will include:
                </p>
                <ul>
                  <li>
                    • Building & improving the 3box client and node implementations
                  </li>
                  <li>
                    • Designing, architecting, and implementing systems that enables our platform to grow
                  </li>
                  <li>
                    • Contribute to open source software and support knowledge sharing across the web3 ecosystem
                  </li>
                  <li>
                    • Engage with and help educate the community building with 3box
                  </li>
                  <li>
                    • Manage and monitor cloud infrastructure
                  </li>
                  <li>
                    • Build javascript code you are proud of
                  </li>
                  <li>
                    • Enable our continuous integration/delivery pipelines to work seamlessly
                  </li>
                  <li>
                    • Implement scalability and data integrity solutions to our platform
                  </li>
                  <li>
                    • Drive a continuous effort to reduce deployment time, infrastructure downtime, and maximize efficiency
                  </li>
                </ul>
                <a href="https://www.notion.so/threebox/Javascript-Engineer-Distributed-Systems-967dad0c601e46349e83f57ef94c1279" target="_blank" rel="noopener noreferrer">
                  <button className="textButton" type="button">
                    View full description
                  </button>
                </a>
              </div>
              <div className="careers_positions_button">
                <a href="mailto:jobs@3box.io">
                  <button type="button" className="primaryMarketing">
                    Apply Now
                    <img src={TriangleWhite} alt="arrow" />
                  </button>
                </a>
              </div>
            </div>
            <div className="careers_positions">
              <div className="careers_positions_content">
                <h4>
                  Technical Product Marketing Manager
                </h4>
                <p>
                  For our next phase, we are seeking a technical Product Marketer to reach out to and grow our developer community, and help them build powerful new products on our infrastructure. Responsibilities will include:
                </p>
                <ul>
                  <li>
                    • Produce product marketing content (documentation, tutorials, demos) that show developers the value and ease of using 3Box
                  </li>
                  <li>
                    • Communicate product updates and upcoming plans to current and potential customers
                  </li>
                  <li>
                    • Be a trusted point of contact to developers, and help foster a sense of community and open source development
                  </li>
                  <li>
                    • Find the right access points for new developers in the space and make sure 3Box is one of the first projects they know and use as they build apps
                  </li>
                  <li>
                    • Constantly mine for needs, requirements and trends in our developer base to help inform our product team of how we can better serve them
                  </li>
                  <li>
                    • Qualify high potential projects and partners and help them get the support they need for successful integrations
                  </li>
                  <li>
                    • Find high-value ways to grow the pipeline off developers and projects in our funnel
                  </li>
                  <li>
                    • Represent 3Box at events, in online forums, and within open source communities
                  </li>
                </ul>
                <a href="https://www.notion.so/threebox/Technical-Product-Marketer-0b5847a878aa40d28b0ab612eda1196c" target="_blank" rel="noopener noreferrer">
                  <button className="textButton" type="button">
                    View full description
                  </button>
                </a>
              </div>
              <div className="careers_positions_button">
                <a href="mailto:jobs@3box.io">
                  <button type="button" className="primaryMarketing">
                    Apply Now
                    <img src={TriangleWhite} alt="arrow" />
                  </button>
                </a>
              </div>
            </div>
            <div className="careers_positions">
              <div className="careers_positions_content">
                <h4>
                  Developer Relations Lead
                </h4>
                <p>
                  For our next phase, we are seeking a Developer Relations Lead to work closely with our developer community, communicating the value of 3Box and ensuring highly successful usage of our products among our partners. Responsibilities will include:
                </p>
                <ul>
                  <li>
                    • Constantly mine for needs, requirements and trends in our developer base to help inform our product team of how we can better serve them
                  </li>
                  <li>
                    • Find the right access points for new developers in the space and make sure 3Box is one of the first projects they know and use as they build apps
                  </li>
                  <li>
                    • Produce content that shows developers the value and ease of using 3Box
                  </li>
                  <li>
                    • Qualify high potential projects and partners and help them get the support they need for successful integrations
                  </li>
                  <li>
                    • Be a trusted point of contact to developers, and help foster a sense of community and open source development
                  </li>
                  <li>
                    • Represent 3Box at events, in online forums, and within open source communities
                  </li>
                  <li>
                    • Communicate product updates and upcoming plans to current and potential customers
                  </li>
                </ul>
                <a href="https://www.notion.so/threebox/Developer-Relations-Lead-7e23b76bbf8d494bb0c95f1799965852" target="_blank" rel="noopener noreferrer">
                  <button className="textButton" type="button">
                    View full description
                  </button>
                </a>
              </div>
              <div className="careers_positions_button">
                <a href="mailto:jobs@3box.io">
                  <button type="button" className="primaryMarketing">
                    Apply Now
                    <img src={TriangleWhite} alt="arrow" />
                  </button>
                </a>
              </div>
            </div>
            <div className="careers_open">
              <h5>Don't see your position?</h5>
              <div className="careers_open_text">
                <p>
                  <a href="mailto:jobs@3box.io">
                    Email us
                  </a>
                  a note and tell us about your superpower.
                </p>
              </div>
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
