import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Narwhal from '../../assets/Narwhal.png';
import '../styles/CreateProfile.css';

class Profiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeOut: 'fadeOut',
    };
  }

  componentDidMount() {
    const { currentRoute } = this.props;
    if (currentRoute === '/create') {
      setTimeout(() => {
        this.setState({
          fadeOut: '',
        });
      }, 100);

      setTimeout(() => {
        this.setState({
          fadeOut: 'fadeOut',
        });
      }, 5000);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { currentRoute } = nextProps;
    if (currentRoute === '/create') {
      setTimeout(() => {
        this.setState({
          fadeOut: '',
        });
      }, 100);

      setTimeout(() => {
        this.setState({
          fadeOut: 'fadeOut',
        });
      }, 5000);
    }
  }

  render() {
    const { handleSignInUp, isLoggedIn } = this.props;
    const { fadeOut } = this.state;
    return (
      <div className="create">

        {!isLoggedIn
          && (
            <div className={`create__banner ${fadeOut}`}>
              <p>Experience profiles by joining 3Box below.</p>
            </div>)}

        <div className="create__copy">
          <div className="create__copy__wrapper">
            <h1 className="create__copy__headline">
              Welcome to your new home on web3.
              <span role="img" aria-label="check">
                💙
              </span>
            </h1>
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
                    <p>
                      <span role="img" aria-label="check">
                        ✅
                      </span>
                      Name
                    </p>
                    <p>
                      <span role="img" aria-label="check">
                        ✅
                      </span>
                      Description
                    </p>
                    <p>
                      <span role="img" aria-label="check">
                        ✅
                      </span>
                      Spirit Emoji
                    </p>
                  </div>
                  <div className="create__action__form__example__column hideMobile">
                    <p>
                      <span role="img" aria-label="check">
                        ✅
                      </span>
                      Website
                    </p>
                    <p>
                      <span role="img" aria-label="check">
                        ✅
                      </span>
                      Work
                    </p>
                    <p>
                      <span role="img" aria-label="check">
                        ✅
                      </span>
                      Education
                    </p>
                  </div>
                </div>
              </div>

              {!isLoggedIn && <button className="create__action__form__button" type="button" onClick={handleSignInUp}>Create Profile</button>}
              {!isLoggedIn
                && (
                  <p className="create__action__form__already">
                    Already have a profile?
                  </p>)
              }
              {!isLoggedIn
                && (
                  <p onClick={handleSignInUp} className="create__action__form__signIn">
                    Sign in.
                  </p>)}

              {isLoggedIn
                && (
                  <p>
                    You already have a profile, have fun!
                  </p>)}

            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  handleSignInUp: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool,
  currentRoute: PropTypes.string,
};

Profiles.defaultProps = {
  isLoggedIn: false,
  currentRoute: '',
};

const mapState = state => ({
  isLoggedIn: state.userState.isLoggedIn,
  currentRoute: state.uiState.currentRoute,
});

export default withRouter(connect(mapState)(Profiles));
