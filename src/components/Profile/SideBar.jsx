import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';

import PubSideBar from './PublicProfile/PubSideBar';
import { copyToClipBoard } from '../../state/actions';
import * as routes from '../../utils/routes';
import ActivityIcon from '../../assets/Activity.svg';
import DetailsIcon from '../../assets/Details.svg';
import CollectiblesIcon from '../../assets/Collectibles.svg';
import EthereumLogo from '../../assets/EthereumIcon.svg';
import Copy from '../../assets/Copy.svg';
import CopyGrey from '../../assets/CopyGrey.svg';
import '../../views/styles/Profile.css';
import '../styles/Modal.css';

const SideBar = ({
  name,
  image,
  coverPhoto,
  description,
  emoji,
  location,
  onPublicProfilePage,
  copyToClipBoard,
  copySuccessful,
  showDownloadBanner,
  publicCoverPhoto,
  publicImage,
  publicName,
  publicEmoji,
  publicDescription,
  showSignInBanner,
  currentAddress,
}) => (
    <div>
      {!onPublicProfilePage && (
        coverPhoto.length > 0 && coverPhoto[0].contentUrl
          ? <img src={`https://ipfs.infura.io/ipfs/${coverPhoto[0].contentUrl['/']}`} className={`${showDownloadBanner ? 'bannerMargin' : ''} profile__coverPhoto clearProfPic`} alt="profile" />
          : <div className={`${showDownloadBanner ? 'bannerMargin' : ''} profile__coverPhoto`} />)
      }
      {onPublicProfilePage && (
        publicCoverPhoto.length > 0 && publicCoverPhoto[0].contentUrl
          ? <img src={`https://ipfs.infura.io/ipfs/${publicCoverPhoto[0].contentUrl['/']}`} className={`${showSignInBanner ? 'showSignInBanner' : ''} ${(showDownloadBanner || showSignInBanner) ? 'bannerMargin' : ''} profile__coverPhoto clearProfPic`} alt="profile" />
          : <div className={`${showSignInBanner ? 'showSignInBanner' : ''} ${(showDownloadBanner || showSignInBanner) ? 'bannerMargin' : ''} profile__coverPhoto`} />)
      }

      <div id="profile" className={!onPublicProfilePage && 'onMyProfile'}>
        <div id="profile__fixed">

          <div className={`
            ${showSignInBanner ? 'showSignInBanner' : ''} 
            ${onPublicProfilePage ? 'addBorderBottom' : ''} 
            ${(showDownloadBanner || showSignInBanner) ? 'bannerMargin' : ''} 
            profile__user__info
          `}
          >

            {!onPublicProfilePage && (
              image.length > 0 && image[0].contentUrl
                ? <img src={`https://ipfs.infura.io/ipfs/${image[0].contentUrl['/']}`} className="profile__user__picture clearProfPic" alt="profile" />
                : <div className="profile__user__picture" />)
            }

            {onPublicProfilePage && (
              publicImage.length > 0 && publicImage[0].contentUrl
                ? <img src={`https://ipfs.infura.io/ipfs/${publicImage[0].contentUrl['/']}`} className="profile__user__picture clearProfPic" alt="profile" />
                : <div className="profile__user__picture" />)
            }

            <div className="profile__basic">
              <div className="profile__basic__wrapper">
                {!onPublicProfilePage && (name
                  ? <h2 id="profile__user__name">{name}</h2>
                  : <Link to={`/${currentAddress}/${routes.EDIT}`}><h2 id="profile__user__name__add">Add name</h2></Link>)
                }

                {onPublicProfilePage && (publicName
                  ? <h2 id="profile__user__name">{publicName}</h2>
                  : '')
                }


                <span className="profile__basic__emoji">
                  {!onPublicProfilePage && (emoji.code ? emoji.code : emoji)}
                  {(onPublicProfilePage && publicEmoji) && (publicEmoji.code ? publicEmoji.code : publicEmoji)}
                </span>
              </div>

              <div id="profile__network" title="Network">
                <img id="profile__network__networkLogo" src={EthereumLogo} alt="Ethereum Logo" />
                <p id="profile__details__address" title={currentAddress}>
                  {!onPublicProfilePage && currentAddress && currentAddress.substring(0, 8)}
                  {onPublicProfilePage && location.pathname.split('/')[1].substring(0, 8)}
                  ...
                </p>
              </div>

              <p className="profile__basic__description">
                {!onPublicProfilePage && description}
                {onPublicProfilePage && publicDescription}
              </p>

              {onPublicProfilePage && (
                <div className="publicProfile__basic--mobile">
                  <PubSideBar />
                </div>)}

            </div>

            <div className="profile__category">
              <div className="profile__category__sectionWrapper">
                {!onPublicProfilePage ? (
                  <React.Fragment>
                    <NavLink exact to={`/${currentAddress}/${routes.ACTIVITY}`} className="profile__category__section">
                      <div className="profile__category__tabIcon__wrappper">
                        <img src={ActivityIcon} alt="Activity" className="profile__category__tabIcon--activity" />
                      </div>
                      Activity
                    </NavLink>
                    <NavLink exact to={`/${currentAddress}/${routes.DETAILS}`} className="profile__category__section ">
                      <div className="profile__category__tabIcon__wrappper">
                        <img src={DetailsIcon} alt="Activity" className="profile__category__tabIcon--details" />
                      </div>
                      Details
                    </NavLink>
                    <NavLink exact to={`/${currentAddress}/${routes.COLLECTIBLES}`} className="profile__category__section ">
                      <div className="profile__category__tabIcon__wrappper">
                        <img src={CollectiblesIcon} alt="Activity" className="profile__category__tabIcon--collectibles" />
                      </div>
                      Collectibles
                    </NavLink>
                  </React.Fragment>)
                  : (
                    <PubSideBar />)}
              </div>
            </div>

            {/* this is showing when its not supposed to, how does it know that its my currentAddress??? */}
            {(!onPublicProfilePage)
              && (
                <button type="button" onClick={() => copyToClipBoard('profile', null)} className="profile__links__copy">
                  <img className="profile__links__copy__icon" src={CopyGrey} alt="Copy icon" />
                  <p>
                    Share profile
                  </p>
                </button>
              )}

            <div id="profile__footer">
              <div id="profile__footer__contents">
                <p>3Box 2018</p>
                <Link to={routes.TERMS}>Terms</Link>
                <Link to={routes.PRIVACY}>Privacy</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {document.queryCommandSupported('copy') && (
        <div className={`${copySuccessful ? 'showModal' : ''} modal__container--copied modal--effect`}>
          <div className="modal--sync">
            <div className="modal--sync__copy__wrapper">
              <img src={Copy} className="modal__copy__ico" alt="Copied" />
              <p>COPIED PROFILE URL</p>
            </div>
          </div>
        </div>)}
    </div>
  );

SideBar.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  emoji: PropTypes.string,
  publicEmoji: PropTypes.string,
  currentAddress: PropTypes.string,
  publicName: PropTypes.string,
  publicDescription: PropTypes.string,
  image: PropTypes.array,
  coverPhoto: PropTypes.array,
  publicCoverPhoto: PropTypes.array,
  publicImage: PropTypes.array,
  location: PropTypes.object.isRequired,
  onPublicProfilePage: PropTypes.bool,
  copySuccessful: PropTypes.bool,
  showDownloadBanner: PropTypes.bool,
  showSignInBanner: PropTypes.bool,
  copyToClipBoard: PropTypes.func.isRequired,
};

SideBar.defaultProps = {
  name: '',
  publicName: '',
  description: '',
  publicEmoji: '',
  publicDescription: '',
  currentAddress: '',
  image: [],
  coverPhoto: [],
  publicImage: [],
  publicCoverPhoto: [],
  emoji: '',
  copySuccessful: false,
  onPublicProfilePage: false,
  showDownloadBanner: false,
  showSignInBanner: false,
};

function mapState(state) {
  return {
    name: state.threeBox.name,
    image: state.threeBox.image,
    coverPhoto: state.threeBox.coverPhoto,
    emoji: state.threeBox.emoji,
    description: state.threeBox.description,
    copySuccessful: state.threeBox.copySuccessful,
    showDownloadBanner: state.threeBox.showDownloadBanner,
    showSignInBanner: state.threeBox.showSignInBanner,
    onPublicProfilePage: state.threeBox.onPublicProfilePage,
    publicCoverPhoto: state.threeBox.publicCoverPhoto,
    publicImage: state.threeBox.publicImage,
    publicName: state.threeBox.publicName,
    publicEmoji: state.threeBox.publicEmoji,
    publicDescription: state.threeBox.publicDescription,
    currentAddress: state.threeBox.currentAddress,
  };
}

export default withRouter(connect(mapState,
  {
    copyToClipBoard,
  })(SideBar));
