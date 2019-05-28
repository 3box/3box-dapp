import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import actions from '../../state/actions';
import { store } from '../../state/store';
import {
  PublicProfileLoading,
  SignInThroughPublicProfileBanner,
  ContactsListModal,
  ModalBackground,
} from '../../components/Modals';
import PubContent from './PublicProfile/PubContent';
import SideBar from './SideBar';
import './styles/Profile.css';

const {
  handleSignInBanner,
  handleContactsModal,
} = actions.modal;

const {
  checkNetwork,
} = actions.land;

const {
  accountsPromise,
} = actions.signin;

const {
  getOtherProfile,
  getActivity,
  getCollectibles,
} = actions.profile;

class ProfilePublic extends Component {
  async componentDidMount() {
    try {
      window.scrollTo(0, 0);
      const { location: { pathname }, currentAddress } = this.props;
      const otherProfileAddress = pathname.split('/')[1];
      let activeAddress;

      store.dispatch({
        type: 'OTHER_ADDRESS_UPDATE',
        otherProfileAddress,
      });
      store.dispatch({
        type: 'UI_ON_OTHER_PROFILE',
        onOtherProfilePage: true,
      });

      if (typeof window.web3 !== 'undefined') {
        if (!currentAddress) {
          const returnedAddress = await accountsPromise;
          [activeAddress] = returnedAddress;
        } else {
          activeAddress = currentAddress;
        }
        if (otherProfileAddress === activeAddress) this.props.handleSignInBanner();
        await this.props.checkNetwork();
      }

      await this.props.getOtherProfile(otherProfileAddress);
      this.props.getCollectibles(otherProfileAddress, true);
      this.props.getActivity(otherProfileAddress);
    } catch (err) {
      console.error(err);
    }
  }

  componentWillUnmount() {
    store.dispatch({
      type: 'OTHER_ADDRESS_UPDATE',
      otherProfileAddress: '',
    });
    store.dispatch({
      type: 'UI_ON_OTHER_PROFILE',
      onOtherProfilePage: false,
    });
  }

  render() {
    const { isLoadingOtherProfile, showSignInBanner, showContactsModal } = this.props;
    return (
      <div>
        <SignInThroughPublicProfileBanner show={showSignInBanner} handleSignInBanner={this.props.handleSignInBanner} />
        <div
          id="profile__page"
        >
          <div id="profile__contents">
            <SideBar isPublicProfilePage />
            <PubContent />
          </div>

          <ReactCSSTransitionGroup
            transitionName="app__modals"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
          >

            {isLoadingOtherProfile && <PublicProfileLoading />}
            {showContactsModal && <ContactsListModal contacts={20} handleContactsModal={this.props.handleContactsModal} />}

            {showContactsModal && <ModalBackground />}
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
}

ProfilePublic.propTypes = {
  getOtherProfile: PropTypes.func.isRequired,
  checkNetwork: PropTypes.func.isRequired,
  getActivity: PropTypes.func.isRequired,
  handleSignInBanner: PropTypes.func.isRequired,
  handleContactsModal: PropTypes.func.isRequired,
  getCollectibles: PropTypes.func.isRequired,
  pathname: PropTypes.object,
  location: PropTypes.object,
  isLoadingOtherProfile: PropTypes.bool,
  showSignInBanner: PropTypes.bool,
  showContactsModal: PropTypes.bool,
  currentAddress: PropTypes.string,
};

ProfilePublic.defaultProps = {
  pathname: {},
  location: {},
  isLoadingOtherProfile: true,
  showSignInBanner: false,
  showContactsModal: false,
  currentAddress: '',
};

const mapState = state => ({
  isLoadingOtherProfile: state.otherProfile.isLoadingOtherProfile,
  showSignInBanner: state.uiState.showSignInBanner,
  showContactsModal: state.uiState.showContactsModal,
  currentAddress: state.userState.currentAddress,
});

export default withRouter(connect(mapState,
  {
    getOtherProfile,
    checkNetwork,
    getActivity,
    handleSignInBanner,
    handleContactsModal,
    getCollectibles,
  })(ProfilePublic));