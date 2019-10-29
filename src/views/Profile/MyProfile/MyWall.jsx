import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import {
//   followingSpaceName,
//   myProfileWall,
// } from '../../../utils/constants';

// import ActivityHeader from './ActivityHeader';
// import ActivityTiles from './ActivityTiles';
import WallInput from '../WallInput';
import WallPost from '../WallPost';
import Loading from '../../../assets/Loading.svg';
import '../styles/Feed.css';
import '../styles/Profile.css';
import '../../../components/styles/NetworkArray.css';

const Wall = ({
  isFetchingWall,
  wallPosts,
  currentAddress,
  box,
  handleSignInUp,
  wallProfiles,
}) => (
    <div id="myFeed">
      <div>
        <p className="header publicHeader" id="feed__header">
          Wall
          {(isFetchingWall)
            && (
              <img src={Loading} alt="loading" id="activityLoad" />
            )}
        </p>

        <WallInput
          box={box}
          loginFunction={handleSignInUp}
        // ethereum={ethereum}
        // joinThread={this.joinThread}
        />

        <div className="feed__activity__header">
          {wallPosts.reverse().map((comment) => {
            const profile = wallProfiles[comment.author];
            const commentAddr = profile && profile.ethAddr.toLowerCase();
            const currentUserAddrNormalized = currentAddress && currentAddress.toLowerCase();
            const adminEthAddrNormalized = currentAddress.toLowerCase();

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

Wall.propTypes = {
  wallPosts: PropTypes.array,
  box: PropTypes.object,
  wallProfiles: PropTypes.object,
  isFetchingWall: PropTypes.bool,
  currentAddress: PropTypes.string,
  handleSignInUp: PropTypes.func.isRequired,
};

Wall.defaultProps = {
  wallPosts: [],
  box: {},
  wallProfiles: {},
  isFetchingWall: false,
  currentAddress: '',
};

const mapState = (state) => ({
  wallPosts: state.myData.wallPosts,
  box: state.myData.box,
  wallProfiles: state.myData.wallProfiles,

  isFetchingWall: state.uiState.isFetchingWall,

  currentAddress: state.userState.currentAddress,

  otherProfileAddress: state.otherProfile.otherProfileAddress,
  otherName: state.otherProfile.otherName,
});

export default connect(mapState)(Wall);


// {(wallPosts.length > 0)
//   ? wallPosts.map((post, i) => (
//     <WallPost
//       comment={post}
//       profile={profile || {}}
//       isMyComment={commentAddr === currentUserAddrNormalized}
//       isMyAdmin={adminEthAddrNormalized === currentUserAddrNormalized}
//       isCommenterAdmin={adminEthAddrNormalized === commentAddr}
//       key={comment.postId}
//       thread={thread}
//       joinThread={joinThread}
//       box={box}
//       loginFunction={loginFunction}
//       openBox={openBox}
//     />
//     // <div key={post.postId} className="feed__activity__tile">
//     //   {post.message}
//     //   {/* <ActivityHeader feedAddress={feedAddress} />
//     //   <ActivityTiles feedAddress={feedAddress} /> */}
//     // </div>
//   ))
//   : (!isFetchingWall && !wallPosts.length) && (
//     <div className="feed__activity__load">
//       <p>No posts on this wall yet</p>
//     </div>
//   )}