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
  RequireMetaMaskModal,
  ProvideConsentModal,
  AccessDeniedModal,
  ErrorModal,
  MustConsentModal,
  MobileWalletRequiredModal,
  SignInToWalletModal,
  SignInToThreeBox,
  ThreeBoxInfoBanner,
  ModalBackground,
} from './Modals';

class AppModals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
    };
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  }

  render() {
    const { width } = this.state;
    const {
      showInfoBanner,
      isFetchingThreeBox,
      onSyncFinished,
      isSyncing,
      hasSignedOut,
      allowAccessModal,
      directLogin,
      handleConsentModal,
      handleDeniedAccessModal,
      accessDeniedModal,
      signInToWalletModal,
      signInModal,
      handleRequireWalletLoginModal,
      handleSignInModal,
      handleMobileWalletModal,
      isIOS,
      mobileWalletRequiredModal,
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
      handleInfoBanner,
      closeRequireMetaMaskModal,
      alertRequireMetaMask,
      provideConsent,
      handleAccessModal,
      isProtectedPath,
    } = this.props;

    const isMobile = width <= 812; // 600

    return (
      <ReactCSSTransitionGroup
        transitionName="app__modals"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
      >
        {!isProtectedPath && (
          <ThreeBoxInfoBanner
            showInfoBanner={showInfoBanner}
            handleInfoBanner={handleInfoBanner}
          />)}

        {isFetchingThreeBox && (
          <LoadingThreeBoxProfileModal
            key="LoadingThreeBoxProfileModal"
          />)}

        {(!onSyncFinished && !isFetchingThreeBox && isSyncing && !hasSignedOut) && (
          <SyncingModal
            key="SyncingModal"
          />)}

        {allowAccessModal && (
          <ProvideAccessModal
            handleAccessModal={handleAccessModal}
            directLogin={directLogin}
            isMobile={isMobile}
            key="ProvideAccessModal"
          />)}

        {alertRequireMetaMask && (
          <RequireMetaMaskModal
            closeRequireMetaMaskModal={closeRequireMetaMaskModal}
            isMobile={isMobile}
            key="RequireMetaMaskModal"
          />)}

        {provideConsent && (
          <ProvideConsentModal
            handleConsentModal={handleConsentModal}
            isMobile={isMobile}
            key="ProvideConsentModal"
          />)}

        {accessDeniedModal && (
          <AccessDeniedModal
            handleDeniedAccessModal={handleDeniedAccessModal}
            isMobile={isMobile}
            key="AccessDeniedModal"
          />)}

        {signInToWalletModal && (
          <SignInToWalletModal
            handleRequireWalletLoginModal={handleRequireWalletLoginModal}
            isMobile={isMobile}
            key="SignInToWalletModal"
          />)}

        {signInModal && (
          <SignInToThreeBox
            handleSignInModal={handleSignInModal}
            key="SignInToThreeBox"
          />)}

        {mobileWalletRequiredModal && (
          <MobileWalletRequiredModal
            isIOS={isIOS}
            handleMobileWalletModal={handleMobileWalletModal}
            isMobile={isMobile}
            key="MobileWalletRequiredModal"
          />)}

        {(showErrorModal && !mustConsentError) && (
          <ErrorModal
            errorMessage={errorMessage}
            closeErrorModal={closeErrorModal}
            isMobile={isMobile}
            key="ErrorModal"
          />)}

        {!!mustConsentError && (
          <MustConsentModal
            closeErrorModal={closeErrorModal}
            isMobile={isMobile}
            key="MustConsentModal"
          />)}

        {showDifferentNetworkModal && (
          <SwitchedNetworksModal
            prevNetwork={prevNetwork}
            currentNetwork={currentNetwork}
            handleSwitchedNetworkModal={handleSwitchedNetworkModal}
            key="SwitchedNetworksModal"
          />)}

        {loggedOutModal && (
          <LoggedOutModal
            isMobile={isMobile}
            handleLoggedOutModal={handleLoggedOutModal}
            handleSignOut={handleSignOut}
            key="LoggedOutModal"
          />)}

        {switchedAddressModal && (
          <SwitchedAddressModal
            handleSwitchedAddressModal={handleSwitchedAddressModal}
            show={switchedAddressModal}
            isMobile={isMobile}
            handleSignOut={handleSignOut}
            prevAddress={prevAddress}
            key="SwitchedAddressModal"
          />)}

        {(onBoardingModal || onBoardingModalTwo) && (
          <OnBoardingModalDesktop
            isMobile={isMobile}
            showOne={onBoardingModal}
            showTwo={onBoardingModalTwo}
            handleOnboardingModal={handleOnboardingModal}
            key="OnBoardingModalDesktop"
          />)}

        {(onBoardingModal || onBoardingModalMobileOne || onBoardingModalMobileTwo || onBoardingModalMobileThree) && (
          <OnBoardingModalMobile
            isMobile={isMobile}
            handleOnboardingModal={handleOnboardingModal}
            showOne={onBoardingModal}
            showTwo={onBoardingModalMobileOne}
            showThree={onBoardingModalMobileTwo}
            showFour={onBoardingModalMobileThree}
            handleNextMobileModal={handleNextMobileModal}
            key="OnBoardingModalMobile"
          />)}

        {(isFetchingThreeBox
          || allowAccessModal
          || alertRequireMetaMask
          || provideConsent
          || accessDeniedModal
          || signInToWalletModal
          || signInModal
          || mobileWalletRequiredModal
          || (showErrorModal && !mustConsentError)
          || mustConsentError
          || showDifferentNetworkModal
          || loggedOutModal
          || switchedAddressModal
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
  handleInfoBanner: PropTypes.func.isRequired,
  closeRequireMetaMaskModal: PropTypes.func.isRequired,
  handleAccessModal: PropTypes.func.isRequired,

  showInfoBanner: PropTypes.bool,
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
  handleRequireWalletLoginModal: PropTypes.func.isRequired,
  handleSignInModal: PropTypes.func.isRequired,
  handleMobileWalletModal: PropTypes.func.isRequired,
  isProtectedPath: PropTypes.func.isRequired,
  isIOS: PropTypes.bool,
  mobileWalletRequiredModal: PropTypes.bool,
  signInToWalletModal: PropTypes.bool,
  signInModal: PropTypes.bool,
  alertRequireMetaMask: PropTypes.bool,
  provideConsent: PropTypes.bool,
};

AppModals.defaultProps = {
  errorMessage: '',
  mustConsentError: '',
  prevNetwork: '',
  currentNetwork: '',
  prevAddress: '',
  directLogin: '',

  showInfoBanner: false,
  isFetchingThreeBox: false,
  onSyncFinished: false,
  isSyncing: false,
  hasSignedOut: false,
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
  isIOS: false,
  mobileWalletRequiredModal: false,
  signInToWalletModal: false,
  signInModal: false,
  alertRequireMetaMask: false,
  provideConsent: false,
  isProtectedPath: false,
};

export default AppModals;
