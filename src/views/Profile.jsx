import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Feed from '../components/Feed';
import Nav from '../components/Nav';
import ProfileDetails from '../components/ProfileDetails.jsx';
import './styles/Profile.css';

const Profile = props => (
  <div>
    <Nav />
    <ProfileDetails {...props} />
    <Feed />
  </div>
);

Profile.propTypes = {
  threeBox: PropTypes.object,
};

Profile.defaultProps = {
  threeBox: {},
};

function mapState(state) {
  return {
    threeBox: state.threeBoxData,
  };
}

function mapDispatch(/* dispatch */) {
  return {};
}

export default connect(mapState, mapDispatch)(Profile);
