import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import fetchEns from '../../../state/actions/utils';

import Nav from '../../../components/Nav/Nav';
import ThreeId from './components/ThreeId';
import LinkedAccounts from './components/LinkedAccounts';
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

// const general = {
//   username: {
//     title: 'Username',
//     pageHeader: '3Box Username',
//     pageDescription: 'Register a unique username for your 3Box account.  We will display this instead of your 3ID throughout the app. This action costs a small fee.',
//   },
// };

const accounts = {
  threeId: {
    title: '3ID',
    pageHeader: '3ID',
    pageDescription: 'This is your unique data identity.',
  },
  linkedAccounts: {
    title: 'Linked Accounts',
    pageHeader: 'Linked Accounts',
    pageDescription: 'These accounts are publicly linked to your 3ID',
  },
  // loginMethods: {
  //   title: 'Login Methods',
  //   pageHeader: '3Box Username',
  //   pageDescription: 'These accounts can login to your 3ID.',
  // },
};

const settings = {
  accounts,
  // general,
};

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      finderToDisplay: 'accounts',
      mainToDisplay: 'threeId',
      linkedAddresses: [],
      ensNames: [],
      hideSettingsList: false,
      clearSettingsListMobile: false,
      showMainSettingsMobile: false,
    };
  }

  componentDidMount() {
    const { box } = this.props;
    if (box.listAddressLinks) this.fetchedLinkedAccounts();
  }

  componentDidUpdate(prevProps) {
    const { box } = this.props;
    const hasBoxChanged = box !== prevProps.box;

    if (hasBoxChanged) this.fetchedLinkedAccounts();
  }

  handleFinderToDisplay = (view, nestedView) => {
    const { finderToDisplay } = this.state;
    this.handleMobileSpaceListView();

    if (finderToDisplay === view) return;
    this.setState({ finderToDisplay: view, mainToDisplay: nestedView });
  }

  handleMainToDisplay = (view) => {
    this.handleMobileSpaceListView();
    this.setState({ mainToDisplay: view });
  }

  renderMainToDisplay = () => {
    const { mainToDisplay, linkedAddresses, ensNames } = this.state;
    switch (mainToDisplay) {
      // case 'username':
      //   return <ThreeId />;
      // case 'loginMethods':
      //   return <ThreeId />;
      case 'threeId':
        return <ThreeId />;
      case 'linkedAccounts':
        return (
          <LinkedAccounts
            linkedAddresses={linkedAddresses}
            ensNames={ensNames}
          />
        );
      default:
        return <ThreeId />;
    }
  }

  fetchedLinkedAccounts = async () => {
    const { box } = this.props;
    const linkedAddresses = await box.listAddressLinks();
    const isGetAllNames = true;

    const getAllENSNames = async () => Promise.all(
      linkedAddresses.map(async (linked) => fetchEns(linked.address, isGetAllNames)),
    );
    const ensNames = await getAllENSNames();
    console.log('ensNamesensNames', ensNames);
    this.setState({ linkedAddresses, ensNames });
  }

  handleMobileSpaceListView = () => {
    const { hideSettingsList, clearSettingsListMobile, showMainSettingsMobile } = this.state;
    console.log('in handle view');
    if (!hideSettingsList) {
      this.setState({ showMainSettingsMobile: !showMainSettingsMobile });
      this.setState({ hideSettingsList: !hideSettingsList });
      setTimeout(() => {
        this.setState({ clearSettingsListMobile: !clearSettingsListMobile });
      }, 500);
    } else {
      this.setState({ clearSettingsListMobile: !clearSettingsListMobile });
      setTimeout(() => {
        this.setState({ hideSettingsList: !hideSettingsList });
      }, 20);
      setTimeout(() => {
        this.setState({ showMainSettingsMobile: !showMainSettingsMobile });
      }, 500);
    }
  }

  render() {
    const {
      image,
      name,
      currentAddress,
      handleSignInUp,
    } = this.props;
    const {
      finderToDisplay,
      mainToDisplay,
      hideSettingsList,
      clearSettingsListMobile,
      showMainSettingsMobile,
    } = this.state;

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
        <div className="edit__breadCrumb">
          <div id="edit__breadCrumb__crumbs">
            <p className="light">
              Settings
            </p>
          </div>
        </div>

        <div className="settings_page">

          <section
            className={`
              finder finder-settings
              ${hideSettingsList ? 'closeSpaces--mobile' : ''}
              ${clearSettingsListMobile ? 'hideSpaces--mobile' : ''}
            `}
          >
            {/* <div
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
            </div> */}
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

          <section className="finder finder-settings">
            {Object.entries(settings[finderToDisplay]).map((option) => (
              <FinderOption
                mainToDisplay={mainToDisplay}
                title={option[1].title}
                keyToRender={option[0]}
                handleMainToDisplay={this.handleMainToDisplay}
              />
            ))}
          </section>

          <main className={`
            finderWindow
            ${showMainSettingsMobile ? '' : 'clearDataExplorer'}
          `}
          >
            <div className="settings_mainViewWrapper">
              <div className="settings_mainViewWrapper_headers">
                <h2>{updatedPageHeader}</h2>
                <p>{updatedPageDescription}</p>
              </div>
              {this.renderMainToDisplay()}
            </div>
          </main>
        </div>
      </>
    );
  }
}

const FinderOption = ({
  mainToDisplay,
  handleMainToDisplay,
  title,
  keyToRender,
}) => (
    <div
      className={`space ${mainToDisplay === keyToRender ? 'activeSpace' : ''}`}
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
  mainToDisplay: PropTypes.string.isRequired,
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
  box: PropTypes.object,
  handleSignInUp: PropTypes.func.isRequired,
};

Settings.defaultProps = {
  name: '',
  image: [],
  box: {},
  currentAddress: '',
};

function mapState(state) {
  return {
    copySuccessful: state.uiState.copySuccessful,

    box: state.myData.box,
    name: state.myData.name,
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