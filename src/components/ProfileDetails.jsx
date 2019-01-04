import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { address } from '../utils/address';
import * as routes from '../utils/routes';
import EthereumLogo from '../assets/EthereumIcon.svg';
import GithubIcon from '../assets/GithubIcon.svg';
import TwitterIcon from '../assets/twitterGrey.svg';
import Verified from '../assets/Verified.svg';
import Private from '../assets/Private.svg';
import Email from '../assets/Email.svg';
import School from '../assets/School.svg';
import Location from '../assets/Location.svg';
import Website from '../assets/Website.png';
import Birthday from '../assets/Birthday.svg';
import ThreeBox3 from '../assets/3Box3.svg';
import Job from '../assets/Job.svg';
import Degree from '../assets/Degree.svg';
import Major from '../assets/Major.svg';
import Year from '../assets/Year.png';
import Employer from '../assets/Employer.svg';
import '../views/styles/Profile.css';

const ProfileDetails = ({
  name,
  verifiedGithub,
  image,
  coverPhoto,
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
  memberSince,
  verifiedTwitter,
}) => (
    <div>
      {coverPhoto.length > 0 && coverPhoto[0].contentUrl
        ? <img src={`https://ipfs.infura.io/ipfs/${coverPhoto[0].contentUrl['/']}`} className="profile__coverPhoto clearProfPic" alt="profile" />
        : <div className="profile__coverPhoto" />
      }
      <div id="profile">
        <div id="profile__fixed">

          <div id="profile__user__info">

            {image.length > 0 && image[0].contentUrl
              ? <img src={`https://ipfs.infura.io/ipfs/${image[0].contentUrl['/']}`} className="profile__user__picture clearProfPic" alt="profile" />
              : <div className="profile__user__picture" />
            }

            <div className="profile__basic">
              <div className="profile__basic__wrapper">
                {name
                  ? <h2 id="profile__user__name">{name}</h2>
                  : <Link to={routes.EDITPROFILE}><h2 id="profile__user__name__add">Add name</h2></Link>
                }
                <span className="profile__basic__emoji">
                  {emoji.code ? emoji.code : emoji}
                </span>
              </div>

              <div id="profile__network" title="Network">
                <img id="profile__network__networkLogo" src={EthereumLogo} alt="Ethereum Logo" />
                <p id="profile__details__address" title={address}>
                  {address && address.substring(0, 8)}
                  ...
            </p>
              </div>

              <p className="profile__basic__description">
                {description}
              </p>

            </div>

            <div className="profile__category">
              <h5 className="profile__category__header">About</h5>

              <div className="profile__category__field">
                <div>
                  <img src={Email} className="profile__category__field__icon" alt="Github Icon" />
                  {email
                    && (
                      <p className="profile__category__field--private">{email}</p>
                    )
                  }
                </div>
                {email
                  && (
                    <img id="editprofile__privateIcon" src={Private} alt="Private" title="Information with this icon are accessible only by those you've given permission to." />
                  )
                }
              </div>

              <div className="profile__category__field" title="Location">
                <div>
                  <img src={Location} className="profile__category__field__icon" alt="Location Icon" />
                  {location
                    && (
                      <p>{location}</p>
                    )
                  }
                </div>
              </div>

              <div className="profile__category__field" title="Website">
                <div>
                  <img src={Website} className="profile__category__field__icon" alt="Website Icon" />
                  {website
                    && (
                      <p>{website}</p>
                    )
                  }
                </div>
              </div>

              <div className="profile__category__field" title="Github">
                <div>
                  <img src={GithubIcon} className="profile__category__field__icon" alt="Github Icon" />
                  {verifiedGithub
                    && (
                      <p className="profile__category__field__verified">{verifiedGithub}</p>
                    )
                  }
                  {verifiedGithub
                    && (
                      <img src={Verified} alt="Verified" className="profile__category__verified__icon" />
                    )
                  }
                </div>
              </div>

              <div className="profile__category__field" title="Github">
                <div>
                  <img src={TwitterIcon} className="profile__category__field__icon" alt="Github Icon" />
                  {verifiedTwitter
                    && (
                      <p className="profile__category__field__verified">{verifiedTwitter}</p>
                    )
                  }
                  {verifiedTwitter
                    && (
                      <img src={Verified} alt="Verified" className="profile__category__verified__icon" />
                    )}
                </div>
              </div>

              <div className="profile__category__field" title="Birthday">
                <div>
                  <img src={Birthday} className="profile__category__field__icon" alt="Birthday Icon" />
                  {birthday
                    && (
                      <p className="profile__category__field--private">{birthday}</p>
                    )
                  }
                </div>
                {birthday
                  && (
                    <img id="editprofile__privateIcon" src={Private} alt="Private" title="Information with this icon are accessible only by those you've given permission to." />
                  )
                }
              </div>

              <div className="profile__category__field" title="Birthday">
                <div>
                  <img src={ThreeBox3} className="profile__category__field__icon" alt="Birthday Icon" />
                  {memberSince
                    && (
                      <p>{memberSince}</p>
                    )
                  }
                </div>
              </div>

            </div>

            <div className="profile__category">
              <h5 className="profile__category__header">Work</h5>


              <div className="profile__category__field" title="Employer">
                <div>
                  <img src={Employer} className="profile__category__field__icon" alt="Employer Icon" />
                  {employer
                    && (
                      <p>{employer}</p>
                    )
                  }
                </div>
              </div>

              <div className="profile__category__field" title="Job Title">
                <div>
                  <img src={Job} className="profile__category__field__icon" alt="Job Icon" />
                  {job
                    && (
                      <p>{job}</p>
                    )
                  }
                </div>
              </div>
            </div>

            <div className="profile__category">
              <h5 className="profile__category__header">Education</h5>

              <div className="profile__category__field" title="School">
                <div>
                  <img src={School} className="profile__category__field__icon" alt="School Icon" />
                  {school
                    && (
                      <p>{school}</p>
                    )
                  }
                </div>
              </div>

              <div className="profile__category__field" title="Degree">
                <div>
                  <img src={Degree} className="profile__category__field__icon" alt="Degree Icon" />
                  {degree
                    && (
                      <p>{degree}</p>
                    )
                  }
                </div>
              </div>

              <div className="profile__category__field" title="Major">
                <div>
                  <img src={Major} className="profile__category__field__icon" alt="Major Icon" />
                  {major
                    && (
                      <p>{major}</p>
                    )
                  }
                </div>
              </div>

              <div className="profile__category__field" title="Graduation Year">
                <div>
                  <img src={Year} className="profile__category__field__icon" alt="Year Icon" />
                  {year
                    && (
                      <p>{year}</p>
                    )
                  }
                </div>
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
    </div>
  );

ProfileDetails.propTypes = {
  name: PropTypes.string,
  verifiedGithub: PropTypes.string,
  verifiedTwitter: PropTypes.string,
  email: PropTypes.string,
  location: PropTypes.string,
  website: PropTypes.string,
  job: PropTypes.string,
  school: PropTypes.string,
  degree: PropTypes.string,
  memberSince: PropTypes.string,
  major: PropTypes.string,
  year: PropTypes.string,
  employer: PropTypes.string,
  birthday: PropTypes.string,
  emoji: PropTypes.string,
  image: PropTypes.array,
  coverPhoto: PropTypes.array,
  description: PropTypes.string,
};

ProfileDetails.defaultProps = {
  name: '',
  verifiedGithub: '',
  verifiedTwitter: '',
  email: '',
  description: '',
  image: [],
  coverPhoto: [],
  emoji: '',
  location: '',
  memberSince: '',
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
    verifiedGithub: state.threeBox.verifiedGithub,
    verifiedTwitter: state.threeBox.verifiedTwitter,
    image: state.threeBox.image,
    coverPhoto: state.threeBox.coverPhoto,
    emoji: state.threeBox.emoji,
    email: state.threeBox.email,
    description: state.threeBox.description,
    location: state.threeBox.location,
    website: state.threeBox.website,
    birthday: state.threeBox.birthday,
    memberSince: state.threeBox.memberSince,
    job: state.threeBox.job,
    school: state.threeBox.school,
    degree: state.threeBox.degree,
    major: state.threeBox.major,
    year: state.threeBox.year,
    employer: state.threeBox.employer,
  };
}

export default connect(mapState)(ProfileDetails);
