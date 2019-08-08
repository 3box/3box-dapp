import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter, Prompt } from 'react-router-dom';
import PropTypes from 'prop-types';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import makeBlockie from 'ethereum-blockies-base64';

import {
  store,
} from '../../../state/store';
import actions from '../../../state/actions';
import { copyToClipBoard } from '../../../utils/funcs';
import {
  FileSizeModal,
  GithubVerificationModal,
  TwitterVerificationModal,
  EmailVerificationModal,
  ModalBackground,
} from '../../../components/Modals';
import history from '../../../utils/history';
import { twitterMessage, githubMessage, editProfileFields } from './EditProfile/utils';
import Nav from '../../../components/Nav/Nav';
import * as routes from '../../../utils/routes';
import Private from '../../../assets/Private.svg';
import Verified from '../../../assets/Verified.svg';
import AddImage from '../../../assets/AddImage.svg';
import Loading from '../../../assets/Loading.svg';
import '../../styles/EditProfile.css';
import DefaultColorPic from '../../../assets/DefaultColorPic.svg';
import MyProfileHeaders from '../MyProfile/MyProfileHeaders';

const { getActivity, getMyProfileValue, getMyDID } = actions.profile;
const {
  handleGithubVerificationModal,
  handleTwitterVerificationModal,
  handleEmailVerificationModal,
} = actions.modal;

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      verifiedGithub: '',
      verifiedTwitter: '',
      verifiedEmail: '',
      email: '',
      buffer: '',
      description: '',
      location: '',
      website: '',
      emoji: '',
      birthday: '',
      job: '',
      school: '',
      degree: '',
      major: '',
      year: '',
      employer: '',
      emailVerificationMessage: '',
      emailVerificationErrMsg: '',
      emailCode: '',
      disableSave: true,
      saveLoading: false,
      removeUserPic: false,
      isGithubVerified: false,
      isTwitterVerified: false,
      verificationLoading: false,
      githubVerifiedFailed: false,
      twitterVerifiedFailed: false,
      isEmailSending: false,
      editPic: false,
      editCoverPic: false,
      showFileSizeModal: false,
      githubRemoved: false,
      twitterRemoved: false,
      githubEdited: false,
      twitterEdited: false,
      showEmoji: false,
      isEmailVerified: false,
      emailVerifiedFailed: false,
      savedGithub: false,
      savedTwitter: false,
      disableSendVerificationEmail: false,
      editedArray: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
    window.removeEventListener('scroll', this.hideBar);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    editProfileFields.forEach((fieldSet) => {
      const field = this.props[fieldSet[0]];
      this.setState({ field });
    });

    // const {
    //   name,
    //   verifiedGithub,
    //   verifiedTwitter,
    //   verifiedEmail,
    //   description,
    //   location,
    //   website,
    //   birthday,
    //   employer,
    //   job,
    //   school,
    //   degree,
    //   major,
    //   year,
    //   emoji,
    // } = this.props;

    // this.setState({
    //   name,
    //   verifiedGithub,
    //   verifiedTwitter,
    //   verifiedEmail,
    //   description,
    //   location,
    //   website,
    //   birthday,
    //   job,
    //   school,
    //   degree,
    //   major,
    //   year,
    //   emoji,
    //   employer,
    // });
  }

  componentWillReceiveProps(nextProps) {
    const {
      name,
      verifiedGithub,
      verifiedTwitter,
      verifiedEmail,
      email,
      description,
      location,
      website,
      birthday,
      job,
      school,
      degree,
      major,
      year,
      emoji,
      employer,
    } = nextProps;

    if (name !== this.props.name) this.setState({ name });
    if (verifiedGithub !== this.props.verifiedGithub) this.setState({ verifiedGithub });
    if (verifiedTwitter !== this.props.verifiedTwitter) this.setState({ verifiedTwitter });
    if (verifiedEmail !== this.props.verifiedEmail) this.setState({ verifiedEmail });
    if (email !== this.props.email) this.setState({ email });
    if (description !== this.props.description) this.setState({ description });
    if (location !== this.props.location) this.setState({ location });
    if (website !== this.props.website) this.setState({ website });
    if (birthday !== this.props.birthday) this.setState({ birthday });
    if (job !== this.props.job) this.setState({ job });
    if (school !== this.props.school) this.setState({ school });
    if (degree !== this.props.degree) this.setState({ degree });
    if (major !== this.props.major) this.setState({ major });
    if (year !== this.props.year) this.setState({ year });
    if (emoji !== this.props.emoji) this.setState({ emoji });
    if (employer !== this.props.employer) this.setState({ employer });
  }

  handleFormChange = (e, property) => {
    const { editedArray } = this.state;
    const fieldState = this.state[property];
    const fieldProp = this.props[property];
    const isFieldsSame = fieldState === fieldProp;

    let editedField;
    if (property === 'verifiedGithub') editedField = 'github';
    if (property === 'verifiedTwitter') editedField = 'twitter';
    if (property === 'verifiedEmail') editedField = 'email';

    this.setState({ [property]: e.target.value },
      () => {
        if (property === 'emailCode') return;
        if (editedField) {
          if (fieldState === '') {
            this.setState({ [`${editedField}Edited`]: false });
          } else if (!isFieldsSame && fieldState !== '') {
            this.setState({ [`${editedField}Edited`]: true });
          }
        } else {
          const updatedEditedArray = editedArray;
          if (!isFieldsSame && updatedEditedArray.indexOf(property) === -1) updatedEditedArray.push(property);
          if (isFieldsSame) updatedEditedArray.splice(updatedEditedArray.indexOf(property), 1);
          if (Object.values(updatedEditedArray).length) {
            this.setState({ disableSave: false, editedArray: updatedEditedArray });
          } else {
            this.setState({ disableSave: true, editedArray: updatedEditedArray });
          }
        }
      });
  }

  closeFileSizeModal = () => {
    this.setState({ showFileSizeModal: false });
  }

  handleUpdatePic = (photoFile, e, cover) => {
    const { editedArray } = this.state;
    const updatedEditedArray = editedArray;
    const type = cover ? 'coverPhoto' : 'image';

    if (photoFile.size <= 2500000) {
      const formData = new window.FormData();
      formData.append('path', photoFile);

      if (updatedEditedArray.indexOf(type) === -1) updatedEditedArray.push(type);
      this.setState({ disableSave: false });

      if (cover) {
        this.setState({
          editCoverPic: true, coverBuffer: formData, removeCoverPic: false, editedArray: updatedEditedArray,
        });
      } else {
        this.setState({
          editPic: true, buffer: formData, removeUserPic: false, editedArray: updatedEditedArray,
        });
      }
    } else {
      e.target.value = null;
      this.setState({ showFileSizeModal: true });
    }
  }

  removePicture = (type) => {
    const { editedArray } = this.state;
    const updatedEditedArray = editedArray;

    if (type === 'Cover' && this.props.coverPhoto) {
      if (updatedEditedArray.indexOf('coverPhoto') === -1) updatedEditedArray.push('coverPhoto');
    } else if (type === 'Cover' && !this.props.coverPhoto) {
      updatedEditedArray.splice(updatedEditedArray.indexOf(type), 1);
    } else if (type === 'User' && this.props.image) {
      if (updatedEditedArray.indexOf('image') === -1) updatedEditedArray.push('image');
    } else if (type === 'User' && !this.props.image) {
      updatedEditedArray.splice(updatedEditedArray.indexOf(type), 1);
    }

    if (!updatedEditedArray.length) {
      this.setState({ disableSave: true });
    } else {
      this.setState({ disableSave: false });
    }

    this.setState({ [`remove${type}Pic`]: true, editedArray: updatedEditedArray });
  }

  addEmoji = (emoji) => {
    this.setState({
      emoji: emoji.native,
      showEmoji: false,
      disableSave: false,
    });
  }

  verifyGithub = () => {
    const { verifiedGithub, editedArray } = this.state;
    const { box, list, allData } = this.props;
    const updatedAllData = allData;
    const updatedEditedArray = editedArray;
    this.setState({ verificationLoading: true });

    fetch(`https://api.github.com/users/${verifiedGithub}/gists`)
      .then(response => response.json())
      .then((returnedData) => {
        if (returnedData.length) {
          returnedData.map((gist, i) => {
            const url = gist.files[Object.keys(gist.files)[0]].raw_url;
            return box.verified.addGithub(url).then((res) => {
              if (res) {
                console.log('Github username verified');
                updatedEditedArray.push('proof_github');
                this.setState({
                  isGithubVerified: true,
                  verificationLoading: false,
                  editedArray: updatedEditedArray,
                  disableSave: false,
                  savedGithub: true,
                });
                store.dispatch({
                  type: 'MY_VERIFIED_GITHUB_UPDATE',
                  verifiedGithub,
                });
                updatedAllData['3Box_app'].public.verifiedGithub = verifiedGithub;
                store.dispatch({
                  type: 'SPACES_DATA_UPDATE',
                  list,
                  allData: updatedAllData,
                });
              }
            }).catch((err) => {
              console.log(err);
              if (i === returnedData.length - 1) {
                this.setState({ githubVerifiedFailed: true, verificationLoading: false });
              }
            });
          });
        } else {
          this.setState({ githubVerifiedFailed: true, verificationLoading: false });
        }
      });
  }

  // adding and removing Github username
  handleGithubUsername = (remove) => {
    const { editedArray, savedGithub } = this.state;
    const updatedEditedArray = editedArray;
    if (remove && this.props.verifiedGithub) {
      updatedEditedArray.push('proof_github');
      this.setState({
        verifiedGithub: '',
        disableSave: false,
        githubRemoved: true,
        editedArray: updatedEditedArray,
      });
    } else {
      if (remove && savedGithub) this.setState({ savedGithub: false });
      updatedEditedArray.splice(updatedEditedArray.indexOf('proof_github'), 1);
      if (!updatedEditedArray.length) this.setState({ disableSave: true });
      this.setState({
        verifiedGithub: this.props.verifiedGithub,
        githubRemoved: false,
        editedArray: updatedEditedArray,
      });
    }
  }

  // adding and removing Twitter username
  handleTwitterUsername = (remove) => {
    const { editedArray, savedTwitter } = this.state;
    const updatedEditedArray = editedArray;
    if (remove && this.props.verifiedTwitter) {
      updatedEditedArray.push('proof_twitter');
      this.setState({
        verifiedTwitter: '',
        disableSave: false,
        twitterRemoved: true,
        editedArray: updatedEditedArray,
      });
    } else {
      if (remove && savedTwitter) this.setState({ savedTwitter: false });
      updatedEditedArray.splice(updatedEditedArray.indexOf('proof_twitter'), 1);
      if (!updatedEditedArray.length) this.setState({ disableSave: true });
      this.setState({
        verifiedTwitter: this.props.verifiedTwitter,
        twitterRemoved: false,
        editedArray: updatedEditedArray,
      });
    }
  }

  // adding and removing Twitter username
  handleEmailAddress = (remove) => {
    const { editedArray, savedEmail } = this.state;
    const updatedEditedArray = editedArray;
    if (remove && this.props.verifiedEmail) {
      updatedEditedArray.push('proof_email');
      this.setState({
        verifiedEmail: '',
        disableSave: false,
        emailRemoved: true,
        editedArray: updatedEditedArray,
      });
    } else {
      if (remove && savedEmail) this.setState({ savedEmail: false });
      updatedEditedArray.splice(updatedEditedArray.indexOf('proof_email'), 1);
      if (!updatedEditedArray.length) this.setState({ disableSave: true });
      this.setState({
        verifiedEmail: this.props.verifiedEmail,
        emailRemoved: false,
        editedArray: updatedEditedArray,
      });
    }
  }

  verifyTwitter = () => {
    const { verifiedTwitter, editedArray } = this.state;
    const { box, did, list, allData } = this.props;
    const updatedAllData = allData;
    const updatedEditedArray = editedArray;
    this.setState({ verificationLoading: true });

    fetch('https://verifications.3box.io/twitter', {
      method: 'POST',
      body: JSON.stringify({
        did,
        twitter_handle: `${verifiedTwitter}`,
      }),
    })
      .then((response) => {
        if (response.ok) return response.json();
        this.setState({
          verificationLoading: false,
          twitterVerifiedFailed: true,
        });
        throw new Error('Verification failed');
      })
      .then(claim => box.verified.addTwitter(claim.data.verification))
      .then((twitterUsername) => {
        if (twitterUsername) {
          console.log('Twitter username verified and saved');
          updatedEditedArray.push('proof_twitter');
          this.setState({
            isTwitterVerified: true,
            verificationLoading: false,
            editedArray: updatedEditedArray,
            disableSave: false,
            savedTwitter: true,
          });
          store.dispatch({
            type: 'MY_VERIFIED_TWITTER_UPDATE',
            verifiedTwitter,
          });
          updatedAllData['3Box_app'].public.verifiedTwitter = verifiedTwitter;
          store.dispatch({
            type: 'SPACES_DATA_UPDATE',
            list,
            allData: updatedAllData,
          });
        } else {
          throw new Error('Verification failed');
        }
      })
      .catch((err) => {
        this.setState({
          verificationLoading: false,
          twitterVerifiedFailed: true,
        });
        console.log(err);
      });
  }

  sendVerificationEmail = (did) => {
    const { verifiedEmail } = this.state;
    const payload = {
      did,
      email_address: verifiedEmail,
    };

    this.setState({ isEmailSending: true });

    fetch('https://verifications.3box.io/send-email-verification', {
      method: 'POST',
      body: JSON.stringify(payload),
    }).then(res => res.json())
      .then((json) => {
        this.setState({ emailVerificationMessage: 'Sent!', isEmailSending: false, disableSendVerificationEmail: true });
      })
      .catch((err) => {
        this.setState({ emailVerificationMessage: err.response, isEmailSending: false });
      });
  }

  verifyEmail = () => {
    const { editedArray, emailCode } = this.state;
    const { box, did, list, allData } = this.props;
    const updatedEditedArray = editedArray;
    const updatedAllData = allData;
    const codeAsNumber = parseInt(emailCode, 10);
    this.setState({ verificationLoading: true, emailVerifiedFailed: false });

    const payload = {
      iss: did,
      sub: 'did:https:verifications.3box.io',
      iat: Math.floor(Date.now() / 1000),
      claim: {
        code: codeAsNumber,
      },
    };

    box._3id.signJWT(payload).then((jwt) => {
      fetch('https://verifications.3box.io/email-verify', {
        method: 'POST',
        body: JSON.stringify({
          verification: jwt,
        }),
      })
        .then((response) => {
          if (response.ok) return response.json();
          throw new Error('Verification failed');
          // const data = response.json();
          // if (response.ok) return data;
          // throw data;
        })
        .then(claim => box.verified.addEmail(claim.data.verification))
        .then((verifiedEmail) => {
          if (verifiedEmail) {
            console.log('Email address verified and saved');
            updatedEditedArray.push('proof_email');
            this.setState({
              isEmailVerified: true,
              verificationLoading: false,
              editedArray: updatedEditedArray,
              disableSave: false,
              savedEmail: true,
              emailVerificationErrMsg: '',
            });
            store.dispatch({
              type: 'MY_VERIFIED_EMAIL_UPDATE',
              verifiedEmail: verifiedEmail.email_address,
            });
            updatedAllData['3Box_app'].public.verifiedEmail = verifiedEmail.email_address;
            store.dispatch({
              type: 'SPACES_DATA_UPDATE',
              list,
              allData: updatedAllData,
            });
          } else {
            throw new Error('Verification failed');
          }
        })
        .catch(() => {
          this.setState({
            verificationLoading: false,
            emailVerifiedFailed: true,
            emailVerificationErrMsg: 'Verification failed',
          });
        });
    });
  }

  // resets success / failure state of verification modals
  resetVerification = (platform) => {
    const { isGithubVerified, isTwitterVerified, editedArray } = this.state;
    const updatedEditedArray = editedArray;
    const { box } = this.props;
    if (platform === 'Github') {
      updatedEditedArray.splice(updatedEditedArray.indexOf('proof_github'), 1);
      if (!updatedEditedArray.length) this.setState({ disableSave: true });
      if (isGithubVerified) box.public.remove('proof_github');
      this.setState({
        githubVerifiedFailed: false,
        githubEdited: false,
        isGithubVerified: false,
        verifiedGithub: '',
      });
      store.dispatch({
        type: 'MY_VERIFIED_GITHUB_UPDATE',
        verifiedGithub: '',
      });
    } else if (platform === 'Twitter') {
      updatedEditedArray.splice(updatedEditedArray.indexOf('proof_twitter'), 1);
      if (!updatedEditedArray.length) this.setState({ disableSave: true });
      if (isTwitterVerified) box.public.remove('proof_twitter');
      this.setState({
        twitterVerifiedFailed: false,
        twitterEdited: false,
        isTwitterVerified: false,
        verifiedTwitter: '',
      });
      store.dispatch({
        type: 'MY_VERIFIED_TWITTER_UPDATE',
        verifiedTwitter: '',
      });
    } else if (platform === 'Email') {
      updatedEditedArray.splice(updatedEditedArray.indexOf('proof_email'), 1);
      if (!updatedEditedArray.length) this.setState({ disableSave: true });
      if (isTwitterVerified) box.private.remove('proof_email');
      this.setState({
        emailVerifiedFailed: false,
        emailEdited: false,
        isEmailVerified: false,
        verifiedEmail: '',
        disableSendVerificationEmail: false,
        emailVerificationMessage: '',
        emailVerificationErrMsg: '',
        emailCode: '',
      });
      store.dispatch({
        type: 'MY_VERIFIED_EMAIL_UPDATE',
        verifiedEmail: '',
      });
    }
  }

  fetchPic = buffer => window.fetch('https://ipfs.infura.io:5001/api/v0/add', {
    method: 'post',
    'Content-Type': 'multipart/form-data',
    body: buffer,
  });

  async handleSubmit(e) {
    const {
      removeUserPic,
      removeCoverPic,
      buffer,
      coverBuffer,
      editPic,
      editCoverPic,
    } = this.state;

    const { box, currentAddress, allData, list } = this.props;

    if (box.public) {
      e.preventDefault();
      const updatedAllData = allData;
      this.setState({ saveLoading: true });

      const didChangeArray = [];
      editProfileFields.forEach((field) => {
        const didChange = this.state[field[0]] !== this.props[field[0]];
        didChangeArray.push(didChange);
      });

      const updateArray = [];
      didChangeArray.map((fieldChanged, i) => {
        const field = editProfileFields[i][0];
        const privOrPublic = editProfileFields[i][1];
        const fieldState = this.state[field];
        const fieldIsEmpty = fieldState === '';
        let verifiedField;
        let promise;
        if (field === 'verifiedGithub') verifiedField = 'proof_github';
        if (field === 'verifiedTwitter') verifiedField = 'proof_twitter';
        if (field === 'verifiedEmail') verifiedField = 'proof_email';
        if (fieldChanged && !fieldIsEmpty) promise = box[privOrPublic].set(field, fieldState);
        if (fieldChanged && fieldIsEmpty) promise = box[privOrPublic].remove(verifiedField || field);
        if (promise) updateArray.push(promise);
      });
      const updatePromises = Promise.all(updateArray);
      await updatePromises;

      if (removeUserPic) await box.public.remove('image');
      if (removeCoverPic) await box.public.remove('coverPhoto');

      // save profile picture
      const fetch = editPic && await this.fetchPic(buffer);
      const returnedData = editPic && await fetch.json();
      if (editPic) await box.public.set('image', [{ '@type': 'ImageObject', contentUrl: { '/': returnedData.Hash } }]);

      const fetchCover = editCoverPic && await this.fetchPic(coverBuffer);
      const returnedCoverData = editCoverPic && await fetchCover.json();
      if (editCoverPic) await box.public.set('coverPhoto', [{ '@type': 'ImageObject', contentUrl: { '/': returnedCoverData.Hash } }]);

      const fetchedUpdates = [];
      const fetchedUpdatesParams = [];
      didChangeArray.map(async (fieldChanged, i) => {
        const field = editProfileFields[i][0];
        const privOrPublic = editProfileFields[i][1];
        let dispatchAction;
        if (field === 'verifiedGithub') dispatchAction = 'MY_VERIFIED_GITHUB_UPDATE';
        if (field === 'verifiedTwitter') dispatchAction = 'MY_VERIFIED_TWITTER_UPDATE';
        if (field === 'verifiedEmail') dispatchAction = 'MY_VERIFIED_EMAIL_UPDATE';
        if (dispatchAction && fieldChanged) {
          store.dispatch({
            type: dispatchAction,
            [field]: null,
          });
          delete updatedAllData['3Box_app'].public[field];
          store.dispatch({
            type: 'SPACES_DATA_UPDATE',
            list,
            allData: updatedAllData,
          });
        } else if (fieldChanged) {
          const savedObject = this.props.getMyProfileValue(privOrPublic, field, true);
          fetchedUpdates.push(savedObject);
          fetchedUpdatesParams.push([privOrPublic, field]);
        }
      });
      const fetchedPromises = Promise.all(fetchedUpdates);
      const fetchedData = await fetchedPromises;
      fetchedData.forEach((data, i) => {
        const privOrPublic = fetchedUpdatesParams[i][0];
        const field = fetchedUpdatesParams[i][1];
        if (data) {
          updatedAllData['3Box_app'][privOrPublic][field] = data;
        } else {
          delete updatedAllData['3Box_app'][privOrPublic][field];
        }
        store.dispatch({
          type: 'SPACES_DATA_UPDATE',
          list,
          allData: updatedAllData,
        });
      });

      if (removeUserPic || editPic) {
        const savedObject = await this.props.getMyProfileValue('public', 'image', true);
        if (removeUserPic) {
          delete updatedAllData['3Box_app'].public.image;
          store.dispatch({
            type: 'MY_IMAGE_UPDATE',
            image: null,
          });
        } else {
          updatedAllData['3Box_app'].public.image = savedObject;
        }
        store.dispatch({
          type: 'SPACES_DATA_UPDATE',
          list,
          allData: updatedAllData,
        });
      }

      if (removeCoverPic || editCoverPic) {
        const savedObject = await this.props.getMyProfileValue('public', 'coverPhoto', true);
        if (removeCoverPic) {
          delete updatedAllData['3Box_app'].public.coverPhoto;
        } else {
          updatedAllData['3Box_app'].public.coverPhoto = savedObject;
        }
        store.dispatch({
          type: 'SPACES_DATA_UPDATE',
          list,
          allData: updatedAllData,
        });
      }

      this.props.getActivity();

      this.setState({ saveLoading: false });
      history.push(`/${currentAddress}/${routes.ACTIVITY}`);
    }
  }

  render() {
    const {
      image,
      coverPhoto,
      memberSince,
      did,
      showGithubVerificationModal,
      showTwitterVerificationModal,
      showEmailVerificationModal,
      copySuccessful,
      currentAddress,
      handleSignInUp,
    } = this.props;

    const {
      verifiedGithub,
      verifiedTwitter,
      name,
      description,
      location,
      website,
      birthday,
      job,
      school,
      degree,
      major,
      year,
      emoji,
      employer,
      disableSave,
      removeUserPic,
      removeCoverPic,
      saveLoading,
      showFileSizeModal,
      showEmoji,
      isGithubVerified,
      isTwitterVerified,
      githubVerifiedFailed,
      twitterVerifiedFailed,
      githubEdited,
      twitterEdited,
      emailEdited,
      githubRemoved,
      twitterRemoved,
      emailRemoved,
      verificationLoading,
      emailVerificationMessage,
      isEmailSending,
      disableSendVerificationEmail,
      isEmailVerified,
      emailVerifiedFailed,
      verifiedEmail,
      emailVerificationErrMsg,
      emailCode,
    } = this.state;

    return (
      <div id="edit__page">
        <MyProfileHeaders
          image={image}
          name={name}
          currentAddress={currentAddress}
        />

        <Nav handleSignInUp={handleSignInUp} />

        <Prompt
          when={!disableSave}
          message="Continue without saving changes to your profile?"
        />

        {saveLoading
          && (
            <div className="container">
              <img src={Loading} alt="loading" />
            </div>
          )}

        <ReactCSSTransitionGroup
          transitionName="app__modals"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          {showFileSizeModal
            && <FileSizeModal show={showFileSizeModal} closeFileSizeModal={this.closeFileSizeModal} />}

          {showGithubVerificationModal && (
            <GithubVerificationModal
              copyToClipBoard={this.props.copyToClipBoard}
              did={did}
              message={githubMessage(did)}
              verifyGithub={this.verifyGithub}
              isGithubVerified={isGithubVerified}
              verificationLoading={verificationLoading}
              githubVerifiedFailed={githubVerifiedFailed}
              resetVerification={this.resetVerification}
              copySuccessful={copySuccessful}
              handleGithubVerificationModal={this.props.handleGithubVerificationModal}
            />
          )}

          {showTwitterVerificationModal && (
            <TwitterVerificationModal
              verifyTwitter={this.verifyTwitter}
              did={did}
              message={twitterMessage(did, currentAddress)}
              isTwitterVerified={isTwitterVerified}
              verificationLoading={verificationLoading}
              twitterVerifiedFailed={twitterVerifiedFailed}
              resetVerification={this.resetVerification}
              handleTwitterVerificationModal={this.props.handleTwitterVerificationModal}
            />
          )}

          {showEmailVerificationModal && (
            <EmailVerificationModal
              verifyEmail={this.verifyEmail}
              did={did}
              sendVerificationEmail={this.sendVerificationEmail}
              handleFormChange={this.handleFormChange}
              emailVerificationMessage={emailVerificationMessage}
              emailCode={emailCode}
              isEmailVerified={isEmailVerified}
              verificationLoading={verificationLoading}
              emailVerifiedFailed={emailVerifiedFailed}
              isEmailSending={isEmailSending}
              emailVerificationErrMsg={emailVerificationErrMsg}
              disableSendVerificationEmail={disableSendVerificationEmail}
              resetVerification={this.resetVerification}
              handleEmailVerificationModal={this.props.handleEmailVerificationModal}
            />
          )}

          {(showEmailVerificationModal
            || showTwitterVerificationModal
            || showGithubVerificationModal
            || showFileSizeModal) && (
              <ModalBackground />
            )}
        </ReactCSSTransitionGroup>

        <div id="edit__breadCrumb">
          <div id="edit__breadCrumb__crumbs">
            <p className="light">
              Edit Profile
</p>
          </div>
        </div>

        <div id="edit">

          <div id="edit__form">

            <div id="edit__profile">
              <div className="edit__profile__canvas">
                <div className="edit__profile__editCanvas__wrapper">
                  <button
                    id="removeCoverPic"
                    className="removeButton"
                    onClick={() => this.removePicture('Cover')}
                    disabled={(coverPhoto.length > 0 || (this.coverUpload && this.coverUpload.files && this.coverUpload.files[0])) ? false : true}
                    text="remove"
                    type="button"
                  >
                    &#10005;
</button>
                  <label htmlFor="coverInput" id="chooseCanvas">
                    <input
                      id="coverInput"
                      type="file"
                      name="coverPic"
                      className="light"
                      accept="image/*"
                      onChange={e => this.handleUpdatePic(e.target.files[0], e, true)}
                      ref={ref => this.coverUpload = ref}
                    />
                    <div className="edit__profile__editCanvas__button">
                      Edit
</div>
                  </label>
                </div>
                {(((coverPhoto && coverPhoto.length > 0 && coverPhoto[0].contentUrl) || (this.coverUpload && this.coverUpload.files && this.coverUpload.files[0])) && !removeCoverPic)
                  && (
                    <img
                      className="coverPic"
                      alt="profile"
                      src={(this.coverUpload && this.coverUpload.files && this.coverUpload.files[0])
                        ? URL.createObjectURL(this.coverUpload.files[0])
                        : `https://ipfs.infura.io/ipfs/${coverPhoto[0].contentUrl['/']}`}
                    />)}

              </div>
            </div>

            <div id="edit__profile">
              <div className="edit__profile__picAndAddress">
                <div id="edit__userPicture">
                  <label htmlFor="fileInput" id="chooseFile">
                    <input
                      id="fileInput"
                      type="file"
                      name="pic"
                      className="light"
                      accept="image/*"
                      onChange={e => this.handleUpdatePic(e.target.files[0], e)}
                      ref={ref => this.fileUpload = ref}
                    />

                    <img src={AddImage} alt="profile" id="addImage" />
                    <button
                      id="removePic"
                      className="removeButton"
                      onClick={() => this.removePicture('User')}
                      disabled={((image && image.length > 0 && image[0].contentUrl) || (this.fileUpload && this.fileUpload.files && this.fileUpload.files[0])) ? false : true}
                      text="remove"
                      type="button"
                    >
                      &#10005;
</button>

                    {(((image && image.length > 0 && image[0].contentUrl) || (this.fileUpload && this.fileUpload.files && this.fileUpload.files[0])) && !removeUserPic)
                      ? (
                        <div className="profPic_div">
                          <div className="profPic_div_overlay">
                            <p>Change picture</p>
                          </div>
                          <img
                            className="profPic clearProfPic"
                            src={(this.fileUpload && this.fileUpload.files && this.fileUpload.files[0])
                              ? URL.createObjectURL(this.fileUpload.files[0])
                              : `https://ipfs.infura.io/ipfs/${image[0].contentUrl['/']}`}
                            alt="profile"
                          />
                        </div>)
                      : (
                        <div className="profPic_div">
                          <div className="profPic_div_overlay">
                            <p>Change picture</p>
                          </div>
                          <img
                            className="profPic"
                            src={currentAddress ? makeBlockie(currentAddress) : DefaultColorPic}
                            alt="profile"
                          />
                        </div>)}

                  </label>

                </div>
                <p title={currentAddress} className="edit__profile__address">{currentAddress && `${currentAddress.substring(0, 8)}...`}</p>
              </div>
            </div>

            <div id="edit__profile">

              <div className="edit__profile__info">
                <div className="edit__profile__categories">
                  <h3>Basic</h3>
                  <p>Add basic information so others can recognize you.</p>
                </div>
                <div id="edit__profile__fields">
                  <div id="edit__info">

                    <div className="edit__profile__fields__entry noMargin">
                      <div className="edit__profile__keyContainer">
                        <h5>Name</h5>
                      </div>
                      <input
                        name="name"
                        type="text"
                        value={name}
                        className="edit__profile__value"
                        onChange={e => this.handleFormChange(e, 'name')}
                      />
                    </div>

                    <div className="edit__profile__fields__entry">
                      <div className="edit__profile__keyContainer">
                        <h5 className="edit__profile__key">Description</h5>
                      </div>
                      <textarea
                        name="description"
                        type="text"
                        className="edit__profile__value--description"
                        value={description}
                        onChange={e => this.handleFormChange(e, 'description')}
                      />
                    </div>

                    <div className="edit__profile__fields__entry">
                      <div className="edit__profile__keyContainer">
                        <h5 className="edit__profile__key">Spirit Emoji</h5>
                      </div>
                      {showEmoji
                        && (
                          <div
                            className="edit__profile__value__emojiMenu"
                          >
                            <Picker
                              onSelect={selectedEmoji => this.addEmoji(selectedEmoji)}
                              title="Pick your spirit emoji"
                            />
                          </div>)
                      }
                      {showEmoji
                        && <div className='onClickOutside' onClick={() => this.setState({ showEmoji: !this.state.showEmoji })} />}

                      <div
                        className="edit__profile__value--spirit"
                        onClick={() => this.setState({ showEmoji: !this.state.showEmoji })}
                      >
                        {
                          emoji
                            ? (
                              <span className="edit__profile__value--spirit__character" role="img">
                                {emoji.code ? emoji.code : emoji}
                              </span>
                            )
                            : (
                              <span className="edit__profile__value--spirit__character" role="img" aria-label="unicorn">
                                🦄
</span>
                            )
                        }
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              <div className="edit__profile__info">
                <div className="edit__profile__categories">
                  <h3>About</h3>
                </div>
                <div id="edit__profile__fields">
                  <div id="edit__info">
                    <div className="edit__profile__fields__entry noMargin">
                      <div className="edit__profile__keyContainer">
                        <h5>Location</h5>
                      </div>
                      <input
                        name="location"
                        type="text"
                        value={location}
                        className="edit__profile__value"
                        onChange={e => this.handleFormChange(e, 'location')}
                      />
                    </div>

                    <div className="edit__profile__fields__entry">
                      <div className="edit__profile__keyContainer">
                        <h5>Website or URL</h5>
                      </div>
                      <input
                        name="website"
                        type="text"
                        className="edit__profile__value"
                        value={website}
                        onChange={e => this.handleFormChange(e, 'website')}
                      />
                    </div>

                    <div className="edit__profile__fields__entry">
                      <div className="edit__profile__keyContainer">
                        <h5>Birthday</h5>
                      </div>
                      <div className="edit__profile__value--privateContainer">
                        <img id="edit__profile__input__privateIcon" src={Private} alt="Private" title="Information with this icon are accessible only by those you've given permission to." />
                        <input
                          name="birthday"
                          type="date"
                          className="edit__profile__value privateInput"
                          value={birthday}
                          onChange={e => this.handleFormChange(e, 'birthday')}
                        />
                      </div>
                    </div>

                    <div className="edit__profile__fields__entry">
                      <div className="edit__profile__keyContainer">
                        <h5 className="edit__profile__key">Member Since</h5>
                      </div>
                      <div className="edit__profile__fields__entry noMargin">
                        <p className="edit__profile__fields__entry--memberSince">{memberSince}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="edit__profile__info--verified">
                <div className="edit__profile__categories extraMargin">
                  <h3 className="noMargin">Verified Accounts</h3>
                  <p>Connect your existing social accounts to build a stronger reputation.</p>
                </div>
                <div id="edit__profile__fields">
                  <div id="edit__info">

                    <div className="edit__profile__fields__entry noMargin">
                      <div className="edit__profile__keyContainer" />
                      <div className="edit__profile__verifiedWrapper">
                        <p className="verified__instructions">Enter your handles and without the @ mark.</p>
                      </div>
                    </div>
                    <div className="edit__profile__fields__entry noMargin">
                      <div className="edit__profile__keyContainer">
                        <h5>Github</h5>
                      </div>
                      {this.props.verifiedGithub
                        && (
                          <div className="edit__profile__verifiedWrapper">
                            <div className="edit__profile__verifiedName">
                              <p>{verifiedGithub}</p>
                              {!githubRemoved
                                && <img src={Verified} alt="Verified" />
                              }
                            </div>

                            {!githubRemoved
                              ? (
                                <button
                                  type="button"
                                  className={`unstyledButton ${!githubEdited && 'uneditedGithub'} removeGithub`}
                                  onClick={() => this.handleGithubUsername('remove')}
                                >
                                  Remove
</button>
                              )
                              : (
                                <button
                                  type="button"
                                  className={`unstyledButton ${!githubEdited && 'uneditedGithub'}`}
                                  onClick={() => this.handleGithubUsername()}
                                >
                                  Cancel
</button>
                              )}
                          </div>
                        )}

                      {!this.props.verifiedGithub
                        && (
                          <div className="edit__profile__verifiedWrapper">
                            <input
                              name="verifiedGithub"
                              type="text"
                              className="edit__profile__value--github verifiedForm"
                              value={verifiedGithub}
                              onChange={e => this.handleFormChange(e, 'verifiedGithub')}
                            />
                            <button
                              type="button"
                              className={`unstyledButton ${!githubEdited && 'uneditedGithub'} verificationButton verifiedForm`}
                              disabled={!githubEdited}
                              onClick={() => {
                                this.props.getMyDID();
                                this.props.handleGithubVerificationModal();
                              }}
                            >
                              Verify
</button>
                            <p className="edit__profile__verified--NoMobile">
                              Add verifications using a desktop browser.
</p>
                          </div>
                        )}

                    </div>

                    <div className="edit__profile__fields__entry">
                      <div className="edit__profile__keyContainer">
                        <h5>Twitter</h5>
                      </div>
                      {this.props.verifiedTwitter
                        && (
                          <div className="edit__profile__verifiedWrapper">
                            <div className="edit__profile__verifiedName">
                              <p>{verifiedTwitter}</p>
                              {!twitterRemoved
                                && <img src={Verified} alt="Verified" />
                              }
                            </div>

                            {!twitterRemoved
                              ? (
                                <button
                                  type="button"
                                  className={`unstyledButton ${!twitterEdited && 'uneditedGithub'} removeGithub`}
                                  onClick={() => this.handleTwitterUsername('remove')}
                                >
                                  Remove
</button>
                              )
                              : (
                                <button
                                  type="button"
                                  className={`unstyledButton ${!twitterEdited && 'uneditedGithub'}`}
                                  onClick={() => this.handleTwitterUsername()}
                                >
                                  Cancel
</button>
                              )}
                          </div>
                        )}

                      {!this.props.verifiedTwitter
                        && (
                          <div className="edit__profile__verifiedWrapper">
                            <input
                              name="verifiedTwitter"
                              type="text"
                              className="edit__profile__value--github verifiedForm"
                              value={verifiedTwitter}
                              onChange={e => this.handleFormChange(e, 'verifiedTwitter')}
                            />
                            <button
                              type="button"
                              className={`unstyledButton ${!twitterEdited && 'uneditedGithub'} verificationButton verifiedForm`}
                              disabled={!twitterEdited}
                              onClick={() => {
                                this.props.getMyDID();
                                this.props.handleTwitterVerificationModal();
                              }}
                            >
                              Verify
</button>
                            <p className="edit__profile__verified--NoMobile">
                              Add verifications using a desktop browser.
</p>
                          </div>
                        )}

                    </div>

                  </div>
                  {(githubRemoved || twitterRemoved)
                    && (
                      <p className="edit__profile__verifiedWrapper__warning">Save form to remove your verified accounts.</p>
                    )
                  }
                  {((!this.props.verifiedGithub && githubEdited && !isGithubVerified)
                    || (!this.props.verifiedTwitter && twitterEdited && !isTwitterVerified))
                    && (
                      <p className={`edit__profile__verifiedWrapper__warning ${(githubRemoved || twitterRemoved) && 'second'}`}>
                        Verification is required for your verified accounts to save.
</p>
                    )
                  }
                </div>
              </div>

              <div className="edit__profile__info">
                <div className="edit__profile__categories extraMargin">
                  <h3 className="noMargin">Contact</h3>
                  <p>Confirm your email to add trusted contact information to your account.</p>
                </div>
                <div id="edit__profile__fields">
                  <div id="edit__info">

                    <div className="edit__profile__fields__entry noMargin">
                      <div className="edit__profile__keyContainer">
                        <h5>Email</h5>
                      </div>
                      {this.props.verifiedEmail
                        && (
                          <div className="edit__profile__verifiedWrapper">
                            <div className="edit__profile__verifiedName">
                              <p>{verifiedEmail}</p>
                              {!emailRemoved
                                && <img src={Verified} alt="Verified" />
                              }
                            </div>

                            {!emailRemoved
                              ? (
                                <button
                                  type="button"
                                  className={`unstyledButton ${!emailEdited && 'uneditedGithub'} removeGithub`}
                                  onClick={() => this.handleEmailAddress('remove')}
                                >
                                  Remove
</button>
                              )
                              : (
                                <button
                                  type="button"
                                  className={`unstyledButton ${!emailEdited && 'uneditedGithub'}`}
                                  onClick={() => this.handleEmailAddress()}
                                >
                                  Cancel
</button>
                              )}
                          </div>
                        )}

                      {!this.props.verifiedEmail
                        && (
                          <div className="edit__profile__verifiedWrapper">
                            <img id="edit__profile__input__privateIcon" className="verifiedForm" src={Private} alt="Private" title="Information with this icon are accessible only by those you've given permission to." />
                            <input
                              name="verifiedEmail"
                              type="text"
                              className="edit__profile__value--github verifiedForm verifiedForm--email"
                              value={verifiedEmail}
                              onChange={e => this.handleFormChange(e, 'verifiedEmail')}
                            />
                            <button
                              type="button"
                              className={`unstyledButton ${!emailEdited && 'uneditedGithub'} verificationButton verifiedForm`}
                              disabled={!emailEdited}
                              onClick={() => {
                                this.props.getMyDID();
                                this.props.handleEmailVerificationModal();
                              }}
                            >
                              Verify
</button>
                            <p className="edit__profile__verified--NoMobile">
                              Add verifications using a desktop browser.
</p>
                          </div>
                        )}

                    </div>


                  </div>
                  {emailRemoved
                    && (
                      <p className="edit__profile__verifiedWrapper__warning">Save form to remove your verified accounts.</p>
                    )
                  }
                  {(!this.props.verfiedEmail && emailEdited && !isEmailVerified)
                    && (
                      <p className={`edit__profile__verifiedWrapper__warning ${emailRemoved && 'second'}`}>
                        Verification is required for your verified accounts to save.
</p>
                    )}
                </div>
              </div>

              <div className="edit__profile__info">
                <div className="edit__profile__categories">
                  <h3>Work</h3>
                </div>

                <div id="edit__profile__fields">
                  <div id="edit__info">

                    <div className="edit__profile__fields__entry noMargin">
                      <div className="edit__profile__keyContainer">
                        <h5>Employer</h5>
                      </div>
                      <input
                        name="employer"
                        type="text"
                        value={employer}
                        className="edit__profile__value"
                        onChange={e => this.handleFormChange(e, 'employer')}
                      />
                    </div>

                    <div className="edit__profile__fields__entry">
                      <div className="edit__profile__keyContainer">
                        <h5>Job Title</h5>
                      </div>
                      <input
                        name="job"
                        type="text"
                        className="edit__profile__value"
                        value={job}
                        onChange={e => this.handleFormChange(e, 'job')}
                      />
                    </div>

                  </div>
                </div>
              </div>

              <div className="edit__profile__info noBorder">
                <div className="edit__profile__categories">
                  <h3>Education</h3>
                </div>
                <div id="edit__profile__fields">
                  <div id="edit__info">

                    <div className="edit__profile__fields__entry noMargin">
                      <div className="edit__profile__keyContainer">
                        <h5>School</h5>
                      </div>
                      <input
                        name="school"
                        type="text"
                        className="edit__profile__value"
                        value={school}
                        onChange={e => this.handleFormChange(e, 'school')}
                      />
                    </div>

                    <div className="edit__profile__fields__entry">
                      <div className="edit__profile__keyContainer">
                        <h5>Degree</h5>
                      </div>
                      <input
                        name="degree"
                        type="text"
                        className="edit__profile__value"
                        value={degree}
                        onChange={e => this.handleFormChange(e, 'degree')}
                      />
                    </div>

                    <div className="edit__profile__fields__entry">
                      <div className="edit__profile__keyContainer">
                        <h5>Major</h5>
                      </div>
                      <input
                        name="major"
                        type="text"
                        className="edit__profile__value"
                        value={major}
                        onChange={e => this.handleFormChange(e, 'major')}
                      />
                    </div>

                    <div className="edit__profile__fields__entry">
                      <div className="edit__profile__keyContainer">
                        <h5>Year</h5>
                      </div>
                      <input
                        name="year"
                        type="text"
                        className="edit__profile__value"
                        value={year}
                        onChange={e => this.handleFormChange(e, 'year')}
                      />
                    </div>

                  </div>
                </div>
              </div>

            </div>
            <div id="edit__formControls">
              <div id="edit__formControls__content">
                <button
                  type="submit"
                  disabled={disableSave}
                  onClick={
                    (e) => {
                      this.setState({ disableSave: true }, () => this.handleSubmit(e));
                    }}
                >
                  Save
</button>
                <Link
                  to={`/${currentAddress}/${routes.ACTIVITY}`}
                  className="subtext"
                  id="edit__cancel"
                  onClick={() => {
                    if (this.state.savedGithub && verifiedGithub !== '') {
                      this.props.box.public.remove('proof_github');
                      store.dispatch({
                        type: 'MY_VERIFIED_GITHUB_UPDATE',
                        verifiedGithub: null,
                      });
                    }
                    if (this.state.savedTwitter && verifiedTwitter !== '') {
                      this.props.box.public.remove('proof_twitter');
                      store.dispatch({
                        type: 'MY_VERIFIED_TWITTER_UPDATE',
                        verifiedTwitter: null,
                      });
                    }
                  }}
                >
                  Cancel
</Link>
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

EditProfile.propTypes = {
  box: PropTypes.object,
  allData: PropTypes.object,
  list: PropTypes.array,
  name: PropTypes.string,
  verifiedGithub: PropTypes.string,
  verifiedTwitter: PropTypes.string,
  verifiedEmail: PropTypes.string,
  did: PropTypes.string,
  year: PropTypes.string,
  emoji: PropTypes.string,
  description: PropTypes.string,
  location: PropTypes.string,
  website: PropTypes.string,
  birthday: PropTypes.string,
  job: PropTypes.string,
  school: PropTypes.string,
  degree: PropTypes.string,
  major: PropTypes.string,
  employer: PropTypes.string,
  email: PropTypes.string,
  memberSince: PropTypes.string,
  currentAddress: PropTypes.string,
  image: PropTypes.array,
  coverPhoto: PropTypes.array,
  isFetchingThreeBox: PropTypes.bool,
  showGithubVerificationModal: PropTypes.bool,
  showTwitterVerificationModal: PropTypes.bool,
  showEmailVerificationModal: PropTypes.bool,
  copySuccessful: PropTypes.bool,
  getMyProfileValue: PropTypes.func.isRequired,
  getMyDID: PropTypes.func.isRequired,
  getActivity: PropTypes.func.isRequired,
  handleGithubVerificationModal: PropTypes.func.isRequired,
  handleTwitterVerificationModal: PropTypes.func.isRequired,
  handleEmailVerificationModal: PropTypes.func.isRequired,
  copyToClipBoard: PropTypes.func.isRequired,
};

EditProfile.defaultProps = {
  box: {},
  allData: {},
  verifiedEmail: '',
  name: '',
  verifiedGithub: '',
  verifiedTwitter: '',
  did: '',
  description: '',
  location: '',
  website: '',
  birthday: '',
  job: '',
  school: '',
  degree: '',
  major: '',
  year: '',
  emoji: '',
  employer: '',
  memberSince: '',
  email: '',
  currentAddress: '',
  image: [],
  coverPhoto: [],
  list: [],
  isFetchingThreeBox: false,
  showGithubVerificationModal: false,
  showTwitterVerificationModal: false,
  showEmailVerificationModal: false,
  copySuccessful: false,
};

function mapState(state) {
  return {
    box: state.myData.box,
    showGithubVerificationModal: state.uiState.showGithubVerificationModal,
    showTwitterVerificationModal: state.uiState.showTwitterVerificationModal,
    showEmailVerificationModal: state.uiState.showEmailVerificationModal,
    isFetchingThreeBox: state.uiState.isFetchingThreeBox,
    copySuccessful: state.uiState.copySuccessful,

    name: state.myData.name,
    verifiedGithub: state.myData.verifiedGithub,
    verifiedTwitter: state.myData.verifiedTwitter,
    verifiedEmail: state.myData.verifiedEmail,
    did: state.myData.did,
    description: state.myData.description,
    memberSince: state.myData.memberSince,
    location: state.myData.location,
    website: state.myData.website,
    birthday: state.myData.birthday,
    job: state.myData.job,
    school: state.myData.school,
    degree: state.myData.degree,
    major: state.myData.major,
    year: state.myData.year,
    emoji: state.myData.emoji,
    employer: state.myData.employer,
    email: state.myData.email,
    image: state.myData.image,
    coverPhoto: state.myData.coverPhoto,

    currentAddress: state.userState.currentAddress,
    allData: state.spaces.allData,
    list: state.spaces.list,
  };
}

export default withRouter(connect(mapState,
  {
    getMyProfileValue,
    getMyDID,
    getActivity,
    handleGithubVerificationModal,
    handleTwitterVerificationModal,
    handleEmailVerificationModal,
    copyToClipBoard,
  })(EditProfile));