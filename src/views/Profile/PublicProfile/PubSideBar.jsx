import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addhttp } from '../../../utils/funcs';
import PubFollowing from './PubFollowing';
import GithubIcon from '../../../assets/GithubIcon.svg';
import TwitterIcon from '../../../assets/twitterGrey.svg';
import Verified from '../../../assets/Verified.svg';
import School from '../../../assets/School.svg';
import Location from '../../../assets/Location.svg';
import Website from '../../../assets/Website.png';
import ThreeBox3 from '../../../assets/3Box3.svg';
import Job from '../../../assets/Job.svg';
import Degree from '../../../assets/Degree.svg';
import Major from '../../../assets/Major.svg';
import Year from '../../../assets/Year.png';
import Employer from '../../../assets/Employer.svg';
import '../styles/Profile.css';

const PubSideBar = ({
  otherGithub,
  otherWebsite,
  otherLocation,
  otherJob,
  otherSchool,
  otherDegree,
  otherMajor,
  otherYear,
  otherEmployer,
  otherMemberSince,
  otherTwitter,
  isFollowing,
  isMe,
}) => (
    <React.Fragment>
      <PubFollowing isFollowing={isFollowing} isMe={isMe} />

      {(otherLocation || otherWebsite || otherGithub || otherTwitter) && (
        <div className="public__about">
          <h5 className="public__about__header">About</h5>
          {otherLocation && (
            <div className="public__about__field" title="Location">
              <img src={Location} className="profile__category__field__icon" alt="Location Icon" />
              <p>{otherLocation}</p>
            </div>
          )}

          {otherWebsite && (
            <div className="public__about__field" title="Website">
              <img src={Website} className="profile__category__field__icon" alt="Website Icon" />
              <a
                href={`${addhttp(otherWebsite)}`}
                className="profile__category__field__verified"
                target="_blank"
                rel="noopener noreferrer"
              >
                {otherWebsite}
              </a>
            </div>
          )}

          {otherGithub && (
            <div className="public__about__field" title="Github">
              <img src={GithubIcon} className="profile__category__field__icon" alt="Github Icon" />
              <a
                href={`https://www.github.com/${otherGithub}`}
                className="profile__category__field__verified"
                target="_blank"
                rel="noopener noreferrer"
              >
                {otherGithub}
              </a>
              <img src={Verified} alt="Verified" className="profile__category__verified__icon" />
            </div>
          )}

          {otherTwitter && (
            <div className="public__about__field" title="Twitter">
              <img src={TwitterIcon} className="profile__category__field__icon" alt="Github Icon" />
              <a
                href={`https://www.twitter.com/${otherTwitter}`}
                className="profile__category__field__verified"
                target="_blank"
                rel="noopener noreferrer"
              >
                {otherTwitter}
              </a>
              <img src={Verified} alt="Verified" className="profile__category__verified__icon" />
            </div>
          )}

          <div className="public__about__field" title="3Box logo">
            <img src={ThreeBox3} className="profile__category__field__icon" alt="Birthday Icon" />
            <p>{otherMemberSince.substring(0, 10)}</p>
          </div>

        </div>
      )}

      {(otherEmployer || otherJob) && (
        <div className="public__about">
          <h5 className="public__about__header">Work</h5>
          {otherEmployer && (
            <div className="public__about__field" title="Employer">
              <img src={Employer} className="profile__category__field__icon" alt="Employer Icon" />
              <p>{otherEmployer}</p>
            </div>
          )}

          {otherJob && (
            <div className="public__about__field" title="Job Title">
              <img src={Job} className="profile__category__field__icon" alt="Job Icon" />
              <p>{otherJob}</p>
            </div>
          )}
        </div>
      )}

      {(otherSchool || otherDegree || otherMajor || otherYear) && (
        <div className="public__about">
          <h5 className="public__about__header">Education</h5>
          {otherSchool && (
            <div className="public__about__field" title="School">
              <img src={School} className="profile__category__field__icon" alt="School Icon" />
              <p>{otherSchool}</p>
            </div>
          )}

          {otherDegree && (
            <div className="public__about__field" title="Degree">
              <img src={Degree} className="profile__category__field__icon" alt="Degree Icon" />
              <p>{otherDegree}</p>
            </div>
          )}

          {otherMajor && (
            <div className="public__about__field" title="Major">
              <img src={Major} className="profile__category__field__icon" alt="Major Icon" />
              <p>{otherMajor}</p>
            </div>
          )}

          {otherYear && (
            <div className="public__about__field" title="Graduation Year">
              <img src={Year} className="profile__category__field__icon" alt="Year Icon" />
              <p>{otherYear}</p>
            </div>
          )}
        </div>
      )}
    </React.Fragment>
  );

PubSideBar.propTypes = {
  otherGithub: PropTypes.string,
  otherTwitter: PropTypes.string,
  otherLocation: PropTypes.string,
  otherWebsite: PropTypes.string,
  otherJob: PropTypes.string,
  otherSchool: PropTypes.string,
  otherDegree: PropTypes.string,
  otherMemberSince: PropTypes.string,
  otherMajor: PropTypes.string,
  otherYear: PropTypes.string,
  otherEmployer: PropTypes.string,
  isFollowing: PropTypes.bool.isRequired,
  isMe: PropTypes.bool.isRequired,
};

PubSideBar.defaultProps = {
  otherGithub: '',
  otherTwitter: '',
  otherLocation: '',
  otherMemberSince: '',
  otherWebsite: '',
  otherJob: '',
  otherSchool: '',
  otherDegree: '',
  otherMajor: '',
  otherYear: '',
  otherEmployer: '',
};

function mapState(state) {
  return {
    otherGithub: state.otherProfile.otherGithub,
    otherTwitter: state.otherProfile.otherTwitter,
    otherLocation: state.otherProfile.otherLocation,
    otherWebsite: state.otherProfile.otherWebsite,
    otherMemberSince: state.otherProfile.otherMemberSince,
    otherJob: state.otherProfile.otherJob,
    otherSchool: state.otherProfile.otherSchool,
    otherDegree: state.otherProfile.otherDegree,
    otherMajor: state.otherProfile.otherMajor,
    otherYear: state.otherProfile.otherYear,
    otherEmployer: state.otherProfile.otherEmployer,
  };
}

export default connect(mapState)(PubSideBar);
