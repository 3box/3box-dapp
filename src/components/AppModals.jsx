import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
      showDownloadBanner,
      ifFetchingThreeBox,
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
      handleDownloadMetaMaskBanner,
      closeRequireMetaMaskModal,
      alertRequireMetaMask,
      provideConsent,
      handleAccessModal,
    } = this.props;

    const isMobile = width <= 812; // 600

    return (
      <React.Fragment>
        <div className={`${showDownloadBanner ? '' : 'hideBanner'} webThreeBanner`}>
          <p>
            3Box requires web3.  Download the MetaMask extension to continue.
          </p>
          <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer">
            <button type="button" className="webThreeBanner__link">
              Download
            </button>
          </a>
          <p onClick={handleDownloadMetaMaskBanner} className="webThreeBanner__close">
            &#10005;
          </p>
        </div>

        <LoadingThreeBoxProfileModal show={ifFetchingThreeBox} />

        <SyncingModal
          show={!onSyncFinished && !ifFetchingThreeBox && isSyncing && !hasSignedOut}
        />

        <ProvideAccessModal
          handleAccessModal={handleAccessModal}
          show={allowAccessModal}
          directLogin={directLogin}
          isMobile={isMobile}
        />

        <RequireMetaMaskModal
          closeRequireMetaMaskModal={closeRequireMetaMaskModal}
          show={alertRequireMetaMask}
          isMobile={isMobile}
        />

        <ProvideConsentModal
          handleConsentModal={handleConsentModal}
          show={provideConsent}
          isMobile={isMobile}
        />

        <AccessDeniedModal
          handleDeniedAccessModal={handleDeniedAccessModal}
          show={accessDeniedModal}
          isMobile={isMobile}
        />

        <SignInToWalletModal
          handleRequireWalletLoginModal={handleRequireWalletLoginModal}
          show={signInToWalletModal}
          isMobile={isMobile}
        />

        <SignInToThreeBox
          show={signInModal}
          handleSignInModal={handleSignInModal}
        />

        <MobileWalletRequiredModal
          isIOS={isIOS}
          handleMobileWalletModal={handleMobileWalletModal}
          show={mobileWalletRequiredModal}
          isMobile={isMobile}
        />

        <ErrorModal
          errorMessage={errorMessage}
          closeErrorModal={closeErrorModal}
          show={showErrorModal && !mustConsentError}
          isMobile={isMobile}
        />

        <MustConsentModal
          closeErrorModal={closeErrorModal}
          show={mustConsentError}
          isMobile={isMobile}
        />

        <SwitchedNetworksModal
          prevNetwork={prevNetwork}
          currentNetwork={currentNetwork}
          handleSwitchedNetworkModal={handleSwitchedNetworkModal}
          show={showDifferentNetworkModal}
        />

        <LoggedOutModal
          isMobile={isMobile}
          handleLoggedOutModal={handleLoggedOutModal}
          handleSignOut={handleSignOut}
          show={loggedOutModal}
        />

        <SwitchedAddressModal
          handleSwitchedAddressModal={handleSwitchedAddressModal}
          show={switchedAddressModal}
          isMobile={isMobile}
          handleSignOut={handleSignOut}
          prevAddress={prevAddress}
        />

        <OnBoardingModalDesktop
          isMobile={isMobile}
          showOne={onBoardingModal}
          showTwo={onBoardingModalTwo}
          handleOnboardingModal={handleOnboardingModal}
        />

        <OnBoardingModalMobile
          isMobile={isMobile}
          handleOnboardingModal={handleOnboardingModal}
          showOne={onBoardingModal}
          showTwo={onBoardingModalMobileOne}
          showThree={onBoardingModalMobileTwo}
          showFour={onBoardingModalMobileThree}
          handleNextMobileModal={handleNextMobileModal}
        />
      </React.Fragment>
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
  handleDownloadMetaMaskBanner: PropTypes.func.isRequired,
  closeRequireMetaMaskModal: PropTypes.func.isRequired,
  handleAccessModal: PropTypes.func.isRequired,

  showDownloadBanner: PropTypes.bool,
  ifFetchingThreeBox: PropTypes.bool,
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

  showDownloadBanner: false,
  ifFetchingThreeBox: false,
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
};

export default AppModals;
