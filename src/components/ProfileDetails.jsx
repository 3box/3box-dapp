import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { address } from '../utils/address';

import * as routes from '../utils/routes';
import EthereumLogo from '../assets/Ethereum_logo_2014.svg';
import GithubIcon from '../assets/GithubIcon.svg';
import Private from '../assets/Private.svg';
import Email from '../assets/Email.svg';
import '../views/styles/Profile.css';
// import Loading from '../assets/Loading.svg';

const ProfileDetails = ({ name, github, image, email }) => (
  <div id="profile">

    {/* {ifFetchingThreeBox
      && (
        <div className="loadingProfile">
          <img src={Loading} alt="loading" id="loadingProfileSpinner" />
        </div>
      )} */}

    <div id="profile_fixed">
      <div>
        <div id="profile_user_info">
          <div id="profile_network" title="Network">
            <img id="profile_network_networkLogo" src={EthereumLogo} alt="Ethereum Logo" />
            <p id="profile_details_address" title={address}>
              {address && address.substring(0, 8)}
              ...
            </p>
          </div>

          {image.length > 0
            ? <img src={`https://ipfs.infura.io/ipfs/${image[0].contentUrl['/']}`} id="profile_user_picture" alt="profile" />
            : <div id="profile_user_picture" />
          }
          {name
            ? <h2 id="profile_user_name">{name}</h2>
            : <Link to={routes.EDITPROFILE}><h2 id="profile_user_name_add">Add name</h2></Link>}

          <div id="profile_links">
            <div id="profile_social" title="Github">
              <img src={GithubIcon} id="profile_githubIcon" alt="Github Icon" />
              {github
                && (
                  <p id="profile_github">{github}</p>
                )
              }
            </div>

            <div id="profile_private">
              <img src={Email} id="profileFooter_email_icon" alt="Github Icon" />
              {email
                && (
                  <p>{email}</p>
                )
              }
              {email
                && (
                  <img id="editprofile_privateIcon" src={Private} alt="Private" title="Information with this icon are accessible only by those you've given permission to." />
                )
              }
            </div>
          </div>
        </div>
      </div>

      <div id="profile_footer">
        <div id="profile_footer_contents">
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
  ifFetchingThreeBox: PropTypes.bool,
  image: PropTypes.array,
};

ProfileDetails.defaultProps = {
  name: '',
  github: '',
  email: '',
  image: [],
  ifFetchingThreeBox: false,
};

function mapState(state) {
  return {
    name: state.threeBox.name,
    github: state.threeBox.github,
    image: state.threeBox.image,
    email: state.threeBox.email,
    ifFetchingThreeBox: state.threeBox.ifFetchingThreeBox,
  };
}

export default connect(mapState)(ProfileDetails);
