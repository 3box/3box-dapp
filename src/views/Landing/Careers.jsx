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
    this.state = {
      jobs: [],
    };
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
    const res = await fetch('https://api.lever.co/v0/postings/3box?group=team&mode=json');
    const jobs = await res.json();
    this.setState({ jobs });
    console.log('jobs', jobs);
  }

  render() {
    const { jobs } = this.state;

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
            {!!jobs.length && jobs.map((job) => (
              <div className="careers_positions">
                <h3>{job.title}</h3>

                {job.postings.map((position) => (
                  <div className="careers_positions_content">
                    <h1>
                      {position.text}
                    </h1>
                    <p>{position.categories.location}</p>
                    <a
                      href={position.hostedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="careers_link"
                    >
                      <button className="textButton" type="button">
                        View full description
                      </button>
                    </a>
                  </div>
                ))}
              </div>
            ))}

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
