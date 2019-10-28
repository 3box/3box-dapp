import React, { Component } from 'react';
import makeBlockie from 'ethereum-blockies-base64';
import SVG from 'react-inlinesvg';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { shortenEthAddr, checkIsMobileDevice } from '../../utils/funcs';
import actions from '../../state/actions';

import EmojiIcon from './Emoji/EmojiIcon';
import PopupWindow from './Emoji/PopupWindow';
import EmojiPicker from './Emoji/EmojiPicker';
import Loading from '../../assets/3BoxCommentsSpinner.svg';
import Logo from '../../assets/3BoxLogo.svg';
import Send from '../../assets/Send2.svg';
import Profile from '../../assets/Profile.svg';
import './styles/Input.scss';
import './styles/PopupWindow.scss';

const { updateMyWall } = actions.profile;

class WallInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      emojiFilter: '',
      disableComment: true,
      postLoading: false,
      emojiPickerIsOpen: false,
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
      field.style.height = height + 'px';
    };
  
  handleCommentText = (event) => {
    const { ethereum, loginFunction } = this.props;
    const noWeb3 = (!ethereum || !Object.entries(ethereum).length) && !loginFunction;
    if (!noWeb3) this.setState({ comment: event.target.value });
  }

  searchEnter = (event) => {
    const { comment, isMobile } = this.state;
    const updatedComment = comment.replace(/(\r\n|\n|\r)/gm, '');

    if (event.keyCode === 13 && !event.shiftKey && updatedComment && !isMobile) {
      this.saveComment();
    } else if (event.keyCode === 13 && !event.shiftKey && !updatedComment && !isMobile) {
      event.preventDefault();
    }
  }

  handleLoggedInAs = () => {
    const { showLoggedInAs } = this.state;
    this.setState({ showLoggedInAs: !showLoggedInAs });
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
      joinThread,
      wallThread,
      updateMyWall,
      box,
      loginFunction,
      ethereum
    } = this.props;
    const { comment, disableComment, isMobile } = this.state;
    const updatedComment = comment.replace(/(\r\n|\n|\r)/gm, '');
    const noWeb3 = (!ethereum || !Object.entries(ethereum).length) && !loginFunction;

    if (noWeb3) return;
    if (disableComment || !updatedComment) return;

    this.inputRef.current.blur();
    this.inputRef.current.style.height = (isMobile) ? '64px' : '74px';
    this.setState({ postLoading: true, comment: '' });

    if (!box || !Object.keys(box).length) await loginFunction();
    if (!Object.keys(wallThread).length) await joinThread();

    try {
      await this.props.wallThread.post(comment);
      await updateMyWall();
      this.setState({ postLoading: false });
    } catch (error) {
      console.error('There was an error saving your comment', error);
    }
  }

  render() {
    const {
      comment,
      postLoading,
      showLoggedInAs,
      isMobile,
      emojiPickerIsOpen,
    } = this.state;

    const {
      image,
      currentAddress,
      box,
      ethereum,
      loginFunction,
      name,
    } = this.props;

    const noWeb3 = (!ethereum || !Object.entries(ethereum).length) && !loginFunction;
    const updatedProfilePicture = image ? `https://ipfs.infura.io/ipfs/${image[0].contentUrl['/']}`
      : currentAddress && makeBlockie(currentAddress);
    const isBoxEmpty = !box || !Object.keys(box).length;

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

        {postLoading ? (
          <div className="input_postLoading">
            <SVG
              src={Loading}
              alt="Loading"
              className="input_postLoading_spinner"
            />
            <span className="input_postLoading_text">
              <SVG src={Logo} alt="Logo" className="footer_text_image" />
            </span>
          </div>
        ) : <div />}

        <p className={`input_commentAs ${showLoggedInAs ? 'showLoggedInAs' : ''}`}>
          {(isBoxEmpty && !noWeb3 && !currentAddress) ? 'You will log in upon commenting' : ''}
          {((box && !isBoxEmpty && !noWeb3) || currentAddress) ? `Commenting as ${name || shortenEthAddr(currentAddress)}` : ''}
          {noWeb3 ? 'Cannot comment without Web3' : ''}
        </p>

        <textarea
          type="text"
          value={comment}
          placeholder="Write a comment..."
          className={`input_form ${postLoading ? 'hidePlaceholder' : ''}`}
          onChange={this.handleCommentText}
          onFocus={this.handleLoggedInAs}
          onBlur={this.handleLoggedInAs}
          ref={this.inputRef}
        />

        <button 
        className={`input_send ${isMobile ? 'input_send-visible' : ''}`} 
        onClick={this.saveComment}
        type="button"
        >
          <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          className="input_send_icon"
          alt="Send"
          x="0px"
          y="0px"
          width="37.393px"
          height="37.393px"
          viewBox="0 0 37.393 37.393"
          enableBackground="new 0 0 37.393 37.393">
            <g id="Layer_2">
              <path d="M36.511,17.594L2.371,2.932c-0.374-0.161-0.81-0.079-1.1,0.21C0.982,3.43,0.896,3.865,1.055,4.241l5.613,13.263
            L2.082,32.295c-0.115,0.372-0.004,0.777,0.285,1.038c0.188,0.169,0.427,0.258,0.67,0.258c0.132,0,0.266-0.026,0.392-0.08
            l33.079-14.078c0.368-0.157,0.607-0.519,0.608-0.919S36.879,17.752,36.511,17.594z M4.632,30.825L8.469,18.45h8.061
            c0.552,0,1-0.448,1-1s-0.448-1-1-1H8.395L3.866,5.751l29.706,12.757L4.632,30.825z" />
            </g>
          </svg>
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
  // showDifferentNetworkModal: state.uiState.showDifferentNetworkModal,
  // allowAccessModal: state.uiState.allowAccessModal,
  // provideConsent: state.uiState.provideConsent,
  // signInModal: state.uiState.signInModal,
  // directLogin: state.uiState.directLogin,
  // loggedOutModal: state.uiState.loggedOutModal,
  // switchedAddressModal: state.uiState.switchedAddressModal,
  // onBoardingModal: state.uiState.onBoardingModal,
  // onBoardingModalTwo: state.uiState.onBoardingModalTwo,
  // isFetchingThreeBox: state.uiState.isFetchingThreeBox,
  // errorMessage: state.uiState.errorMessage,
  // prevAddress: state.uiState.prevAddress,
  // showErrorModal: state.uiState.showErrorModal,
  // accessDeniedModal: state.uiState.accessDeniedModal,
  // onOtherProfilePage: state.uiState.onOtherProfilePage,
  // showFollowingPublicModal: state.uiState.showFollowingPublicModal,
  // showContactsModal: state.uiState.showContactsModal,
  // showUnsupportedBrowser: state.uiState.showUnsupportedBrowser,
  // fixBody: state.uiState.fixBody,
  // onSyncFinished: state.uiState.onSyncFinished,
  // isSyncing: state.uiState.isSyncing,

  // hasSignedOut: state.userState.hasSignedOut,
  // prevNetwork: state.userState.prevNetwork,
  // currentNetwork: state.userState.currentNetwork,
  // isLoggedIn: state.userState.isLoggedIn,
  currentAddress: state.userState.currentAddress,
  // isMobile: state.userState.isMobile,

  // otherAddressToFollow: state.otherProfile.otherAddressToFollow,
  // otherFollowing: state.otherProfile.otherFollowing,
  // otherName: state.otherProfile.otherName,
  // following: state.myData.following,
  // otherProfileAddress: state.otherProfile.otherProfileAddress,
  image: state.myData.image,
  box: state.myData.box,
  wallThread: state.myData.wallThread,
  ethereum: state.userState.web3Obj,
});

export default connect(mapState, {
  updateMyWall,
})(WallInput);

WallInput.propTypes = {
  box: PropTypes.object,
  wallThread: PropTypes.object,
  ethereum: PropTypes.object,
  name: PropTypes.string,
  currentAddress: PropTypes.string,
  image: PropTypes.array,
  loginFunction: PropTypes.func,

  updateMyWall: PropTypes.func.isRequired,
  joinThread: PropTypes.func.isRequired,
};

WallInput.defaultProps = {
  box: {},
  wallThread: {},
  ethereum: null,
  name: '',
  currentAddress: '',
  image: null,
};
