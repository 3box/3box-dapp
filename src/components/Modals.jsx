import React from 'react';
import { Link } from 'react-router-dom';

import * as routes from '../utils/routes';
import Status from '../assets/Status.png';
import ThreeBoxLogo from './ThreeBoxLogo.jsx';
import getCoinbaseWallet from '../assets/getCoinbaseWallet.svg';
import TrustWallet from '../assets/TrustWallet.png';
import Consent from '../assets/Consent.png';
import MetaMaskLogo from '../assets/MetaMaskLogo.svg';
import Loading from '../assets/Loading.svg';
import '../views/styles/Landing.css';
import './styles/Modal.css';
// import history from '../history';

export const SwitchedNetworksModal = (
  { prevNetwork, currentNetwork, proceedWithSwitchedAddress },
) => (
    <div className="modal__container">
      <div className="modal">
        <h3>
          You've switched Ethereum networks
        </h3>

        <div>
          <p>
            3Box profiles are stored on IPFS.
            <br />
            This allows you to use the same profile on different Ethereum networks.
            <br />
            Your 3Box information is the same across networks, but your Ethereum activity changes.
            <br />
            <br />
            {`Switch back to
        ${prevNetwork} in MetaMask or continue on
        ${currentNetwork}`}
          </p>
        </div>

        <button onClick={() => { proceedWithSwitchedAddress(); window.localStorage.setItem('switch', true); }} type="button">
          Continue on
        {` ${currentNetwork}`}
        </button>

      </div>
    </div>
  );

export const LoggedOutModal = ({ showLoggedOutModal, handleSignOut }) => (
  <div className="modal__container">
    <div className="modal">
      <h3>
        You've logged out of your web3 provider
      </h3>

      <div>
        <p>
          Sign back in to your wallet or exit 3Box
        </p>
      </div>

      <Link to={routes.LANDING}>
        <button onClick={() => { showLoggedOutModal(); handleSignOut(); }} type="button">Exit</button>
      </Link>
    </div>
  </div>
);

export const SwitchedAddressModal = ({ showSwitchedAddressModal }) => (
  <div className="modal__container">
    <div className="modal">
      <h3>
        You've switched Ethereum addresses
      </h3>

      <div>
        <p>
          Revert to the previous address or login in the new address
        </p>
      </div>

      <Link to={routes.LANDING}>
        <button onClick={showSwitchedAddressModal} type="button">Sign back in</button>
      </Link>
    </div>
  </div>
);

// Landing Page Modals
export const ProvideConsentModal = ({ closeConsentModal }) => (
  <div className="modal__container">
    <div className="modal">
      <h3>Consent required</h3>

      <div>
        <img src={Consent} alt="Partners background" />
        <p>Provide consent to 3Box in the MetaMask pop up window or Chrome extension in order to sign in or create profile</p>
      </div>

      <button onClick={closeConsentModal} type="button" className="tertiaryButton">close</button>
    </div>
  </div>
);

export const LoadingThreeBoxProfileModal = () => (
  <div className="modal__container">
    <div className="modal">
      <h3>
        Loading 3Box
      </h3>

      <div>
        <img src={Loading} alt="Loading" id="modal__loadingGraphic" />
      </div>

      <div />
    </div>
  </div>
);

export const CreatingThreeBoxProfileModal = () => (
  <div className="modal__container">
    <div className="modal">
      <h3>
        Creating your 3Box profile
      </h3>

      <div>
        <img src={Loading} alt="Loading" id="modal__loadingGraphic" />
      </div>

      <div />
    </div>
  </div>
);

export const RequireMetaMaskModal = ({ closeRequireMetaMask }) => (
  <div className="modal__container">
    <div className="modal">
      <h3>
        Install MetaMask to create a 3Box account
      </h3>

      <div>
        <img src={MetaMaskLogo} alt="Partners background" />
      </div>

      <button onClick={closeRequireMetaMask} type="button" className="tertiaryButton">close</button>
    </div>
  </div>
);

export const ErrorModal = ({ closeErrorModal, errorMessage }) => (
  <div className="modal__container">
    <div className="modal">
      {
        errorMessage.substring(0, 58) === 'Error: MetaMask Message Signature: from field is required.'
          ?
          <h3>
            MetaMask required
            </h3>
          :
          errorMessage.substring(0, 65) === 'Error: MetaMask Message Signature: User denied message signature.'
            ?
            <h3>
              Consent required
              </h3>
            :
            <h3>
              {errorMessage}
            </h3>
      }
      <div>
        {
          errorMessage.substring(0, 58) === 'Error: MetaMask Message Signature: from field is required.'
            ? <img src={MetaMaskLogo} alt="Partners background" />
            :
            errorMessage.substring(0, 65) === 'Error: MetaMask Message Signature: User denied message signature.'
              ?
              <img src={Consent} alt="Partners background" />
              : <div />
        }
        {
          errorMessage.substring(0, 58) === 'Error: MetaMask Message Signature: from field is required.'
            ? <p>Sign in to MetaMask to continue</p>
            :
            errorMessage.substring(0, 65) === 'Error: MetaMask Message Signature: User denied message signature.'
              ?
              <p>You must provide consent to 3Box in your MetaMask wallet to sign in or create a profile, please try again</p>
              : <p />
        }
      </div>
      <button onClick={closeErrorModal} type="button" className="tertiaryButton">close</button>
    </div>
  </div>
);

export const SignInToWalletModal = ({ handleSignInModal }) => (
  <div className="modal__container">
    <div className="modal">
      <h3>
        Sign in to MetaMask to continue
      </h3>

      <div>
        <img src={MetaMaskLogo} alt="Partners background" />
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