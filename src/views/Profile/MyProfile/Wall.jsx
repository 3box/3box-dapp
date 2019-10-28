import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import {
//   followingSpaceName,
//   myProfileWall,
// } from '../../../utils/constants';

// import ActivityHeader from './ActivityHeader';
// import ActivityTiles from './ActivityTiles';
// import StatusUpdate from '../StatusUpdate';
import WallInput from '../WallInput';
import WallPost from '../WallPost';
import Loading from '../../../assets/Loading.svg';
import '../styles/Feed.css';
import '../styles/Profile.css';
import '../../../components/styles/NetworkArray.css';

const Wall = ({
  isFetchingActivity,
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
          {(isFetchingActivity)
            && (
              <img src={Loading} alt="loading" id="activityLoad" />
            )}
        </p>

        <WallInput
          // ethereum={ethereum}
          box={box}
          loginFunction={handleSignInUp}
        // joinThread={this.joinThread}
        />

        {/* <StatusUpdate /> */}

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
                // joinThread={joinThread}
                box={box}
                loginFunction={handleSignInUp}
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
  isFetchingActivity: PropTypes.bool,
  currentAddress: PropTypes.string,
  name: PropTypes.string,
  otherProfileAddress: PropTypes.string,
  location: PropTypes.object,
  otherName: PropTypes.string,
};

Wall.defaultProps = {
  wallPosts: [],
  name: '',
  isFetchingActivity: false,
  otherProfileAddress: '',
  currentAddress: '',
  otherName: '',
  location: {},
};

const mapState = (state) => ({
  wallPosts: state.myData.wallPosts,
  box: state.myData.box,
  wallProfiles: state.myData.wallProfiles,

  isFetchingActivity: state.uiState.isFetchingActivity,
  currentAddress: state.userState.currentAddress,

  otherProfileAddress: state.otherProfile.otherProfileAddress,
  name: state.myData.name,
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
//   : (!isFetchingActivity && !wallPosts.length) && (
//     <div className="feed__activity__load">
//       <p>No posts on this wall yet</p>
//     </div>
//   )}