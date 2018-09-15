import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import ipfsAPI from 'ipfs-api';
import PropTypes from 'prop-types';
// import Buffer from 'buffer/'.Buffer;
// import { bindActionCreators } from 'redux';

import { openBox, getPublicName, getPublicGithub, getPublicImage, getPrivateEmail } from '../state/actions';
import * as routes from '../utils/routes';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Loading from '../assets/Loading.svg';
import './styles/EditProfile.css';
// import { getIsFetching } from '../state/'

const Buffer = require('buffer/').Buffer;

class EditProfile extends Component {
  constructor(props) {
    super(props);
    const { name, github, email } = this.props;
    this.state = {
      name: name || '',
      github: github || '',
      email: email || '',
      buffer: null,
      showPicModal: false,
      disableSave: true,
      disableSavePic: true,
      picLoading: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(props) {
    const { name, github } = props;
    this.setState({ name, github });
  }

  handleFormChange = (e, property) => {
    this.setState({ [property]: e.target.value, disableSave: false });
  }

  handleUpdatePic = (photoFile) => {
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(photoFile);
    reader.onloadend = () => {
      this.setState({ buffer: Buffer.from(reader.result), disableSavePic: false });
    };
  }

  handleSubmitPic = (e) => {
    const { buffer } = this.state;
    const { threeBoxObject } = this.props;
    const { profileStore } = threeBoxObject;
    const ipfs = ipfsAPI({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

    e.preventDefault();

    this.setState({ picLoading: true });

    ipfs.files.add(buffer, (err, res) => {
      if (err) {
        console.error(err);
        return;
      }
      this.setState({ ipfsHash: res[0].hash });
      profileStore.set('image', [{ '@type': 'ImageObject', contentUrl: { '/': res[0].hash } }])
        .then(result => console.log(result))
        .then(() => {
          this.props.getPublicImage();
          this.setState({ picLoading: false, showPicModal: false });
        });
    });
  }

  handlePicModal = () => {
    const { showPicModal } = this.state;
    this.setState({ showPicModal: !showPicModal, disableSavePic: true });
  }

  removeStore = (key, method) => {
    const { threeBoxObject } = this.props;
    const { profileStore, privateStore } = threeBoxObject;

    if (method === 'profileStore') {
      profileStore.remove(key)
        .then(() => this.props.openBox());
    } else {
      privateStore.remove(key)
        .then(() => this.props.openBox());
    }
  }

  removePic = () => {
    const { threeBoxObject } = this.props;
    const { profileStore } = threeBoxObject;
    this.setState({ picLoading: true });
    profileStore.remove('image')
      .then(() => {
        this.props.openBox();
        this.setState({ picLoading: false, showPicModal: false });
      });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { name, github, email } = this.state;
    const { history, threeBoxObject } = this.props;
    const { profileStore, privateStore } = threeBoxObject;

    name && await profileStore.set('name', name);
    github && await profileStore.set('github', github)
    email && await privateStore.set('email', email)
    name && await this.props.getPublicName();
    github && await this.props.getPublicGithub();
    email && await this.props.getPrivateEmail();
    history.push(routes.PROFILE);
  }

  render() {
    const {
      image,
    } = this.props;
    const { showPicModal, name, github, email, disableSave, disableSavePic, picLoading } = this.state;

    const address = web3.eth.accounts[0]; // eslint-disable-line no-undef

    console.log(this.props);
    console.log(this.state);
    console.log(this.fileUpload && this.fileUpload.files);

    return (
      <div>
        {showPicModal
          && (
            <div className="container">
              <div className="modal">
                {/* {
                  picLoading && (
                    <img src={Loading} alt="loading" id="loadingPic" />
                  )
                } */}
                <img src={picLoading ? Loading : image.length > 0 ? `https://ipfs.io/ipfs/${image[0].contentUrl['/']}` : undefined} id="edit_modal_user_picture" alt="profile" />
                {image.length > 0 && <button type="button" onClick={this.removePic} id="removePic">X</button>}

                <p>Edit profile picture</p>
                <form onSubmit={this.handleSubmitPic}>
                  <label htmlFor="fileInput" id="chooseFile">
                    <input id="fileInput" type="file" name="pic" className="light" accept="image/*" onChange={e => this.handleUpdatePic(e.target.files[0])} ref={ref => this.fileUpload = ref} />
                    {(this.fileUpload && this.fileUpload.files && this.fileUpload.files[0]) ? this.fileUpload.files[0].name : 'Choose a file'}
                  </label>
                  <button id="saveModal" type="submit" disabled={disableSavePic}> Save</button>
                </form>
                <button onClick={e => this.handlePicModal(e)} type="button" className="secondaryButton" id="closeModal">close</button>
              </div>
            </div>)}

        {/* {isFetching
          && (
            <
            )
        } */}

        <Nav />
        <div id="edit">
          <Link to="/Profile">
            <div id="goBack">
              &larr; Go back to profile
            </div>
          </Link>
          <p className="header">Edit Profile</p>

          <div id="edit_user_picture_edit">
            <img src={image.length > 0 ? `https://ipfs.io/ipfs/${image[0].contentUrl['/']}` : undefined} id="edit_user_picture" alt="profile" />
            <button onClick={this.handlePicModal} type="button">Edit photo</button>
          </div>

          <form onSubmit={e => this.handleSubmit(e)}>

            <div id="edit_field">

              <p className="subheader">PUBLIC</p>
              <p className="subtext">This information is public for all to see.</p>

              <div className="edit_form">

                <h3>Ethereum Address</h3>
                <p>{address}</p>

                <div className="edit_form_spacing" />

                <h3>Name</h3>
                <input
                  name="name"
                  type="text"
                  value={name}
                  onChange={e => this.handleFormChange(e, 'name')}
                />
                <button type="button" onClick={() => this.removeStore('name', 'profileStore')}>X</button>

                <div className="edit_form_spacing" />

                <h3>Github</h3>
                <input
                  name="github"
                  type="text"
                  value={github}
                  onChange={e => this.handleFormChange(e, 'github')}
                />
                <button type="button" onClick={() => this.removeStore('github', 'profileStore')}>X</button>

              </div>

              <p className="subheader">PRIVATE</p>
              <p className="subtext">This information is accessible only by those with permission.</p>

              <div className="edit_form">
                <h3>Email Address</h3>
                <input
                  name="email"
                  type="email"
                  value={email}
                  onChange={e => this.handleFormChange(e, 'email')}
                />
                <button type="button" onClick={() => this.removeStore('email', 'privateStore')}>X</button>

              </div>

            </div>

            <button type="submit" disabled={disableSave}>Save</button>
            <Link to="/Profile" className="subtext" id="edit_cancel">
              Cancel
            </Link>
          </form>
        </div>
        <Footer />
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
    // isFetching: getIsFetching(state),
  };
}

// function mapDispatch(dispatch) {
// return bindActionCreators({ updateUser }, dispatch);
// }

export default withRouter(connect(mapState, { openBox, getPublicName, getPublicGithub, getPublicImage, getPrivateEmail })(EditProfile));


// if (name && github) {
//   profileStore.set('name', name)
//     .then(() => profileStore.set('github', github))
//     .then(() => this.props.openBox())
//     .then(() => history.push(routes.PROFILE));
// } else if (name) {
//   profileStore.set('name', name)
//     .then(() => this.props.openBox())
//     .then(() => history.push(routes.PROFILE));
// } else if (github) {
//   profileStore.set('github', github)
//     .then(() => this.props.openBox())
//     .then(() => history.push(routes.PROFILE));
// }