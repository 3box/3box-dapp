import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Box from '3box';

import { sortChronologically } from '../../utils/funcs';
import { followingSpaceName } from '../../utils/constants';
import { store } from '../../state/store';

import WallInput from './WallInput';
import WallPost from './WallPost';
import Loading from '../../assets/Loading.svg';
import Options from '../../assets/Options.svg';
import './styles/Feed.css';
import './styles/Profile.css';
import '../../components/styles/NetworkArray.css';

class Wall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showOptions: false,
      isOtherWallDisabled: false,
      isWallDisabled: false,
    };
  }

  componentDidMount() {
    const { isOtherWallDisabled, isWallDisabled } = this.props;
    this.setState({ isOtherWallDisabled, isWallDisabled });
  }

  componentDidUpdate(prevProps) {
    const { isOtherWallDisabled, isWallDisabled } = this.props;
    const isOtherChanged = isOtherWallDisabled !== prevProps.isOtherWallDisabled;
    const isMyChanged = isWallDisabled !== prevProps.isWallDisabled;

    if (isMyChanged) {
      this.setState({ isWallDisabled });
    } else if (isOtherChanged) {
      this.setState({ isOtherWallDisabled });
    }
  }

  onCheckbox = async () => {
    const { isWallDisabled } = this.state;
    const { box, currentAddress } = this.props;

    const spaces = await Box.listSpaces(currentAddress);
    console.log('followingSpaceName', followingSpaceName);
    console.log('listspaces', spaces);

    const space = await box.openSpace(followingSpaceName);
    const res = await space.public.set('isWallDisabled', !isWallDisabled);
    console.log('didsave', res);
    console.log('newvalue', !isWallDisabled);

    store.dispatch({
      type: 'MY_WALL_DISABLED_UPDATE',
      isWallDisabled: !isWallDisabled,
    });
  }

  handleShowOptionsMenu = () => {
    const { showOptions } = this.state;
    console.log('showOptions', !showOptions);
    this.setState({ showOptions: !showOptions });
  }

  render() {
    const {
      isFetchingWall,
      isFetchingOtherWall,
      wallPosts,
      otherWallPosts,
      currentAddress,
      box,
      handleSignInUp,
      wallProfiles,
      otherWallProfiles,
      isOtherProfile,
      otherProfileAddress,
      viewTab,
      // isWallDisabled,
      // isOtherWallDisabled,
    } = this.props;

    const {
      showOptions,
      isWallDisabled,
      isOtherWallDisabled,
    } = this.state;

    const posts = isOtherProfile ? otherWallPosts : wallPosts;
    const postsToRender = sortChronologically(posts);
    const adminEthAddr = isOtherProfile ? otherProfileAddress : currentAddress;
    const profilesToUse = isOtherProfile ? otherWallProfiles : wallProfiles;
    const valueToShow = isOtherProfile ? isOtherWallDisabled : isWallDisabled;
    const adminEthAddrNormalized = adminEthAddr.toLowerCase();
    const currentUserAddrNormalized = currentAddress && currentAddress.toLowerCase();

    return (
      <div id={isOtherProfile ? '' : 'myFeed'} className={`profileTab ${viewTab === 'wall' ? 'viewTab' : ''}`}>
        <div>
          {!isOtherProfile && (
            <div className="wall_header">
              <p className="header publicHeader" id="feed__header">
                Wall
              </p>

              <div className="wall_header_optionsWrapper">
                <button
                  onClick={this.handleShowOptionsMenu}
                  onKeyPress={this.handleShowOptionsMenu}
                  className="wall_header_options textButton"
                  type="button"
                >
                  <img
                    src={Options}
                    alt="options"
                    className="wall_header_options_icon"
                  />
                </button>

                <div className={`wall_header_menu ${showOptions ? 'show' : ''}`}>
                  <h5>Settings</h5>
                  <div className="wall_header_menu_section">
                    <p>Disable wall</p>
                    <label className="switch" htmlFor="enableWall">
                      <input
                        type="checkbox"
                        id="enableWall"
                        checked={valueToShow}
                        onChange={this.onCheckbox}
                      />
                      <span className="slider round" />
                    </label>
                  </div>
                </div>

                {showOptions && (
                  <div
                    className="onClickOutside"
                    onClick={this.handleShowOptionsMenu}
                    onKeyPress={this.handleShowOptionsMenu}
                    tabIndex={0}
                    role="button"
                  />
                )}
              </div>
            </div>
          )}

          {((!isWallDisabled && !isOtherProfile) || (!isOtherWallDisabled && isOtherProfile)) && (
            <>
              <WallInput
                box={box}
                loginFunction={handleSignInUp}
                isOtherProfile={isOtherProfile}
                isFetchingWall={isFetchingWall}
                isFetchingOtherWall={isFetchingOtherWall}
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
                      key={comment.postId}
                      box={box}
                      loginFunction={handleSignInUp}
                      isOtherProfile={isOtherProfile}
                    />
                  );
                })}

                {!postsToRender.length && (
                  <div className="feed_activity_empty">
                    <p className="feed_activity_empty_text">
                      This is your profile wall, a public place
                      to share updates and for others to leave posts.
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <div className="feed__footer">
          <div className="logo__icon--footer">
            <h2>3</h2>
          </div>
        </div>
      </div>
    );
  }
}

Wall.propTypes = {
  wallPosts: PropTypes.array,
  otherWallPosts: PropTypes.array,
  otherWallProfiles: PropTypes.array,
  box: PropTypes.object,
  wallProfiles: PropTypes.object,
  isFetchingWall: PropTypes.bool,
  isOtherProfile: PropTypes.bool,
  isFetchingOtherWall: PropTypes.bool,
  isWallDisabled: PropTypes.bool,
  isOtherWallDisabled: PropTypes.bool,
  viewTab: PropTypes.string,
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
  isWallDisabled: false,
  isOtherWallDisabled: false,
  isFetchingOtherWall: false,
  isOtherProfile: false,
  currentAddress: '',
  otherProfileAddress: '',
  viewTab: 'wall',
};

const mapState = (state) => ({
  wallPosts: state.myData.wallPosts,
  box: state.myData.box,
  wallProfiles: state.myData.wallProfiles,
  isWallDisabled: state.myData.isWallDisabled,

  isFetchingWall: state.uiState.isFetchingWall,
  isFetchingOtherWall: state.uiState.isFetchingOtherWall,

  currentAddress: state.userState.currentAddress,

  otherProfileAddress: state.otherProfile.otherProfileAddress,
  otherWallPosts: state.otherProfile.otherWallPosts,
  otherName: state.otherProfile.otherName,
  otherWallProfiles: state.otherProfile.otherWallProfiles,
  isOtherWallDisabled: state.otherProfile.isOtherWallDisabled,
});

export default connect(mapState)(Wall);