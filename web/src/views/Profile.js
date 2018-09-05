import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Feed from '../components/Feed';
import ProfileDetails from '../components/ProfileDetails';
import './styles/Profile.css';

export function Profile(props) {
  return (
    <div>
      <ProfileDetails />
      <Feed />
    </div>
  );
}

Profile.propTypes = {
  web3: PropTypes.object,
};

Profile.defaultProps = {
  web3: null,
};

export default Profile;
