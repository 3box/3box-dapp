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
  getPublicName,
  getPublicGithub,
  getPublicDescription,
  getPublicLocation,
  getPublicWebsite,
  getPublicEmployer,
  getPublicJob,
  getPublicSchool,
  getPublicDegree,
  getPublicSubject,
  getPublicYear,
  getPublicImage,
  getPublicCoverPhoto,
  getPrivateEmail,
  getVerifiedPublicGithub,
  getPrivateBirthday,
  getPublicEmoji,
  getActivity,
  getPublicDID,
} from '../state/actions';

import { handleGithubVerificationModal } from '../state/actions-modals';

import { address } from '../utils/address';
import { FileSizeModal, GithubVerificationModal } from '../components/Modals';
import history from '../history';
import Nav from '../components/Nav.jsx';
import * as routes from '../utils/routes';
import Private from '../assets/Private.svg';
import AddImage from '../assets/AddImage.svg';
import Loading from '../assets/Loading.svg';
import './styles/EditProfile.css';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      // github: '',
      verifiedGithub: '',
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
      disableSave: true,
      saveLoading: false,
      removeUserPic: false,
      githubVerified: false,
      verificationLoading: false,
      githubVerifiedFailed: false,
      editPic: false,
      editCoverPic: false,
      showFileSizeModal: false,
      githubRemoved: false,
      githubEdited: false,
      showEmoji: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const {
      name,
      // github,
      verifiedGithub,
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
      // github,
      verifiedGithub,
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
      // github,
      verifiedGithub,
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
    // if (github !== this.props.github) this.setState({ github });
    if (verifiedGithub !== this.props.verifiedGithub) this.setState({ verifiedGithub });
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
    const { verifiedGithub } = this.props;

    if (property !== 'verifiedGithub') this.setState({ disableSave: false });

    this.setState({ [property]: e.target.value },
      () => {
        if (verifiedGithub !== this.state.verifiedGithub) {
          this.setState({ githubEdited: true });
        }
      });
  }

  closeFileSizeModal = () => {
    this.setState({ showFileSizeModal: false });
  }

  handleUpdatePic = (photoFile, e) => {
    if (photoFile.size <= 2500000) {
      const formData = new window.FormData();
      formData.append('path', photoFile);
      this.setState({
        buffer: formData,
        disableSave: false,
        editPic: true,
        removeUserPic: false,
      });
    } else {
      e.target.value = null;
      this.setState({ showFileSizeModal: true });
    }
  }

  handleUpdateCoverPic = (photoFile, e) => {
    if (photoFile.size <= 2500000) {
      const formData = new window.FormData();
      formData.append('path', photoFile);
      this.setState({
        coverBuffer: formData,
        disableSave: false,
        editCoverPic: true,
        removeCoverPic: false,
      });
    } else {
      e.target.value = null;
      this.setState({ showFileSizeModal: true });
    }
  }

  removePic = () => {
    this.setState({ disableSave: false, removeUserPic: true });
  }

  removeCoverPic = () => {
    this.setState({ disableSave: false, removeCoverPic: true });
  }

  copyToClipBoard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
    } catch (err) {
      console.error('Unable to copy', err);
    }

    document.body.removeChild(textArea);
  }

  addEmoji = (emoji) => {
    this.setState({
      emoji: emoji.native,
      showEmoji: false,
      disableSave: false,
    });
  }

  verifyGithub = () => {
    const { verifiedGithub } = this.state;
    const { box } = this.props;
    this.setState({ verificationLoading: true });

    fetch(`https://api.github.com/users/${verifiedGithub}/gists`)
      .then(response => response.json())
      .then((returnedData) => {
        if (returnedData.length) {
          returnedData.map((gist) => {
            const url = gist.files[Object.keys(gist.files)[0]].raw_url;
            return box.verified.addGithub(url).then((res) => {
              if (res === true) {
                console.log('Github username verified');
                this.setState({ githubVerified: true, verificationLoading: false });
                store.dispatch({
                  type: 'GET_VERIFIED_PUBLIC_GITHUB',
                  verifiedGithub,
                });
              } else {
                this.setState({ githubVerifiedFailed: true, verificationLoading: false });
              }
            });
          });
        }
      });
  }

  async handleSubmit(e) {
    const {
      name,
      // github,
      verifiedGithub,
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

    const { box } = this.props;

    if (box.public) {
      e.preventDefault();
      this.setState({ saveLoading: true });

      const nameChanged = name !== this.props.name;
      const verifiedGithubChanged = verifiedGithub !== this.props.verifiedGithub;
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

      // if (githubChanged && github !== '') await box.public.set('github', github);
      if (verifiedGithubChanged && verifiedGithub === '') await box.public.remove('proof_github');

      if (emailChanged && email !== '') await box.private.set('email', email);
      if (emailChanged && email === '') await box.private.remove('email');
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
      if (removeUserPic) await box.public.remove('image');
      if (removeCoverPic) await box.public.remove('coverPhoto');

      // save profile picture
      const fetch = editPic && await window.fetch('https://ipfs.infura.io:5001/api/v0/add', {
        method: 'post',
        'Content-Type': 'multipart/form-data',
        body: buffer,
      });
      const returnedData = editPic && await fetch.json();
      if (editPic) await box.public.set('image', [{ '@type': 'ImageObject', contentUrl: { '/': returnedData.Hash } }]);

      const fetchCover = editCoverPic && await window.fetch('https://ipfs.infura.io:5001/api/v0/add', {
        method: 'post',
        'Content-Type': 'multipart/form-data',
        body: coverBuffer,
      });
      const returnedCoverData = editCoverPic && await fetchCover.json();
      if (editCoverPic) await box.public.set('coverPhoto', [{ '@type': 'ImageObject', contentUrl: { '/': returnedCoverData.Hash } }]);

      // only get values that have changed
      if (nameChanged) await this.props.getPublicName();
      // if (githubChanged) await this.props.getPublicGithub();
      if (verifiedGithubChanged) {
        store.dispatch({
          type: 'GET_VERIFIED_PUBLIC_GITHUB',
          verifiedGithub: null,
        });
      }
      if (emailChanged) await this.props.getPrivateEmail();
      if (descriptionChanged) await this.props.getPublicDescription();
      if (locationChanged) await this.props.getPublicLocation();
      if (websiteChanged) await this.props.getPublicWebsite();
      if (employerChanged) await this.props.getPublicEmployer();
      if (jobChanged) await this.props.getPublicJob();
      if (schoolChanged) await this.props.getPublicSchool();
      if (degreeChanged) await this.props.getPublicDegree();
      if (majorChanged) await this.props.getPublicSubject();
      if (yearChanged) await this.props.getPublicYear();
      if (emojiChanged) await this.props.getPublicEmoji();
      if (birthdayChanged) await this.props.getPrivateBirthday();
      if (removeUserPic || editPic) await this.props.getPublicImage();
      if (removeCoverPic || editCoverPic) await this.props.getPublicCoverPhoto();
      this.props.getActivity();

      this.setState({ saveLoading: false });
      history.push(routes.PROFILE);
    }
  }

  render() {
    const { image, coverPhoto, memberSince, showGithubVerificationModal, did } = this.props;
    const {
      // github,
      verifiedGithub,
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
      githubVerified,
      githubVerifiedFailed,
      githubEdited,
      githubRemoved,
      verificationLoading,
    } = this.state;

    const message = (`3Box is a social profiles network for web3. This post links my 3Box profile to my Github account!

    ✅ ${did} ✅
    
    Create your profile today to start building social connection and trust online. https://3box.io/`)

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
          copyToClipBoard={this.copyToClipBoard}
          did={did}
          message={message}
          verifyGithub={this.verifyGithub}
          githubVerified={githubVerified}
          verificationLoading={verificationLoading}
          githubVerifiedFailed={githubVerifiedFailed}
          handleGithubVerificationModal={this.props.handleGithubVerificationModal}
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
                    onClick={this.removeCoverPic}
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
                      onChange={e => this.handleUpdateCoverPic(e.target.files[0], e)}
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
                      onClick={this.removePic}
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
                <p title={address} className="edit__profile__address">{address && `${address.substring(0, 8)}...`}</p>
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
                <div className="edit__profile__categories">
                  <h3>Connect your accounts</h3>
                  <p>Connect your existing social accounts to build a stronger reputation.</p>
                </div>
                <div id="edit__profile__fields">
                  <div id="edit__info">

                    <div className="edit__profile__fields__entry noMargin">
                      <div className="edit__profile__keyContainer">
                        <h5>Github</h5>
                      </div>
                      {this.props.verifiedGithub
                        ? (
                          <div className="edit__profile__verifiedWrapper">
                            <p>{verifiedGithub}</p>

                            {!githubRemoved
                              ? (<button
                                type="button"
                                className={`unstyledButton ${!githubEdited && 'uneditedGithub'}`}
                                onClick={() => {
                                  this.setState({ verifiedGithub: '', disableSave: false, githubRemoved: true });
                                }}
                              >
                                Remove
                            </button>)
                              : (<button
                                type="button"
                                className={`unstyledButton ${!githubEdited && 'uneditedGithub'}`}
                                onClick={() => {
                                  this.setState({ verifiedGithub: this.props.verifiedGithub, disableSave: true, githubRemoved: false });
                                }}
                              >
                                Cancel
                            </button>
                              )}
                          </div>
                        )
                        : (
                          <div className="edit__profile__verifiedWrapper">
                            <input
                              name="verifiedGithub"
                              type="text"
                              className="edit__profile__value--github"
                              value={verifiedGithub}
                              onChange={e => this.handleFormChange(e, 'verifiedGithub')}
                            />
                            <button
                              type="button"
                              className={`unstyledButton ${!githubEdited && 'uneditedGithub'}`}
                              disabled={!githubEdited}
                              onClick={() => {
                                this.props.getPublicDID();
                                this.props.handleGithubVerificationModal();
                              }}
                            >
                              Verify
                            </button>
                          </div>
                        )}
                    </div>

                  </div>
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
                <button type="submit" disabled={disableSave} onClick={e => this.setState({ disableSave: true }, () => this.handleSubmit(e))}>Save</button>
                <Link to={routes.PROFILE} className="subtext" id="edit__cancel">
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
  // github: PropTypes.string,
  verifiedGithub: PropTypes.string,
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
  image: PropTypes.array,
  coverPhoto: PropTypes.array,
  ifFetchingThreeBox: PropTypes.bool,
  showGithubVerificationModal: PropTypes.bool,

  getPublicName: PropTypes.func,
  getPublicGithub: PropTypes.func,
  getPublicImage: PropTypes.func,
  getPublicCoverPhoto: PropTypes.func,
  getPrivateEmail: PropTypes.func,
  getVerifiedPublicGithub: PropTypes.func,
  getPrivateBirthday: PropTypes.func,
  getPublicEmoji: PropTypes.func,
  getPublicWebsite: PropTypes.func,
  getPublicEmployer: PropTypes.func,
  getPublicJob: PropTypes.func,
  getPublicSchool: PropTypes.func,
  getPublicDegree: PropTypes.func,
  getPublicSubject: PropTypes.func,
  getPublicYear: PropTypes.func,
  getPublicLocation: PropTypes.func,
  getPublicDescription: PropTypes.func,
  getActivity: PropTypes.func,
  getPublicDID: PropTypes.func,

  handleGithubVerificationModal: PropTypes.func,
};

EditProfile.defaultProps = {
  box: {},
  name: '',
  // github: '',
  verifiedGithub: '',
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
  image: [],
  coverPhoto: [],
  ifFetchingThreeBox: false,
  showGithubVerificationModal: false,

  getPublicName: getPublicName(),
  getPublicGithub: getPublicGithub(),
  getPublicDescription: getPublicDescription(),
  getPublicLocation: getPublicLocation(),
  getPublicWebsite: getPublicWebsite(),
  getPublicEmployer: getPublicEmployer(),
  getPublicJob: getPublicJob(),
  getPublicSchool: getPublicSchool(),
  getPublicDegree: getPublicDegree(),
  getPublicSubject: getPublicSubject(),
  getPublicYear: getPublicYear(),
  getPublicImage: getPublicImage(),
  getPublicCoverPhoto: getPublicCoverPhoto(),
  getPrivateEmail: getPrivateEmail(),
  getVerifiedPublicGithub: getVerifiedPublicGithub(),
  getPrivateBirthday: getPrivateBirthday(),
  getPublicEmoji: getPublicEmoji(),
  getActivity: getActivity(),
  getPublicDID: getPublicDID(),
  handleGithubVerificationModal: handleGithubVerificationModal(),
};

function mapState(state) {
  return {
    box: state.threeBox.box,
    showGithubVerificationModal: state.threeBox.showGithubVerificationModal,
    name: state.threeBox.name,
    // github: state.threeBox.github,
    verifiedGithub: state.threeBox.verifiedGithub,
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
  };
}

export default withRouter(connect(mapState,
  {
    getPublicName,
    getPublicGithub,
    getPublicDescription,
    getPublicLocation,
    getPublicWebsite,
    getPublicEmployer,
    getPublicJob,
    getPublicSchool,
    getPublicDegree,
    getPublicSubject,
    getPublicYear,
    getPublicImage,
    getPublicCoverPhoto,
    getPrivateEmail,
    getVerifiedPublicGithub,
    getPrivateBirthday,
    getPublicEmoji,
    getActivity,
    getPublicDID,
    handleGithubVerificationModal,
  })(EditProfile));
