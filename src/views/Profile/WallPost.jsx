import React, { Component } from 'react';
import ProfileHover from 'profile-hover';
import PropTypes from 'prop-types';
import Linkify from 'react-linkify';
import makeBlockie from 'ethereum-blockies-base64';
import SVG from 'react-inlinesvg';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import mql from '@microlink/mql';
import isURL from 'is-url';

import { shortenEthAddr } from '../../utils/funcs';
import { timeSince } from '../../utils/time';
import actions from '../../state/actions';

import LinkUnfurl from './LinkUnfurl';
import Delete from '../../assets/Delete2.svg';
import Loading from '../../assets/Loading.svg';
import './styles/WallPost.scss';
import './styles/Feed.css';

const { postAndUpdateWall, joinOtherThread } = actions.profile;

class WallPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingDelete: false,
      hasJoinedThread: false,
    };
  }

  componentDidMount() {
    const { comment } = this.props;
    console.log('comment', comment);
    const urlMatches = comment.message.match(/\b(http|https)?:\/\/\S+/gi) || [];
    console.log('urlMatches', urlMatches);
    if (isURL(urlMatches[0])) this.fetchPreview(urlMatches[0]);
  }


  deleteComment = async (commentId, e) => {
    e.preventDefault();
    const {
      box,
      loginFunction,
      isOtherProfile,
      postAndUpdateWall,
    } = this.props;
    const { hasJoinedThread } = this.state;
    this.setState({ loadingDelete: true });

    if (!box || !Object.keys(box).length) await loginFunction(false, false, false, true);

    // will fetch *once per profile, can optimize and save to redux if user returns
    if (isOtherProfile && !hasJoinedThread) {
      this.setState({ hasJoinedThread: true });
      await this.props.joinOtherThread();
    }

    try {
      const isDelete = true;
      await postAndUpdateWall(isOtherProfile, commentId, isDelete);
      this.setState({ loadingDelete: false });
    } catch (error) {
      console.error('There was an error deleting your comment', error);
    }
  }

  fetchPreview = async (url) => {
    this.setState({ isFetchingLink: true });

    try {
      const {
        data,
        // status,
        // response,
      } = await mql(
        url,
        {
          apiKey: 'vYR5oNTFdH6sN0s1aX1yf11pARnMJPaG8wXSVzt3',
          prerender: true,
          headers: {
            'user-agent': [{ value: 'googlebot' }],
            host: 'https://3box.io',
            // 'user-agent': 'googlebot',
          },
        },
      );
      this.setState({ isFetchingLink: false, linkPreview: data });
    } catch (error) {
      console.log('error fetching link', error);
      this.setState({ isFetchingLink: false, linkPreview: null });
    }
  }

  render() {
    const { loadingDelete, linkPreview, isFetchingLink } = this.state;
    const {
      comment,
      profile,
      isMyComment,
      isMyAdmin,
      // wallThread,
    } = this.props;

    const profilePicture = profile.ethAddr &&
      (profile.image ? `https://ipfs.infura.io/ipfs/${profile.image[0].contentUrl['/']}`
        : makeBlockie(profile.ethAddr));
    const canDelete = isMyComment || isMyAdmin;
    // const hasThread = !!Object.keys(wallThread).length;

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
                        {profile.ethAddr && `${shortenEthAddr(profile.ethAddr)}`}
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
        {linkPreview && <LinkUnfurl linkPreview={linkPreview} />}
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


export default connect(mapState, {
  joinOtherThread,
  postAndUpdateWall,
})(WallPost);

WallPost.propTypes = {
  wallThread: PropTypes.object,
  isMyAdmin: PropTypes.bool.isRequired,
  isOtherProfile: PropTypes.bool,
  isMyComment: PropTypes.bool.isRequired,
  joinOtherThread: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  box: PropTypes.object,
  loginFunction: PropTypes.func.isRequired,
  postAndUpdateWall: PropTypes.func.isRequired,
};

WallPost.defaultProps = {
  wallThread: {},
  box: {},
  isOtherProfile: false,
};
