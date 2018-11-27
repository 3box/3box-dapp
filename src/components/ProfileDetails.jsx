import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import JSEMOJI from 'emoji-js';

import { address } from '../utils/address';

import * as routes from '../utils/routes';
import EthereumLogo from '../assets/Ethereum_logo_2014.svg';
import GithubIcon from '../assets/GithubIcon.svg';
import Private from '../assets/Private.svg';
import Email from '../assets/Email.svg';
import '../views/styles/Profile.css';

const jsemoji = new JSEMOJI();
jsemoji.img_set = 'emojione';
jsemoji.img_sets.emojione.path = 'https://cdn.jsdelivr.net/emojione/assets/3.0/png/32/';
jsemoji.supports_css = false;
jsemoji.allow_native = false;
jsemoji.replace_mode = 'unified';

const ProfileDetails = ({ name, github, image, email, description, emoji }) => (
  <div id="profile">
    <div id="profile__fixed">
      <div id="profile__user__info">

        {image.length > 0 && image[0].contentUrl
          ? <img src={`https://ipfs.infura.io/ipfs/${image[0].contentUrl['/']}`} id="profile__user__picture" alt="profile" />
          : <div id="profile__user__picture" />
        }

        <div className="profile__basic">
          {name
            ? (
              <div className="profile__basic__wrapper">
                <h2 id="profile__user__name">{name}</h2>
                <div dangerouslySetInnerHTML={{ __html: jsemoji.replace_colons(`:${emoji.name}:`) }} className="profile__user__emoji" />
              </div>)
            : <Link to={routes.EDITPROFILE}><h2 id="profile__user__name__add">Add name</h2></Link>}

          {/* <div id="profile__network" title="Network">
            <img id="profile__network__networkLogo" src={EthereumLogo} alt="Ethereum Logo" />
            <p id="profile__details__address" title={address}>
              {address && address.substring(0, 8)}
              ...
            </p>
          </div> */}

          <p className="profile__basic__description">
            {description}
          </p>

        </div>

        <div id="profile__links">
          <div id="profile__social" title="Github">
            <img src={GithubIcon} id="profile__githubIcon" alt="Github Icon" />
            {github
              && (
                <p id="profile__github">{github}</p>
              )
            }
          </div>

          <div id="profile__private">
            <img src={Email} id="profileFooter__email__icon" alt="Github Icon" />
            {email
              && (
                <p>{email}</p>
              )
            }
            {email
              && (
                <img id="editprofile__privateIcon" src={Private} alt="Private" title="Information with this icon are accessible only by those you've given permission to." />
              )
            }
          </div>
        </div>
      </div>

      <div id="profile__footer">
        <div id="profile__footer__contents">
          <p>3Box 2018</p>
          <Link to={routes.TERMS}>Terms</Link>
          <Link to={routes.PRIVACY}>Privacy</Link>
        </div>
      </div>

    </div>
  </div>
);

ProfileDetails.propTypes = {
  name: PropTypes.string,
  github: PropTypes.string,
  email: PropTypes.string,
  emoji: PropTypes.object,
  image: PropTypes.array,
  description: PropTypes.string,
};

ProfileDetails.defaultProps = {
  name: '',
  github: '',
  email: '',
  description: '',
  image: [],
  emoji: {},
};

function mapState(state) {
  return {
    name: state.threeBox.name,
    github: state.threeBox.github,
    image: state.threeBox.image,
    emoji: state.threeBox.emoji,
    email: state.threeBox.email,
    description: state.threeBox.description,
  };
}

export default connect(mapState)(ProfileDetails);
