import React from 'react';

import Narwhal from '../assets/Narwhal.png';
import './styles/CreateProfile.css';

const CreateProfile = ({ handleSignInUp }) => (
  <div className="create">

    <div className="create__copy">
      <div className="create__copy__wrapper">
        <h1 className="create__copy__headline">Welcome to your new home on web3. 💙</h1>
        <p className="create__copy__body">
          3Box is where people build identity, trust, and
          connection online.  Create an ethereum profile,
          sign in to dapps, store your data, and much more.
        <br />
          <br />
          Getting started is easy.  Begin by creating your profile here!
        </p>
      </div>
    </div>

    <div className="create__action">
      <div className="create__action__form">
        <div className="create__action__wrapper">
          <h2 className="create__action__form__header">Create an Ethereum profile</h2>
          <p className="create__action__form__body">
            Create a profile for your Ethereum account and
            join the hundreds already building connection.
          </p>

          <div className="create__action__form__profileDetails">
            <img src={Narwhal} alt="" className="create__action__form__narwhal" />
            <div className="create__action__form__example">
              <div className="create__action__form__example__column">
                <p>✅ Name</p>
                <p>✅ Description</p>
                <p>✅ Spirit Emoji</p>
              </div>
              <div className="create__action__form__example__column">
                <p>✅ Website</p>
                <p>✅ Work</p>
                <p>✅ Education</p>
              </div>
            </div>
          </div>

          <button className="create__action__form__button" type="button">Create Profile</button>
          <p className="create__action__form__already">
            Already have a profile?
          </p>
          <a onClick={handleSignInUp} className="create__action__form__signIn">
            Sign in.
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default CreateProfile;
