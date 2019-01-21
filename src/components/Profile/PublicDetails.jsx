import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import GithubIcon from '../../assets/GithubIcon.svg';
import TwitterIcon from '../../assets/twitterGrey.svg';
import Verified from '../../assets/Verified.svg';
import School from '../../assets/School.svg';
import Location from '../../assets/Location.svg';
import Website from '../../assets/Website.png';
import ThreeBox3 from '../../assets/3Box3.svg';
import Job from '../../assets/Job.svg';
import Degree from '../../assets/Degree.svg';
import Major from '../../assets/Major.svg';
import Year from '../../assets/Year.png';
import Employer from '../../assets/Employer.svg';
import '../../views/styles/Profile.css';

const PublicDetails = ({
  publicGithub,
  publicWebsite,
  publicLocation,
  publicJob,
  publicSchool,
  publicDegree,
  publicMajor,
  publicYear,
  publicEmployer,
  publicMemberSince,
  publicTwitter,
}) => (
    <React.Fragment>
      <div className="public__about">
        <h5 className="public__about__header">About</h5>

        <div className="public__about__field" title="Location">
          <img src={Location} className="profile__category__field__icon" alt="Location Icon" />
          {publicLocation
            && (
              <p>{publicLocation}</p>
            )
          }
        </div>

        <div className="public__about__field" title="Website">
          <img src={Website} className="profile__category__field__icon" alt="Website Icon" />
          {publicWebsite
            && (
              <p>{publicWebsite}</p>
            )
          }
        </div>

        <div className="public__about__field" title="Github">
          <img src={GithubIcon} className="profile__category__field__icon" alt="Github Icon" />
          {publicGithub
            && (
              <p className="profile__category__field__verified">{publicGithub}</p>
            )
          }
          {publicGithub
            && (
              <img src={Verified} alt="Verified" className="profile__category__verified__icon" />
            )
          }
        </div>

        <div className="public__about__field" title="Github">
          <img src={TwitterIcon} className="profile__category__field__icon" alt="Github Icon" />
          {publicTwitter
            && (
              <p className="profile__category__field__verified">{publicTwitter}</p>
            )
          }
          {publicTwitter
            && (
              <img src={Verified} alt="Verified" className="profile__category__verified__icon" />
            )}
        </div>

        <div className="public__about__field" title="Birthday">
          <img src={ThreeBox3} className="profile__category__field__icon" alt="Birthday Icon" />
          {publicMemberSince
            && (
              <p>{publicMemberSince}</p>
            )
          }
        </div>

      </div>

      <div className="public__about">
        <h5 className="public__about__header">Work</h5>


        <div className="public__about__field" title="Employer">
          <img src={Employer} className="profile__category__field__icon" alt="Employer Icon" />
          {publicEmployer
            && (
              <p>{publicEmployer}</p>
            )
          }
        </div>

        <div className="public__about__field" title="Job Title">
          <img src={Job} className="profile__category__field__icon" alt="Job Icon" />
          {publicJob
            && (
              <p>{publicJob}</p>
            )
          }
        </div>
      </div>

      <div className="public__about">
        <h5 className="public__about__header">Education</h5>

        <div className="public__about__field" title="School">
          <img src={School} className="profile__category__field__icon" alt="School Icon" />
          {publicSchool
            && (
              <p>{publicSchool}</p>
            )
          }
        </div>

        <div className="public__about__field" title="Degree">
          <img src={Degree} className="profile__category__field__icon" alt="Degree Icon" />
          {publicDegree
            && (
              <p>{publicDegree}</p>
            )
          }
        </div>

        <div className="public__about__field" title="Major">
          <img src={Major} className="profile__category__field__icon" alt="Major Icon" />
          {publicMajor
            && (
              <p>{publicMajor}</p>
            )
          }
        </div>

        <div className="public__about__field" title="Graduation Year">
          <img src={Year} className="profile__category__field__icon" alt="Year Icon" />
          {publicYear
            && (
              <p>{publicYear}</p>
            )
          }
        </div>
      </div>
    </React.Fragment>
  );

PublicDetails.propTypes = {
  publicGithub: PropTypes.string,
  publicTwitter: PropTypes.string,
  publicLocation: PropTypes.string,
  publicWebsite: PropTypes.string,
  publicJob: PropTypes.string,
  publicSchool: PropTypes.string,
  publicDegree: PropTypes.string,
  publicMemberSince: PropTypes.string,
  publicMajor: PropTypes.string,
  publicYear: PropTypes.string,
  publicEmployer: PropTypes.string,
};

PublicDetails.defaultProps = {
  publicGithub: '',
  publicTwitter: '',
  publicLocation: '',
  publicMemberSince: '',
  publicWebsite: '',
  publicJob: '',
  publicSchool: '',
  publicDegree: '',
  publicMajor: '',
  publicYear: '',
  publicEmployer: '',
};

function mapState(state) {
  return {
    publicGithub: state.threeBox.publicGithub,
    publicTwitter: state.threeBox.publicTwitter,
    publicDescription: state.threeBox.publicDescription,
    publicLocation: state.threeBox.publicLocation,
    publicWebsite: state.threeBox.publicWebsite,
    publicMemberSince: state.threeBox.publicMemberSince,
    publicJob: state.threeBox.publicJob,
    publicSchool: state.threeBox.publicSchool,
    publicDegree: state.threeBox.publicDegree,
    publicMajor: state.threeBox.publicMajor,
    publicYear: state.threeBox.publicYear,
    publicEmployer: state.threeBox.publicEmployer,
  };
}

export default connect(mapState)(PublicDetails);
