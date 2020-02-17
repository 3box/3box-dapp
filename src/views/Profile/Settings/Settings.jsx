import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import fetchEns from '../../../state/actions/utils';

import Nav from '../../../components/Nav/Nav';
import ThreeId from './components/ThreeId';
import LinkedAccounts from './components/LinkedAccounts';
import MyProfileHeaders from '../MyProfile/MyProfileHeaders';
import Arrow from '../../../assets/Arrow.svg';
import '../styles/Settings.scss';
import '../../Spaces/styles/Spaces.scss';
import '../styles/EditProfile.scss';

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
};

const settings = {
  accounts,
};

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      finderToDisplay: 'accounts',
      mainToDisplay: 'threeId',
      linkedAddresses: [],
      ensNames: [],
      nestLevel: 0,
      clearLevel: 0,
    };
  }

  componentDidMount() {
    const { box } = this.props;
    if (box.listAddressLinks) this.fetchedLinkedAccounts();
  }

  componentDidUpdate(prevProps) {
    const { box } = this.props;
    const hasBoxChanged = box !== prevProps.box;

    if (hasBoxChanged && box.listAddressLinks) this.fetchedLinkedAccounts();
  }

  handleFinderToDisplay = (view, nestedView) => {
    const { finderToDisplay } = this.state;
    this.handleMobileSpaceListView(true);

    if (finderToDisplay === view) return;
    this.setState({ finderToDisplay: view, mainToDisplay: nestedView });
  }

  handleMainToDisplay = (view) => {
    // const fromNestedView = true;
    this.handleMobileSpaceListView(true);
    this.setState({ mainToDisplay: view });
  }

  handleReturnDisplay = () => {
    const { nestLevel } = this.state;
    this.setState({ nestLevel: nestLevel - 1 });
  }

  renderMainToDisplay = () => {
    const { mainToDisplay, linkedAddresses, ensNames } = this.state;
    switch (mainToDisplay) {
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
    this.setState({ linkedAddresses, ensNames });
  }

  handleMobileSpaceListView = (moveRight) => {
    const {
      nestLevel,
    } = this.state;
    const newLevel = moveRight ? nestLevel + 1 : nestLevel - 1;
    this.setState({ nestLevel: newLevel });
    setTimeout(() => {
      this.setState({ clearLevel: newLevel });
    }, 500);
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
      nestLevel,
      clearLevel,
    } = this.state;

    const updatedPageHeader = settings[finderToDisplay][mainToDisplay] ? settings[finderToDisplay][mainToDisplay].pageHeader : '';
    const updatedPageDescription = settings[finderToDisplay][mainToDisplay] ? settings[finderToDisplay][mainToDisplay].pageDescription : '';
    const listArray = Object.entries(settings[finderToDisplay]);

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
          <div className={`
              edit__breadCrumb 
              ${nestLevel >= 1 ? 'inMobileView' : 'outRight'}
          `}
          >
            <button
              className="data__space__context__icon"
              onClick={() => this.handleMobileSpaceListView()}
              onKeyPress={() => this.handleMobileSpaceListView()}
              type="button"
            >
              <img
                src={Arrow}
                className="data__space__context__arrowButton"
                alt="list"
              />
              <h3>Settings</h3>
            </button>
          </div>

          <div className="settings_page_views">
            {/* Nest Level 0 */}
            <section
              className={`
              finder 
              finder-settings 
              firstNestLevel
              ${nestLevel === 0 ? 'inMobileView' : 'outLeft'}
            `}
            >
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

            {/* Nest Level 1 */}
            <section className={`
          finder finder-settings 
            ${nestLevel === 1 ? 'inMobileView' : ''}
            ${nestLevel > 1 ? 'outLeft' : ''}
            ${nestLevel < 1 ? 'outRight' : ''}

            `}
            >
              {listArray.map((option, i) => (
                <>
                  <FinderOption
                    mainToDisplay={mainToDisplay}
                    title={option[1].title}
                    keyToRender={option[0]}
                    handleMainToDisplay={this.handleMainToDisplay}
                  />
                  {(i !== listArray.length - 1) && <div className="space__divider--mobile" />}
                </>
              ))}
            </section>

            {/* Nest Level 2 */}
            <main className={`
            finderWindow
            ${nestLevel === 2 ? 'inMobileView' : 'outRight'}
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