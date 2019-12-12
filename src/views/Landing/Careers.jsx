import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import TriangleWhite from '../../assets/TriangleWhite.svg';
import TriangleBlack from '../../assets/TriangleBlack.svg';
import ColorCubes from '../../assets/ColorCubes.svg';
import ColorCubesMobile from '../../assets/ColorCubesMobile.svg';
import '../styles/Landing.scss';
import '../styles/NewLanding.scss';
import '../../components/styles/Nav.scss';
import DiscordButton from './components/DiscordButton';
import Footer from './components/Footer';

const styles = {
  backgroundImage: `url("${ColorCubes}")`,
  backgroundRepeat: 'absolute',
};

class Careers extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="Careers_page">
        <main className="hero">
          <div className="hero_text">
            <div className="hero_copy_wrapper">
              <h1>Careers</h1>
              <p>
                Join us in building the future of distributed consumer applications
              </p>
              <div className="hero_copy_buttons">
                <a href="https://medium.com/3box/3box-culture-a-team-community-and-company-595004959b61">
                  <button type="button" className="secondary">
                    Our Culture
                    <img src={TriangleBlack} alt="arrow" />
                  </button>
                </a>
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
              <br />
              <p>
                3Box is building a more trusting, human and connected web, where users are in control of their own data and developers are empowered to build lighter, more collaborative, more powerful services and experiences based on open data and infrastructure. This is a chance to join and help shape our team at an exciting and early stage: we're one of the fastest growing projects in the crypto/Web3 space and are readying to scale our products, protocols and team into new markets.
              </p>
            </div>
            <div className="careers_positions">
              <div className="careers_positions_content">
                <h1>
                  Protocol Engineer
                </h1>
                <p>
                  For our next phase, we are seeking a Protocol Engineer to lead the development of our next generation protocols and scale our distributed network to global usage and more powerful use cases.
                </p>
                <h4>
                  Do you:
                </h4>
                <ul>
                  <li>
                    • Have experience designing software or protocols for scaled, distributed data networks?
                  </li>
                  <li>
                    • Feel like applying that to reinventing how data is managed online, giving power back to users, communities and startups?
                  </li>
                  <li>
                    • Want to join the ground floor of a dynamic team with a shared commitment to a better web?
                  </li>
                </ul>
                <h4>
                  You will get to:
                </h4>
                <ul>
                  <li>
                    • Help design protocols for distributed user data, identity, and access control
                  </li>
                  <li>
                    • Lead the implementation of the protocol, with tight coupling between engineering, design, research and network input
                  </li>
                  <li>
                    • Research and develop new techniques, technologies and ideas for improvements, especially in:
                    <ul>
                      <li>
                        • Data routing model
                      </li>
                      <li>
                        • Real-time / low-latency collaboration on distributed data
                      </li>
                      <li>
                        • Access control systems
                      </li>
                      <li>
                        • Consensus and coordination in an open and permissionless network
                      </li>
                    </ul>
                  </li>
                  <li>
                    • Contribute to incentive/mechanism design for a many-stakeholder network
                  </li>
                  <li>
                    • Coordinate with the teams and communities of related technologies, standards and networks
                  </li>
                </ul>
                <h4>
                  You make a great candidate if you have:
                </h4>
                <ul>
                  <li>
                    • Strong computer science fundamentals with knowledge in distributed systems cryptography
                  </li>
                  <li>
                    • Deep understanding of data structures and their impact on processing, indexing, or latency
                  </li>
                  <li>
                    • Previous experience with high scale, distributed, collaborative data systems; for example:
                    <ul>
                      <li>
                        • Event-driven platforms consuming high volume, distributed data streams
                      </li>
                      <li>
                        • Cloud software with real-time collaboration, syncing, or networking across clients
                      </li>
                      <li>
                        • Protocols for network naming, routing, p2p communications, or DHT-based systems
                      </li>
                    </ul>
                  </li>
                  <li>
                    • A practical approach with a history of delivering high quality, production-ready technology
                  </li>
                  <li>
                    • Familiarity in open source ecosystems and a grasp of blockchain concepts and technologies
                  </li>
                  <li>
                    • Bring energy, unique perspectives and strong communication to collaborate with teammates
                  </li>
                  <li>
                    • Bonus points: background in mechanism design or game theory, ability to design systems for adversarial environments, experience working with standards or research organizations
                  </li>
                </ul>
                <a
                  href="https://www.notion.so/threebox/Protocol-Engineer-6d4325cfd76a44289041e86060a0c0e5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="careers_link"
                >
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

        <Footer />
      </div>
    );
  }
}

Careers.propTypes = {
  handleSignInUp: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool,
};

Careers.defaultProps = {
  isLoggedIn: false,
};

const mapState = state => ({
  isLoggedIn: state.userState.isLoggedIn,
});

export default withRouter(connect(mapState)(Careers));
