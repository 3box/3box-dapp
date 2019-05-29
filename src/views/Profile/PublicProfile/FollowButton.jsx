import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { store } from '../../../state/store';
import actions from '../../../state/actions';
import Check from '../../../assets/Check.svg';

const {
  saveFollowing,
  getMyProfileValue,
  getMyDID,
  getCollectibles,
  getMyMemberSince,
  getVerifiedPublicGithub,
  getVerifiedPublicTwitter,
  getVerifiedPrivateEmail,
  getActivity,
  getMyFollowing,
} = actions.profile;
const { getMySpacesData, convert3BoxToSpaces } = actions.spaces;
const { openBox } = actions.signin;

const FollowButton = ({
  isFollowing,
  otherProfileAddress,
  currentAddress,
  openBox,
  saveFollowing,
  getMyProfileValue,
  getMyDID,
  getCollectibles,
  getMyMemberSince,
  getVerifiedPublicGithub,
  getVerifiedPublicTwitter,
  getVerifiedPrivateEmail,
  getActivity,
  getMyFollowing,
  getMySpacesData,
  convert3BoxToSpaces
}) => {
  if (isFollowing) {
    return (
      <button type="button" className="outlineButton">
        <img src={Check} alt="Check" />
        Following
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={
        async () => {
          await openBox();
          store.dispatch({
            type: 'UI_SPACES_LOADING',
            isSpacesLoading: true,
          });
          getVerifiedPublicGithub();
          getVerifiedPublicTwitter();
          getVerifiedPrivateEmail();
          getMyMemberSince();
          getMyDID();
          getMyProfileValue('public', 'status');
          getMyProfileValue('public', 'name');
          getMyProfileValue('public', 'description');
          getMyProfileValue('public', 'image');
          getMyProfileValue('public', 'coverPhoto');
          getMyProfileValue('public', 'location');
          getMyProfileValue('public', 'website');
          getMyProfileValue('public', 'employer');
          getMyProfileValue('public', 'job');
          getMyProfileValue('public', 'school');
          getMyProfileValue('public', 'degree');
          getMyProfileValue('public', 'major');
          getMyProfileValue('public', 'year');
          getMyProfileValue('public', 'emoji');
          getMyProfileValue('private', 'birthday');
          getMyFollowing();

          await getCollectibles(currentAddress);
          convert3BoxToSpaces();
          await getMySpacesData(currentAddress);
          getActivity();
          saveFollowing(otherProfileAddress);
        }}
    >
      Follow
    </button>
  );
};

FollowButton.propTypes = {
  saveFollowing: PropTypes.func.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  otherProfileAddress: PropTypes.string,
  currentAddress: PropTypes.string,
  openBox: PropTypes.func.isRequired,
  getMyProfileValue: PropTypes.func.isRequired,
  getMyDID: PropTypes.func.isRequired,
  getCollectibles: PropTypes.func.isRequired,
  getMyMemberSince: PropTypes.func.isRequired,
  getVerifiedPublicGithub: PropTypes.func.isRequired,
  getVerifiedPublicTwitter: PropTypes.func.isRequired,
  getVerifiedPrivateEmail: PropTypes.func.isRequired,
  getActivity: PropTypes.func.isRequired,
  getMyFollowing: PropTypes.func.isRequired,
  getMySpacesData: PropTypes.func.isRequired,
  convert3BoxToSpaces: PropTypes.func.isRequired,
};

FollowButton.defaultProps = {
  otherProfileAddress: '',
  currentAddress: '',
};

function mapState(state) {
  return {
    otherProfileAddress: state.otherProfile.otherProfileAddress,
    currentAddress: state.userState.currentAddress,
  };
}

export default connect(mapState,
  {
    saveFollowing,
    openBox,
    getMyProfileValue,
    getMyDID,
    getCollectibles,
    getMyMemberSince,
    getVerifiedPublicGithub,
    getVerifiedPublicTwitter,
    getVerifiedPrivateEmail,
    getActivity,
    getMyFollowing,
    getMySpacesData,
    convert3BoxToSpaces,
  })(FollowButton);
