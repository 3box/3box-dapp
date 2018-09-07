import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ThreeBox from '3box';
import { bindActionCreators } from 'redux';

import { fetchProducts } from '../state/actions';
import Feed from '../components/Feed';
import Nav from '../components/Nav';
import ProfileDetails from '../components/ProfileDetails';
import './styles/Profile.css';

class Profile extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchProducts());
  }

  getProfileData = () => {

  }

  render() {
    console.log(this.props);
    return (
      <div>
        <Nav />
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

// function mapDispatch(dispatch) {
//   return bindActionCreators({ updateUser }, dispatch);
// }

Profile.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func,
};

Profile.defaultProps = {
  user: null,
  dispatch: null,
};

export default connect(mapState)(Profile);
// export default connect(mapState, mapDispatch)(Profile);
