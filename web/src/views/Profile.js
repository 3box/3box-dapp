import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ThreeBox from '3box';

import Feed from '../components/Feed';
import ProfileDetails from '../components/ProfileDetails';
import './styles/Profile.css';

// export function Profile(props) {
class Profile extends Component {

  getProfileData = () => {
    
  }

  render() {
    return (
      <div>
        <ProfileDetails />
        <Feed />
      </div>
    );
  }
}


// get data put into public store
// profileStore.get(key)

function mapState(state) {
  return {
    user: state.user,
  };
}

Profile.propTypes = {
  user: PropTypes.object,
};

Profile.defaultProps = {
  user: null,
};

export default connect(mapState)(Profile);
