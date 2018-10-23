import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { address } from '../utils/address'
import { openBox, getPublicName, getPublicGithub, getPublicImage, getPrivateEmail, getActivity } from '../state/actions';
import history from '../history';
import Nav from '../components/Nav';
import * as routes from '../utils/routes';
import EthereumLogo from '../assets/Ethereum_logo_2014.svg';
import Private from '../assets/Private.svg';
import AddImage from '../assets/AddImage.svg';
import Loading from '../assets/Loading.svg';
import './styles/EditProfile.css';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      github: '',
      email: '',
      buffer: '',
      disableSave: true,
      disableSavePic: true,
      saveLoading: false,
      removeUserPic: false,
      editPic: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { name, github, email } = this.props;
    this.setState({ name, github, email });
  }

  componentWillReceiveProps(props) {
    const { name, github, email } = props;
    this.setState({ name, github, email });
  }

  handleFormChange = (e, property) => {
    this.setState({ [property]: e.target.value, disableSave: false });
  }

  handleUpdatePic = (photoFile) => {
    const formData = new window.FormData();
    formData.append('path', photoFile);
    this.setState({ buffer: formData, disableSave: false, editPic: true, removeUserPic: false });
  }

  removePic = () => {
    this.setState({ disableSave: false, removeUserPic: true });
  }

  async handleSubmit(e) {
    const { name, github, email, removeUserPic, buffer, editPic } = this.state;
    const { box } = this.props;

    if (box.public) {
      // start loading animation
      e.preventDefault();
      this.setState({ saveLoading: true });

      // if value has changed, switch boolean to save to db
      let nameChanged = false;
      let githubChanged = false;
      let emailChanged = false;
      name === this.props.name ? nameChanged = false : nameChanged = true;
      github === this.props.github ? githubChanged = false : githubChanged = true;
      email === this.props.email ? emailChanged = false : emailChanged = true;

      // if value changed and is not empty, save new value, else remove value
      nameChanged && (name !== '' ? await box.public.set('name', name) : await box.public.remove('name'));
      githubChanged && (github !== '' ? await box.public.set('github', github) : await box.public.remove('github'));
      emailChanged && (email !== '' ? await box.private.set('email', email) : await box.private.remove('email'));
      removeUserPic && await box.public.remove('image');

      const fetch = editPic && await window.fetch('https://ipfs.infura.io:5001/api/v0/add', {
        method: 'post',
        'Content-Type': 'multipart/form-data',
        body: buffer
      })
      const returnedData = editPic && await fetch.json();
      editPic && await box.public.set('image', [{ '@type': 'ImageObject', contentUrl: { '/': returnedData.Hash } }]);

      // only get values that have changed
      nameChanged && await this.props.getPublicName();
      githubChanged && await this.props.getPublicGithub();
      emailChanged && await this.props.getPrivateEmail();
      (removeUserPic || editPic) && await this.props.getPublicImage();

      this.props.getActivity();
      this.setState({ saveLoading: false });
      history.push(routes.PROFILE);
    }
  }

  render() {
    const { image, ifFetchingThreeBox, box } = this.props;
    const { github, email, name, disableSave, removeUserPic, saveLoading } = this.state;

    return (
      <div id="edit__page">
        <Nav />
        {saveLoading
          && (
            <div className="container">
              <img src={Loading} alt="loading" id="loadingPic" />
            </div>
          )}

        <div id="edit__breadCrumb">
          <div id="edit__breadCrumb__crumbs">
            <Link to="/Profile">
              <p className="lighter">
                Profile
            </p>
            </Link>
            <p className="lighter">
              >
            </p>
            <p className="light">
              Edit Profile
            </p>
          </div>
        </div>

        <div id="edit">

          <div id="edit__form">

            {/* {ifFetchingThreeBox
              && (
                <div className="loadingProfile">
                  <img src={Loading} alt="loading" id="loadingProfile__Spinner" />
                </div>
              )} */}

            <div id="myProfile">
              <h4>My Profile</h4>
              <div id="myProfile__address">
                <img id="editprofile__networkLogo" src={EthereumLogo} alt="Ethereum Logo" />
                <p title={address}>{address && `${address.substring(0, 8)}...`}</p>
              </div>
            </div>

            <div id="edit__profile">
              <div id="public__contents">
                <div id="edit__userPicture">
                  <label htmlFor="fileInput" id="chooseFile">
                    <input id="fileInput" type="file" name="pic" className="light" accept="image/*" onChange={e => this.handleUpdatePic(e.target.files[0])} ref={ref => this.fileUpload = ref} />
                    <img src={AddImage} alt="profile" id="addImage" />
                    {(((image.length > 0 && image[0].contentUrl) || (this.fileUpload && this.fileUpload.files && this.fileUpload.files[0])) && !removeUserPic)
                      ? <div className="profPic_div">
                        <div className="profPic_div_overlay">
                          <p>Change picture</p>
                        </div>
                        <img className="profPic" src={(this.fileUpload && this.fileUpload.files && this.fileUpload.files[0]) ? URL.createObjectURL(this.fileUpload.files[0]) : `https://ipfs.infura.io/ipfs/${image[0].contentUrl['/']}`} alt="profile" />
                      </div>
                      : <div className="profPic_div">
                        <div className="profPic_div_overlay">
                          <p>Change picture</p>
                        </div>
                        <div className="profPic" />
                      </div>}
                  </label>

                  <button
                    id="removePic"
                    className="removeButton"
                    onClick={this.removePic}
                    disabled={(image.length > 0 || (this.fileUpload && this.fileUpload.files && this.fileUpload.files[0])) ? false : true}
                    text="remove"
                    type="button">Remove</button>
                </div>

                <div id="edit__info">

                  <h3>Name</h3>
                  <input
                    name="name"
                    type="text"
                    value={name}
                    onChange={e => this.handleFormChange(e, 'name')}
                  />

                  <div id="edit__public__githubInfo">
                    <h3>Github</h3>
                    <input
                      name="github"
                      type="text"
                      value={github}
                      onChange={e => this.handleFormChange(e, 'github')}
                    />
                  </div>

                  <div id="edit__privateInfo">
                    <div id="privateInfo_email">
                      <h3>Email Address</h3>
                      <img id="editprofile__privateIcon" src={Private} alt="Private" title="Information with this icon are accessible only by those you've given permission to." />
                    </div>
                    <input
                      name="email"
                      type="email"
                      value={email}
                      onChange={e => this.handleFormChange(e, 'email')}
                    />
                  </div>

                </div>
              </div>

            </div>
            <div id="edit__formControls">
              <div id="edit__formControls__content">
                <button type="submit" disabled={disableSave} onClick={e => this.handleSubmit(e)}>Save</button>
                <Link to="/Profile" className="subtext" id="edit__cancel">
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditProfile.propTypes = {
  box: PropTypes.object,
  name: PropTypes.string,
  github: PropTypes.string,
  email: PropTypes.string,
  image: PropTypes.array,
  openBox: PropTypes.func,
  ifFetchingThreeBox: PropTypes.bool,

  getPublicName: PropTypes.func,
  getPublicGithub: PropTypes.func,
  getPublicImage: PropTypes.func,
  getPrivateEmail: PropTypes.func,
  getActivity: PropTypes.func,
};

EditProfile.defaultProps = {
  box: {},
  name: '',
  github: '',
  email: '',
  image: [],
  ifFetchingThreeBox: false,

  openBox: openBox(),
  getPublicName: getPublicName(),
  getPublicGithub: getPublicGithub(),
  getPublicImage: getPublicImage(),
  getPrivateEmail: getPrivateEmail(),
  getActivity: getActivity(),
};

function mapState(state) {
  return {
    box: state.threeBox.box,
    name: state.threeBox.name,
    github: state.threeBox.github,
    email: state.threeBox.email,
    image: state.threeBox.image,
    ifFetchingThreeBox: state.threeBox.ifFetchingThreeBox,
  };
}

export default withRouter(connect(mapState, { openBox, getPublicName, getPublicGithub, getPublicImage, getPrivateEmail, getActivity })(EditProfile));
