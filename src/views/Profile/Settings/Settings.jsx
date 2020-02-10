import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Nav from '../../../components/Nav/Nav';
import Username from './components/Username';
import MyProfileHeaders from '../MyProfile/MyProfileHeaders';
import Arrow from '../../../assets/Arrow.svg';
// import Loading from '../../../assets/Loading.svg';
// import history from '../../../utils/history';
// import * as routes from '../../../utils/routes';
// import Private from '../../../assets/Private.svg';
// import Verified from '../../../assets/Verified.svg';
// import AddImage from '../../../assets/AddImage.svg';
// import {
//   store,
// } from '../../../state/store';
// import actions from '../../../state/actions';
// import { copyToClipBoard, capitalizeFirst } from '../../../utils/funcs';

import '../styles/Settings.scss';
import '../../Spaces/styles/Spaces.scss';
import '../styles/EditProfile.scss';

const general = {
  username: {
    title: 'Username',
    pageHeader: '3Box Username',
    pageDescription: 'Register a unique username for your 3Box account.  We will display this instead of your 3ID throughout the app. This action costs a small fee.',
  },
};

const accounts = {
  threeId: {
    title: '3ID',
    pageHeader: '3ID',
    pageDescription: 'This is your unique data identity.',
  },
  loginMethods: {
    title: 'Login Methods',
    pageHeader: '3Box Username',
    pageDescription: 'These accounts can login to your 3ID.',
  },
  linkedAccounts: {
    title: 'Linked Accounts',
    pageHeader: 'Linked Accounts',
    pageDescription: 'These accounts are publicly linked to your 3ID',
  },
};

const settings = {
  accounts,
  general,
};

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      finderToDisplay: 'general',
      mainToDisplay: 'username',
    };
  }

  handleFinderToDisplay = (view, nestedView) => this.setState({ finderToDisplay: view, mainToDisplay: nestedView });

  handleMainToDisplay = (view) => this.setState({ mainToDisplay: view });

  renderMainToDisplay = () => {
    const { mainToDisplay } = this.state;
    switch (mainToDisplay) {
      case 'username':
        return <Username />;
      case 'threeId':
        return <Username />;
      case 'loginMethods':
        return <Username />;
      case 'linkedAccounts':
        return <Username />;
      default:
        return <Username />;
    }
  }

  render() {
    const {
      image,
      name,
      currentAddress,
      handleSignInUp,
    } = this.props;
    const { finderToDisplay, mainToDisplay } = this.state;
    const updatedPageHeader = settings[finderToDisplay][mainToDisplay] ? settings[finderToDisplay][mainToDisplay].pageHeader : '';
    const updatedPageDescription = settings[finderToDisplay][mainToDisplay] ? settings[finderToDisplay][mainToDisplay].pageDescription : '';

    return (
      <>
        <MyProfileHeaders
          image={image}
          name={name}
          currentAddress={currentAddress}
        />
        <div className="data__nav--desktop">
          <Nav handleSignInUp={handleSignInUp} />
        </div>

        <div className="settings_page">
          <div id="edit__breadCrumb">
            <div id="edit__breadCrumb__crumbs">
              <p className="light">
                Settings
              </p>
            </div>
          </div>

          <section className="finder">
            <div
              className={`space ${finderToDisplay === 'general' ? 'activeSpace' : ''}`}
              onClick={() => this.handleFinderToDisplay('general', 'username')}
              role="button"
              onKeyDown={() => this.handleFinderToDisplay('general', 'username')}
              tabIndex={0}
            >
              <p className="space__name">
                General
              </p>

              <span className="space__arrow">
                <img src={Arrow} alt="arrow" />
              </span>
            </div>
            <div
              className={`space ${finderToDisplay === 'accounts' ? 'activeSpace' : ''}`}
              onClick={() => this.handleFinderToDisplay('accounts', 'threeId')}
              role="button"
              onKeyDown={() => this.handleFinderToDisplay('accounts', 'threeId')}
              tabIndex={0}
            >
              <p className="space__name">
                Accounts
              </p>
              <span className="space__arrow">
                <img src={Arrow} alt="arrow" />
              </span>
            </div>
          </section>

          <section className="finder">
            {Object.entries(settings[finderToDisplay]).map((option) => (
              <FinderOption
                finderToDisplay={finderToDisplay}
                title={option[1].title}
                keyToRender={option[0]}
                handleMainToDisplay={this.handleMainToDisplay}
              />
            ))}
          </section>

          <main className="finderWindow">
            <h2>{updatedPageHeader}</h2>
            <p>{updatedPageDescription}</p>
            {this.renderMainToDisplay()}
          </main>
        </div>
      </>
    );
  }
};

const FinderOption = ({
  finderToDisplay,
  handleMainToDisplay,
  title,
  keyToRender,
}) => (
    <div
      className={`space ${finderToDisplay === keyToRender ? 'activeSpace' : ''}`}
      onClick={() => handleMainToDisplay(keyToRender)}
      role="button"
      onKeyDown={() => handleMainToDisplay(keyToRender)}
      tabIndex={0}
    >
      <p className="space__name">
        {title}
      </p>

      <span className="space__arrow">
        <img src={Arrow} alt="arrow" />
      </span>
    </div>
  );

FinderOption.propTypes = {
  title: PropTypes.string,
  keyToRender: PropTypes.string,
  finderToDisplay: PropTypes.string.isRequired,
  handleMainToDisplay: PropTypes.func.isRequired,
};

FinderOption.defaultProps = {
  title: '',
  keyToRender: '',
};

Settings.propTypes = {
  name: PropTypes.string,
  image: PropTypes.array,
  currentAddress: PropTypes.string,
  handleSignInUp: PropTypes.func.isRequired,
};

Settings.defaultProps = {
  name: '',
  image: [],
  currentAddress: '',
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

export default connect(mapState, {})(Settings);