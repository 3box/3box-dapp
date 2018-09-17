import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Feed from '../components/Feed';
import ProfileDetails from '../components/ProfileDetails';
import './styles/Profile.css';

// const Profile = props => (
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <ProfileDetails {...this.props} />
        <Feed />
      </div>
    );
  }
}

Profile.propTypes = {
  threeBox: PropTypes.object,
};

Profile.defaultProps = {
  threeBox: {},
};

function mapState(state) {
  console.log(state);
  return {
    threeBox: state.threeBoxData,
  };
}

function mapDispatch(/* dispatch */) {
  return {};
}

export default connect(mapState, mapDispatch)(Profile);
