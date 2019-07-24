import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MyContent from './MyProfile/MyContent';
import SideBar from './SideBar';
import Nav from '../../components/Nav';
import MyProfileHeaders from './MyProfile/MyProfileHeaders';
import './styles/Profile.css';

class Profile extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const {
      image,
      name,
      currentAddress,
      handleSignInUp,
    } = this.props;

    return (
      <div>
        <MyProfileHeaders
          image={image}
          name={name}
          currentAddress={currentAddress}
        />

        <Nav handleSignInUp={handleSignInUp} />
        <div id="profile__page">
          <div id="profile__contents">
            <SideBar />
            <MyContent />
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  name: PropTypes.string,
  currentAddress: PropTypes.string,
  image: PropTypes.array,
  handleSignInUp: PropTypes.func.isRequired,
};

Profile.defaultProps = {
  name: '',
  currentAddress: '',
  image: null,
};

const mapState = state => ({
  name: state.myData.name,
  image: state.myData.image,
  currentAddress: state.userState.currentAddress,
});

export default withRouter(connect(mapState)(Profile));