import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {
  SwitchedAddressModal,
  SwitchedNetworksModal,
  LoggedOutModal,
  OnBoardingModalDesktop,
  LoadingThreeBoxProfileModal,
  OnBoardingModalMobile,
  ProvideAccessModal,
  SyncingModal,
  ProvideConsentModal,
  AccessDeniedModal,
  ErrorModal,
  MustConsentModal,
  SignInToThreeBox,
  ModalBackground,
  FollowingIsPublicModal,
  FollowingListModal,
  UnsupportedBrowserModal,
} from './Modals';
import { checkIsMobile } from '../utils/funcs';

class AppModals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: checkIsMobile(),
    };
  }

  render() {
    const {
      isFetchingThreeBox,
      onSyncFinished,
      isSyncing,
      hasSignedOut,
      allowAccessModal,
      directLogin,
      handleConsentModal,
      handleDeniedAccessModal,
      accessDeniedModal,
      signInModal,
      handleSignInModal,
      errorMessage,
      mustConsentError,
      showErrorModal,
      closeErrorModal,
      prevNetwork,
      currentNetwork,
      handleSwitchedNetworkModal,
      showDifferentNetworkModal,
      loggedOutModal,
      switchedAddressModal,
      handleLoggedOutModal,
      handleSignOut,
      handleSwitchedAddressModal,
      prevAddress,
      onBoardingModal,
      onBoardingModalTwo,
      handleOnboardingModal,
      handleNextMobileModal,
      onBoardingModalMobileOne,
      onBoardingModalMobileTwo,
      onBoardingModalMobileThree,
      provideConsent,
      handleAccessModal,
      showContactsModal,
      showFollowingPublicModal,
      handleFollowingPublicModal,
      otherAddressToFollow,
      otherFollowing,
      otherName,
      following,
      otherProfileAddress,
      handleContactsModal,
      handleUnsupportedBrowserModal,
      showUnsupportedBrowser,
    } = this.props;
    const { isMobile } = this.state;

    return (
      <ReactCSSTransitionGroup
        transitionName="app__modals"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
      >
        {isFetchingThreeBox && (
          <LoadingThreeBoxProfileModal
            key="LoadingThreeBoxProfileModal"
          />
        )}

        {(!onSyncFinished && !isFetchingThreeBox && isSyncing && !hasSignedOut) && (
          <SyncingModal
            key="SyncingModal"
          />
        )}

        {allowAccessModal && (
          <ProvideAccessModal
            handleAccessModal={handleAccessModal}
            directLogin={directLogin}
            key="ProvideAccessModal"
          />
        )}

        {provideConsent && (
          <ProvideConsentModal
            handleConsentModal={handleConsentModal}
            key="ProvideConsentModal"
          />
        )}

        {accessDeniedModal && (
          <AccessDeniedModal
            handleDeniedAccessModal={handleDeniedAccessModal}
            isMobile={isMobile}
            key="AccessDeniedModal"
          />
        )}

        {signInModal && (
          <SignInToThreeBox
            handleSignInModal={handleSignInModal}
            key="SignInToThreeBox"
          />
        )}

        {showUnsupportedBrowser && (
          <UnsupportedBrowserModal
            handleUnsupportedBrowserModal={handleUnsupportedBrowserModal}
            key="UnsupportedBrowserModal"
          />
        )}

        {(showErrorModal && !mustConsentError) && (
          <ErrorModal
            errorMessage={errorMessage}
            closeErrorModal={closeErrorModal}
            isMobile={isMobile}
            key="ErrorModal"
          />
        )}


        {!!mustConsentError && (
          <MustConsentModal
            closeErrorModal={closeErrorModal}
            key="MustConsentModal"
          />
        )}

        {showDifferentNetworkModal && (
          <SwitchedNetworksModal
            prevNetwork={prevNetwork}
            currentNetwork={currentNetwork}
            handleSwitchedNetworkModal={handleSwitchedNetworkModal}
            key="SwitchedNetworksModal"
          />
        )}


        {loggedOutModal && (
          <LoggedOutModal
            handleLoggedOutModal={handleLoggedOutModal}
            handleSignOut={handleSignOut}
            key="LoggedOutModal"
          />
        )}

        {(showContactsModal && !showFollowingPublicModal) && (
        // {(showContactsModal && !showFollowingPublicModal && !isFetchingThreeBox) && (
          <FollowingListModal
            otherFollowing={otherFollowing}
            otherName={otherName}
            following={following}
            otherProfileAddress={otherProfileAddress}
            handleContactsModal={handleContactsModal}
          />
        )}

        {showFollowingPublicModal && (
          <FollowingIsPublicModal
            isMobile={isMobile}
            handleFollowingPublicModal={handleFollowingPublicModal}
            otherAddressToFollow={otherAddressToFollow}
            key="FollowingIsPublicModal"
          />
        )}

        {switchedAddressModal && (
          <SwitchedAddressModal
            handleSwitchedAddressModal={handleSwitchedAddressModal}
            handleSignOut={handleSignOut}
            prevAddress={prevAddress}
            key="SwitchedAddressModal"
          />
        )}

        {((onBoardingModal || onBoardingModalTwo) && !isMobile) && (
          <OnBoardingModalDesktop
            isMobile={isMobile}
            showOne={onBoardingModal}
            showTwo={onBoardingModalTwo}
            handleOnboardingModal={handleOnboardingModal}
            key="OnBoardingModalDesktop"
          />
        )}

        {((onBoardingModal || onBoardingModalMobileOne || onBoardingModalMobileTwo || onBoardingModalMobileThree) && isMobile) && (
          <OnBoardingModalMobile
            isMobile={isMobile}
            handleOnboardingModal={handleOnboardingModal}
            showOne={onBoardingModal}
            showTwo={onBoardingModalMobileOne}
            showThree={onBoardingModalMobileTwo}
            showFour={onBoardingModalMobileThree}
            handleNextMobileModal={handleNextMobileModal}
            key="OnBoardingModalMobile"
          />
        )}

        {(isFetchingThreeBox
          || allowAccessModal
          || provideConsent
          || showFollowingPublicModal
          || accessDeniedModal
          || signInModal
          || (showErrorModal && !mustConsentError)
          || mustConsentError
          || showDifferentNetworkModal
          || loggedOutModal
          || switchedAddressModal
          || showContactsModal
          || ((onBoardingModal || onBoardingModalTwo) && !isMobile)
          || ((onBoardingModal
            || onBoardingModalMobileOne
            || onBoardingModalMobileTwo
            || onBoardingModalMobileThree)
            && isMobile)
        ) && <ModalBackground />}

      </ReactCSSTransitionGroup>
    );
  }
}

AppModals.propTypes = {
  errorMessage: PropTypes.string,
  mustConsentError: PropTypes.string,
  prevNetwork: PropTypes.string,
  currentNetwork: PropTypes.string,
  prevAddress: PropTypes.string,

  handleSwitchedNetworkModal: PropTypes.func.isRequired,
  handleLoggedOutModal: PropTypes.func.isRequired,
  handleSignOut: PropTypes.func.isRequired,
  handleSwitchedAddressModal: PropTypes.func.isRequired,
  handleOnboardingModal: PropTypes.func.isRequired,
  handleNextMobileModal: PropTypes.func.isRequired,
  handleConsentModal: PropTypes.func.isRequired,
  handleDeniedAccessModal: PropTypes.func.isRequired,
  closeErrorModal: PropTypes.func.isRequired,
  handleAccessModal: PropTypes.func.isRequired,

  isFetchingThreeBox: PropTypes.bool,
  onSyncFinished: PropTypes.bool,
  isSyncing: PropTypes.bool,
  hasSignedOut: PropTypes.bool,
  allowAccessModal: PropTypes.bool,
  accessDeniedModal: PropTypes.bool,
  directLogin: PropTypes.string,
  showDifferentNetworkModal: PropTypes.bool,
  loggedOutModal: PropTypes.bool,
  switchedAddressModal: PropTypes.bool,
  onBoardingModal: PropTypes.bool,
  onBoardingModalTwo: PropTypes.bool,
  onBoardingModalMobileOne: PropTypes.bool,
  onBoardingModalMobileTwo: PropTypes.bool,
  onBoardingModalMobileThree: PropTypes.bool,
  showErrorModal: PropTypes.bool,
  handleSignInModal: PropTypes.func.isRequired,
  isMyProfilePath: PropTypes.bool.isRequired,
  signInModal: PropTypes.bool,
  provideConsent: PropTypes.bool,
  showContactsModal: PropTypes.bool,
};

AppModals.defaultProps = {
  errorMessage: '',
  mustConsentError: '',
  prevNetwork: '',
  currentNetwork: '',
  prevAddress: '',
  directLogin: '',

  isFetchingThreeBox: false,
  onSyncFinished: false,
  isSyncing: false,
  hasSignedOut: false,
  showContactsModal: false,
  allowAccessModal: false,
  accessDeniedModal: false,
  showDifferentNetworkModal: false,
  loggedOutModal: false,
  switchedAddressModal: false,
  onBoardingModal: false,
  onBoardingModalTwo: false,
  onBoardingModalMobileOne: false,
  onBoardingModalMobileTwo: false,
  onBoardingModalMobileThree: false,
  showErrorModal: false,
  signInModal: false,
  provideConsent: false,
};

export default AppModals;
