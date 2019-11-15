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
import { copyToClipBoard, capitalizeFirst } from '../../../utils/funcs';
import {
  FileSizeModal,
  GithubVerificationModal,
  TwitterVerificationModal,
  EmailVerificationModal,
  ModalBackground,
} from '../../../components/Modals';
import '../styles/EditProfile.css';
import history from '../../../utils/history';
import { twitterMessage, githubMessage, editProfileFields, checkVerifiedFormatting } from './utils';
import Nav from '../../../components/Nav/Nav';
import * as routes from '../../../utils/routes';
import Private from '../../../assets/Private.svg';
import Verified from '../../../assets/Verified.svg';
import AddImage from '../../../assets/AddImage.svg';
import Loading from '../../../assets/Loading.svg';
import DefaultColorPic from '../../../assets/DefaultColorPic.svg';
import MyProfileHeaders from '../MyProfile/MyProfileHeaders';
import '../styles/EditProfile.css';

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
      this.setState({ [fieldSet[0]]: field });
    });
  }

  componentWillReceiveProps(nextProps) {
    editProfileFields.forEach((fieldSet) => {
      const isDifferent = nextProps[fieldSet[0]] !== this.props[fieldSet[0]];
      const field = nextProps[fieldSet[0]];
      if (isDifferent) this.setState({ [fieldSet[0]]: field });
    });
  }

  handleFormChange = (e, property) => {
    const { editedArray } = this.state;
    const fieldProp = this.props[property];
    const { value } = e.target;

    let editedField;
    if (property === 'verifiedGithub') editedField = 'github';
    if (property === 'verifiedTwitter') editedField = 'twitter';
    if (property === 'verifiedEmail') editedField = 'email';

    this.setState({ [property]: value },
      () => {
        if (property === 'emailCode') return;

        if (editedField) {
          if (this.state[property] === '') {
            this.setState({ [`${editedField}Edited`]: false });
          } else if (fieldProp !== this.state[property] && this.state[property] !== '') {
            const passesVerifiedCheck = checkVerifiedFormatting(value, editedField);
            this.setState({ [`${editedField}Edited`]: true });
            if (passesVerifiedCheck) {
              this.setState({
                [`${editedField}ErrorMessage`]: 'Verification is required for your verified accounts to save.',
                [`${editedField}InvalidFormat`]: false,
              });
            } else {
              const errorMsg = `${capitalizeFirst(editedField)} entry improperly formatted.`;
              this.setState({
                [`${editedField}InvalidFormat`]: true,
                [`${editedField}ErrorMessage`]: errorMsg,
              });
            }
          }
        } else {
          const updatedEditedArray = editedArray;
          if ((fieldProp !== this.state[property]) && updatedEditedArray.indexOf(property) === -1) updatedEditedArray.push(property);
          if (fieldProp === this.state[property]) updatedEditedArray.splice(updatedEditedArray.indexOf(property), 1);
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

    if (photoFile.size >= 2500000) {
      e.target.value = null;
      this.setState({ showFileSizeModal: true });
      return;
    }

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
  }

  removePicture = (type) => {
    const { editedArray } = this.state;
    const updatedEditedArray = editedArray;
    const editedItem = type === 'Cover' ? 'coverPhoto' : 'image';
    const isNotInArray = updatedEditedArray.indexOf(editedItem) === -1;
    const indexOfItem = updatedEditedArray.indexOf(editedItem);
    const isPropsExist = !!this.props[editedItem].length;

    if (isNotInArray && isPropsExist) updatedEditedArray.push(editedItem);
    if (!isPropsExist) updatedEditedArray.splice(indexOfItem, 1);

    const disableSave = !updatedEditedArray.length;
    this.setState({ [`remove${type}Pic`]: true, editedArray: updatedEditedArray, disableSave });
  }

  addEmoji = (emoji) => {
    this.setState({
      emoji: emoji.native,
      showEmoji: false,
      disableSave: false,
    });
  }

  verifyGithub = async () => {
    const { verifiedGithub, editedArray } = this.state;
    const { box, list, allData } = this.props;
    const updatedAllData = allData;
    const updatedEditedArray = editedArray;
    this.setState({ verificationLoading: true });

    const result = await fetch(`https://api.github.com/users/${verifiedGithub}/gists`);
    const returnedData = await result.json();
    if (returnedData.length) this.setState({ githubVerifiedFailed: true, verificationLoading: false });

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
        console.error(err);
        if (i === returnedData.length - 1) {
          this.setState({ githubVerifiedFailed: true, verificationLoading: false });
        }
      });
    });
  }

  handleVerifiedFields = (field, remove) => {
    const { editedArray } = this.state;
    const updatedEditedArray = editedArray;
    const fieldProp = this.props[field];

    let key;
    if (field === 'verifiedGithub') key = 'github';
    if (field === 'verifiedTwitter') key = 'twitter';
    if (field === 'verifiedEmail') key = 'email';

    const verifiedField = `proof_${key}`;
    const savedFieldKey = `saved${capitalizeFirst(key)}`;
    const removedKey = `${key}Removed`;
    const savedField = this.state[savedFieldKey];

    if (remove && fieldProp) {
      updatedEditedArray.push(verifiedField);
      this.setState({
        [field]: '',
        disableSave: false,
        [removedKey]: true,
        editedArray: updatedEditedArray,
      });
    } else {
      if (remove && savedField) this.setState({ [savedFieldKey]: false });
      updatedEditedArray.splice(updatedEditedArray.indexOf(verifiedField), 1);
      if (!updatedEditedArray.length) this.setState({ disableSave: true });
      this.setState({
        [field]: fieldProp,
        [removedKey]: false,
        editedArray: updatedEditedArray,
      });
    }
  }

  verifyTwitter = async () => {
    const { verifiedTwitter, editedArray } = this.state;
    const { box, did, list, allData } = this.props;
    const updatedAllData = allData;
    const updatedEditedArray = editedArray;
    this.setState({ verificationLoading: true });

    try {
      const response = await fetch('https://verifications.3box.io/twitter', {
        method: 'POST',
        body: JSON.stringify({
          did,
          twitter_handle: `${verifiedTwitter}`,
        }),
      });

      if (!response.ok) {
        this.setState({
          verificationLoading: false,
          twitterVerifiedFailed: true,
        });
        throw new Error('Verification failed');
      }

      const claim = await response.json();
      const twitterUsername = await box.verified.addTwitter(claim.data.verification);
      if (!twitterUsername) throw new Error('Verification failed');
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
    } catch (error) {
      this.setState({
        verificationLoading: false,
        twitterVerifiedFailed: true,
      });
      console.error(error);
    }
  }

  sendVerificationEmail = async (did) => {
    try {
      const { verifiedEmail } = this.state;
      const payload = {
        did,
        email_address: verifiedEmail,
      };
      this.setState({ isEmailSending: true });

      await fetch('https://verifications.3box.io/send-email-verification', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      this.setState({ emailVerificationMessage: 'Sent!', isEmailSending: false, disableSendVerificationEmail: true });
    } catch (error) {
      this.setState({ emailVerificationMessage: error.response, isEmailSending: false });
    }
  }

  verifyEmail = async () => {
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

    try {
      const jwt = await box._3id.signJWT(payload);
      const response = await fetch('https://verifications.3box.io/email-verify', {
        method: 'POST',
        body: JSON.stringify({
          verification: jwt,
        }),
      });
      if (!response.ok) throw new Error('Verification failed');
      const claim = await response.json();

      const verifiedEmail = await box.verified.addEmail(claim.data.verification);
      if (!verifiedEmail) throw new Error('Verification failed');

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
    } catch (error) {
      this.setState({
        verificationLoading: false,
        emailVerifiedFailed: true,
        emailVerificationErrMsg: 'Verification failed',
      });
    }
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
      name,
      verifiedGithub,
      verifiedTwitter,
      verifiedEmail,
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

    const { box, currentAddress, allData, list } = this.props;

    if (box.public) {
      e.preventDefault();
      const updatedAllData = allData;
      this.setState({ saveLoading: true });

      const nameChanged = name !== this.props.name;
      const verifiedGithubChanged = verifiedGithub !== this.props.verifiedGithub;
      const verifiedTwitterChanged = verifiedTwitter !== this.props.verifiedTwitter;
      const verifiedEmailChanged = verifiedEmail !== this.props.verifiedEmail;
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

      if (verifiedGithubChanged && verifiedGithub === '') await box.public.remove('proof_github');
      if (verifiedTwitterChanged && verifiedTwitter === '') await box.public.remove('proof_twitter');
      if (verifiedEmailChanged && verifiedEmail === '') await box.private.remove('proof_email');
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
          type: 'MY_VERIFIED_GITHUB_UPDATE',
          verifiedGithub: null,
        });
        delete updatedAllData['3Box_app'].public.verifiedGithub;
        store.dispatch({
          type: 'SPACES_DATA_UPDATE',
          list,
          allData: updatedAllData,
        });
      }
      if (verifiedTwitterChanged) {
        store.dispatch({
          type: 'MY_VERIFIED_TWITTER_UPDATE',
          verifiedTwitter: null,
        });
        delete updatedAllData['3Box_app'].public.verifiedTwitter;
        store.dispatch({
          type: 'SPACES_DATA_UPDATE',
          list,
          allData: updatedAllData,
        });
      }
      if (verifiedEmailChanged) {
        store.dispatch({
          type: 'MY_VERIFIED_EMAIL_UPDATE',
          verifiedEmail: null,
        });
        delete updatedAllData['3Box_app'].private.verifiedEmail;
        store.dispatch({
          type: 'SPACES_DATA_UPDATE',
          list,
          allData: updatedAllData,
        });
      }
      if (nameChanged) {
        const savedObject = await this.props.getMyProfileValue('public', 'name', true); // change these to just update the redux store

        if (savedObject) {
          updatedAllData['3Box_app'].public.name = savedObject;
        } else {
          delete updatedAllData['3Box_app'].public.name;
        }

        store.dispatch({
          type: 'SPACES_DATA_UPDATE',
          list,
          allData: updatedAllData,
        });
      }
      if (descriptionChanged) {
        const savedObject = await this.props.getMyProfileValue('public', 'description', true);

        if (savedObject) {
          updatedAllData['3Box_app'].public.description = savedObject;
        } else {
          delete updatedAllData['3Box_app'].public.description;
        }

        store.dispatch({
          type: 'SPACES_DATA_UPDATE',
          list,
          allData: updatedAllData,
        });
      }
      if (locationChanged) {
        const savedObject = await this.props.getMyProfileValue('public', 'location', true);

        if (savedObject) {
          updatedAllData['3Box_app'].public.location = savedObject;
        } else {
          delete updatedAllData['3Box_app'].public.location;
        }

        store.dispatch({
          type: 'SPACES_DATA_UPDATE',
          list,
          allData: updatedAllData,
        });
      }
      if (websiteChanged) {
        const savedObject = await this.props.getMyProfileValue('public', 'website', true);

        if (savedObject) {
          updatedAllData['3Box_app'].public.website = savedObject;
        } else {
          delete updatedAllData['3Box_app'].public.website;
        }

        store.dispatch({
          type: 'SPACES_DATA_UPDATE',
          list,
          allData: updatedAllData,
        });
      }
      if (employerChanged) {
        const savedObject = await this.props.getMyProfileValue('public', 'employer', true);

        if (savedObject) {
          updatedAllData['3Box_app'].public.employer = savedObject;
        } else {
          delete updatedAllData['3Box_app'].public.employer;
        }

        store.dispatch({
          type: 'SPACES_DATA_UPDATE',
          list,
          allData: updatedAllData,
        });
      }
      if (jobChanged) {
        const savedObject = await this.props.getMyProfileValue('public', 'job', true);

        if (savedObject) {
          updatedAllData['3Box_app'].public.job = savedObject;
        } else {
          delete updatedAllData['3Box_app'].public.job;
        }

        store.dispatch({
          type: 'SPACES_DATA_UPDATE',
          list,
          allData: updatedAllData,
        });
      }
      if (schoolChanged) {
        const savedObject = await this.props.getMyProfileValue('public', 'school', true);

        if (savedObject) {
          updatedAllData['3Box_app'].public.school = savedObject;
        } else {
          delete updatedAllData['3Box_app'].public.school;
        }

        store.dispatch({
          type: 'SPACES_DATA_UPDATE',
          list,
          allData: updatedAllData,
        });
      }
      if (degreeChanged) {
        const savedObject = await this.props.getMyProfileValue('public', 'degree', true);

        if (savedObject) {
          updatedAllData['3Box_app'].public.degree = savedObject;
        } else {
          delete updatedAllData['3Box_app'].public.degree;
        }

        store.dispatch({
          type: 'SPACES_DATA_UPDATE',
          list,
          allData: updatedAllData,
        });
      }
      if (majorChanged) {
        const savedObject = await this.props.getMyProfileValue('public', 'major', true);

        if (savedObject) {
          updatedAllData['3Box_app'].public.major = savedObject;
        } else {
          delete updatedAllData['3Box_app'].public.major;
        }

        store.dispatch({
          type: 'SPACES_DATA_UPDATE',
          list,
          allData: updatedAllData,
        });
      }
      if (yearChanged) {
        const savedObject = await this.props.getMyProfileValue('public', 'year', true);

        if (savedObject) {
          updatedAllData['3Box_app'].public.year = savedObject;
        } else {
          delete updatedAllData['3Box_app'].public.year;
        }
        store.dispatch({
          type: 'SPACES_DATA_UPDATE',
          list,
          allData: updatedAllData,
        });
      }
      if (emojiChanged) {
        const savedObject = await this.props.getMyProfileValue('public', 'emoji', true);

        if (savedObject) {
          updatedAllData['3Box_app'].public.emoji = savedObject;
        } else {
          delete updatedAllData['3Box_app'].public.emoji;
        }

        store.dispatch({
          type: 'SPACES_DATA_UPDATE',
          list,
          allData: updatedAllData,
        });
      }

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

      if (birthdayChanged) {
        const savedObject = await this.props.getMyProfileValue('private', 'birthday', true);

        if (savedObject) {
          updatedAllData['3Box_app'].private.birthday = savedObject;
        } else {
          delete updatedAllData['3Box_app'].private.birthday;
        }

        store.dispatch({
          type: 'SPACES_DATA_UPDATE',
          list,
          allData: updatedAllData,
        });
      }

      this.props.getActivity();

      this.setState({ saveLoading: false });
      history.push(`/${currentAddress}/${routes.directToHome()}`);
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
      twitterInvalidFormat,
      githubInvalidFormat,
      emailInvalidFormat,
      emailErrorMessage,
      githubErrorMessage,
      twitterErrorMessage,
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
                    />
                  )}

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
                        </div>
                      ) : (
                        <div className="profPic_div">
                          <div className="profPic_div_overlay">
                            <p>Change picture</p>
                          </div>
                          <img
                            className="profPic"
                            src={currentAddress ? makeBlockie(currentAddress) : DefaultColorPic}
                            alt="profile"
                          />
                        </div>
                      )}
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
                        <h5>Github.com/</h5>
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
                                  onClick={() => this.handleVerifiedFields('verifiedGithub', 'remove')}
                                >
                                  Remove
                                </button>
                              )
                              : (
                                <button
                                  type="button"
                                  className={`unstyledButton ${!githubEdited && 'uneditedGithub'}`}
                                  onClick={() => this.handleVerifiedFields('verifiedGithub')}
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
                              placeholder="username"
                              onChange={e => this.handleFormChange(e, 'verifiedGithub')}
                            />
                            <button
                              type="button"
                              className={`unstyledButton ${(!githubEdited || githubInvalidFormat) && 'uneditedGithub'} verificationButton verifiedForm`}
                              disabled={!githubEdited || githubInvalidFormat}
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
                        <h5>Twitter.com/</h5>
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
                                  onClick={() => this.handleVerifiedFields('verifiedTwitter', 'remove')}
                                >
                                  Remove
                                </button>
                              )
                              : (
                                <button
                                  type="button"
                                  className={`unstyledButton ${!twitterEdited && 'uneditedGithub'}`}
                                  onClick={() => this.handleVerifiedFields('verifiedTwitter')}
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
                              placeholder="username"
                              onChange={e => this.handleFormChange(e, 'verifiedTwitter')}
                            />
                            <button
                              type="button"
                              className={`unstyledButton ${(!twitterEdited || twitterInvalidFormat) && 'uneditedGithub'} verificationButton verifiedForm`}
                              disabled={!twitterEdited || twitterInvalidFormat}
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
                        {githubErrorMessage || twitterErrorMessage}
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
                                  onClick={() => this.handleVerifiedFields('verifiedEmail', 'remove')}
                                >
                                  Remove
                                </button>
                              )
                              : (
                                <button
                                  type="button"
                                  className={`unstyledButton ${!emailEdited && 'uneditedGithub'}`}
                                  onClick={() => this.handleVerifiedFields('verifiedEmail')}
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
                              className={`unstyledButton ${(!emailEdited || emailInvalidFormat) && 'uneditedGithub'} verificationButton verifiedForm`}
                              disabled={!emailEdited || emailInvalidFormat}
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
                        {emailErrorMessage}
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
                  to={`/${currentAddress}/${routes.directToHome()}`}
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