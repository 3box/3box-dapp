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
import School from '../assets/School.svg';
import Location from '../assets/Location.svg';
import Website from '../assets/Website.png';
import Birthday from '../assets/Birthday.svg';
import Job from '../assets/Job.svg';
import Degree from '../assets/Degree.svg';
import Major from '../assets/Major.svg';
import Year from '../assets/Year.png';
import Employer from '../assets/Employer.svg';
import '../views/styles/Profile.css';

const jsemoji = new JSEMOJI();
jsemoji.img_set = 'emojione';
jsemoji.img_sets.emojione.path = 'https://cdn.jsdelivr.net/emojione/assets/3.0/png/32/';
jsemoji.supports_css = false;
jsemoji.allow_native = false;
jsemoji.replace_mode = 'unified';

const ProfileDetails = ({
  name,
  github,
  image,
  email,
  description,
  emoji,
  website,
  location,
  birthday,
  job,
  school,
  degree,
  major,
  year,
  employer,
}) => (
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

          <div className="profile__category">
            <h5 className="profile__category__header">About</h5>

            <div className="profile__category__field">
              <img src={Email} className="profile__category__field__icon" alt="Github Icon" />
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

            <div className="profile__category__field" title="Github">
              <img src={Location} className="profile__category__field__icon" alt="Github Icon" />
              {location
                && (
                  <p id="profile__github">{location}</p>
                )
              }
            </div>

            <div className="profile__category__field" title="Github">
              <img src={Website} className="profile__category__field__icon" alt="Github Icon" />
              {website
                && (
                  <p id="profile__github">{website}</p>
                )
              }
            </div>

            <div className="profile__category__field" title="Github">
              <img src={GithubIcon} className="profile__category__field__icon" alt="Github Icon" />
              {github
                && (
                  <p id="profile__github">{github}</p>
                )
              }
            </div>

            <div className="profile__category__field" title="Github">
              <img src={Birthday} className="profile__category__field__icon" alt="Github Icon" />
              {birthday
                && (
                  <p id="profile__github">{birthday}</p>
                )
              }
              {birthday
                && (
                  <img id="editprofile__privateIcon" src={Private} alt="Private" title="Information with this icon are accessible only by those you've given permission to." />
                )
              }
            </div>

          </div>

          <div className="profile__category">
            <h5 className="profile__category__header">Work</h5>

            <div className="profile__category__field" title="Github">
              <img src={Employer} className="profile__category__field__icon" alt="Github Icon" />
              {employer
                && (
                  <p id="profile__github">{employer}</p>
                )
              }
            </div>

            <div className="profile__category__field" title="Github">
              <img src={Job} className="profile__category__field__icon" alt="Github Icon" />
              {job
                && (
                  <p id="profile__github">{job}</p>
                )
              }
            </div>
          </div>

          <div className="profile__category">
            <h5 className="profile__category__header">Education</h5>

            <div className="profile__category__field" title="Github">
              <img src={School} className="profile__category__field__icon" alt="Github Icon" />
              {school
                && (
                  <p id="profile__github">{school}</p>
                )
              }
            </div>

            <div className="profile__category__field" title="Github">
              <img src={Degree} className="profile__category__field__icon" alt="Github Icon" />
              {degree
                && (
                  <p id="profile__github">{degree}</p>
                )
              }
            </div>

            <div className="profile__category__field" title="Github">
              <img src={Major} className="profile__category__field__icon" alt="Github Icon" />
              {major
                && (
                  <p id="profile__github">{major}</p>
                )
              }
            </div>

            <div className="profile__category__field" title="Github">
              <img src={Year} className="profile__category__field__icon" alt="Github Icon" />
              {year
                && (
                  <p id="profile__github">{year}</p>
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
  location: PropTypes.string,
  website: PropTypes.string,
  job: PropTypes.string,
  school: PropTypes.string,
  degree: PropTypes.string,
  major: PropTypes.string,
  year: PropTypes.string,
  employer: PropTypes.string,
  birthday: PropTypes.instanceOf(Date),
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
  location: '',
  website: '',
  birthday: '',
  job: '',
  school: '',
  degree: '',
  major: '',
  year: '',
  employer: '',
};

function mapState(state) {
  return {
    name: state.threeBox.name,
    github: state.threeBox.github,
    image: state.threeBox.image,
    emoji: state.threeBox.emoji,
    email: state.threeBox.email,
    description: state.threeBox.description,
    location: state.threeBox.location,
    website: state.threeBox.website,
    birthday: state.threeBox.birthday,
    job: state.threeBox.job,
    school: state.threeBox.school,
    degree: state.threeBox.degree,
    major: state.threeBox.major,
    year: state.threeBox.year,
    employer: state.threeBox.employer,
  };
}

export default connect(mapState)(ProfileDetails);
