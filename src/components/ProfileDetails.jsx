import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { address } from '../utils/address';

// import EthereumLogo from '../assets/Ethereum_logo_2014.svg';
import EthereumNetwork from '../assets/EthereumNetwork.svg';
import GithubIcon from '../assets/GithubIcon.svg';
import * as routes from '../utils/routes';
import Email from '../assets/Email.svg';
import '../views/styles/Profile.css';
// import Twitter from '../assets/twitter.svg';
// import Discord from '../assets/discord.svg';

const ProfileDetails = ({ name, github, image, email }) => (
  <div>
    <div id="profile">
      <div id="profile_user_info">
        <div id="profile_network" title="Network">
          {/* <img id="profile_network_networkLogo" src={EthereumLogo} alt="Ethereum Logo" /> */}
          <img src={EthereumNetwork} alt="Ethereum Network" id="profile_network_networkLogo" />
          <p id="profile_details_address" title={address}>
            {address.substring(0, 8)}
            ...
          </p>
        </div>

        {image.length > 0
          ? <img src={`https://ipfs.io/ipfs/${image[0].contentUrl['/']}`} id="profile_user_picture" alt="profile" />
          : <div id="profile_user_picture" />
        }
        {name
          ? <h2 id="profile_user_name">name</h2>
          : <Link to={routes.EDITPROFILE}><h2 id="profile_user_name_add">Add name</h2></Link>}

        <div id="profile_social" title="Github">
          <img src={GithubIcon} id="profile_githubIcon" alt="Github Icon" />
          {github
            ? (
              <p id="profile_github">{github}</p>
            )
            : (
              <Link to={routes.EDITPROFILE}>
                Add Github username
              </Link>
            )
          }
        </div>

        <div id="profile_private">
          <p id="profile_private_header" className="subheader">Private</p>

          <div id="profile_email">
            <img src={Email} id="profileFooter_email_icon" alt="Github Icon" />
            {name
              ? (
                <p>{email}</p>)
              : (
                <Link to={routes.EDITPROFILE}>
                  Add email address
                </Link>
              )
            }
          </div>
        </div>

        <div id="profile_edit">
          <Link to="/EditProfile" id="profile_edit_button">
            Edit
          </Link>
        </div>

      </div>

    </div>
    <div>
      <div id="profile_footer">
        <div id="profile_footer_contents">
          {/* <ul>
          <li>
            <a href="https://github.com/uport-project/3box" title="Github">
              <img src={GithubIcon} id="profileFooter_githubIcon" alt="Github Icon" />
            </a>
          </li>
          <li>
            <a href="https://twitter.com/3boxdb" title="Twitter">
              <img src={Twitter} id="profileFooter_githubIcon" alt="Github Icon" />
            </a>
          </li>
          <li>
            <a href="https://discordapp.com/channels/484729862368526356/485438421054128128" title="Discord">
              <img src={Discord} id="profileFooter_githubIcon" alt="Github Icon" />
            </a>
          </li>
          <li>
            <a href="https://discordapp.com/channels/484729862368526356/485438421054128128" title="Discord">
              <img src={Email} id="profileFooter_email" alt="Github Icon" />
            </a>
          </li>
        </ul> */}
          <div>
            <Link to={routes.TERMS}>Terms</Link>
            <Link to={routes.PRIVACY}>Privacy</Link>
            <p>3Box 2018</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

ProfileDetails.propTypes = {
  name: PropTypes.string,
  github: PropTypes.string,
  email: PropTypes.string,
  image: PropTypes.array,
};

ProfileDetails.defaultProps = {
  name: '',
  github: '',
  email: '',
  image: [],
};

function mapState(state) {
  return {
    name: state.threeBoxData.name,
    github: state.threeBoxData.github,
    image: state.threeBoxData.image,
    email: state.threeBoxData.email,
  };
}

export default connect(mapState)(ProfileDetails);
