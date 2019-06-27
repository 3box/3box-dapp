import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { store } from '../../../state/store';
import actions from '../../../state/actions';
import Loading from '../../../assets/Loading.svg';

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
  initializeSaveFollowing,
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
  convert3BoxToSpaces,
  initializeSaveFollowing,
  isLoggedIn,
  isFollowLoading,
  contactTileAddress,
  fromContactTile,
  isLoading,
}) => {
  if (isFollowing) {
    return (
      <button
        type="button"
        className="outlineButton unfollowButton followActionButton"
        onClick={
          async () => {
            store.dispatch({
              type: 'UI_SPACES_LOADING',
              isSpacesLoading: true,
            });
            if (!isLoggedIn) {
              store.dispatch({
                type: 'UI_FOLLOW_LOADING',
                isFollowLoading: true,
              });
              await openBox();
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
              await convert3BoxToSpaces();
              await getMySpacesData(currentAddress);
              getActivity();
            }
            await initializeSaveFollowing(contactTileAddress || otherProfileAddress);
            saveFollowing(contactTileAddress || otherProfileAddress, true);
            store.dispatch({
              type: 'UI_FOLLOW_LOADING',
              isFollowLoading: false,
            });
          }}
      >
        {(!fromContactTile && isFollowLoading) && <img src={Loading} alt="loading" />}
        {(fromContactTile && isFollowLoading && isLoading) && <img src={Loading} alt="loading" />}
      </button>
    );
  }

  return (
    <button
      type="button"
      className="followButton followActionButton"
      onClick={
        async () => {
          store.dispatch({
            type: 'UI_FOLLOW_LOADING',
            isFollowLoading: true,
          });
          if (!isLoggedIn) {
            store.dispatch({
              type: 'UI_SPACES_LOADING',
              isSpacesLoading: true,
            });
            await openBox();
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
            await convert3BoxToSpaces();
            await getMySpacesData(currentAddress);
            getActivity();
          }
          const shouldSave = await initializeSaveFollowing(contactTileAddress || otherProfileAddress);
          if (shouldSave) saveFollowing(contactTileAddress || otherProfileAddress);
          store.dispatch({
            type: 'UI_FOLLOW_LOADING',
            isFollowLoading: false,
          });
        }}
    >
      {(!fromContactTile && isFollowLoading) && <img src={Loading} alt="loading" />}
      {(fromContactTile && isFollowLoading && isLoading) && <img src={Loading} alt="loading" />}
      Follow
    </button>
  );
};

FollowButton.propTypes = {
  saveFollowing: PropTypes.func.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool,
  isFollowLoading: PropTypes.bool,
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
  isLoggedIn: false,
  isFollowLoading: false,
};

function mapState(state) {
  return {
    otherProfileAddress: state.otherProfile.otherProfileAddress,
    currentAddress: state.userState.currentAddress,
    isLoggedIn: state.userState.isLoggedIn,
    isFollowLoading: state.uiState.isFollowLoading,
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
    initializeSaveFollowing,
  })(FollowButton);
