import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter, Prompt } from 'react-router-dom';
import PropTypes from 'prop-types';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

import {
  store,
} from '../state/store';
import {
  getProfileData,
  getActivity,
  getPublicDID,
  copyToClipBoard,
} from '../state/actions';
import {
  handleGithubVerificationModal,
  handleTwitterVerificationModal,
  handleEmailVerificationModal,
} from '../state/actions-modals';
import {
  FileSizeModal,
  GithubVerificationModal,
  TwitterVerificationModal,
  EmailVerificationModal,
} from '../components/Modals';
import history from '../history';
import Nav from '../components/Nav.jsx';
import * as routes from '../utils/routes';
import Private from '../assets/Private.svg';
import Verified from '../assets/Verified.svg';
import AddImage from '../assets/AddImage.svg';
import Loading from '../assets/Loading.svg';
import './styles/EditProfile.css';

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
      disableSave: true,
      saveLoading: false,
      removeUserPic: false,
      isGithubVerified: false,
      isTwitterVerified: false,
      verificationLoading: false,
      githubVerifiedFailed: false,
      twitterVerifiedFailed: false,
      editPic: false,
      editCoverPic: false,
      showFileSizeModal: false,
      githubRemoved: false,
      twitterRemoved: false,
      githubEdited: false,
      twitterEdited: false,
      showEmoji: false,
      savedGithub: false,
      savedTwitter: false,
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
      employer,
      job,
      school,
      degree,
      major,
      year,
      emoji,
    } = this.props;

    this.setState({
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
    });
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
    const { verifiedGithub, verifiedTwitter, verifiedEmail } = this.props;
    const { editedArray } = this.state;

    this.setState({ [property]: e.target.value },
      () => {
        if (property === 'verifiedGithub') {
          if (this.state.verifiedGithub === '') {
            this.setState({ githubEdited: false });
          } else if (verifiedGithub !== this.state.verifiedGithub && this.state.verifiedGithub !== '') {
            this.setState({ githubEdited: true });
          }
        } else if (property === 'verifiedTwitter') {
          if (this.state.verifiedTwitter === '') {
            this.setState({ twitterEdited: false });
          } else if (verifiedTwitter !== this.state.verifiedTwitter && this.state.verifiedTwitter !== '') {
            this.setState({ twitterEdited: true });
          }
        } else if (property === 'verifiedEmail') {
          if (this.state.verifiedEmail === '') {
            this.setState({ emailEdited: false });
          } else if (verifiedEmail !== this.state.verifiedEmail && this.state.verifiedEmail !== '') {
            this.setState({ emailEdited: true });
          }
        } else if (this.state[property] !== this.props[property]) {
          const updatedEditedArray = editedArray;
          if (updatedEditedArray.indexOf(property) === -1) updatedEditedArray.push(property);
          if (Object.values(updatedEditedArray).length) {
            this.setState({ disableSave: false, editedArray: updatedEditedArray });
          } else {
            this.setState({ disableSave: true, editedArray: updatedEditedArray });
          }
        } else if (this.state[property] === this.props[property]) {
          const updatedEditedArray = editedArray;
          updatedEditedArray.splice(updatedEditedArray.indexOf(property), 1);
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
    const { box } = this.props;
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
                  type: 'GET_VERIFIED_PUBLIC_GITHUB',
                  verifiedGithub,
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
    const { box, did } = this.props;
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
            type: 'GET_VERIFIED_PUBLIC_TWITTER',
            verifiedTwitter,
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

    fetch('https://verifications-dev.3box.io/send-email-verification', {
      method: 'POST',
      body: JSON.stringify(payload),
    }).then(res => res.json())
      .then((json) => {
        this.setState({ emailVerificationMessage: 'Sent!' });
      })
      .catch((err) => {
        this.setState({ emailVerificationMessage: err.response });
      });
  }

  verifyEmail = (emailCode) => {
    const { verificationCode, editedArray } = this.state;
    const { box } = this.props;
    const updatedEditedArray = editedArray;
    this.setState({ verificationLoading: true });

    const payload = {
      sub: 'did:https:verifications.3box.io',
      claim: {
        code: verificationCode,
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
          this.setState({
            verificationLoading: false,
            emailVerifiedFailed: true,
          });
          throw new Error('Verification failed');
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
            });
            store.dispatch({
              type: 'GET_VERIFIED_PRIVATE_EMAIL',
              verifiedEmail,
            });
          } else {
            throw new Error('Verification failed');
          }
        })
        .catch((err) => {
          this.setState({
            verificationLoading: false,
            emailVerifiedFailed: true,
          });
          console.log(err);
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
        type: 'GET_VERIFIED_PUBLIC_GITHUB',
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
        type: 'GET_VERIFIED_PUBLIC_TWITTER',
        verifiedTwitter: '',
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
      name,
      verifiedGithub,
      verifiedTwitter,
      email,
      removeUserPic,
      removeCoverPic,
      buffer,
      coverBuffer,
      editPic,
      editCoverPic,
      description,
      location,
      website,
      birthday,
      job,
      school,
      degree,
      major,
      year,
      employer,
      emoji,
    } = this.state;

    const { box, currentAddress } = this.props;

    if (box.public) {
      e.preventDefault();
      this.setState({ saveLoading: true });

      const nameChanged = name !== this.props.name;
      const verifiedGithubChanged = verifiedGithub !== this.props.verifiedGithub;
      const verifiedTwitterChanged = verifiedTwitter !== this.props.verifiedTwitter;
      const emailChanged = email !== this.props.email;
      const descriptionChanged = description !== this.props.description;
      const locationChanged = location !== this.props.location;
      const websiteChanged = website !== this.props.website;
      const employerChanged = employer !== this.props.employer;
      const jobChanged = job !== this.props.job;
      const schoolChanged = school !== this.props.school;
      const degreeChanged = degree !== this.props.degree;
      const majorChanged = major !== this.props.major;
      const yearChanged = year !== this.props.year;
      const emojiChanged = emoji !== this.props.emoji;
      const birthdayChanged = birthday !== this.props.birthday;

      // if value changed and is not empty, save new value, else remove value
      if (nameChanged && name !== '') await box.public.set('name', name);
      if (nameChanged && name === '') await box.public.remove('name');
      if (descriptionChanged && description !== '') await box.public.set('description', description);
      if (descriptionChanged && description === '') await box.public.remove('description');
      if (locationChanged && location !== '') await box.public.set('location', location);
      if (locationChanged && location === '') await box.public.remove('location');
      if (websiteChanged && website !== '') await box.public.set('website', website);
      if (websiteChanged && website === '') await box.public.remove('website');
      if (employerChanged && employer !== '') await box.public.set('employer', employer);
      if (employerChanged && employer === '') await box.public.remove('employer');
      if (jobChanged && job !== '') await box.public.set('job', job);
      if (jobChanged && job === '') await box.public.remove('job');
      if (schoolChanged && school !== '') await box.public.set('school', school);
      if (schoolChanged && school === '') await box.public.remove('school');
      if (degreeChanged && degree !== '') await box.public.set('degree', degree);
      if (degreeChanged && degree === '') await box.public.remove('degree');
      if (majorChanged && major !== '') await box.public.set('major', major);
      if (majorChanged && major === '') await box.public.remove('major');
      if (yearChanged && year !== '') await box.public.set('year', year);
      if (yearChanged && year === '') await box.public.remove('year');
      if (emojiChanged && emoji !== '') await box.public.set('emoji', emoji);
      if (emojiChanged && emoji === '') await box.public.remove('emoji');
      if (birthdayChanged && birthday !== '') await box.private.set('birthday', birthday);
      if (birthdayChanged && birthday === '') await box.private.remove('birthday');
      if (emailChanged && email !== '') await box.private.set('email', email);
      if (emailChanged && email === '') await box.private.remove('email');

      if (verifiedGithubChanged && verifiedGithub === '') await box.public.remove('proof_github');
      if (verifiedTwitterChanged && verifiedTwitter === '') await box.public.remove('proof_twitter');
      if (removeUserPic) await box.public.remove('image');
      if (removeCoverPic) await box.public.remove('coverPhoto');

      // save profile picture
      const fetch = editPic && await this.fetchPic(buffer);
      const returnedData = editPic && await fetch.json();
      if (editPic) await box.public.set('image', [{ '@type': 'ImageObject', contentUrl: { '/': returnedData.Hash } }]);

      const fetchCover = editCoverPic && await this.fetchPic(coverBuffer);
      const returnedCoverData = editCoverPic && await fetchCover.json();
      if (editCoverPic) await box.public.set('coverPhoto', [{ '@type': 'ImageObject', contentUrl: { '/': returnedCoverData.Hash } }]);

      // only get values that have changed
      if (verifiedGithubChanged) {
        store.dispatch({
          type: 'GET_VERIFIED_PUBLIC_GITHUB',
          verifiedGithub: null,
        });
      }
      if (verifiedTwitterChanged) {
        store.dispatch({
          type: 'GET_VERIFIED_PUBLIC_TWITTER',
          verifiedTwitter: null,
        });
      }
      if (nameChanged) await this.props.getProfileData('public', 'name'); // change these to just update the redux store
      if (descriptionChanged) await this.props.getProfileData('public', 'description');
      if (locationChanged) await this.props.getProfileData('public', 'location');
      if (websiteChanged) await this.props.getProfileData('public', 'website');
      if (employerChanged) await this.props.getProfileData('public', 'employer');
      if (jobChanged) await this.props.getProfileData('public', 'job');
      if (schoolChanged) await this.props.getProfileData('public', 'school');
      if (degreeChanged) await this.props.getProfileData('public', 'degree');
      if (majorChanged) await this.props.getProfileData('public', 'major');
      if (yearChanged) await this.props.getProfileData('public', 'year');
      if (emojiChanged) await this.props.getProfileData('public', 'emoji');
      if (removeUserPic || editPic) await this.props.getProfileData('public', 'image');
      if (removeCoverPic || editCoverPic) await this.props.getProfileData('public', 'coverPhoto');
      if (emailChanged) await this.props.getProfileData('private', 'email');
      if (birthdayChanged) await this.props.getProfileData('private', 'birthday');

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
    } = this.props;

    const {
      verifiedGithub,
      verifiedTwitter,
      verifiedEmail,
      email,
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
      isEmailVerified,
      githubVerifiedFailed,
      twitterVerifiedFailed,
      emailVerifiedFailed,
      githubEdited,
      twitterEdited,
      emailEdited,
      githubRemoved,
      twitterRemoved,
      emailRemoved,
      verificationLoading,
      emailVerificationMessage,
    } = this.state;

    const message = (`3Box is a social profiles network for web3. This post links my 3Box profile to my Github account!

    ✅ ${did} ✅

Create your profile today to start building social connection and trust online. https://3box.io/`);

    const twitterMessage = (`This tweet links my 3Box profile to my twitter account! %0D%0A%0D%0AJoin web3's social profiles network by creating your account on http://3box.io/ today. %0D%0A@3boxdb%0D%0A%0D%0A✅
    %0D%0A${did}
    %0D%0A✅`);

    return (
      <div id="edit__page">

        <Prompt
          when={!disableSave}
          message="Continue without saving changes to your profile?"
        />

        <Nav />

        {saveLoading
          && (
            <div className="container">
              <img src={Loading} alt="loading" />
            </div>
          )}

        {showFileSizeModal
          && <FileSizeModal show={showFileSizeModal} closeFileSizeModal={this.closeFileSizeModal} />}

        <GithubVerificationModal
          show={showGithubVerificationModal}
          copyToClipBoard={this.props.copyToClipBoard}
          did={did}
          message={message}
          verifyGithub={this.verifyGithub}
          isGithubVerified={isGithubVerified}
          verificationLoading={verificationLoading}
          githubVerifiedFailed={githubVerifiedFailed}
          resetVerification={this.resetVerification}
          copySuccessful={copySuccessful}
          handleGithubVerificationModal={this.props.handleGithubVerificationModal}
        />

        <TwitterVerificationModal
          show={showTwitterVerificationModal}
          verifyTwitter={this.verifyTwitter}
          did={did}
          message={twitterMessage}
          isTwitterVerified={isTwitterVerified}
          verificationLoading={verificationLoading}
          twitterVerifiedFailed={twitterVerifiedFailed}
          resetVerification={this.resetVerification}
          handleTwitterVerificationModal={this.props.handleTwitterVerificationModal}
        />

        <EmailVerificationModal
          show={showEmailVerificationModal}
          verifyEmail={this.verifyEmail}
          did={did}
          sendVerificationEmail={this.sendVerificationEmail}
          emailVerificationMessage={emailVerificationMessage}
          isEmailVerified={isEmailVerified}
          verificationLoading={verificationLoading}
          emailVerifiedFailed={emailVerifiedFailed}
          resetVerification={this.resetVerification}
          handleEmailVerificationModal={this.props.handleEmailVerificationModal}
        />

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
                {(((coverPhoto.length > 0 && coverPhoto[0].contentUrl) || (this.coverUpload && this.coverUpload.files && this.coverUpload.files[0])) && !removeCoverPic)
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
                      disabled={(image.length > 0 || (this.fileUpload && this.fileUpload.files && this.fileUpload.files[0])) ? false : true}
                      text="remove"
                      type="button"
                    >
                      &#10005;
                    </button>

                    {(((image.length > 0 && image[0].contentUrl) || (this.fileUpload && this.fileUpload.files && this.fileUpload.files[0])) && !removeUserPic)
                      ? (
                        <div className="profPic_div">
                          <div className="profPic_div_overlay">
                            <p>Change picture</p>
                          </div>
                          <img className="profPic clearProfPic" src={(this.fileUpload && this.fileUpload.files && this.fileUpload.files[0]) ? URL.createObjectURL(this.fileUpload.files[0]) : `https://ipfs.infura.io/ipfs/${image[0].contentUrl['/']}`} alt="profile" />
                        </div>)
                      : (
                        <div className="profPic_div">
                          <div className="profPic_div_overlay">
                            <p>Change picture</p>
                          </div>
                          <div className="profPic" />
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
                              <span className="edit__profile__value--spirit__character" role="img">
                                🦄
                            </span>)
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
                        <h5>Email Address</h5>
                      </div>
                      <div className="edit__profile__value--privateContainer">
                        <img id="edit__profile__input__privateIcon" src={Private} alt="Private" title="Information with this icon are accessible only by those you've given permission to." />
                        <input
                          name="email"
                          type="email"
                          className="edit__profile__value privateInput"
                          value={email}
                          onChange={e => this.handleFormChange(e, 'email')}
                        />
                      </div>
                    </div>

                    <div className="edit__profile__fields__entry">
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
                                this.props.getPublicDID();
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
                                this.props.getPublicDID();
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

                    <div className="edit__profile__fields__entry">
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
                            <input
                              name="verifiedEmail"
                              type="text"
                              className="edit__profile__value--github verifiedForm"
                              value={verifiedEmail}
                              onChange={e => this.handleFormChange(e, 'verifiedEmail')}
                            />
                            <button
                              type="button"
                              className={`unstyledButton ${!emailEdited && 'uneditedGithub'} verificationButton verifiedForm`}
                              disabled={!emailEdited}
                              onClick={() => {
                                this.props.handleEmailVerificationModal();
                                this.props.getPublicDID();
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
                  {(githubRemoved || twitterRemoved || emailRemoved)
                    && (
                      <p className="edit__profile__verifiedWrapper__warning">Save form to remove your verified accounts.</p>
                    )
                  }
                  {((!this.props.verifiedGithub && githubEdited && !isGithubVerified)
                    || (!this.props.verifiedTwitter && twitterEdited && !isTwitterVerified)
                    || (!this.props.verfiedEmail && emailEdited && !isEmailVerified))
                    && (
                      <p className={`edit__profile__verifiedWrapper__warning ${(githubRemoved || twitterRemoved || emailRemoved) && 'second'}`}>
                        Verification is required for your verified accounts to save.
                      </p>
                    )
                  }
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
                        type: 'GET_VERIFIED_PUBLIC_GITHUB',
                        verifiedGithub: null,
                      });
                    }
                    if (this.state.savedTwitter && verifiedTwitter !== '') {
                      this.props.box.public.remove('proof_twitter');
                      store.dispatch({
                        type: 'GET_VERIFIED_PUBLIC_TWITTER',
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
  name: PropTypes.string,
  verifiedGithub: PropTypes.string,
  verifiedTwitter: PropTypes.string,
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
  ifFetchingThreeBox: PropTypes.bool,
  showGithubVerificationModal: PropTypes.bool,
  showTwitterVerificationModal: PropTypes.bool,
  showEmailVerificationModal: PropTypes.bool,
  copySuccessful: PropTypes.bool,
  getProfileData: PropTypes.func.isRequired,
  getPublicDID: PropTypes.func.isRequired,
  getActivity: PropTypes.func.isRequired,
  handleGithubVerificationModal: PropTypes.func.isRequired,
  handleTwitterVerificationModal: PropTypes.func.isRequired,
  handleEmailVerificationModal: PropTypes.func.isRequired,
  copyToClipBoard: PropTypes.func.isRequired,
};

EditProfile.defaultProps = {
  box: {},
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
  ifFetchingThreeBox: false,
  showGithubVerificationModal: false,
  showTwitterVerificationModal: false,
  showEmailVerificationModal: false,
  copySuccessful: false,
};

function mapState(state) {
  return {
    box: state.threeBox.box,
    showGithubVerificationModal: state.threeBox.showGithubVerificationModal,
    showTwitterVerificationModal: state.threeBox.showTwitterVerificationModal,
    showEmailVerificationModal: state.threeBox.showEmailVerificationModal,
    name: state.threeBox.name,
    verifiedGithub: state.threeBox.verifiedGithub,
    verifiedTwitter: state.threeBox.verifiedTwitter,
    did: state.threeBox.did,
    description: state.threeBox.description,
    memberSince: state.threeBox.memberSince,
    location: state.threeBox.location,
    website: state.threeBox.website,
    birthday: state.threeBox.birthday,
    job: state.threeBox.job,
    school: state.threeBox.school,
    degree: state.threeBox.degree,
    major: state.threeBox.major,
    year: state.threeBox.year,
    emoji: state.threeBox.emoji,
    employer: state.threeBox.employer,
    email: state.threeBox.email,
    image: state.threeBox.image,
    coverPhoto: state.threeBox.coverPhoto,
    ifFetchingThreeBox: state.threeBox.ifFetchingThreeBox,
    copySuccessful: state.threeBox.copySuccessful,
    currentAddress: state.threeBox.currentAddress,
  };
}

export default withRouter(connect(mapState,
  {
    getProfileData,
    getPublicDID,
    getActivity,
    handleGithubVerificationModal,
    handleTwitterVerificationModal,
    handleEmailVerificationModal,
    copyToClipBoard,
  })(EditProfile));
