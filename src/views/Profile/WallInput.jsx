import React, { Component } from 'react';
import makeBlockie from 'ethereum-blockies-base64';
import SVG from 'react-inlinesvg';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import mql from '@microlink/mql';
import isURL from 'is-url';

import { checkIsMobileDevice } from '../../utils/funcs';
import actions from '../../state/actions';

import EmojiIcon from './Emoji/EmojiIcon';
import PopupWindow from './Emoji/PopupWindow';
import EmojiPicker from './Emoji/EmojiPicker';
import Loading from '../../assets/Loading.svg';
import Profile from '../../assets/Profile.svg';
// import Logo from '../../assets/3BoxLogo.svg';
// import Send from '../../assets/Send2.svg';
import './styles/Input.scss';
import './styles/PopupWindow.scss';
import LinkUnfurl from './LinkUnfurl';

const { postAndUpdateWall, joinOtherThread } = actions.profile;

class WallInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      emojiFilter: '',
      disableComment: true,
      postLoading: false,
      emojiPickerIsOpen: false,
      hasJoinedThread: false,
      isFetchingLink: false,
      isMobile: checkIsMobileDevice(),
    };
    this.inputRef = React.createRef();
  }

  async componentDidMount() {
    // const el = document.getElementsByClassName('input_form')[0];
    // el.addEventListener('keydown', this.searchEnter, false);
    this.emojiPickerButton = document.querySelector('#sc-emoji-picker-button');

    this.setState({ disableComment: false });

    document.addEventListener('input', (event) => {
      if (event.target.tagName.toLowerCase() !== 'textarea') return;
      this.autoExpand(event.target);
    }, false);
  }

  // componentWillUnmount() {
  //   const el = document.getElementsByClassName('input_form')[0];
  //   el.removeEventListener('keydown', this.searchEnter, false);
  // }

  autoExpand = (field) => {
    const height = field.scrollHeight;
    field.style.height = `${height}px`;
  };

  handleCommentText = async (event) => {
    const { linkURL } = this.state;
    const comment = event.target.value;
    const urlMatches = comment.match(/\b(http|https)?:\/\/\S+/gi) || [];
    this.setState({ comment });

    console.log('urlMatchesurlMatches', urlMatches);
    if (isURL(urlMatches[0]) && linkURL !== urlMatches[0]) {
      this.fetchPreview(urlMatches[0]);
      this.setState({ linkURL: urlMatches[0] });
    }
  }

  fetchPreview = async (url) => {
    console.log('urlurlurl', url);
    this.setState({ isFetchingLink: true });

    try {
      const {
        data,
        status,
        response,
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

  // searchEnter = (event) => {
  //   const { comment, isMobile } = this.state;
  //   const updatedComment = comment.replace(/(\r\n|\n|\r)/gm, '');

  //   if (event.keyCode === 13 && !event.shiftKey && updatedComment && !isMobile) {
  //     this.saveComment();
  //   } else if (event.keyCode === 13 && !event.shiftKey && !updatedComment && !isMobile) {
  //     event.preventDefault();
  //   }
  // }

  toggleEmojiPicker = (e) => {
    e.preventDefault();
    if (!this.state.emojiPickerIsOpen) {
      this.setState({ emojiPickerIsOpen: true });
    }
  }

  closeEmojiPicker = (e) => {
    if (this.emojiPickerButton.contains(e.target)) {
      e.stopPropagation();
      e.preventDefault();
    }
    this.setState({ emojiPickerIsOpen: false });
  }

  _handleEmojiPicked = (emoji) => {
    const { comment } = this.state;
    let newComment = comment;
    const updatedComment = newComment += emoji;
    this.setState({ emojiPickerIsOpen: false, comment: updatedComment });
  }

  handleEmojiFilterChange = (event) => {
    const emojiFilter = event.target.value;
    this.setState({ emojiFilter });
  }

  _renderEmojiPopup = () => (
    <PopupWindow
      isOpen={this.state.emojiPickerIsOpen}
      onClickedOutside={this.closeEmojiPicker}
      onInputChange={this.handleEmojiFilterChange}
    >
      <EmojiPicker
        onEmojiPicked={this._handleEmojiPicked}
        filter={this.state.emojiFilter}
      />
    </PopupWindow>
  )

  saveComment = async () => {
    const {
      postAndUpdateWall,
      box,
      loginFunction,
      isOtherProfile,
    } = this.props;
    const {
      comment,
      disableComment,
      isMobile,
      hasJoinedThread,
    } = this.state;
    const updatedComment = comment.replace(/(\r\n|\n|\r)/gm, '');

    if (disableComment || !updatedComment) return;

    this.inputRef.current.blur();
    this.inputRef.current.style.height = (isMobile) ? '64px' : '74px';
    this.setState({ postLoading: true, comment: '' });

    if (!box || !Object.keys(box).length) await loginFunction(false, false, false, true);

    if (isOtherProfile && !hasJoinedThread) {
      this.setState({ hasJoinedThread: true });
      await this.props.joinOtherThread();
    }

    try {
      await postAndUpdateWall(isOtherProfile, comment);
      this.setState({ postLoading: false, linkPreview: undefined });
    } catch (error) {
      console.error('There was an error saving your comment', error);
    }
  }

  render() {
    const {
      comment,
      postLoading,
      emojiPickerIsOpen,
      linkPreview,
      isFetchingLink,
    } = this.state;

    const {
      image,
      currentAddress,
      isFetchingWall,
      isOtherProfile,
      isFetchingOtherWall,
    } = this.props;

    const updatedProfilePicture = image ? `https://ipfs.infura.io/ipfs/${image[0].contentUrl['/']}`
      : currentAddress && makeBlockie(currentAddress);

    const isLoading = (isFetchingWall && !isOtherProfile) || (isFetchingOtherWall && isOtherProfile) || postLoading;
    // console.log('linkPreview', linkPreview);
    // console.log('isFetchingLink', isFetchingLink);

    return (
      <div className="input">
        {updatedProfilePicture ? (
          <img
            src={updatedProfilePicture}
            alt="Profile"
            className="input_user"
          />
        ) : (
            <div className="input_emptyUser">
              <SVG
                src={Profile}
                alt="Profile"
                className="input_emptyUser_icon"
              />
            </div>
          )}

        {isLoading ? (
          <div className="input_postLoading">
            <SVG
              src={Loading}
              alt="Loading"
              className="input_postLoading_spinner"
            />
          </div>
        ) : <div />}

        {/* <div className="input_formWrapper"> */}
        <textarea
          type="text"
          value={comment}
          placeholder={`${isLoading ? '' : 'Write a comment...'}`}
          className={`input_form ${postLoading ? 'hidePlaceholder' : ''}`}
          onChange={this.handleCommentText}
          ref={this.inputRef}
        />

        {isFetchingLink && (
          <div className="input_postLoading_wrapper">
            <SVG
              src={Loading}
              alt="Loading"
              className="input_postLoading_spinner"
            />
          </div>
        )}

        {linkPreview && (
          <div className="input_postLoading_linkPreviewWrapper">
            <LinkUnfurl linkPreview={linkPreview} />
          </div>
        )}

        <div className="input_buttons">
          <EmojiIcon
            onClick={this.toggleEmojiPicker}
            isActive={emojiPickerIsOpen}
            tooltip={this._renderEmojiPopup()}
          />

          <button
            type="button"
            onClick={this.saveComment}
            className={`input_send-dtw ${comment ? 'input_send-dtw-visible' : ''}`}
          >
            Post
          </button>
        </div>
        {/* </div> */}
      </div>
    );
  }
}

const mapState = (state) => ({
  currentAddress: state.userState.currentAddress,
  image: state.myData.image,
  box: state.myData.box,
});

export default connect(mapState, {
  postAndUpdateWall,
  joinOtherThread,
})(WallInput);

WallInput.propTypes = {
  box: PropTypes.object,
  isOtherProfile: PropTypes.bool,
  isFetchingOtherWall: PropTypes.bool,
  isFetchingWall: PropTypes.bool,
  currentAddress: PropTypes.string,
  image: PropTypes.array,
  loginFunction: PropTypes.func.isRequired,
  postAndUpdateWall: PropTypes.func.isRequired,
  joinOtherThread: PropTypes.func.isRequired,
  fetchPreview: PropTypes.func.isRequired,
};

WallInput.defaultProps = {
  box: {},
  isOtherProfile: false,
  isFetchingOtherWall: false,
  isFetchingWall: false,
  currentAddress: '',
  image: null,
};
