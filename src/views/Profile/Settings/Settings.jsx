import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Nav from '../../../components/Nav/Nav';
import MyProfileHeaders from '../MyProfile/MyProfileHeaders';
// import Loading from '../../../assets/Loading.svg';
// import history from '../../../utils/history';
// import * as routes from '../../../utils/routes';
// import Private from '../../../assets/Private.svg';
// import Verified from '../../../assets/Verified.svg';
// import AddImage from '../../../assets/AddImage.svg';
// import {
//   store,
// } from '../../../state/store';
// import actions from '../../../state/actions';
// import { copyToClipBoard, capitalizeFirst } from '../../../utils/funcs';
import '../styles/EditProfile.scss';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      image,
      name,
      currentAddress,
      handleSignInUp,
    } = this.props;

    return (
      <div id="edit__page">
        <MyProfileHeaders
          image={image}
          name={name}
          currentAddress={currentAddress}
        />

        <Nav handleSignInUp={handleSignInUp} />

        <div id="edit__breadCrumb">
          <div id="edit__breadCrumb__crumbs">
            <p className="light">
              Settings
            </p>
          </div>
        </div>
      </div >
    );
  }
}

Settings.propTypes = {
  name: PropTypes.string,
  image: PropTypes.array,
  currentAddress: PropTypes.string,
  handleSignInUp: PropTypes.func.isRequired,
};

Settings.defaultProps = {
  name: '',
  image: [],
  currentAddress: '',
};

function mapState(state) {
  return {
    box: state.myData.box,
    showGithubVerificationModal: state.uiState.showGithubVerificationModal,
    showTwitterVerificationModal: state.uiState.showTwitterVerificationModal,
    showEmailVerificationModal: state.uiState.showEmailVerificationModal,
    isFetchingThreeBox: state.uiState.isFetchingThreeBox,
    copySuccessful: state.uiState.copySuccessful,

    name: state.myData.name,
    verifiedGithub: state.myData.verifiedGithub,
    verifiedTwitter: state.myData.verifiedTwitter,
    verifiedEmail: state.myData.verifiedEmail,
    did: state.myData.did,
    description: state.myData.description,
    memberSince: state.myData.memberSince,
    location: state.myData.location,
    website: state.myData.website,
    birthday: state.myData.birthday,
    job: state.myData.job,
    school: state.myData.school,
    degree: state.myData.degree,
    major: state.myData.major,
    year: state.myData.year,
    emoji: state.myData.emoji,
    employer: state.myData.employer,
    email: state.myData.email,
    image: state.myData.image,
    coverPhoto: state.myData.coverPhoto,

    currentAddress: state.userState.currentAddress,
    allData: state.spaces.allData,
    list: state.spaces.list,
  };
}

export default connect(mapState, {})(Settings);