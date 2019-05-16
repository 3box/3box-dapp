import React, { Suspense, lazy, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import ProfileHover from 'profile-hover';
import Box from '3box';

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

const graphqlQueryObject = address => `
{
  profile(id: "${address}") {
    name
    image
  }
}
`;

class Partners extends Component {
  constructor(props) {
    super(props);
    this.state = {
      danny: null,
      oed: null,
      zach: null,
      michael: null,
      kenzo: null,
    }
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
    try {
      const danny = await Box.profileGraphQL(graphqlQueryObject('0xBcfD8dDAc6B8fe5144553B50790ca631b1760FB0'));
      const oed = await Box.profileGraphQL(graphqlQueryObject('0xBcfD8dDAc6B8fe5144553B50790ca631b1760FB0'));
      const zach = await Box.profileGraphQL(graphqlQueryObject('0x9acb0539f2ea0c258ac43620dd03ef01f676a69b'));
      const michael = await Box.profileGraphQL(graphqlQueryObject('0xa8ee0babe72cd9a80ae45dd74cd3eae7a82fd5d1'));
      const kenzo = await Box.profileGraphQL(graphqlQueryObject('0x59B5fbC62519DBF9B7044fd0eCb6442aC16FAe2A'));

      this.setState({
        danny, oed, zach, michael, kenzo,
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const {
      danny, oed, zach, michael, kenzo,
    } = this.state;
    console.log(danny, oed, zach, michael, kenzo);

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
                  <ProfileHover address="0xBcfD8dDAc6B8fe5144553B50790ca631b1760FB0" noTheme>
                    <div>

                    </div>
                  </ProfileHover>

                  {/* Michael */}
                  <ProfileHover address="0xa8ee0babe72cd9a80ae45dd74cd3eae7a82fd5d1" noTheme>

                  </ProfileHover>

                  {/* Zach */}
                  <ProfileHover address="0x9acb0539f2ea0c258ac43620dd03ef01f676a69b" noTheme>

                  </ProfileHover>
                  {/* Kenzo */}
                  <ProfileHover address="0x59B5fbC62519DBF9B7044fd0eCb6442aC16FAe2A" noTheme>

                  </ProfileHover>
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
