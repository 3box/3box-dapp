import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Feed from '../components/Feed';
import Nav from '../components/Nav';
import ProfileDetails from '../components/ProfileDetails';
import './styles/Profile.css';

export function Profile(props) {
  return (
    <div>
      <Nav />
      <ProfileDetails {...props} />
      <Feed />
    </div>
  );
}

Profile.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func,
};

Profile.defaultProps = {
  user: null,
  dispatch: null,
};

function mapState(state) {
  return {
    user: state.user,
  };
}

function mapDispatch(/* dispatch */) {
  return {};
}

export default connect(mapState, mapDispatch)(Profile);
