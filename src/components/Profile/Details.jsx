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

const Details = ({
  verifiedGithub,
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
  verifiedEmail,
  onPublicProfilePage,
  currentAddress,
}) => (
    <div className="profile__details" id="feed">
      <div className="profile__details__category">

        <div className="profile__category__header">
          <h5>About</h5>
          <Link to={`/${currentAddress}/${routes.EDIT}`} className="profile__category__editLink">Edit</Link>
        </div>

        <div className="profile__category__field" title="Location">
          <img src={Location} className="profile__category__field__icon" alt="Location Icon" />
          <p>{location}</p>
        </div>

        <div className="profile__category__field" title="Website">
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

        <div className="profile__category__field" title="Birthday">
          <div>
            <img src={Birthday} className="profile__category__field__icon" alt="Birthday Icon" />
            {birthday && <p className="profile__category__field--private">{birthday}</p>}
          </div>

          {birthday && <img id="editprofile__privateIcon" src={Private} alt="Private" title="Information with this icon are accessible only by those you've given permission to." />}
        </div>

        <div className="profile__category__field" title="Birthday">
          <img src={ThreeBox3} className="profile__category__field__icon" alt="Birthday Icon" />
          <p>{memberSince}</p>
        </div>
      </div>

      <div className="profile__details__category">
        <div className="profile__category__header">
          <h5>Verified Accounts</h5>
        </div>

        <div className="profile__category__field" title="Github">
          <img src={GithubIcon} className="profile__category__field__icon" alt="Github Icon" />
          <React.Fragment>
            <a href={`https://www.github.com/${verifiedGithub}`} className="profile__category__field__verified" target="_blank" rel="noopener noreferrer">{verifiedGithub}</a>
            {verifiedGithub && <img src={Verified} alt="Verified" className="profile__category__verified__icon" />}
          </React.Fragment>
        </div>

        <div className="profile__category__field" title="Github">
          <img src={TwitterIcon} className="profile__category__field__icon" alt="Github Icon" />
          <React.Fragment>
            <a href={`https://www.twitter.com/${verifiedTwitter}`} className="profile__category__field__verified" target="_blank" rel="noopener noreferrer">{verifiedTwitter}</a>
            {verifiedTwitter && <img src={Verified} alt="Verified" className="profile__category__verified__icon" />}
          </React.Fragment>
        </div>
      </div>

      <div className="profile__details__category">
        <div className="profile__category__header">
          <h5>Contact</h5>
        </div>

        <div className="profile__category__field">
          <img src={Email} className="profile__category__field__icon" alt="Github Icon" />
          <p className="profile__category__field--private">{verifiedEmail}</p>
          {verifiedEmail && <img id="editprofile__privateIcon" src={Private} alt="Private" title="Information with this icon are accessible only by those you've given permission to." />}
          {verifiedEmail && <img src={Verified} alt="Verified" className="profile__category__verified__icon" />}
        </div>

      </div>

      <div className="profile__details__category">

        <div className="profile__category__header">
          <h5>Work</h5>
        </div>

        <div className="profile__category__field" title="Employer">
          <img src={Employer} className="profile__category__field__icon" alt="Employer Icon" />
          {!onPublicProfilePage && <p>{employer}</p>}
        </div>

        <div className="profile__category__field" title="Job Title">
          <img src={Job} className="profile__category__field__icon" alt="Job Icon" />
          {!onPublicProfilePage && <p>{job}</p>}
        </div>
      </div>

      <div className="profile__details__category">
        <div className="profile__category__header">
          <h5>Education</h5>
        </div>

        <div className="profile__category__field" title="School">
          <img src={School} className="profile__category__field__icon" alt="School Icon" />
          {!onPublicProfilePage && <p>{school}</p>}
        </div>

        <div className="profile__category__field" title="Degree">
          <img src={Degree} className="profile__category__field__icon" alt="Degree Icon" />
          {!onPublicProfilePage && <p>{degree}</p>}
        </div>

        <div className="profile__category__field" title="Major">
          <img src={Major} className="profile__category__field__icon" alt="Major Icon" />
          {!onPublicProfilePage && <p>{major}</p>}
        </div>

        <div className="profile__category__field" title="Graduation Year">
          <img src={Year} className="profile__category__field__icon" alt="Year Icon" />
          {!onPublicProfilePage && <p>{year}</p>}
        </div>
      </div>
    </div>
  );

Details.propTypes = {
  verifiedGithub: PropTypes.string,
  verifiedTwitter: PropTypes.string,
  verifiedEmail: PropTypes.string,
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
  currentAddress: PropTypes.string,
  onPublicProfilePage: PropTypes.bool,
};

Details.defaultProps = {
  verifiedGithub: '',
  verifiedTwitter: '',
  verifiedEmail: '',
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
  currentAddress: '',
  onPublicProfilePage: false,
};

function mapState(state) {
  return {
    verifiedGithub: state.threeBox.verifiedGithub,
    verifiedTwitter: state.threeBox.verifiedTwitter,
    verifiedEmail: state.threeBox.verifiedEmail,
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
    currentAddress: state.threeBox.currentAddress,
  };
}

export default withRouter(connect(mapState)(Details));
