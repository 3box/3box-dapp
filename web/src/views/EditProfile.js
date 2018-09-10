import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
// import ProfileStore from '3box';

import Nav from '../components/Nav';
import Footer from '../components/Footer';
// import { updateUser } from '../state/actions';
import Michael from '../assets/me.jpg';
import './styles/EditProfile.css';

// add info to private and public store
// profileStore.set(key, value) ⇒ Boolean
// profileStore.remove(key) ⇒ Boolean
// profileStore.get(key) ⇒ String
// privateStore.set(key, value) ⇒ Boolean
// privateStore.remove(key) ⇒ Boolean

const address = web3.eth.accounts[0]; // eslint-disable-line no-undef

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      github: '',
      email: '',
    };
  }
  // setProfile = () => {
  //   profileStore.set(key, value).then(response => console.log(response));
  // }

  // componentDidMount() {
  //   let profileStore = new ProfileStore(muportDID)
  // }

  handleFormChange = (e, property) => {
    const obj = {};
    obj[property] = e.target.value;
    this.setState(obj);
  }

  handleSubmit = () => {
    const { name, github, email, } = this.state;
    console.log(name);
    // profileStore.set('name', name).then(res => console.log(res));
  }

  render() {
    const {
      name, github, email, handleSubmit,
    } = this.props;

    console.log(this.state);

    return (
      <div>
        <Nav />
        <div id="edit">
          <Link to="/Profile">
            <button id="goBack" type="button">
              &larr; Go back to profile
            </button>
          </Link>
          <p className="header">Edit Profile</p>

          <div id="edit_user_picture_edit">
            <img src={Michael} id="edit_user_picture" alt="profile" />
            <p>Edit</p>
          </div>

          <form onSubmit={handleSubmit}>

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

                <div className="edit_form_spacing" />

                <h3>Github</h3>
                <input
                  name="github"
                  type="text"
                  value={github}
                  onChange={e => this.handleFormChange(e, 'github')}
                />

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
              </div>

            </div>

            <button type="submit">Save</button>
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
  name: PropTypes.string,
  github: PropTypes.string,
  email: PropTypes.string,
  handleSubmit: PropTypes.string,
};

EditProfile.defaultProps = {
  name: null,
  github: null,
  email: null,
  handleSubmit: PropTypes.string,
};

function mapState(state) {
  // add store state on users here to use as props
  return {
    web3: state.web3.web3,
    // user: state.user
  };
}

function mapDispatch(dispatch) {
  // return bindActionCreators({ updateUser }, dispatch);
}

export default connect(mapState, mapDispatch)(EditProfile);
