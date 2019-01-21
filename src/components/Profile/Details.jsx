import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { addhttp } from '../../utils/funcs';
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
  onPublicProfilePage,
}) => (
    <div className="profile__details" id="feed">
      <div className="profile__details__category">

        <div className="profile__category__header">
          <h5>About</h5>
          <Link to={routes.EDITPROFILE} className="profile__category__editLink">Edit</Link>
        </div>

        {/* Do not render private fields on public profiles */}
        <div className="profile__category__field">
          <div>
            <img src={Email} className="profile__category__field__icon" alt="Github Icon" />
            <p className="profile__category__field--private">{email}</p>
          </div>
          {email && <img id="editprofile__privateIcon" src={Private} alt="Private" title="Information with this icon are accessible only by those you've given permission to." />}
        </div>

        <div className="profile__category__field" title="Location">
          <div>
            <img src={Location} className="profile__category__field__icon" alt="Location Icon" />
            <p>{location}</p>
          </div>
        </div>

        <div className="profile__category__field" title="Website">
          <div>
            <img src={Website} className="profile__category__field__icon" alt="Website Icon" />
            {website && (
              <a
                href={addhttp(website)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {website}
              </a>)}
          </div>
        </div>

        {/* Private fields donot render on public profiles */}
        <div className="profile__category__field" title="Birthday">
          <div>
            <img src={Birthday} className="profile__category__field__icon" alt="Birthday Icon" />
            {birthday && <p className="profile__category__field--private">{birthday}</p>}
          </div>

          {birthday && <img id="editprofile__privateIcon" src={Private} alt="Private" title="Information with this icon are accessible only by those you've given permission to." />}
        </div>

        <div className="profile__category__field" title="Birthday">
          <div>
            <img src={ThreeBox3} className="profile__category__field__icon" alt="Birthday Icon" />
            <p>{memberSince}</p>
          </div>
        </div>
      </div>

      <div className="profile__details__category">
        <div className="profile__category__header">
          <h5>Verified Accounts</h5>
        </div>

        <div className="profile__category__field" title="Github">
          <div>
            <img src={GithubIcon} className="profile__category__field__icon" alt="Github Icon" />
            <React.Fragment>
              <a href={`https://www.github.com/${verifiedGithub}`} className="profile__category__field__verified" target="_blank" rel="noopener noreferrer">{verifiedGithub}</a>
              {verifiedGithub && <img src={Verified} alt="Verified" className="profile__category__verified__icon" />}
            </React.Fragment>
          </div>
        </div>

        <div className="profile__category__field" title="Github">
          <div>
            <img src={TwitterIcon} className="profile__category__field__icon" alt="Github Icon" />
            <React.Fragment>
              <a href={`https://www.twitter.com/${verifiedTwitter}`} className="profile__category__field__verified" target="_blank" rel="noopener noreferrer">{verifiedTwitter}</a>
              {verifiedTwitter && <img src={Verified} alt="Verified" className="profile__category__verified__icon" />}
            </React.Fragment>
          </div>
        </div>
      </div>

      <div className="profile__details__category">

        <div className="profile__category__header">
          <h5>Work</h5>
        </div>

        <div className="profile__category__field" title="Employer">
          <div>
            <img src={Employer} className="profile__category__field__icon" alt="Employer Icon" />
            {!onPublicProfilePage && <p>{employer}</p>}
          </div>
        </div>

        <div className="profile__category__field" title="Job Title">
          <div>
            <img src={Job} className="profile__category__field__icon" alt="Job Icon" />
            {!onPublicProfilePage && <p>{job}</p>}
          </div>
        </div>
      </div>

      <div className="profile__details__category">
        <div className="profile__category__header">
          <h5>Education</h5>
        </div>

        <div className="profile__category__field" title="School">
          <div>
            <img src={School} className="profile__category__field__icon" alt="School Icon" />
            {!onPublicProfilePage && <p>{school}</p>}
          </div>
        </div>

        <div className="profile__category__field" title="Degree">
          <div>
            <img src={Degree} className="profile__category__field__icon" alt="Degree Icon" />
            {!onPublicProfilePage && <p>{degree}</p>}
          </div>
        </div>

        <div className="profile__category__field" title="Major">
          <div>
            <img src={Major} className="profile__category__field__icon" alt="Major Icon" />
            {!onPublicProfilePage && <p>{major}</p>}
          </div>
        </div>

        <div className="profile__category__field" title="Graduation Year">
          <div>
            <img src={Year} className="profile__category__field__icon" alt="Year Icon" />
            {!onPublicProfilePage && <p>{year}</p>}
          </div>
        </div>
      </div>
    </div>
  );

ProfileDetails.propTypes = {
  verifiedGithub: PropTypes.string,
  verifiedTwitter: PropTypes.string,
  email: PropTypes.string,
  website: PropTypes.string,
  job: PropTypes.string,
  school: PropTypes.string,
  degree: PropTypes.string,
  memberSince: PropTypes.string,
  major: PropTypes.string,
  year: PropTypes.string,
  employer: PropTypes.string,
  location: PropTypes.string,
  birthday: PropTypes.string,
  onPublicProfilePage: PropTypes.bool,
};

ProfileDetails.defaultProps = {
  verifiedGithub: '',
  verifiedTwitter: '',
  email: '',
  memberSince: '',
  website: '',
  birthday: '',
  location: '',
  job: '',
  school: '',
  degree: '',
  major: '',
  year: '',
  employer: '',
  onPublicProfilePage: false,
};

function mapState(state) {
  return {
    verifiedGithub: state.threeBox.verifiedGithub,
    verifiedTwitter: state.threeBox.verifiedTwitter,
    email: state.threeBox.email,
    website: state.threeBox.website,
    birthday: state.threeBox.birthday,
    memberSince: state.threeBox.memberSince,
    location: state.threeBox.location,
    job: state.threeBox.job,
    school: state.threeBox.school,
    degree: state.threeBox.degree,
    major: state.threeBox.major,
    year: state.threeBox.year,
    employer: state.threeBox.employer,
    onPublicProfilePage: state.threeBox.onPublicProfilePage,
  };
}

export default withRouter(connect(mapState)(ProfileDetails));
