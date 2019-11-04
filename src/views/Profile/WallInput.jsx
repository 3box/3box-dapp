import React, { Component } from 'react';
import makeBlockie from 'ethereum-blockies-base64';
import SVG from 'react-inlinesvg';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
      isMobile: checkIsMobileDevice(),
    };
    this.inputRef = React.createRef();
  }

  async componentDidMount() {
    const el = document.getElementsByClassName('input_form')[0];
    el.addEventListener('keydown', this.searchEnter, false);
    this.emojiPickerButton = document.querySelector('#sc-emoji-picker-button');

    this.setState({ disableComment: false });

    document.addEventListener('input', (event) => {
      if (event.target.tagName.toLowerCase() !== 'textarea') return;
      this.autoExpand(event.target);
    }, false);
  }

  componentWillUnmount() {
    const el = document.getElementsByClassName('input_form')[0];
    el.removeEventListener('keydown', this.searchEnter, false);
  }

  autoExpand = (field) => {
    const height = field.scrollHeight;
    field.style.height = `${height}px`;
    console.log('field.style.height', field.style.height);
  };

  handleCommentText = (event) => this.setState({ comment: event.target.value });

  searchEnter = (event) => {
    const { comment, isMobile } = this.state;
    const updatedComment = comment.replace(/(\r\n|\n|\r)/gm, '');

    if (event.keyCode === 13 && !event.shiftKey && updatedComment && !isMobile) {
      this.saveComment();
    } else if (event.keyCode === 13 && !event.shiftKey && !updatedComment && !isMobile) {
      event.preventDefault();
    }
  }

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
      this.setState({ postLoading: false });
    } catch (error) {
      console.error('There was an error saving your comment', error);
    }
  }

  render() {
    const {
      comment,
      postLoading,
      emojiPickerIsOpen,
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

        {((isFetchingWall && !isOtherProfile) || (isFetchingOtherWall && isOtherProfile) || postLoading) ? (
          <div className="input_postLoading">
            <SVG
              src={Loading}
              alt="Loading"
              className="input_postLoading_spinner"
            />
          </div>
        ) : <div />}

        <textarea
          type="text"
          value={comment}
          placeholder="Write a comment..."
          className={`input_form ${postLoading ? 'hidePlaceholder' : ''}`}
          onChange={this.handleCommentText}
          ref={this.inputRef}
        />

        <button
          type="button"
          onClick={this.saveComment}
          className={`input_send-dtw ${comment ? 'input_send-dtw-visible' : ''}`}
        >
          Post
        </button>

        <EmojiIcon
          onClick={this.toggleEmojiPicker}
          isActive={emojiPickerIsOpen}
          tooltip={this._renderEmojiPopup()}
        />
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
};

WallInput.defaultProps = {
  box: {},
  isOtherProfile: false,
  isFetchingOtherWall: false,
  isFetchingWall: false,
  currentAddress: '',
  image: null,
};
