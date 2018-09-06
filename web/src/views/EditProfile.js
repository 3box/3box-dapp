import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileStore from '3box';
import { bindActionCreators } from 'redux';

import Form from '../components/Form';
import { updateUser } from '../state/actions';

import Michael from '../assets/me.jpg';
import './styles/EditProfile.css';

// add info to private and public store
// profileStore.set(key, value) ⇒ Boolean
// profileStore.remove(key) ⇒ Boolean
// profileStore.get(key) ⇒ String
// privateStore.set(key, value) ⇒ Boolean
// privateStore.remove(key) ⇒ Boolean

class EditProfile extends React.Component {
  componentDidMount() {
    // profileStore.get();
  }

  // setProfile = () => {
  //   profileStore.set(key, value).then(response => console.log(response));
  // }

  // handleLinkDescription = (e) => {
  //   const name = e.target.value;
  //   this.setState({ name });
  // }

  // handleGithubChange = (e) => {
  //   const name = e.target.value;
  //   this.setState({ name });
  // }

  // getProfileData = () => {
  // }

  submit = (values) => {
    console.log(values);
  }

  render() {
    const { name, github, handleSubmit } = this.props;

    return (
      <div id="edit">
        <p className="header">Edit Profile</p>

        <div id="edit_user_picture_edit">
          <img src={Michael} id="edit_user_picture" alt="profile" />
          <p>Edit</p>
        </div>

        <Form onSubmit={this.submit} />

      </div>
    );
  }
}

EditProfile.propTypes = {
  name: PropTypes.string,
  github: PropTypes.string,
  handleSubmit: PropTypes.string,
};

EditProfile.defaultProps = {
  name: null,
  github: null,
  handleSubmit: PropTypes.string,
};

function mapState(state) {
  return {
    web3: state.web3.web3,
  };
}

function mapDispatch(dispatch) {
  return bindActionCreators({ updateUser }, dispatch);
}

export default connect(mapState, mapDispatch)(EditProfile);