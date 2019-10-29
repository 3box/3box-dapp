import React, { Component } from 'react';
import ProfileHover from 'profile-hover';
import PropTypes from 'prop-types';
import Linkify from 'react-linkify';
import makeBlockie from 'ethereum-blockies-base64';
import SVG from 'react-inlinesvg';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { shortenEthAddr } from '../../utils/funcs';
import { timeSince } from '../../utils/time';
import Delete from '../../assets/Delete2.svg';
import Loading from '../../assets/3BoxCommentsSpinner.svg';
import './styles/WallPost.scss';
import './styles/Feed.css';

class WallPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingDelete: false,
    };
  }

  deleteComment = async (commentId, e) => {
    e.preventDefault();
    const {
      // wallThread,
      // joinThread,
      box,
      loginFunction,
    } = this.props;

    if (!box || !Object.keys(box).length) {
      this.setState({ loadingDelete: true });
      await loginFunction();
    }

    // if user hasn't joined wallThread yet
    // if (!Object.keys(wallThread).length) await joinThread();

    try {
      this.setState({ loadingDelete: false });
      const res = await this.props.wallThread.deletePost(commentId);
      console.log('res', res);
    } catch (error) {
      console.error('There was an error deleting your comment', error);
    }
  }

  render() {
    const { loadingDelete } = this.state;
    const {
      comment,
      profile,
      isMyComment,
      useHovers,
      isMyAdmin,
      isCommenterAdmin,
      wallThread,
    } = this.props;

    const profilePicture = profile.ethAddr &&
      (profile.image ? `https://ipfs.infura.io/ipfs/${profile.image[0].contentUrl['/']}`
        : makeBlockie(profile.ethAddr));
    const canDelete = isMyComment || isMyAdmin;
    const hasThread = !!Object.keys(wallThread).length;

    return (
      <div className={`comment ${canDelete ? 'isMyComment' : ''}`}>
        <div className="comment_header">
          <Link
            to={`https://3box.io/${profile.ethAddr}`}
            className="comment_header"
          >
            {profilePicture ? (
              <img
                src={profilePicture}
                alt="profile"
                className="comment_picture comment_picture-bgWhite"
              />
            ) : <div className="comment_picture" />}
          </Link>

          <div className="comment_content">
            <div className="comment_content_context">
              <div className="comment_content_context_main">
                <a
                  href={profile.profileURL ? profile.profileURL : `https://3box.io/${profile.ethAddr}`}
                  className="comment_content_context_main_user"
                  target={profile.profileURL ? '_self' : '_blank'}
                  rel={profile.profileURL ? 'dofollow' : 'noopener noreferrer'}
                >
                  <div className="comment_content_context_main_user_info">
                    <ProfileHover
                      address={profile && profile.ethAddr}
                      orientation="top"
                      noTheme
                    >
                      <h4 className="comment_content_context_main_user_info_username">
                        {profile.name || profile.ethAddr}
                      </h4>
                    </ProfileHover>

                    {profile.name && (
                      <div
                        className="comment_content_context_main_user_info_address"
                        title={profile.ethAddr}
                      >
                        {profile.ethAddr && `${shortenEthAddr(profile.ethAddr)} ${isCommenterAdmin ? 'ADMIN' : ''}`}
                      </div>
                    )}
                  </div>

                  {loadingDelete && <SVG className="comment_loading" src={Loading} alt="Loading" />}

                  {/* hasThread */}
                  {(!loadingDelete && profile.ethAddr) && (
                    <div className="comment_content_context_main_user_delete">
                      <button
                        onClick={(e) => this.deleteComment(comment.postId, e)}
                        className="comment_content_context_main_user_delete_button textButton"
                        type="button"
                      >
                        <SVG src={Delete} alt="Delete" className="comment_content_context_main_user_delete_button_icon" />
                      </button>
                    </div>
                  )}
                </a>
              </div>

              <div className="comment_content_context_time">
                {`${timeSince(comment.timestamp * 1000)} ago`}
              </div>
            </div>
          </div>
        </div>
        <div className="comment_content_text">
          <Linkify>
            {comment.message}
          </Linkify>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  currentAddress: state.userState.currentAddress,
  image: state.myData.image,
  box: state.myData.box,
  wallThread: state.myData.wallThread,
  ethereum: state.userState.web3Obj,
});


export default connect(mapState, {})(WallPost);

WallPost.propTypes = {
  wallThread: PropTypes.object,
  isMyAdmin: PropTypes.bool.isRequired,
  isCommenterAdmin: PropTypes.bool.isRequired,
  useHovers: PropTypes.bool.isRequired,
  isMyComment: PropTypes.bool.isRequired,
  joinThread: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  box: PropTypes.object,
  loginFunction: PropTypes.func,
  openBox: PropTypes.func.isRequired,
};

WallPost.defaultProps = {
  wallThread: {},
};
