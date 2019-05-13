import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import * as routes from '../../utils/routes';
import ContactTile from '../../components/ContactTile';
import GithubIcon from '../../assets/GithubIcon.svg';
import './styles/Profile.css';
import './styles/Feed.css';

const Contacts = ({
  verifiedGithub,
  contacts
}) => (
    <div id="myFeed">
      <div className="contacts_header">
        <h2>Contacts</h2>
        <p>(122)</p>
      </div>
      <div className="contact_list">
        <ContactTile />
      </div>
    </div>
  );

Contacts.propTypes = {
  verifiedGithub: PropTypes.string,
};

Contacts.defaultProps = {
  verifiedGithub: '',
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

export default withRouter(connect(mapState)(Contacts));
