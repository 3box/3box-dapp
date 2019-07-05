import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import makeBlockie from 'ethereum-blockies-base64';
import { withRouter } from 'react-router-dom';

import DefaultColorPic from '../assets/DefaultColorPic.svg';

class ProfilePicture extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      onClickFunction,
      image,
      otherImage,
      currentAddress,
      isMyPicture,
      pictureClass,
      imageToRender,
    } = this.props;

    const blockie = currentAddress ? makeBlockie(currentAddress) : DefaultColorPic;
    const profilePicture = isMyPicture
      ? image
      : imageToRender || otherImage;

    const src = profilePicture && profilePicture.length > 0 && profilePicture[0].contentUrl
      ? `https://ipfs.infura.io/ipfs/${profilePicture[0].contentUrl['/']}`
      : blockie;

    if (src) {
      return (
        <img
          src={src}
          className={pictureClass}
          onClick={onClickFunction}
          onKeyPress={onClickFunction}
          role="button"
          alt="profile"
        />
      );
    }

    return (
      <div className="nav__userPicture" />
    );
  }
}

ProfilePicture.propTypes = {
  onClickFunction: PropTypes.func,
  currentAddress: PropTypes.string,
  pictureClass: PropTypes.string,
  image: PropTypes.array,
  otherImage: PropTypes.array,
  imageToRender: PropTypes.array,
  isMyPicture: PropTypes.bool,
};

ProfilePicture.defaultProps = {
  onClickFunction: null,
  currentAddress: '',
  pictureClass: '',
  image: [],
  otherImage: [],
  imageToRender: [],
  isMyPicture: true,
};

function mapState(state) {
  return {
    name: state.myData.name,
    image: state.myData.image,
    coverPhoto: state.myData.coverPhoto,
    emoji: state.myData.emoji,
    description: state.myData.description,

    currentAddress: state.userState.currentAddress,

    otherCoverPhoto: state.otherProfile.otherCoverPhoto,
    otherImage: state.otherProfile.otherImage,
    otherName: state.otherProfile.otherName,
    otherEmoji: state.otherProfile.otherEmoji,
    otherDescription: state.otherProfile.otherDescription,
  };
}

export default withRouter(connect(mapState)(ProfilePicture));
