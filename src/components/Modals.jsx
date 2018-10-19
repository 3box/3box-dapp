import React from 'react';
import { Link } from 'react-router-dom';

import * as routes from '../utils/routes';
import history from '../history';
import Status from '../assets/Status.png';
import ThreeBoxLogo from './ThreeBoxLogo.jsx';
import getCoinbaseWallet from '../assets/getCoinbaseWallet.svg';
import TrustWallet from '../assets/TrustWallet.png';
import Consent from '../assets/Consent.png';
import MetaMaskLogo from '../assets/MetaMaskLogo.svg';
import Loading from '../assets/Loading.svg';
import '../views/styles/Landing.css';

export const SwitchedNetworksModal = ({ prevNetwork, currentNetwork, proceedWithSwitchedAddress }) => (
  <div className="loadingContainer">
    <div className="differentNetwork__modal">

      <h4>
        You've switched Ethereum networks
        </h4>

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

      <button onClick={() => { proceedWithSwitchedAddress(); window.localStorage.setItem('switch', true); }} type="button">
        Continue on
        {` ${currentNetwork}`}
      </button>

    </div>
  </div>
);

export const LoggedOutModal = ({ showLoggedOutModal }) => (
  <div className="loadingContainer">
    <div className="differentNetwork__modal">
      <h4>
        You've logged out of your web3 provider
      </h4>
      <br />
      <p>
        Sign back in to your wallet or exit 3Box
      </p>
      <Link to={routes.LANDING}>
        <button onClick={() => { showLoggedOutModal(); history.push(routes.LANDING); }} type="button">Exit</button>
      </Link>
    </div>
  </div>
);

export const SwitchedAddressModal = ({ showSwitchedAddressModal }) => (
  <div className="loadingContainer">
    <div className="differentNetwork__modal">
      <h4>
        You've switched Ethereum addresses
      </h4>
      <br />
      <p>
        Revert to the previous address or login in the new address
      </p>
      <Link to={routes.LANDING}>
        <button onClick={showSwitchedAddressModal} type="button">Sign back in</button>
      </Link>
    </div>
  </div>
);

// Landing Page Modals
export const ProvideConsentModal = ({ closeConsentModal }) => (
  <div className="loadingContainer">
    <div className="consentModal">
      <img src={Consent} alt="Partners background" />
      <h3>Provide consent to 3Box in MetaMask</h3>
      <button onClick={closeConsentModal} type="button" className="tertiaryButton" id="closeModal">close</button>
    </div>
  </div>
);

export const IsFetchingThreeBoxModal = () => (
  <div className="loadingContainer">
    <img src={Loading} alt="loading" id="loadingPic" />
  </div>
);

export const RequireMetaMaskModal = ({ closeRequireMetaMask }) => (
  <div className="loadingContainer">
    <div className="consentModal">
      <img src={MetaMaskLogo} alt="Partners background" />
      <h4>
        Install MetaMask to create a 3Box account
      </h4>
      <button onClick={closeRequireMetaMask} type="button" className="tertiaryButton" id="closeModal">close</button>
    </div>
  </div>
);

export const ErrorModal = ({ closeErrorModal, errorMessage }) => (
  <div className="loadingContainer">
    <div className="modal">
      <div id="consentError">
        {
          errorMessage.substring(0, 58) === 'Error: MetaMask Message Signature: from field is required.'
            ? (
              <div id="consentError__metaMaskError">
                <img src={MetaMaskLogo} alt="Partners background" />
                <h4>
                  Sign in to MetaMask to continue
                </h4>
              </div>)
            : (
              <h4>
                {errorMessage}
              </h4>)
        }
      </div>
      <button onClick={closeErrorModal} type="button" className="tertiaryButton" id="closeModal">close</button>
    </div>
  </div>
);

export const SignInToWalletModal = ({ handleSignInModal }) => (
  <div className="loadingContainer">
    <div className="modal">
      <div id="consentError">
        <div id="consentError__metaMaskError">
          <img src={MetaMaskLogo} alt="Partners background" />
          <h4>
            Sign in to MetaMask to continue
          </h4>
        </div>
      </div>
      <button onClick={handleSignInModal} type="button" className="tertiaryButton" id="closeModal">close</button>
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

    <button onClick={() => handleMobileWalletModal()} type="button" className="tertiaryButton" id="closeModal">X</button>
  </div>
);
