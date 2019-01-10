import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as routes from '../../utils/routes';
import GithubIcon from '../../assets/GithubIcon.svg';
import TwitterIcon from '../../assets/twitterGrey.svg';
import Verified from '../../assets/Verified.svg';
import Private from '../../assets/Private.svg';
import Email from '../../assets/Email.svg';
import School from '../../assets/School.svg';
import Location from '../../assets/Location.svg';
import Website from '../../assets/Website.png';
import Birthday from '../../assets/Birthday.svg';
import ThreeBox3 from '../../assets/3Box3.svg';
import Job from '../../assets/Job.svg';
import Degree from '../../assets/Degree.svg';
import Major from '../../assets/Major.svg';
import Year from '../../assets/Year.png';
import Employer from '../../assets/Employer.svg';
import '../../views/styles/Profile.css';
import '../styles/Feed.css';

const ProfileDetails = ({
  verifiedGithub,
  email,
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
  publicProfile,
  publicVerifiedAccounts,
}) => (
    <div className="profile__details" id="feed">
      <div className="profile__details__category">

        {console.log(publicVerifiedAccounts)}
        
        <div className="profile__category__header">
          <h5>About</h5>
          <Link to={routes.EDITPROFILE} className="profile__category__editLink">Edit</Link>
        </div>

        {!publicProfile
          && (
            <div className="profile__category__field">
              <div>
                <img src={Email} className="profile__category__field__icon" alt="Github Icon" />
                {(!publicProfile && email)
                  && <p className="profile__category__field--private">{email}</p>
                }
              </div>
              {(!publicProfile && email)
                && <img id="editprofile__privateIcon" src={Private} alt="Private" title="Information with this icon are accessible only by those you've given permission to." />
              }
            </div>)}

        <div className="profile__category__field" title="Location">
          <div>
            <img src={Location} className="profile__category__field__icon" alt="Location Icon" />
            {(!publicProfile && location)
              ? <p>{location}</p>
              : <p>{publicProfile.location}</p>
            }
          </div>
        </div>

        <div className="profile__category__field" title="Website">
          <div>
            <img src={Website} className="profile__category__field__icon" alt="Website Icon" />
            {(!publicProfile && website)
              ? <p>{website}</p>
              : <p>{publicProfile.website}</p>
            }
          </div>
        </div>

        {!publicProfile
          && (
            <div className="profile__category__field" title="Birthday">
              <div>
                <img src={Birthday} className="profile__category__field__icon" alt="Birthday Icon" />
                {(!publicProfile && birthday)
                  && <p className="profile__category__field--private">{birthday}</p>
                }
              </div>

              {(!publicProfile && birthday)
                && (
                  <img id="editprofile__privateIcon" src={Private} alt="Private" title="Information with this icon are accessible only by those you've given permission to." />
                )
              }
            </div>)}

        <div className="profile__category__field" title="Birthday">
          <div>
            <img src={ThreeBox3} className="profile__category__field__icon" alt="Birthday Icon" />
            {(!publicProfile && memberSince)
              ? <p>{memberSince}</p>
              : <p>{publicProfile.memberSince}</p>
            }
          </div>
        </div>
      </div>

      <div className="profile__details__category">
        <div className="profile__category__header">
          <h5>Verified Accounts</h5>
          <Link to={routes.EDITPROFILE} className="profile__category__editLink">Edit</Link>
        </div>

        <div className="profile__category__field" title="Github">
          <div>
            <img src={GithubIcon} className="profile__category__field__icon" alt="Github Icon" />
            {(!publicProfile && verifiedGithub)
              && <p className="profile__category__field__verified">{verifiedGithub}</p>
            }
            {(!publicProfile && verifiedGithub)
              && <img src={Verified} alt="Verified" className="profile__category__verified__icon" />
            }
            {(publicVerifiedAccounts.github && publicVerifiedAccounts.github.username)
              && <p className="profile__category__field__verified">{publicVerifiedAccounts.github.username}</p>
            }
            {(publicVerifiedAccounts.github && publicVerifiedAccounts.github.username)
              && <img src={Verified} alt="Verified" className="profile__category__verified__icon" />
            }
          </div>
        </div>

        <div className="profile__category__field" title="Github">
          <div>
            <img src={TwitterIcon} className="profile__category__field__icon" alt="Github Icon" />
            {(!publicProfile && verifiedTwitter)
              && <p className="profile__category__field__verified">{verifiedTwitter}</p>
            }
            {(!publicProfile && verifiedTwitter)
              && <img src={Verified} alt="Verified" className="profile__category__verified__icon" />
            }
            {(publicVerifiedAccounts.twitter && publicVerifiedAccounts.twitter.username)
              && <p className="profile__category__field__verified">{publicVerifiedAccounts.twitter.username}</p>
            }
            {(publicVerifiedAccounts.twitter && publicVerifiedAccounts.twitter.username)
              && <img src={Verified} alt="Verified" className="profile__category__verified__icon" />
            }
          </div>
        </div>
      </div>

      <div className="profile__details__category">

        <div className="profile__category__header">
          <h5>Work</h5>
          <Link to={routes.EDITPROFILE} className="profile__category__editLink">Edit</Link>
        </div>

        <div className="profile__category__field" title="Employer">
          <div>
            <img src={Employer} className="profile__category__field__icon" alt="Employer Icon" />
            {(!publicProfile && employer)
              ? <p>{employer}</p>
              : <p>{publicProfile.employer}</p>
            }
          </div>
        </div>

        <div className="profile__category__field" title="Job Title">
          <div>
            <img src={Job} className="profile__category__field__icon" alt="Job Icon" />
            {(!publicProfile && job)
              ? <p>{job}</p>
              : <p>{publicProfile.job}</p>
            }
          </div>
        </div>
      </div>

      <div className="profile__details__category">
        <div className="profile__category__header">
          <h5>Education</h5>
          <Link to={routes.EDITPROFILE} className="profile__category__editLink">Edit</Link>
        </div>

        <div className="profile__category__field" title="School">
          <div>
            <img src={School} className="profile__category__field__icon" alt="School Icon" />
            {(!publicProfile && school)
              ? <p>{school}</p>
              : <p>{publicProfile.school}</p>
            }
          </div>
        </div>

        <div className="profile__category__field" title="Degree">
          <div>
            <img src={Degree} className="profile__category__field__icon" alt="Degree Icon" />
            {(!publicProfile && degree)
              ? <p>{degree}</p>
              : <p>{publicProfile.degree}</p>
            }
          </div>
        </div>

        <div className="profile__category__field" title="Major">
          <div>
            <img src={Major} className="profile__category__field__icon" alt="Major Icon" />
            {(!publicProfile && major)
              ? <p>{major}</p>
              : <p>{publicProfile.major}</p>
            }
          </div>
        </div>

        <div className="profile__category__field" title="Graduation Year">
          <div>
            <img src={Year} className="profile__category__field__icon" alt="Year Icon" />
            {(!publicProfile && year)
              ? <p>{year}</p>
              : <p>{publicProfile.year}</p>
            }
          </div>
        </div>
      </div>
    </div>
  );

ProfileDetails.propTypes = {
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
  publicProfile: PropTypes.object,
  publicVerifiedAccounts: PropTypes.object,
};

ProfileDetails.defaultProps = {
  verifiedGithub: '',
  verifiedTwitter: '',
  email: '',
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
  publicProfile: {},
  publicVerifiedAccounts: {},
};

function mapState(state) {
  return {
    verifiedGithub: state.threeBox.verifiedGithub,
    verifiedTwitter: state.threeBox.verifiedTwitter,
    email: state.threeBox.email,
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
