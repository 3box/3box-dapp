import React from 'react';
import { Link } from 'react-router-dom';

import * as routes from '../utils/routes';
import Status from '../assets/Status.png';
import ThreeBoxLogo from './ThreeBoxLogo.jsx';
import getCoinbaseWallet from '../assets/getCoinbaseWallet.svg';
import TrustWallet from '../assets/TrustWallet.png';
import Consent from '../assets/Consent.png';
import Switched from '../assets/Switched.svg';
import MetaMaskLogo from '../assets/MetaMaskLogo.svg';
import OnBoardingModalGraphic from '../assets/OnBoardingModal.png';
import OnBoardingModalGraphic2 from '../assets/OnBoardingModal2.png';
import ErrorIcon from '../assets/ErrorIcon.svg';
import MetaMaskWallet from '../assets/MetaMaskWallet.png';
import LogOut from '../assets/LogOut.svg';
import Loading from '../assets/Loading.svg';
import './styles/Modal.css';

export const SwitchedNetworksModal = ({ prevNetwork, currentNetwork, proceedWithSwitchedAddress, show }) => (
  <div className="modal__container">
    <div className="modal">
      <img src={Switched} alt="Partners background" id="modal__switchedNetworks" />

      <div>
        <h3>
          Switched Ethereum network
        </h3>
        <p>
          3Box profiles are stored on IPFS.
          This allows you to use the same profile on different Ethereum networks.
          Your 3Box information is the same across networks, but your Ethereum activity changes.
          </p>
        <p id="modal__switchBack">
          <b>
            {`Switch back to ${prevNetwork} in MetaMask or continue on ${currentNetwork}`}
          </b>
        </p>
      </div>

      <button onClick={() => { proceedWithSwitchedAddress(); window.localStorage.setItem('switch', true); }} type="button">
        Continue on
        {` ${currentNetwork}`}
      </button>

    </div>
  </div>
);

export const LoggedOutModal = ({ showLoggedOutModal, handleSignOut, show }) => (
  <div className="modal__container">
    <div className="modal">
      <img src={LogOut} alt="Partners background" id="modal__switchedNetworks" />

      <div>
        <h3>
          Logged out
        </h3>
        <p>
          Sign back in to your web3 wallet (e.g. MetaMask) or exit 3Box
        </p>
      </div>

      <Link to={routes.LANDING}>
        <button onClick={() => { showLoggedOutModal(); handleSignOut(); }} type="button">Exit</button>
      </Link>
    </div>
  </div>
);

export const SwitchedAddressModal = ({ showSwitchedAddressModal, show, handleSignOut }) => (
  <div className="modal__container">
    <div className="modal">
      <img src={Switched} alt="Partners background" id="modal__switchedNetworks" />

      <div>
        <h3>
          Switched Ethereum address
        </h3>
        <p>
          Revert to the previous address in your web3 wallet (e.g. MetaMask) or sign back in with the new address
        </p>
      </div>

      <Link to={routes.LANDING}>
        <button onClick={() => { showSwitchedAddressModal(); handleSignOut(); }} type="button">Sign in with new address</button>
      </Link>
    </div>
  </div>
);

// Landing Page Modals
export const ProvideConsentModal = ({ closeConsentModal, show }) => (
  <div className="modal__container">
    <div className="modal">
      <img src={Consent} alt="Partners background" />

      <div id="modal__copy__card">
        <h3>Consent required</h3>
        <p>Provide consent to 3Box in your web3 wallet (e.g. MetaMask) in order to sign in or create a profile on 3Box</p>
      </div>

      <button onClick={closeConsentModal} type="button" className="tertiaryButton">close</button>
    </div>
  </div>
);

export const LoadingThreeBoxProfileModal = ({ show }) => (
  <div className="modal__container">
    <div className="modal">
      <img src={Loading} alt="Loading" id="modal__loadingGraphic" />

      <div>
        <div id="modal__loading3Box">
          <ThreeBoxLogo />
        </div>
        <p>LOADING</p>
      </div>

    </div>
  </div>
);

export const RequireMetaMaskModal = ({ closeRequireMetaMask, show }) => (
  <div className="modal__container">
    <div className="modal">
      <img src={MetaMaskWallet} alt="Partners background" />

      <div id="modal__copy__card">
        <h3>
          Install Web3 Wallet
        </h3>
        <p>
          You must have a web3 wallet (e.g. MetaMask) to sign in or create a profile on 3Box
        </p>
      </div>

      <button onClick={closeRequireMetaMask} type="button" className="tertiaryButton">close</button>
    </div>
  </div>
);

export const SignInToWalletModal = ({ handleRequireWalletLoginModal, show }) => (
  <div className="modal__container">
    <div className="modal">
      <img src={MetaMaskWallet} alt="Partners background" />

      <div id="modal__copy__card">
        <h3>
          Login to Web3 Wallet
        </h3>
        <p>
          You must be logged in to a web3 wallet (e.g. MetaMask) to sign in or create a profile on 3Box
        </p>
      </div>

      <button onClick={handleRequireWalletLoginModal} type="button" className="tertiaryButton">close</button>
    </div>
  </div>
);

export const LoginDetectedModal = ({ show }) => (
  <div className="modal__container">
    <div className="modal">
      <img src={MetaMaskWallet} alt="Partners background" />

      <div id="modal__copy__card">
        <h3>
          Web3 Login Detected
        </h3>
        <p>
          A login to a web3 wallet has been detected - reload the page to continue
        </p>
      </div>

      <button onClick={() => window.location.reload()} type="button" className="tertiaryButton">reload</button>
    </div>
  </div >
);

export const ErrorModal = ({ closeErrorModal, errorMessage, show }) => (
  <div className="modal__container">
    <div className="modal">
      {
        errorMessage.substring(0, 65) === 'Error: MetaMask Message Signature: User denied message signature.'
          ? <img src={Consent} alt="Consent required" />
          : <img src={ErrorIcon} alt="Error" id="modal__switchedNetworks" />
      }
      <div id={errorMessage.substring(0, 65) === 'Error: MetaMask Message Signature: User denied message signature.' ? 'modal__copy__card' : ''}>
        {
          errorMessage.substring(0, 65) === 'Error: MetaMask Message Signature: User denied message signature.'
            ? (
              <h3>
                Consent required
              </h3>)
            : (
              <h3>
                Error
              </h3>)
        }
        {
          errorMessage.substring(0, 65) === 'Error: MetaMask Message Signature: User denied message signature.'
            ? <p>You must provide consent to 3Box in your web3 wallet (e.g. MetaMask) to sign in or create a profile, please try again</p>
            : <p>{errorMessage}</p>
        }
      </div>
      <button onClick={closeErrorModal} type="button" className="tertiaryButton">close</button>
    </div>
  </div>
);

export const SignInToThreeBox = ({ handleSignInModal, show }) => (
  <div className="modal__container">
    <div className="modal">
      <div id="modal__loading3Box">
        <ThreeBoxLogo />
      </div>

      <div id="modal__copy__card">
        <h3>
          Sign in
        </h3>
        <p>You must be signed in to 3Box to go to that page</p>
      </div>

      <button onClick={handleSignInModal} type="button" className="tertiaryButton">close</button>
    </div>
  </div>
);

export const MobileWalletRequiredModal = ({ isIOS, handleMobileWalletModal }) => (
  <div id="mobile__landing__prompt">
    <div id="mobile__landing__prompt__logo">
      <ThreeBoxLogo />
    </div>

    <div id="mobile__landing__prompt__text">
      <p>3box requires a mobile dApp browser in order to work</p>
      <br />
      <p>Download Coinbase Wallet or Status.im then revisit this site in the mobile dApp browser to continue</p>
    </div>

    <div id="mobile__landing__prompt__buttons">
      <a href={isIOS ? 'https://itunes.apple.com/app/coinbase-wallet/id1278383455?ls=1&mt=8' : 'https://play.google.com/store/apps/details?id=org.toshi'}>
        <img src={getCoinbaseWallet} alt="Get Coinbase wallet" />
      </a>

      {!isIOS
        ? (
          <a href="https://play.google.com/store/apps/details?id=im.status.ethereum&hl=en_US">
            <img src={Status} alt="Get Status wallet" />
          </a>)

        : (
          <a href="https://itunes.apple.com/us/app/trust-ethereum-wallet/id1288339409?mt=8">
            <img src={TrustWallet} alt="Get TrustWallet" />
          </a>)}
    </div>

    <button onClick={() => handleMobileWalletModal()} type="button" className="tertiaryButton">X</button>
  </div>
);

export const OnBoardingModal = ({ handleOnboardingModal2 }) => (
  <div className="modal__container">
    <img src={OnBoardingModalGraphic} alt="Partners background" id="modal__onBoardingModal" />
    <button onClick={handleOnboardingModal2} type="button" id="modal__onBoardingModal__button">Get started</button>
  </div>
);

export const OnBoardingModal2 = ({ handleOnboardingModal2 }) => (
  <div className="modal__container">
    <img src={OnBoardingModalGraphic2} alt="Partners background" id="modal__onBoardingModal" />
    <button onClick={handleOnboardingModal2} type="button" id="modal__onBoardingModal__button">Let's go</button>
  </div>
);
