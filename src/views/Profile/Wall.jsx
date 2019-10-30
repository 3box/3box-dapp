import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { sortChronologically } from '../../utils/funcs';
import WallInput from './WallInput';
import WallPost from './WallPost';
import Loading from '../../assets/Loading.svg';
import './styles/Feed.css';
import './styles/Profile.css';
import '../../components/styles/NetworkArray.css';

const Wall = ({
  isFetchingWall,
  wallPosts,
  otherWallPosts,
  currentAddress,
  box,
  handleSignInUp,
  wallProfiles,
  otherWallProfiles,
  isOtherProfile,
  otherProfileAddress,
}) => {
  const posts = isOtherProfile ? otherWallPosts : wallPosts;
  const postsToRender = sortChronologically(posts);
  const adminEthAddr = isOtherProfile ? otherProfileAddress : currentAddress;
  const profilesToUse = isOtherProfile ? otherWallProfiles : wallProfiles;
  const adminEthAddrNormalized = adminEthAddr.toLowerCase();
  const currentUserAddrNormalized = currentAddress && currentAddress.toLowerCase();

  return (
    <div id={isOtherProfile ? '' : 'myFeed'}>
      <div>
        {!isOtherProfile && (
          <p className="header publicHeader" id="feed__header">
            Wall
          {(isFetchingWall)
              && (
                <img src={Loading} alt="loading" id="activityLoad" />
              )}
          </p>
        )}

        <WallInput
          box={box}
          loginFunction={handleSignInUp}
          isOtherProfile={isOtherProfile}
        // ethereum={ethereum}
        // joinThread={joinThread} // only necessary for public profile
        />

        <div className="feed__activity__header">
          {postsToRender.map((comment) => {
            const profile = profilesToUse[comment.author];
            const commentAddr = profile && profile.ethAddr.toLowerCase();

            return (
              <WallPost
                comment={comment}
                profile={profile || {}}
                isMyComment={commentAddr === currentUserAddrNormalized}
                isMyAdmin={adminEthAddrNormalized === currentUserAddrNormalized}
                isCommenterAdmin={adminEthAddrNormalized === commentAddr}
                key={comment.postId}
                box={box}
                loginFunction={handleSignInUp}
              // joinThread={joinThread}
              // openBox={openBox}
              />
            );
          })}
        </div>

      </div>

      <div className="feed__footer">
        <div className="logo__icon--footer">
          <h2>3</h2>
        </div>
      </div>
    </div>
  );
};

Wall.propTypes = {
  wallPosts: PropTypes.array,
  otherWallPosts: PropTypes.array,
  otherWallProfiles: PropTypes.array,
  box: PropTypes.object,
  wallProfiles: PropTypes.object,
  isFetchingWall: PropTypes.bool,
  isOtherProfile: PropTypes.bool,
  currentAddress: PropTypes.string,
  otherProfileAddress: PropTypes.string,
  handleSignInUp: PropTypes.func.isRequired,
};

Wall.defaultProps = {
  wallPosts: [],
  otherWallPosts: [],
  otherWallProfiles: [],
  box: {},
  wallProfiles: {},
  isFetchingWall: false,
  isOtherProfile: false,
  currentAddress: '',
  otherProfileAddress: '',
};

const mapState = (state) => ({
  wallPosts: state.myData.wallPosts,
  box: state.myData.box,
  wallProfiles: state.myData.wallProfiles,

  isFetchingWall: state.uiState.isFetchingWall,

  currentAddress: state.userState.currentAddress,

  otherProfileAddress: state.otherProfile.otherProfileAddress,
  otherWallPosts: state.otherProfile.otherWallPosts,
  otherName: state.otherProfile.otherName,
  otherWallProfiles: state.otherProfile.otherWallProfiles,
});

export default connect(mapState)(Wall);