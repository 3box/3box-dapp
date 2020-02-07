import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ProfileHover from 'profile-hover';
import Box from '3box';

import ColorCubes from '../../assets/ColorCubes.svg';
import ColorCubesMobile from '../../assets/ColorCubesMobile.svg';
import DiscordButton from './components/DiscordButton';
import Footer from './components/Footer';

import '../styles/Landing.scss';
import '../styles/NewLanding.scss';
import '../../components/styles/Nav.scss';

const styles = {
  backgroundImage: `url("${ColorCubes}")`,
  backgroundRepeat: 'absolute',
};

const graphqlQueryObject = (address) => `
{
  profile(id: "${address}") {
    name
    image
  }
}
`;

class Team extends Component {
  constructor(props) {
    super(props);
    this.state = {
      danny: {},
      oed: {},
      zach: {},
      michael: {},
      kenzo: {},
      rachel: {},
      mike: {},
    };
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
    try {
      const profileCalls = [];
      profileCalls.push(Box.profileGraphQL(graphqlQueryObject('0xBcfD8dDAc6B8fe5144553B50790ca631b1760FB0'))); // danny
      profileCalls.push(Box.profileGraphQL(graphqlQueryObject('0x5c44e8982fa3c3239c6e3c5be2cc6663c7c9387e'))); // oed
      profileCalls.push(Box.profileGraphQL(graphqlQueryObject('0xa8ee0babe72cd9a80ae45dd74cd3eae7a82fd5d1'))); // michael
      profileCalls.push(Box.profileGraphQL(graphqlQueryObject('0x9acb0539f2ea0c258ac43620dd03ef01f676a69b'))); // zach
      profileCalls.push(Box.profileGraphQL(graphqlQueryObject('0xbaeBB7d18f8b16B0A970FDa91f1EfA626D67423E'))); // kenzo
      profileCalls.push(Box.profileGraphQL(graphqlQueryObject('0x2f4cE4f714C68A3fC871d1f543FFC24b9b3c2386'))); // rachel
      profileCalls.push(Box.profileGraphQL(graphqlQueryObject('0x5A7246Af4fefe777E32399310B50BB7fE2D04F8a'))); // mike

      const profilePromises = Promise.all(profileCalls);
      const profiles = await profilePromises;
      this.setState({
        danny: profiles[0],
        oed: profiles[1],
        michael: profiles[2],
        zach: profiles[3],
        kenzo: profiles[4],
        rachel: profiles[5],
        mike: profiles[6],
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const {
      danny, oed, zach, michael, kenzo, rachel, mike
    } = this.state;

    return (
      <div className="landing_page">
        <main className="hero partners_hero">
          <div className="partners_content">
            <div className="partners_content_wrapper">
              <div className="partners_content_header">
                <h4 className="highlight_header">TEAM</h4>
              </div>
              <div className="team_mates_wrapper">
                <div className="team_mates">
                  {/* Danny */}
                  <ProfileHover
                    address="0xBcfD8dDAc6B8fe5144553B50790ca631b1760FB0"
                    noTheme
                    orientation="right"
                  >
                    <a
                      href="/0xBcfD8dDAc6B8fe5144553B50790ca631b1760FB0"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="team_tile">
                        {danny.profile ? <img src={`https://ipfs.infura.io/ipfs/${danny.profile.image}`} alt="profile" />
                          : <div className="team_tile_emptyImage" />}
                        <div className="team_info">
                          <h3>{danny.profile ? danny.profile.name : 'Danny Zuckerman'}</h3>
                          <p className="team_info_role">Co-founder, Operations</p>
                        </div>
                      </div>
                    </a>
                  </ProfileHover>

                  {/* oed */}
                  <ProfileHover
                    address="0x5c44e8982fa3c3239c6e3c5be2cc6663c7c9387e"
                    noTheme
                    orientation="right"
                  >
                    <a
                      href="/0x5c44e8982fa3c3239c6e3c5be2cc6663c7c9387e"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="team_tile">
                        {oed.profile ? <img src={`https://ipfs.infura.io/ipfs/${oed.profile.image}`} alt="profile" />
                          : <div className="team_tile_emptyImage" />}
                        <div className="team_info">
                          <h3>{oed.profile ? oed.profile.name : 'Joel Thorstensson'}</h3>
                          <p className="team_info_role">Co-founder, Engineering</p>
                        </div>
                      </div>
                    </a>
                  </ProfileHover>

                  {/* Michael */}
                  <ProfileHover
                    address="0xa8ee0babe72cd9a80ae45dd74cd3eae7a82fd5d1"
                    noTheme
                    orientation="right"
                  >
                    <a
                      href="/0xa8ee0babe72cd9a80ae45dd74cd3eae7a82fd5d1"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="team_tile">
                        {michael.profile ? <img src={`https://ipfs.infura.io/ipfs/${michael.profile.image}`} alt="profile" />
                          : <div className="team_tile_emptyImage" />}
                        <div className="team_info">
                          <h3>{michael.profile ? michael.profile.name : 'Michael Sena'}</h3>
                          <p className="team_info_role">Co-founder, Product</p>
                        </div>
                      </div>
                    </a>
                  </ProfileHover>

                  {/* Zach */}
                  <ProfileHover
                    address="0x9acb0539f2ea0c258ac43620dd03ef01f676a69b"
                    noTheme
                    orientation="right"
                  >
                    <a
                      href="/0x9acb0539f2ea0c258ac43620dd03ef01f676a69b"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="team_tile">
                        {zach.profile ? <img src={`https://ipfs.infura.io/ipfs/${zach.profile.image}`} alt="profile" />
                          : <div className="team_tile_emptyImage" />}
                        <div className="team_info">
                          <h3>{zach.profile ? zach.profile.name : 'Zach Ferland'}</h3>
                          <p className="team_info_role">Fullstack Engineer</p>
                        </div>
                      </div>
                    </a>
                  </ProfileHover>

                  {/* Rachel */}
                  <ProfileHover
                    address="0x2f4cE4f714C68A3fC871d1f543FFC24b9b3c2386"
                    noTheme
                    orientation="right"
                  >
                    <a
                      href="/0x2f4cE4f714C68A3fC871d1f543FFC24b9b3c2386"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="team_tile">
                        {rachel.profile ? <img src={`https://ipfs.infura.io/ipfs/${rachel.profile.image}`} alt="profile" />
                          : <div className="team_tile_emptyImage" />}
                        <div className="team_info">
                          <h3>{rachel.profile ? rachel.profile.name : 'Rachel Black'}</h3>
                          <p className="team_info_role">Developer Relations</p>
                        </div>
                      </div>
                    </a>
                  </ProfileHover>

                  {/* Mike */}
                  <ProfileHover
                    address="0x5A7246Af4fefe777E32399310B50BB7fE2D04F8a"
                    noTheme
                    orientation="right"
                  >
                    <a
                      href="/0x5A7246Af4fefe777E32399310B50BB7fE2D04F8a"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="team_tile">
                        {mike.profile ? <img src={`https://ipfs.infura.io/ipfs/${mike.profile.image}`} alt="profile" />
                          : <div className="team_tile_emptyImage" />}
                        <div className="team_info">
                          <h3>{mike.profile ? mike.profile.name : 'Mike SC'}</h3>
                          <p className="team_info_role">Distributed Systems Engineer</p>
                        </div>
                      </div>
                    </a>
                  </ProfileHover>

                  {/* Kenzo */}
                  <ProfileHover
                    address="0xbaeBB7d18f8b16B0A970FDa91f1EfA626D67423E"
                    noTheme
                    orientation="right"
                  >
                    <a
                      href="/0xbaeBB7d18f8b16B0A970FDa91f1EfA626D67423E"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="team_tile">
                        {kenzo.profile ? <img src={`https://ipfs.infura.io/ipfs/${kenzo.profile.image}`} alt="profile" />
                          : <div className="team_tile_emptyImage" />}
                        <div className="team_info">
                          <h3>{kenzo.profile ? kenzo.profile.name : 'Kenzo Nakamura'}</h3>
                          <p className="team_info_role">Front-End Developer</p>
                        </div>
                      </div>
                    </a>
                  </ProfileHover>
                </div>
              </div>
            </div>
          </div>
          <div className="hero_graphic">
            <div style={styles} className="hero_graphic_colorcubes-dtw" />
            <img src={ColorCubesMobile} alt="Color cubes" className="hero_graphic_colorcubes-mobile" />
          </div>
          <DiscordButton />
        </main>

        <Footer />
      </div>
    );
  }
}

Team.propTypes = {
  isLoggedIn: PropTypes.bool,
};

Team.defaultProps = {
  isLoggedIn: false,
};

const mapState = state => ({
  isLoggedIn: state.userState.isLoggedIn,
});

export default withRouter(connect(mapState)(Team));
