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
import './styles/Profile.css';
import './styles/Feed.css';

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
  onOtherProfilePage,
  currentAddress,
}) => (
    <div className="profile__details" id="myFeed">
      <div className="profile__details__category">

        <div className="profile__category__header">
          <h5>About</h5>
          <Link to={`/${currentAddress}/${routes.EDIT}`} className="profile__category__editLink">Edit</Link>
        </div>

        <div className="profile__category__divider" />

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
          <img src={Birthday} className="profile__category__field__icon" alt="Birthday Icon" />
          {birthday && <p className="profile__category__field--private">{birthday}</p>}

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

        <div className="profile__category__divider" />

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

        <div className="profile__category__divider" />

        <div className="profile__category__field">
          <img src={Email} className="profile__category__field__icon" alt="Github Icon" />
          <p className="profile__category__field--private">
            {verifiedEmail}
          </p>
          {verifiedEmail && <img src={Verified} alt="Verified" className="profile__category__verified__icon" />}
          {verifiedEmail && <img id="editprofile__privateIcon" src={Private} alt="Private" title="Information with this icon are accessible only by those you've given permission to." />}
        </div>

      </div>

      <div className="profile__details__category">

        <div className="profile__category__header">
          <h5>Work</h5>
        </div>

        <div className="profile__category__divider" />

        <div className="profile__category__field" title="Employer">
          <img src={Employer} className="profile__category__field__icon" alt="Employer Icon" />
          {!onOtherProfilePage && <p>{employer}</p>}
        </div>

        <div className="profile__category__field" title="Job Title">
          <img src={Job} className="profile__category__field__icon" alt="Job Icon" />
          {!onOtherProfilePage && <p>{job}</p>}
        </div>
      </div>

      <div className="profile__details__category">
        <div className="profile__category__header">
          <h5>Education</h5>
        </div>

        <div className="profile__category__divider" />

        <div className="profile__category__field" title="School">
          <img src={School} className="profile__category__field__icon" alt="School Icon" />
          {!onOtherProfilePage && <p>{school}</p>}
        </div>

        <div className="profile__category__field" title="Degree">
          <img src={Degree} className="profile__category__field__icon" alt="Degree Icon" />
          {!onOtherProfilePage && <p>{degree}</p>}
        </div>

        <div className="profile__category__field" title="Major">
          <img src={Major} className="profile__category__field__icon" alt="Major Icon" />
          {!onOtherProfilePage && <p>{major}</p>}
        </div>

        <div className="profile__category__field" title="Graduation Year">
          <img src={Year} className="profile__category__field__icon" alt="Year Icon" />
          {!onOtherProfilePage && <p>{year}</p>}
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
  onOtherProfilePage: PropTypes.bool,
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
  onOtherProfilePage: false,
};

function mapState(state) {
  return {
    verifiedGithub: state.myData.verifiedGithub,
    verifiedTwitter: state.myData.verifiedTwitter,
    verifiedEmail: state.myData.verifiedEmail,
    website: state.myData.website,
    birthday: state.myData.birthday,
    memberSince: state.myData.memberSince,
    location: state.myData.location,
    job: state.myData.job,
    school: state.myData.school,
    degree: state.myData.degree,
    major: state.myData.major,
    year: state.myData.year,
    employer: state.myData.employer,

    onOtherProfilePage: state.uiState.onOtherProfilePage,

    currentAddress: state.userState.currentAddress,
  };
}

export default withRouter(connect(mapState)(Details));
