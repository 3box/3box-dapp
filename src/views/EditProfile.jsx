import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import IPFS from 'ipfs-mini';

import { address } from '../utils/address'
import { openBox, getPublicName, getPublicGithub, getPublicImage, getPrivateEmail } from '../state/actions';
import * as routes from '../utils/routes';
import EthereumLogo from '../assets/Ethereum_logo_2014.svg';
import Private from '../assets/Private.svg';
import AddImage from '../assets/AddImage.svg';
import Loading from '../assets/Loading.svg';
import './styles/EditProfile.css';
// import Footer from '../components/Footer';

const Buffer = require('buffer/').Buffer;
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      github: null,
      email: null,
      buffer: null,
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
    const formData = new window.FormData()
    formData.append('path', photoFile)
    this.setState({ buffer: formData, disableSave: false, editPic: true, removeUserPic: false });
    // const reader = new window.FileReader();
    // reader.readAsArrayBuffer(photoFile);
    // reader.onloadend = () => {
    //   this.setState({ buffer: Buffer.from(reader.result), disableSave: false, editPic: true, removeUserPic: false });
    // };
  }

  removePic = () => {
    this.setState({ disableSave: false, removeUserPic: true });
  }

  async handleSubmit(e) {
    const { name, github, email, removeUserPic, buffer, editPic } = this.state;
    const { history, threeBoxObject } = this.props;

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
    nameChanged && (name !== '' ? await threeBoxObject.public.set('name', name) : await threeBoxObject.public.remove('name'));
    githubChanged && (github !== '' ? await threeBoxObject.public.set('github', github) : await threeBoxObject.public.remove('github'));
    emailChanged && (email !== '' ? await threeBoxObject.private.set('email', email) : await threeBoxObject.private.remove('email'));
    removeUserPic && await threeBoxObject.public.remove('image');

    const fetch = editPic && await window.fetch('https://ipfs.infura.io:5001/api/v0/add', {
      method: 'post',
      'Content-Type': 'multipart/form-data',
      body: buffer
    })
    const returnedData = editPic && await fetch.json();
    const saved = editPic && await threeBoxObject.public.set('image', [{ '@type': 'ImageObject', contentUrl: { '/': returnedData.Hash } }]);

    // only get values that have changed
    nameChanged && await this.props.getPublicName();
    githubChanged && await this.props.getPublicGithub();
    emailChanged && await this.props.getPrivateEmail();
    (removeUserPic || editPic) && await this.props.getPublicImage();

    this.setState({ saveLoading: false });
    history.push(routes.PROFILE);
  }

  render() {
    const { image } = this.props;
    const { github, email, name, disableSave, removeUserPic, saveLoading, picUploaded, imageRemoved } = this.state;

    return (
      <div id="edit_page">

        {saveLoading
          && (
            <div className="container">
              <img src={Loading} alt="loading" id="loadingPic" />
            </div>
          )}

        <div id="breadCrumb">
          <div id="crumbs">
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

          <div id="edit_form">

            <div id="myProfile">
              <h4>My Profile</h4>
              <div id="myProfile_address">
                <img id="editprofile_networkLogo" src={EthereumLogo} alt="Ethereum Logo" />
                <p title={address}>{address && `${address.substring(0, 8)}...`}</p>
              </div>
            </div>

            <div id="edit_profile_content">
              <div id="public_contents">
                <div id="edit_user_picture">
                  <label htmlFor="fileInput" id="chooseFile">
                    <input id="fileInput" type="file" name="pic" className="light" accept="image/*" onChange={e => this.handleUpdatePic(e.target.files[0])} ref={ref => this.fileUpload = ref} />
                    <img src={AddImage} alt="profile" id="addImage" />
                    {((image.length > 0 || (this.fileUpload && this.fileUpload.files && this.fileUpload.files[0])) && !removeUserPic)
                      ? <div className="profPic_div">
                        <div className="profPic_div_overlay">
                          <p>Change picture</p>
                        </div>
                        <img src={(this.fileUpload && this.fileUpload.files && this.fileUpload.files[0]) ? URL.createObjectURL(this.fileUpload.files[0]) : `https://ipfs.infura.io/ipfs/${image[0].contentUrl['/']}`} alt="profile" className="profPic" />
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

                <div id="edit_user_public">

                  <h3>Name</h3>
                  <input
                    name="name"
                    type="text"
                    value={name}
                    onChange={e => this.handleFormChange(e, 'name')}
                  />

                  <div id="githubInfo">
                    <h3>Github</h3>
                    <input
                      name="github"
                      type="text"
                      value={github}
                      onChange={e => this.handleFormChange(e, 'github')}
                    />
                  </div>

                  <div id="privateInfo">
                    <div id="privateInfo_email">
                      <h3>Email Address</h3>
                      <img id="editprofile_privateIcon" src={Private} alt="Private" title="Information with this icon are accessible only by those you've given permission to." />
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
            <div id="formControls">
              <div id="formControls_content">
                <button type="submit" disabled={disableSave} onClick={e => this.handleSubmit(e)}>Save</button>
                <Link to="/Profile" className="subtext" id="edit_cancel">
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
  threeBoxObject: PropTypes.object,
  name: PropTypes.string,
  github: PropTypes.string,
  email: PropTypes.string,
  image: PropTypes.array,
  openBox: PropTypes.func,
  history: PropTypes.object,

  getPublicName: PropTypes.func,
  getPublicGithub: PropTypes.func,
  getPublicImage: PropTypes.func,
  getPrivateEmail: PropTypes.func,
};

EditProfile.defaultProps = {
  threeBoxObject: {},
  name: '',
  github: '',
  email: '',
  image: [],
  history: {},

  openBox: openBox(),
  getPublicName: getPublicName(),
  getPublicGithub: getPublicGithub(),
  getPublicImage: getPublicImage(),
  getPrivateEmail: getPrivateEmail(),
};

function mapState(state) {
  return {
    threeBoxObject: state.threeBoxData.threeBoxObject,
    name: state.threeBoxData.name,
    github: state.threeBoxData.github,
    email: state.threeBoxData.email,
    image: state.threeBoxData.image,
  };
}

export default withRouter(connect(mapState, { openBox, getPublicName, getPublicGithub, getPublicImage, getPrivateEmail })(EditProfile));


  // handleSubmitPic = (e) => {
  //   const { buffer } = this.state;
  //   const { threeBoxObject } = this.props;
  //   const { profileStore } = threeBoxObject;
  //   // const ipfs = ipfsAPI({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

  //   e.preventDefault();
  //   this.setState({ picLoading: true });
  //   // ipfs.files.add(buffer, (err, res) => {
  //   threeBoxObject.ipfs.files.add(buffer, (err, res) => {
  //     if (err) {
  //       console.error(err);
  //       return;
  //     }
  //     this.setState({ ipfsHash: res[0].hash });
  //     profileStore.set('image', [{ '@type': 'ImageObject', contentUrl: { '/': res[0].hash } }])
  //       .then(result => console.log(result))
  //       .then(() => {
  //         this.props.getPublicImage();
  //         this.setState({ picLoading: false, showPicModal: false });
  //       });
  //   });
  //   // }
  // }

  // handlePicModal = () => {
  //   const { showPicModal } = this.state;
  //   this.setState({ showPicModal: !showPicModal, disableSavePic: true });
  // }

  // removePic = () => {
  //   const { threeBoxObject } = this.props;
  //   const { profileStore } = threeBoxObject;
  //   this.setState({ picLoading: true });
  //   profileStore.remove('image')
  //     .then(() => {
  //       this.props.getPublicImage();
  //       this.setState({ picLoading: false, showPicModal: false });
  //     });
  // }

// {showPicModal
//   && (
//     <div className="container">
//       <div className="modal">
//         {(image.length > 0 || (this.fileUpload && this.fileUpload.files && this.fileUpload.files[0]))
//           ? <img src={(this.fileUpload && this.fileUpload.files && this.fileUpload.files[0]) ? URL.createObjectURL(this.fileUpload.files[0]) : `https://ipfs.io/ipfs/${image[0].contentUrl['/']}`} alt="profile" id="edit_modal_user_picture" />
//           : <div id="edit_modal_user_picture" />
//         }
//         {image.length > 0 && <button id="removePic" className="removeButton" onClick={this.removePic} text="remove" type="button">Remove</button>}

//         <p>Edit profile picture</p>
//         <form onSubmit={this.handleSubmitPic}>
//           <label htmlFor="fileInput" id="chooseFile">
//             <input id="fileInput" type="file" name="pic" className="light" accept="image/*" onChange={e => this.handleUpdatePic(e.target.files[0])} ref={ref => this.fileUpload = ref} />
//             {(this.fileUpload && this.fileUpload.files && this.fileUpload.files[0]) ? this.fileUpload.files[0].name : 'Choose a file'}
//           </label>
//           {!picUploaded && <button id="saveModal" type="submit" disabled={disableSavePic}> Save</button>}
//         </form>
//         <button onClick={(e) => { this.handlePicModal(e); this.setState({ picUploaded: false }) }} type="button" className="tertiaryButton" id="closeModal">
//           close
//         </button>
//       </div>
//     </div>)}

    // editPic && await threeBoxObject.ipfs.files.add(buffer, (err, res) => {
    //   if (err) {
    //     console.error(err);
    //     // add error handling
    //     return;
    //   }
    //   // this.setState({ ipfsHash: res[0].hash });
    //   threeBoxObject.public.set('image', [{ '@type': 'ImageObject', contentUrl: { '/': res[0].hash } }]);
    // });

        // editPic && await new Promise((resolve, reject) => {
    //   ipfs.add(buffer, (err, result) => {
    //     console.log(err, result);
    //     if (result) {
    //       threeBoxObject.public.set('image', [{ '@type': 'ImageObject', contentUrl: { '/': result } }]);
    //       resolve();
    //     } else {
    //       reject();
    //     }
    //   });
    // });