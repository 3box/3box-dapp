import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import DiscordButton from './components/DiscordButton';
import Footer from './components/Footer';
import Foam from '../../assets/FOAM.png';
import Alethio from '../../assets/Alethio.jpg';
import Alice from '../../assets/Alice.jpg';
import Authereum from '../../assets/Authereum.png';
import Dappkit from '../../assets/Dappkit.png';
import EthDenver from '../../assets/EthDenver.jpg';
import Fortmatic from '../../assets/Fortmatic.png';
import Fuse from '../../assets/Fuse.png';
import Gnosis from '../../assets/Gnosis.jpg';
import LivePeer from '../../assets/LivePeer.jpg';
import Microsponsors from '../../assets/Microsponsors.jpg';
import Pillar from '../../assets/Pillar.jpg';
import Portis from '../../assets/Portis.jpg';
import Rarible from '../../assets/Rarible.jpg';
import Remix from '../../assets/Remix.jpg';
import Simpleid from '../../assets/Simpleid.jpg';
import SuperRare from '../../assets/SuperRare.jpg';
import NiftyFootball from '../../assets/NiftyFootball.png';
import Totem from '../../assets/Totem.png';
import Aragon from '../../assets/aragon_icon.png';
import MolochDAO from '../../assets/MolochDAO.png';
import ConsensysLogo from '../../assets/ConsensysLogo.png';
import Giveth from '../../assets/Giveth.png';
import Zerion from '../../assets/Zerion.png';
import DaoStack from '../../assets/Daostack.jpg';
import ColorCubes from '../../assets/ColorCubes.svg';
import MetaMask from '../../assets/MetaMask.svg';
import ColorCubesMobile from '../../assets/ColorCubesMobile.svg';
import '../styles/Landing.scss';
import '../styles/NewLanding.scss';
import '../../components/styles/Nav.scss';

const styles = {
  backgroundImage: `url("${ColorCubes}")`,
  backgroundRepeat: 'absolute',
};

const shapePartnerObject = (name, image, url) => (
  {
    name,
    image,
    url,
  }
);

const applicationsArray = [
  shapePartnerObject('Alethio', Alethio, 'https://aleth.io/'),
  shapePartnerObject('DAOstack', DaoStack, 'https://daostack.io/'),
  shapePartnerObject('FOAM', Foam, 'https://map.foam.space/leaderboard'),
  shapePartnerObject('NiftyFootball', NiftyFootball, 'https://niftyfootball.cards/'),
  shapePartnerObject('Totem', Totem, 'https://totem.app/'),
  shapePartnerObject('Zerion', Zerion, 'https://zerion.io'),
  shapePartnerObject('MetaMask', MetaMask, 'https://metamask.io'),
  shapePartnerObject('MolochDAO', MolochDAO, 'https://molochdao.com/'),
  shapePartnerObject('Giveth', Giveth),
  shapePartnerObject('Aragon', Aragon),
  shapePartnerObject('ConsenSys MeshHub', ConsensysLogo),
  shapePartnerObject('Gnosis', Gnosis),
  shapePartnerObject('Rarible', Rarible),
  shapePartnerObject('SuperRare', SuperRare),
  shapePartnerObject('Microsponsors', Microsponsors),
  shapePartnerObject('EthDenver', EthDenver),
  shapePartnerObject('LivePeer', LivePeer),
];

const walletsArray = [
  shapePartnerObject('Authereum', Authereum, 'https://authereum.org/'),
  shapePartnerObject('Fortmatic', Fortmatic),
  shapePartnerObject('Portis', Portis),
  shapePartnerObject('Pillar', Pillar),
  shapePartnerObject('Alice', Alice),
  shapePartnerObject('Fuse', Fuse),
];

const devToolsArray = [
  shapePartnerObject('Remix', Remix),
  shapePartnerObject('Simpleid', Simpleid),
  shapePartnerObject('Dappkit', Dappkit),
];

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
                <h4 className="highlight_header">PARTNERS</h4>
                <a
                  href="mailto:partners@3box.io?Subject=Partner%20submission"
                >
                  <button
                    className="textButton"
                    type="button"
                  >
                    Submit your project
                  </button>
                </a>
              </div>

              <div className="partners_content_partners">
                <p>APPLICATIONS</p>
                <div className="partners_grid">
                  {applicationsArray.map((company) => (
                    <Partner
                      name={company.name}
                      url={company.url}
                      image={company.image}
                    />
                  ))}
                </div>

                <p>WALLETS & BROWSERS</p>

                <div className="partners_grid">
                  {walletsArray.map((company) => (
                    <Partner
                      name={company.name}
                      url={company.url}
                      image={company.image}
                    />
                  ))}
                </div>

                <p>DEV TOOLS</p>
                <div className="partners_grid">
                  {devToolsArray.map((company) => (
                    <Partner
                      name={company.name}
                      url={company.url}
                      image={company.image}
                    />
                  ))}
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

        <Footer />
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

const mapState = (state) => ({
  isLoggedIn: state.userState.isLoggedIn,
});

export default withRouter(connect(mapState)(Partners));

const Partner = ({ name, image, url }) => {
  if (url) {
    return (
      <a
        className="partners_tile"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="partners_tile_image">
          <img src={image} alt="3Box Partner" />
          <div className="partners_tile_image_text">
            <p>Visit Project</p>
            <p className="arrow">&rarr;</p>
          </div>
        </div>
        <div className="partners_tile_name">
          <p className="partners_tile_name_text">
            {name}
          </p>
        </div>
        <div className="partners_tile_whitebg" />
        <div className="partners_tile_darkbg" />
      </a>
    );
  }

  return (
    <div className="partners_tile">
      <div className="partners_tile_image">
        <img src={image} alt="3Box Partner" />
        <p>Coming soon</p>
      </div>
      <div className="partners_tile_name">
        <p className="partners_tile_name_text">
          {name}
        </p>
      </div>
      <div className="partners_tile_whitebg" />
      <div className="partners_tile_darkbg" />
    </div>
  );
};
