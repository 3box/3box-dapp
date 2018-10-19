import React from 'react';
import { Link } from 'react-router-dom';

import * as routes from '../utils/routes';
import history from '../history';
import Consent from '../assets/Consent.png';
import MetaMaskLogo from '../assets/MetaMaskLogo.svg';
import '../views/styles/Landing.css';

export const SwitchedNetworks = ({ prevNetwork, currentNetwork, proceedWithSwitchedAddress }) => (
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

export const LoggedOut = ({ showLoggedOutModal }) => (
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

export const SwitchedAddress = ({ showSwitchedAddressModal }) => (
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

export const ProvideConsent = () => (
  <div className="loadingContainer">
    <div className="consentModal">
      <img src={Consent} alt="Partners background" />
      <h3>Provide consent to 3Box in MetaMask</h3>
      <button onClick={this.props.closeConsentModal} type="button" className="tertiaryButton" id="closeModal">close</button>
    </div>
  </div>
);

export const RequireMetaMask = () => (
  <div className="loadingContainer">
    <div className="consentModal">
      <img src={MetaMaskLogo} alt="Partners background" />
      <h4>
        Install MetaMask to create a 3Box account
      </h4>
      <button onClick={this.props.closeRequireMetaMask} type="button" className="tertiaryButton" id="closeModal">close</button>
    </div>
  </div>
);

export const SignInToWallet = () => (
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
      <button onClick={this.props.handleSignInModal} type="button" className="tertiaryButton" id="closeModal">close</button>
    </div>
  </div>
)