import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { getPublicName, getPublicGithub, getPublicImage, getPrivateEmail, getActivity } from "../state/actions";

import { address } from "../utils/address";
import { FileSizeModal } from "../components/Modals";
import history from "../history";
import Nav from "../components/Nav";
import * as routes from "../utils/routes";
import EthereumLogo from "../assets/Ethereum_logo_2014.svg";
import Private from "../assets/Private.svg";
import Verified from "../assets/CheckDecagram.svg";
import AddImage from "../assets/AddImage.svg";
import Loading from "../assets/Loading.svg";
import "./styles/EditProfile.css";
import VerifyGithubDialog from "../components/VerifyGithubDialog";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      github: "",
      email: "",
      buffer: "",
      disableSave: true,
      saveLoading: false,
      removeUserPic: false,
      editPic: false,
      showFileSizeModal: false,
      showVerifyGithubModal: false,
      verifyingGithub: false
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

  updateSaveButtonState = () => {
    const { name, github, email } = this.state;
    const nameChanged = name !== this.props.name;
    const githubChanged = github !== this.props.github;
    const emailChanged = email !== this.props.email;

    if (nameChanged || githubChanged || emailChanged) {
      this.setState({ disableSave: false });
    } else {
      this.setState({ disableSave: true });
    }
  };

  handleFormChange = (e, property) => {
    this.setState({ [property]: e.target.value, disableSave: false });
  };

  closeFileSizeModal = () => {
    this.setState({ showFileSizeModal: false });
  };

  handleUpdatePic = (photoFile, e) => {
    if (photoFile.size <= 2500000) {
      const formData = new window.FormData();
      formData.append("path", photoFile);
      this.setState({
        buffer: formData,
        disableSave: false,
        editPic: true,
        removeUserPic: false
      });
    } else {
      e.target.value = null;
      this.setState({ showFileSizeModal: true });
    }
  };

  removePic = () => {
    this.setState({ disableSave: false, removeUserPic: true });
  };

  async handleSubmit(e) {
    const { name, github, email, removeUserPic, buffer, editPic } = this.state;
    const { box } = this.props;

    if (box.public) {
      e.preventDefault();
      this.setState({ saveLoading: true });

      const nameChanged = name !== this.props.name;
      const githubChanged = github !== this.props.github;
      const emailChanged = email !== this.props.email;

      // if value changed and is not empty, save new value, else remove value
      if (nameChanged && name !== "") await box.public.set("name", name);
      if (nameChanged && name === "") await box.public.remove("name");
      if (githubChanged && github !== "") await box.public.set("github", github);
      if (githubChanged && github === "") {
        await box.public.remove("github");
        await box.public.remove("githubVerificationLink");
      }
      if (emailChanged && email !== "") await box.private.set("email", email);
      if (emailChanged && email === "") await box.private.remove("email");
      if (removeUserPic) await box.public.remove("image");

      // save profile picture
      const fetch =
        editPic &&
        (await window.fetch("https://ipfs.infura.io:5001/api/v0/add", {
          method: "post",
          "Content-Type": "multipart/form-data",
          body: buffer
        }));
      const returnedData = editPic && (await fetch.json());
      if (editPic) await box.public.set("image", [{ "@type": "ImageObject", contentUrl: { "/": returnedData.Hash } }]);

      // only get values that have changed
      if (nameChanged) await this.props.getPublicName();
      if (githubChanged) await this.props.getPublicGithub();
      if (emailChanged) await this.props.getPrivateEmail();
      if (removeUserPic || editPic) await this.props.getPublicImage();
      this.props.getActivity();

      this.setState({ saveLoading: false });
      history.push(routes.PROFILE);
    }
  }

  handleVerifyGithub = async e => {
    const { github } = this.state;
    const { box } = this.props;

    await box.public.set("github", github);
    await this.props.getPublicGithub();
    this.setState({ showVerifyGithubModal: true });
    this.updateSaveButtonState();
  };

  closeVerifyGithubModal = () => {
    this.setState({ showVerifyGithubModal: false });
  };

  render() {
    const { image, isGithubVerified } = this.props;

    const {
      github,
      email,
      name,
      disableSave,
      removeUserPic,
      saveLoading,
      showFileSizeModal,
      showVerifyGithubModal
    } = this.state;

    return (
      <div id="edit__page">
        <Nav />
        {saveLoading && (
          <div className="container">
            <img src={Loading} alt="loading" id="loadingPic" />
          </div>
        )}

        {showFileSizeModal && <FileSizeModal show={showFileSizeModal} closeFileSizeModal={this.closeFileSizeModal} />}

        {showVerifyGithubModal && (
          <VerifyGithubDialog show={showVerifyGithubModal} closeModal={this.closeVerifyGithubModal} />
        )}

        <div id="edit__breadCrumb">
          <div id="edit__breadCrumb__crumbs">
            <p className="light">Edit Profile</p>
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

            <div id="edit__myProfile">
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
                    <input
                      id="fileInput"
                      type="file"
                      name="pic"
                      className="light"
                      accept="image/*"
                      onChange={e => this.handleUpdatePic(e.target.files[0], e)}
                      ref={ref => (this.fileUpload = ref)}
                    />
                    <img src={AddImage} alt="profile" id="addImage" />

                    {((image.length > 0 && image[0].contentUrl) ||
                      (this.fileUpload && this.fileUpload.files && this.fileUpload.files[0])) &&
                    !removeUserPic ? (
                      <div className="profPic_div">
                        <div className="profPic_div_overlay">
                          <p>Change picture</p>
                        </div>
                        <img
                          className="profPic"
                          src={
                            this.fileUpload && this.fileUpload.files && this.fileUpload.files[0]
                              ? URL.createObjectURL(this.fileUpload.files[0])
                              : `https://ipfs.infura.io/ipfs/${image[0].contentUrl["/"]}`
                          }
                          alt="profile"
                        />
                      </div>
                    ) : (
                      <div className="profPic_div">
                        <div className="profPic_div_overlay">
                          <p>Change picture</p>
                        </div>
                        <div className="profPic" />
                      </div>
                    )}
                  </label>

                  <button
                    id="removePic"
                    className="removeButton"
                    onClick={this.removePic}
                    disabled={
                      image.length > 0 || (this.fileUpload && this.fileUpload.files && this.fileUpload.files[0])
                        ? false
                        : true
                    }
                    text="remove"
                    type="button"
                  >
                    Remove
                  </button>
                </div>

                <div id="edit__info">
                  <h3>Name</h3>
                  <input name="name" type="text" value={name} onChange={e => this.handleFormChange(e, "name")} />

                  <div id="edit__public__githubInfo">
                    <div id="edit__public__githubInfo__title">
                      <h3>Github</h3>
                      {isGithubVerified && (
                        <img
                          id="editprofile__verifiedIcon"
                          src={Verified}
                          alt="Verified"
                          title="Github account verified"
                        />
                      )}
                    </div>
                    <div className="input-group">
                      <div className="input-group-area">
                        <input
                          name="github"
                          type="text"
                          value={github}
                          onChange={e => {
                            this.handleFormChange(e, "github");
                            this.props.box.public.remove("githubVerificationLink");
                          }}
                        />
                      </div>
                      <div className="input-group-icon">
                        <button
                          disabled={github.trim() === "" || (github.trim() === this.props.github && isGithubVerified)}
                          onClick={this.handleVerifyGithub}
                        >
                          Verify
                        </button>
                      </div>
                    </div>
                    {/* {this.props.github && this.props.githubVerificationLink} */}
                    {/* <Link to="/Profile" className="subtext" id="edit__cancel" /> */}
                  </div>

                  <div id="edit__privateInfo">
                    <div id="privateInfo_email">
                      <h3>Email Address</h3>
                      <img
                        id="editprofile__privateIcon"
                        src={Private}
                        alt="Private"
                        title="Information with this icon are accessible only by those you've given permission to."
                      />
                    </div>
                    <input name="email" type="email" value={email} onChange={e => this.handleFormChange(e, "email")} />
                  </div>
                </div>
              </div>
            </div>
            <div id="edit__formControls">
              <div id="edit__formControls__content">
                <button type="submit" disabled={disableSave} onClick={e => this.handleSubmit(e)}>
                  Save
                </button>
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
  ifFetchingThreeBox: PropTypes.bool,

  getPublicName: PropTypes.func,
  getPublicGithub: PropTypes.func,
  getPublicImage: PropTypes.func,
  getPrivateEmail: PropTypes.func,
  getActivity: PropTypes.func
};

EditProfile.defaultProps = {
  box: {},
  name: "",
  github: "",
  email: "",
  image: [],
  ifFetchingThreeBox: false,

  getPublicName: getPublicName(),
  getPublicGithub: getPublicGithub(),
  getPublicImage: getPublicImage(),
  getPrivateEmail: getPrivateEmail(),
  getActivity: getActivity()
};

function mapState(state) {
  return {
    box: state.threeBox.box,
    name: state.threeBox.name,
    github: state.threeBox.github,
    githubVerificationLink: state.threeBox.githubVerificationLink,
    isGithubVerified: state.threeBox.isGithubVerified,
    email: state.threeBox.email,
    image: state.threeBox.image,
    accountAddress: state.threeBox.accountAddress,
    ifFetchingThreeBox: state.threeBox.ifFetchingThreeBox
  };
}

export default withRouter(
  connect(
    mapState,
    {
      getPublicName,
      getPublicGithub,
      getPublicImage,
      getPrivateEmail,
      getActivity
    }
  )(EditProfile)
);

// if value has changed, switch boolean to save to db
// let nameChanged = false;
// let githubChanged = false;
// let emailChanged = false;
// name === this.props.name ? nameChanged = false : nameChanged = true;
// github === this.props.github ? githubChanged = false : githubChanged = true;
// email === this.props.email ? emailChanged = false : emailChanged = true;
