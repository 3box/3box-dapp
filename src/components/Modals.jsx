import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import FollowingTile from './FollowingTile';
import * as routes from '../utils/routes';
import Status from '../assets/Status.png';
import getCoinbaseWallet from '../assets/getCoinbaseWallet.svg';
import ThreeBoxLogoWhite from '../assets/ThreeBoxLogoWhite.svg';
import ThreeBoxLogoBlue from '../assets/ThreeBoxLogoBlue.svg';
import HeartBlue from '../assets/HeartBlue.svg';
import GithubIcon from '../assets/GithubIcon.svg';
import TwitterIcon from '../assets/twitterGrey.svg';
import Email from '../assets/Email.svg';
import TrustWallet from '../assets/TrustWallet.png';
import Mollie from '../assets/Mollie.png';
import Consent from '../assets/Consent.png';
import Access from '../assets/Access.png';
import ContactsIcon from '../assets/Contacts.svg';
import Switched from '../assets/Switched.svg';
import OnBoardingModalGraphic from '../assets/OnBoardingModal.png';
import OnBoardingModalGraphic2 from '../assets/OnBoardingModal2.png';
import OnBoardingModalMobileGraphic1 from '../assets/OnBoardingModalMobile1.png';
import OnBoardingModalMobileGraphic2 from '../assets/OnBoardingModalMobile2.png';
import OnBoardingModalMobileGraphic3 from '../assets/OnBoardingModalMobile3.png';
import ErrorIcon from '../assets/ErrorIcon.svg';
import MetaMaskWallet from '../assets/MetaMaskWallet.png';
import LogOut from '../assets/LogOut.svg';
import Loading from '../assets/Loading.svg';
import LoadingWhite from '../assets/LoadingWhite.svg';
import './styles/Modal.css';

export const ModalBackground = () => <div className="modal__overlay" />;

export const DeskTopModalBackground = () => <div className="modal__overlay mobileInvisible" />;

export const SwitchedNetworksModal = ({
  prevNetwork,
  currentNetwork,
  handleSwitchedNetworkModal,
}) => (
    <div>
      <div className="modal__container modal--effect">
        <div className="modal">
          <img src={Switched} alt="Partners background" id="modal__switchedNetworks" />

          <div>
            <h3>
              Network Change Detected
            </h3>
            <p>
              Your profile will stay the same, but your Ethereum activity will update
            </p>
            <p id="modal__switchBack">
              <b>
                {`Switch back to ${prevNetwork} in MetaMask or continue on ${currentNetwork}`}
              </b>
            </p>
          </div>

          <button onClick={() => { handleSwitchedNetworkModal(); window.localStorage.setItem('shouldShowSwitchNetwork', true); }} type="button">
            {`Continue on ${currentNetwork}`}
          </button>

        </div>
      </div>

    </div>
  );

SwitchedNetworksModal.propTypes = {
  prevNetwork: PropTypes.string,
  currentNetwork: PropTypes.string.isRequired,
  handleSwitchedNetworkModal: PropTypes.func.isRequired,
};

SwitchedNetworksModal.defaultProps = {
  prevNetwork: '',
};

export const LoggedOutModal = ({
  handleLoggedOutModal,
  handleSignOut,
  isMobile,
}) => (
    <div>
      <div className="modal__container modal--effect">
        <div className="modal">
          <img src={LogOut} alt="Partners background" id="modal__switchedNetworks" />

          <div>
            <h3>
              Logged out
            </h3>

            {isMobile
              ? <p>Sign back in to your web3 wallet or exit 3Box</p>
              : <p>Sign back in to your MetaMask wallet or exit 3Box</p>
            }
          </div>

          <Link to={routes.LANDING}>
            <button onClick={() => { handleLoggedOutModal(); handleSignOut(); }} type="button">Exit</button>
          </Link>
        </div>
      </div>

    </div>
  );

LoggedOutModal.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  handleLoggedOutModal: PropTypes.func.isRequired,
  handleSignOut: PropTypes.func.isRequired,
};

export const CollectiblesModal = ({
  handleCollectiblesModal,
  selectedCollectible,
  updateGallery,
  isFavorite,
  padded,
  onPublicProfile,
  cover,
  contain,
}) => (
    <div>
      <div className="modal__container modal--effect collectibles__modal">
        <div className="collectiblesWrapper">
          <button onClick={() => handleCollectiblesModal()} type="button" className="tertiaryButton collectiblesClose">
            Close
          </button>
          <div className="modal collectiblesTileModal">
            <div
              className="modal__collectibles__image__wrapper"
              style={{ backgroundColor: `#${selectedCollectible.background_color}` }}
            >
              {(updateGallery && isFavorite && !onPublicProfile) && (
                <button
                  type="button"
                  className="collectibles__like modalLike"
                  title="Remove from favorites"
                  onClick={e => updateGallery(e, selectedCollectible, 'remove', 'fromModal')}
                >
                  <img src={HeartBlue} alt="" className="collectibles__like__heart--modal" />
                </button>)}

              {(updateGallery && !isFavorite && !onPublicProfile) && (
                <button
                  type="button"
                  className="collectibles__like modalLike"
                  title="Add to favorites"
                  onClick={e => updateGallery(e, selectedCollectible, null, 'fromModal')}
                >
                  <img src={HeartBlue} alt="" className="collectibles__like__heart--modal gallery__like" />
                </button>)}

              {padded && <span className="collectibles__image__shadow--modal" />}

              <img
                className={`
                modal__collectibles__image 
                ${padded && 'padded'}
                ${cover && 'cover'}
                ${contain && 'contain'}
                `}
                src={selectedCollectible.image_preview_url}
                alt="Collectible"
              />
            </div>

            <div className="modal__collectibles__info">
              <div className="modal__collectibles__info__wrapper">
                <h3>{selectedCollectible.name}</h3>
                <p>{`${selectedCollectible.asset_contract && selectedCollectible.asset_contract.name} ${selectedCollectible.token_id}`}</p>
              </div>
            </div>
            <div className="collectiblesMiniModal__wrapper">
              {selectedCollectible.description && (
                <p className="collectiblesMiniModal__description">
                  {selectedCollectible.description}
                </p>)}

              {selectedCollectible.orderedTraits && selectedCollectible.orderedTraits.length > 0
                && (
                  <div className="modal__collectibles__traits">
                    {selectedCollectible.orderedTraits.map((trait, i) => (
                      <div key={i} className="modal__collectibles__traits__trait">
                        <p className="modal__collectibles__traits__trait__type">{trait.trait_type.toUpperCase()}</p>
                        <p className="modal__collectibles__traits__trait__value">{trait.value}</p>
                      </div>
                    ))}
                  </div>)}
            </div>
          </div>
          <div
            className="onClickOutsideCollectibles--mobile"
            onClick={() => handleCollectiblesModal()}
            onKeyPress={() => handleCollectiblesModal()}
            role="button"
            tabIndex={0}
          />
        </div>
        <div
          className="onClickOutsideCollectibles"
          onClick={() => handleCollectiblesModal()}
          onKeyPress={() => handleCollectiblesModal()}
          role="button"
          tabIndex={0}
        />
      </div>
    </div>
  );

CollectiblesModal.propTypes = {
  show: PropTypes.bool.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  handleCollectiblesModal: PropTypes.func.isRequired,
  updateGallery: PropTypes.func,
  selectedCollectible: PropTypes.object,
  padded: PropTypes.bool,
  contain: PropTypes.bool,
  onPublicProfile: PropTypes.bool.isRequired,
  cover: PropTypes.bool,
};

CollectiblesModal.defaultProps = {
  selectedCollectible: {},
  updateGallery: {},
  cover: false,
  padded: false,
  contain: false,
};

export const SwitchedAddressModal = ({
  handleSwitchedAddressModal, handleSignOut, isMobile, prevAddress,
}) => (
    <div className="modal__container modal--effect">
      <div className="modal">
        <img src={Switched} alt="Partners background" id="modal__switchedNetworks" />

        <div>
          <h3>
            Address change detected
          </h3>
          {isMobile
            ? (
              <p>
                {`Revert to the previous address ${prevAddress} in your web3 wallet or sign back in with the new address`}
              </p>
            )
            : (
              <p>
                {`Revert to the previous address ${prevAddress} in your MetaMask wallet or sign back in with the new address`}
              </p>
            )
          }
        </div>

        <Link to={routes.LANDING}>
          <button onClick={() => { handleSwitchedAddressModal(); handleSignOut(); }} type="button">Sign in with new address</button>
        </Link>
      </div>
    </div>
  );

SwitchedAddressModal.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  handleSwitchedAddressModal: PropTypes.func.isRequired,
  handleSignOut: PropTypes.func.isRequired,
  prevAddress: PropTypes.string,
};

SwitchedAddressModal.defaultProps = {
  prevAddress: '',
};

// Landing Page Modals
export const ProvideConsentModal = ({
  handleConsentModal, isMobile,
}) => (
    <div className="modal__container modal--effect">
      <div className="modal">
        <img src={Consent} alt="Partners background" />
        <img src={Loading} alt="Loading" id="modal__loadingGraphic--access" />
        <div id="modal__copy__card">
          <h3>Log in to 3Box</h3>
          {isMobile
            ? <p>Approve the message in your web3 wallet to continue</p>
            : <p>Approve the message in your MetaMask wallet to continue</p>
          }
        </div>

        <button onClick={handleConsentModal} type="button" className="tertiaryButton">Close</button>
      </div>
    </div>
  );

ProvideConsentModal.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  handleConsentModal: PropTypes.func.isRequired,
};

export const ProvideAccessModal = ({
  handleAccessModal, isMobile, directLogin,
}) => (
    <div>
      <div className="modal__container modal--effect">
        <div className="modal">
          <img src={Access} alt="Partners background" />
          <img src={Loading} alt="Loading" id="modal__loadingGraphic--access" />

          <div id="modal__copy__card">
            <h3>Share Your Account</h3>
            {isMobile
              ? <p>To allow 3Box to read your Ethereum address, make sure you are logged in to your Web3 wallet.</p>
              : <p>To allow 3Box to read your Ethereum address, make sure you are logged in to MetaMask.</p>
            }
          </div>

          {!directLogin
            && <button onClick={handleAccessModal} type="button" className="tertiaryButton">Close</button>}
        </div>
      </div>
    </div>
  );

ProvideAccessModal.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  handleAccessModal: PropTypes.func.isRequired,
  directLogin: PropTypes.string,
};

ProvideAccessModal.defaultProps = {
  directLogin: '',
};

export const GithubVerificationModal = ({
  copyToClipBoard,
  handleGithubVerificationModal,
  did,
  message,
  verifyGithub,
  isGithubVerified,
  githubVerifiedFailed,
  verificationLoading,
  resetVerification,
  copySuccessful,
}) => (
    <div>
      <div className="modal__container modal--effect">
        <div className="modal githubModal">

          <div className="modal__github__description">
            <div className="modal__github__description__copy">
              <div className="modal__github__description__copy__header">
                <img src={GithubIcon} className="modal__github__description__githubIcon" alt="Github icon" />
                <h2>Verify your Github account</h2>
              </div>
              <p className="modal__github__description__copy__text">
                Linking your Github account to your 3Box profile
                allows your friends and apps to trust you more.
              </p>
            </div>
            <button
              className="modal__github__description__copy__button"
              type="button"
              onClick={() => {
                handleGithubVerificationModal();
                resetVerification('Github');
              }}
            >
              Cancel
            </button>
          </div>

          <div className="modal__github__steps">
            <div className="modal__github__steps__step">
              <div>
                <div className="modal__github__steps__instructions">
                  <div className="modal__github__steps__number">1</div>
                  <p className="modal__github__steps__text">
                    Copy your unique key below.
                  </p>
                </div>
                <p className="modal__github__description__copy__input blueFont" id="muportDID">{did}</p>
              </div>

              <button type="button" id="clickToCopy" onClick={() => copyToClipBoard('did', message)}>
                {`${copySuccessful ? 'Success' : 'Click to copy'}`}
              </button>
            </div>

            <div className="modal__github__steps__step">
              <div className="modal__github__steps__instructions">
                <div className="modal__github__steps__number">2</div>
                <p className="modal__github__steps__text">Open a new gist file in Github and paste the key in the body of the file.  Save the gist as public with any valid name and file type.</p>
              </div>
              <button type="button" onClick={() => window.open('https://gist.github.com/', '_blank')}>Open a gist file</button>
            </div>

            <div className="modal__github__steps__step">
              <div>
                <div className="modal__github__steps__instructions">
                  <div className="modal__github__steps__number">3</div>
                  <p className="modal__github__steps__text">
                    Check if your Github account was successfully verified below!
                  </p>
                </div>
                <p className="modal__github__description__copy__input--github blueFont">
                  {isGithubVerified
                    ? 'Your Github is verified!'
                    : githubVerifiedFailed
                      ? 'Verification failed'
                      : verificationLoading
                        ? (
                          <img src={Loading} alt="Loading" id="modal__loadingGraphic--noMargin" />
                        )
                        : 'Github not yet verified'}
                </p>
              </div>
              <button
                type="button"
                onClick={verifyGithub}
              >
                Verify
              </button>
            </div>
          </div>

          <div className="modal__github__done">
            <button
              type="button"
              disabled={!isGithubVerified}
              onClick={() => {
                handleGithubVerificationModal();
              }}
            >
              Done
            </button>
            <button
              className="modal__github__description__copy__button--mobile"
              type="button"
              onClick={() => {
                handleGithubVerificationModal();
                resetVerification('Github');
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

    </div>
  );

GithubVerificationModal.propTypes = {
  did: PropTypes.string,
  copySuccessful: PropTypes.bool.isRequired,
  copyToClipBoard: PropTypes.func.isRequired,
  handleGithubVerificationModal: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  verifyGithub: PropTypes.func.isRequired,
  resetVerification: PropTypes.func.isRequired,
  isGithubVerified: PropTypes.bool.isRequired,
  githubVerifiedFailed: PropTypes.bool.isRequired,
  verificationLoading: PropTypes.bool.isRequired,
};

GithubVerificationModal.defaultProps = {
  did: '',
};

export const TwitterVerificationModal = ({
  handleTwitterVerificationModal,
  did,
  message,
  verifyTwitter,
  isTwitterVerified,
  twitterVerifiedFailed,
  verificationLoading,
  resetVerification,
}) => (
    <div>
      <div className="modal__container modal--effect">
        <div className="modal githubModal">

          <div className="modal__github__description">
            <div className="modal__github__description__copy">
              <div className="modal__github__description__copy__header">
                <img src={TwitterIcon} className="modal__github__description__githubIcon" alt="Github icon" />
                <h2>Verify your Twitter account</h2>
              </div>
              <p className="modal__github__description__copy__text">
                Linking your Twitter account to your 3Box profile
                allows your friends and apps to trust you more.
              </p>
            </div>
            <button
              className="modal__github__description__copy__button"
              type="button"
              onClick={() => {
                handleTwitterVerificationModal();
                resetVerification('Twitter');
              }}
            >
              Cancel
            </button>
          </div>

          <div className="modal__github__steps">
            <div className="modal__twitter__steps__step">
              <div>
                <div className="modal__twitter__steps__instructions">
                  <div className="modal__github__steps__number">1</div>
                  <p className="modal__github__steps__text">
                    Tweet a unique key from the account you want to connect
                  </p>
                </div>
                <p className="modal__github__description__copy__input blueFont" id="muportDID">{did}</p>
              </div>
              <a href={`https://twitter.com/intent/tweet?text=${message}`} target="_blank" rel="noopener noreferrer" className="modal__github__description__copy__tweet">
                Tweet this
              </a>
            </div>

            <div className="modal__twitter__steps__step">
              <div>
                <div className="modal____steps__instructions">
                  <div className="modal__github__steps__number">2</div>
                  <p className="modal__github__steps__text">
                    Check if your Twitter account was successfully verified below!
                  </p>
                </div>
                <p className="modal__github__description__copy__input--github blueFont">
                  {isTwitterVerified
                    ? 'Your Twitter is verified!'
                    : twitterVerifiedFailed
                      ? 'Verification failed'
                      : verificationLoading
                        ? (
                          <img src={Loading} alt="Loading" id="modal__loadingGraphic--noMargin" />
                        )
                        : 'Twitter not yet verified'}
                </p>
              </div>
              <button
                type="button"
                onClick={verifyTwitter}
              >
                Verify
              </button>
            </div>
          </div>

          <div className="modal__github__done">
            <button
              type="button"
              disabled={!isTwitterVerified}
              onClick={() => {
                handleTwitterVerificationModal();
              }}
            >
              Done
            </button>
            <button
              className="modal__github__description__copy__button--mobile"
              type="button"
              onClick={() => {
                handleTwitterVerificationModal();
                resetVerification('Twitter');
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );

TwitterVerificationModal.propTypes = {
  did: PropTypes.string,
  handleTwitterVerificationModal: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  verifyTwitter: PropTypes.func.isRequired,
  resetVerification: PropTypes.func.isRequired,
  isTwitterVerified: PropTypes.bool.isRequired,
  twitterVerifiedFailed: PropTypes.bool.isRequired,
  verificationLoading: PropTypes.bool.isRequired,
};

TwitterVerificationModal.defaultProps = {
  did: '',
};

export const EmailVerificationModal = ({
  handleEmailVerificationModal,
  did,
  verifyEmail,
  isEmailVerified,
  emailVerifiedFailed,
  verificationLoading,
  resetVerification,
  sendVerificationEmail,
  emailVerificationMessage,
  isEmailSending,
  emailVerificationErrMsg,
  disableSendVerificationEmail,
  handleFormChange,
  emailCode,
}) => (
    <div>
      <div className="modal__container modal--effect">
        <div className="modal githubModal">

          <div className="modal__github__description">
            <div className="modal__github__description__copy">
              <div className="modal__github__description__copy__header">
                <img src={Email} className="modal__github__description__githubIcon" alt="Github icon" />
                <h2>Verify your Email Address</h2>
              </div>
              <p className="modal__github__description__copy__text">
                Confirm your email to add trusted contact information to your account.
                This will remain private unless you choose to share it with third-party services.
              </p>
            </div>
            <button
              className="modal__github__description__copy__button"
              type="button"
              onClick={() => {
                handleEmailVerificationModal();
                resetVerification('Email');
              }}
            >
              Cancel
            </button>
          </div>

          <div className="modal__github__steps">
            <div className="modal__twitter__steps__step">
              <div>
                <div className="modal__twitter__steps__instructions">
                  <div className="modal__github__steps__wrapper">
                    <div className="modal__github__steps__number">1</div>
                    <h3>Send code</h3>
                  </div>
                  <p className="modal__github__steps__text">
                    Send a verification code to your email address.
                  </p>
                </div>
              </div>
              <div className="modal__email__button">
                <button disabled={disableSendVerificationEmail} onClick={() => sendVerificationEmail(did)} className={`modal__github__description__copy__tweet ${isEmailSending && 'loadingPadding'} ${emailVerificationMessage && 'darker'}`} type="button">
                  {(!emailVerificationMessage && !isEmailSending) ? 'Send code' : emailVerificationMessage}
                  {isEmailSending && <img src={LoadingWhite} alt="Loading" className="modal__loadingGraphic--email" />}
                </button>
              </div>
            </div>

            <div className="modal__twitter__steps__step">
              <div className="modal__twitter__steps__step--wrapper">
                <div className="modal____steps__instructions">
                  <div className="modal__github__steps__wrapper">
                    <div className="modal__github__steps__number">2</div>
                    <h3>Verify code</h3>
                  </div>
                  <p className="modal__github__steps__text">
                    Verify your email address by entering the code you received below.
                  </p>
                </div>
                <input
                  placeholder="Enter code"
                  className={`modal__github__description__copy__input--email ${emailVerificationErrMsg && 'noBottomMargin'}`}
                  type="text"
                  id="emailCode"
                  onChange={e => handleFormChange(e, 'emailCode')}
                  value={emailCode}
                />
                {emailVerificationErrMsg && (
                  <p className="modal__email__error">
                    {emailVerificationErrMsg}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => verifyEmail()}
                className={`modal__github__description__copy__tweet ${verificationLoading && 'loadingPadding'} ${(emailVerifiedFailed || isEmailVerified) && 'darker'}`}
              >
                {isEmailVerified
                  ? 'Verified!'
                  : emailVerifiedFailed
                    ? 'Failed'
                    : verificationLoading
                      ? (
                        <img src={LoadingWhite} alt="Loading" className="modal__loadingGraphic--email" />
                      )
                      : 'Verify'}
              </button>
            </div>
          </div>

          <div className="modal__github__done">
            <button
              type="button"
              disabled={!isEmailVerified}
              onClick={() => {
                handleEmailVerificationModal();
              }}
            >
              Done
            </button>
            <button
              className="modal__github__description__copy__button--mobile"
              type="button"
              onClick={() => {
                handleEmailVerificationModal();
                resetVerification('Email');
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );

EmailVerificationModal.propTypes = {
  did: PropTypes.string.isRequired,
  emailVerificationMessage: PropTypes.string.isRequired,
  isEmailSending: PropTypes.bool.isRequired,
  handleEmailVerificationModal: PropTypes.func.isRequired,
  verifyEmail: PropTypes.func.isRequired,
  resetVerification: PropTypes.func.isRequired,
  sendVerificationEmail: PropTypes.func.isRequired,
  isEmailVerified: PropTypes.bool.isRequired,
  emailVerifiedFailed: PropTypes.bool.isRequired,
  verificationLoading: PropTypes.bool.isRequired,
  emailVerificationErrMsg: PropTypes.string.isRequired,
  disableSendVerificationEmail: PropTypes.bool.isRequired,
  handleFormChange: PropTypes.func.isRequired,
  emailCode: PropTypes.string.isRequired,
};

export const AccessDeniedModal = ({
  handleDeniedAccessModal, isMobile,
}) => (
    <div>
      <div className="modal__container modal--effect">
        <div className="modal">
          <img src={Access} alt="Partners background" />

          <div id="modal__copy__card">
            <h3>Access Denied to 3Box</h3>
            {isMobile
              ? <p>3Box cannot proceed without access to the address associated to your account</p>
              : <p>3Box cannot proceed without access to the address associated to your account</p>
            }
          </div>

          <button onClick={handleDeniedAccessModal} type="button" className="tertiaryButton">Close</button>
        </div>
      </div>
    </div>
  );

AccessDeniedModal.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  handleDeniedAccessModal: PropTypes.func.isRequired,
};

export const LoadingThreeBoxProfileModal = () => (
  <div>
    <div className="modal__container modal--effect">
      <div className="modal loadingModal">
        <div className="modal__threebox__mollie">
          <img src={Mollie} alt="Mollie the Narwhal" className="modal__loading__mollie" />
          <img src={ThreeBoxLogoBlue} alt="3Box Logo" className="modal__loading__3" />
        </div>
        <img src={Loading} alt="Loading" id="modal__loadingGraphic" />
      </div>
    </div>
  </div>
);

export const FileSizeModal = ({ closeFileSizeModal }) => (
  <div>
    <div className="modal__container modal--effect">
      <div className="modal">

        <div>
          <p>Profile pictures must be less than 2.5 MB</p>
        </div>

        <button onClick={closeFileSizeModal} type="button" className="tertiaryButton">Close</button>
      </div>
    </div>
  </div>
);

FileSizeModal.propTypes = {
  closeFileSizeModal: PropTypes.func.isRequired,
};

export const RequireMetaMaskModal = ({ closeRequireMetaMaskModal, isMobile }) => (
  <div className="mobileInvisible">
    <div className="modal__container modal--effect">
      <div className="modal">
        <img src={MetaMaskWallet} alt="Partners background" />

        <div id="modal__copy__card">
          <h3>
            Install Web3 Wallet
          </h3>
          {isMobile
            ? <p>You must have a web3 wallet to use 3Box</p>
            : <p>You must have MetaMask to use 3Box</p>
          }
          <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer">
            <button type="button" className="modal__reqWeb3__button">
              Download MetaMask
            </button>
          </a>
        </div>

        <button onClick={closeRequireMetaMaskModal} type="button" className="tertiaryButton">Close</button>
      </div>
    </div>
  </div>
);

RequireMetaMaskModal.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  closeRequireMetaMaskModal: PropTypes.func.isRequired,
};

export const SignInToWalletModal = ({ handleRequireWalletLoginModal, isMobile }) => (
  <div>
    <div className="modal__container modal--effect">
      <div className="modal">
        <img src={MetaMaskWallet} alt="Partners background" />

        <div id="modal__copy__card">
          <h3>
            Unlock Your Wallet
          </h3>
          {isMobile
            ? <p>Unlock your web3 wallet to continue</p>
            : <p>Unlock your MetaMask wallet to continue</p>
          }
        </div>
        <button onClick={handleRequireWalletLoginModal} type="button" className="tertiaryButton">Close</button>
      </div>
    </div>
  </div>
);

SignInToWalletModal.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  handleRequireWalletLoginModal: PropTypes.func.isRequired,
};


export const SyncingModal = () => (
  <div>
    <div className="modal__container--sync modal--effect">
      <div className="modal--sync ">
        <div className="modal--sync__wrapper">
          <img src={LoadingWhite} alt="Loading" id="modal__loadingGraphic" />

          <div id="logo" className="modal__loading3Box">
            <img src={ThreeBoxLogoWhite} alt="3Box Logo" />
          </div>

          <div>
            <p>SYNCING 3BOX DATA</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const PublicProfileLoading = () => (
  <div>
    <div className="modal__container--sync modal--effect">
      <div className="modal--sync ">
        <div className="modal--sync__wrapper">
          <img src={LoadingWhite} alt="Loading" id="modal__loadingGraphic" />

          <div id="logo" className="modal__loading3Box">
            <img src={ThreeBoxLogoWhite} alt="3Box Logo" />
          </div>

          <div>
            <p>LOADING PUBLIC PROFILE</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const SignInThroughPublicProfileBanner = ({ show, handleHideSignInBanner }) => (
  <React.Fragment>
    <div className={`${show ? '' : 'hideBanner'} signInFromPublicProfileBanner`}>
      <div className="signInFromPublicProfileBanner__wrapper">
        <p>
          This is the public version of your profile.  Sign in to access your full profile.
        </p>
        <p
          onClick={handleHideSignInBanner}
          onKeyPress={handleHideSignInBanner}
          role="button"
          className="webThreeBanner__close"
        >
          &#10005;
        </p>
      </div>
    </div>
  </React.Fragment>
);

SignInThroughPublicProfileBanner.propTypes = {
  show: PropTypes.bool.isRequired,
  handleHideSignInBanner: PropTypes.func.isRequired,
};

export const ErrorModal = ({ closeErrorModal, errorMessage }) => (
  <div>
    <div className="modal__container modal--effect">
      <div className="modal">
        {
          (errorMessage && errorMessage.message.substring(0, 65) === 'Error: MetaMask Message Signature: User denied message signature.')
            || (errorMessage && errorMessage.message.substring(0, 26) === 'value/</<@moz-extension://')
            ? <img src={Consent} alt="Consent required" />
            : <img src={ErrorIcon} alt="Error" id="modal__switchedNetworks" />
        }
        <div
          id={(errorMessage && errorMessage.message.substring(0, 65) === 'Error: MetaMask Message Signature: User denied message signature.')
            || (errorMessage && errorMessage.message.substring(0, 58) === 'Error: MetaMask Message Signature: from field is required.')
            || (errorMessage && errorMessage.message.substring(0, 26) === 'value/</<@moz-extension://')
            ? 'modal__copy__card' : ''}
        >
          {
            (errorMessage && errorMessage.message.substring(0, 65) === 'Error: MetaMask Message Signature: User denied message signature.')
              || ((errorMessage && errorMessage.message.substring(0, 26) === 'value/</<@moz-extension://'))
              ? <h3>Log in to 3Box</h3>
              : <h3>Error</h3>
          }
          {
            (errorMessage && errorMessage.message.substring(0, 65) === 'Error: MetaMask Message Signature: User denied message signature.')
              || ((errorMessage && errorMessage.message.substring(0, 26) === 'value/</<@moz-extension://'))
              ? <p>You must provide consent to 3Box in your web3 wallet (e.g. MetaMask) to sign in or create a profile, please try again</p>
              : (
                <React.Fragment>
                  <p>{errorMessage && errorMessage.message.substring(0, 200)}</p>
                  <br />
                  <p>
                    Please refresh the page and try again
                  </p>
                </React.Fragment>
              )
          }
        </div>
        <button onClick={closeErrorModal} type="button" className="tertiaryButton">Close</button>
      </div>
    </div>
  </div>
);

ErrorModal.propTypes = {
  errorMessage: PropTypes.string,
  closeErrorModal: PropTypes.func.isRequired,
};

ErrorModal.defaultProps = {
  errorMessage: '',
};

export const MustConsentModal = ({ closeErrorModal, isMobile }) => (
  <div>
    <div className="modal__container modal--effect">
      <div className="modal">
        <img src={Consent} alt="Consent required" />
        <div id="modal__copy__card">
          <h3>Sign in to 3Box</h3>
          {isMobile
            ? <p>You must provide consent to 3Box in your web3 wallet to sign in or create a profile, please try again</p>
            : <p>You must provide consent to 3Box in MetaMask to sign in or create a profile, please try again</p>
          }
        </div>
        <button onClick={closeErrorModal} type="button" className="tertiaryButton">Close</button>
      </div>
    </div>
  </div>
);

MustConsentModal.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  closeErrorModal: PropTypes.func.isRequired,
};

export const SignInToThreeBox = ({ handleSignInModal }) => (
  <div>
    <div className="modal__container modal--effect">
      <div className="modal">
        <div id="logo" className="modal__loading3Box">
          <img src={ThreeBoxLogoBlue} alt="3Box Logo" />
        </div>

        <div id="modal__copy__card">
          <h3>
            Sign in
          </h3>
          <p>You must be signed in to 3Box to go to that page</p>
        </div>

        <button onClick={handleSignInModal} type="button" className="tertiaryButton">Close</button>
      </div>
    </div>
  </div>
);

SignInToThreeBox.propTypes = {
  handleSignInModal: PropTypes.func.isRequired,
};

export const MobileWalletRequiredModal = ({ isIOS, handleMobileWalletModal }) => (
  <div id="mobile__landing__prompt">
    <div id="mobile__landing__prompt__logo">
      <img src={ThreeBoxLogoWhite} alt="3Box Logo" />
    </div>

    <div id="mobile__landing__prompt__text">
      <p>3Box requires a mobile dApp browser in order to work</p>
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

    <button onClick={() => handleMobileWalletModal()} type="button" className="tertiaryButton mobile__landing__closeButton">X</button>
  </div>
);

MobileWalletRequiredModal.propTypes = {
  isIOS: PropTypes.bool.isRequired,
  handleMobileWalletModal: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export const OnBoardingModalDesktop = ({ handleOnboardingModal, showOne, showTwo }) => (
  <div>
    <div className="modal__onBoardingModal__container modal--effect">
      <div className={`${showOne ? 'showModalImage' : ''} modal__onBoardingModal`}>
        <img src={OnBoardingModalGraphic} alt="Partners background" id="modal__onBoardingModal__image" />
        <button onClick={() => handleOnboardingModal(false)} type="button" id="modal__onBoardingModal__button">Get started</button>
        <div id="modal__onBoardingModal__progressBar">
          <div id="modal__onBoardingModal__progressBar__progress--highlight" />
          <div id="modal__onBoardingModal__progressBar__progress--dull" />
        </div>
      </div>

      <div className={`${showTwo ? 'showModalImage' : ''} modal__onBoardingModal`}>
        <img src={OnBoardingModalGraphic2} alt="Partners background" id="modal__onBoardingModal__image" />
        <button onClick={handleOnboardingModal} type="button" id="modal__onBoardingModal__button">Let's go</button>
        <div id="modal__onBoardingModal__progressBar">
          <div id="modal__onBoardingModal__progressBar__progress--dull" />
          <div id="modal__onBoardingModal__progressBar__progress--highlight" />
        </div>
      </div>
    </div>
  </div>
);

OnBoardingModalDesktop.propTypes = {
  handleOnboardingModal: PropTypes.func.isRequired,
  showOne: PropTypes.bool.isRequired,
  showTwo: PropTypes.bool.isRequired,
};

export const OnBoardingModalMobile = ({
  isMobile,
  handleNextMobileModal,
  showOne,
  showTwo,
  showThree,
  showFour,
  handleOnboardingModal,
}) => (
    <div>
      <div className="modal__onBoardingModal__container modal--effect">

        <div className={`${showOne ? 'showModalImage' : ''} modal__onBoardingModal`}>
          <img src={OnBoardingModalGraphic} alt="Partners background" className={`${showOne ? 'fadeImage' : ''} modal__onBoardingModal__image`} />
          <button onClick={() => { handleNextMobileModal(undefined, 'One'); handleOnboardingModal(isMobile); }} type="button" id="modal__onBoardingModal__button">Get started</button>
          <div id="modal__onBoardingModal__progressBar">
            <div id="modal__onBoardingModal__progressBar__progress--highlight" />
            <div id="modal__onBoardingModal__progressBar__progress--dull" />
            <div id="modal__onBoardingModal__progressBar__progress--dull" />
            <div id="modal__onBoardingModal__progressBar__progress--dull" />
          </div>
        </div>

        <div className={`${showTwo ? 'showModalImage' : ''} modal__onBoardingModal`}>
          <img src={OnBoardingModalMobileGraphic1} alt="Partners background" className={`${showTwo ? 'fadeImage' : ''} modal__onBoardingModal__image`} />
          <button onClick={() => handleNextMobileModal('One', 'Two')} type="button" id="modal__onBoardingModal__button">Next</button>
          <div id="modal__onBoardingModal__progressBar">
            <div id="modal__onBoardingModal__progressBar__progress--dull" />
            <div id="modal__onBoardingModal__progressBar__progress--highlight" />
            <div id="modal__onBoardingModal__progressBar__progress--dull" />
            <div id="modal__onBoardingModal__progressBar__progress--dull" />
          </div>
        </div>

        <div className={`${showThree ? 'showModalImage' : ''} modal__onBoardingModal`}>
          <img src={OnBoardingModalMobileGraphic2} alt="Partners background" className={`${showThree ? 'fadeImage' : ''} modal__onBoardingModal__image`} />
          <button onClick={() => handleNextMobileModal('Two', 'Three')} type="button" id="modal__onBoardingModal__button">Next</button>
          <div id="modal__onBoardingModal__progressBar">
            <div id="modal__onBoardingModal__progressBar__progress--dull" />
            <div id="modal__onBoardingModal__progressBar__progress--dull" />
            <div id="modal__onBoardingModal__progressBar__progress--highlight" />
            <div id="modal__onBoardingModal__progressBar__progress--dull" />
          </div>
        </div>

        <div className={`${showFour ? 'showModalImage' : ''} modal__onBoardingModal`}>
          <img src={OnBoardingModalMobileGraphic3} alt="Partners background" className={`${showFour ? 'fadeImage' : ''} modal__onBoardingModal__image`} />
          <button onClick={() => handleNextMobileModal('Three', undefined)} type="button" id="modal__onBoardingModal__button">Let's go</button>
          <div id="modal__onBoardingModal__progressBar">
            <div id="modal__onBoardingModal__progressBar__progress--dull" />
            <div id="modal__onBoardingModal__progressBar__progress--dull" />
            <div id="modal__onBoardingModal__progressBar__progress--dull" />
            <div id="modal__onBoardingModal__progressBar__progress--highlight" />
          </div>
        </div>

      </div>
    </div>
  );

OnBoardingModalMobile.propTypes = {
  handleNextMobileModal: PropTypes.func.isRequired,
  handleOnboardingModal: PropTypes.func.isRequired,
  showOne: PropTypes.bool.isRequired,
  showTwo: PropTypes.bool.isRequired,
  showThree: PropTypes.bool.isRequired,
  showFour: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

export const FollowingListModal = ({
  otherFollowing, handleContactsModal, otherName, following, otherProfileAddress }) => (
    <div className="modal__container modal--effect followingModal-zindex">
      <div className="modal followingModal">
        <h2>{`${otherName || `${otherProfileAddress.substr(0, 6)}...${otherProfileAddress.substr(-4)}`} is following`}</h2>

        {otherFollowing.length === 0 && (
          <div className="contactsModal_list_empty">
            <img src={ContactsIcon} alt="Following" />
            <p>This user isn't following anyone yet</p>
          </div>
        )}

        {otherFollowing.length > 0 && (
          <div className="contactsModal_list">
            {otherFollowing.map((user) => {
              let isFollowing = false;
              following.forEach((profile) => {
                if (profile[1].toLowerCase() === user[1].toLowerCase()) {
                  isFollowing = true;
                }
              });

              return (
                <FollowingTile
                  user={user[0]}
                  address={user[1]}
                  isFollowing={isFollowing}
                  handleContactsModal={handleContactsModal}
                  fromModal
                  key={user[0]}
                />
              );
            })}
          </div>
        )}
      </div>
      <div
        className="onClickOutsideCollectibles--mobile"
        onClick={() => handleContactsModal()}
        onKeyPress={() => handleContactsModal()}
        role="button"
        tabIndex={0}
      />
      <div
        className="onClickOutsideCollectibles"
        onClick={() => handleContactsModal()}
        onKeyPress={() => handleContactsModal()}
        role="button"
        tabIndex={0}
      />
    </div>
  );

FollowingListModal.propTypes = {
  otherFollowing: PropTypes.array,
  otherName: PropTypes.string,
  otherProfileAddress: PropTypes.string,
  handleContactsModal: PropTypes.func.isRequired,
  following: PropTypes.array,
};

FollowingListModal.defaultProps = {
  otherFollowing: [],
  otherName: '',
  otherProfileAddress: '',
  following: [],
};

export const FollowingIsPublicModal = ({ handleFollowingPublicModal, saveFollowing, otherAddressToFollow }) => (
  <div className="modal__container modal--effect">
    <div className="modal followingWarning">
      <img src={ContactsIcon} alt="Following" className="followingWarning_icon" />

      <div className="followingWarning_text">
        <h2>Following is public</h2>
        <p>The users you follow will be public and viewable by others.</p>
      </div>

      <div className="followingWarning_buttons">
        <button
          onClick={() => handleFollowingPublicModal()}
          type="button"
          className="outlineButton"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            console.log('insave');
            saveFollowing(otherAddressToFollow, true);
            handleFollowingPublicModal();
          }}
          type="button"
        >
          Follow user
        </button>
      </div>
    </div>

    <div
      className="onClickOutsideCollectibles"
      onClick={handleFollowingPublicModal}
      onKeyPress={handleFollowingPublicModal}
      role="button"
      tabIndex={0}
    />
  </div>
);

FollowingIsPublicModal.propTypes = {
  handleFollowingPublicModal: PropTypes.func.isRequired,
  saveFollowing: PropTypes.func.isRequired,
  otherAddressToFollow: PropTypes.string,
};

FollowingIsPublicModal.defaultProps = {
  otherAddressToFollow: '',
};