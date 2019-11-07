import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import ProfilePicture from '../../components/ProfilePicture';
import PubSideBar from './PublicProfile/PubSideBar';
import { copyToClipBoard, shortenEthAddr } from '../../utils/funcs';
import * as routes from '../../utils/routes';
import ActivityIcon from '../../assets/Activity.svg';
import Post from '../../assets/Post.svg';
import DetailsIcon from '../../assets/Details.svg';
import CollectiblesIcon from '../../assets/Collectibles.svg';
import ContactsIcon from '../../assets/Contacts.svg';
import EthereumLogo from '../../assets/EthereumIcon.svg';
import Copy from '../../assets/Copy.svg';
import CopyGrey from '../../assets/CopyGrey.svg';
import './styles/Profile.css';
import '../../components/styles/Modal.css';

const SideBar = ({
  name,
  coverPhoto,
  description,
  emoji,
  location,
  onOtherProfilePage,
  copyToClipBoard,
  copySuccessful,
  otherCoverPhoto,
  otherName,
  otherEmoji,
  otherDescription,
  showSignInBanner,
  currentAddress,
  isFollowing,
  isLoggedIn,
  isMe,
}) => (
    <div>
      {!onOtherProfilePage && (
        coverPhoto && coverPhoto.length > 0 && coverPhoto[0].contentUrl
          ? <img src={`https://ipfs.infura.io/ipfs/${coverPhoto[0].contentUrl['/']}`} className="profile__coverPhoto clearProfPic" alt="profile" />
          : <div className="profile__coverPhoto" />
      )}

      {onOtherProfilePage && (
        otherCoverPhoto && otherCoverPhoto.length > 0 && otherCoverPhoto[0].contentUrl
          ? <img src={`https://ipfs.infura.io/ipfs/${otherCoverPhoto[0].contentUrl['/']}`} className={`${showSignInBanner ? 'showSignInBanner' : ''} ${showSignInBanner ? 'bannerMargin' : ''} profile__coverPhoto clearProfPic`} alt="profile" />
          : <div className={`${showSignInBanner ? 'showSignInBanner' : ''} ${showSignInBanner ? 'bannerMargin' : ''} profile__coverPhoto`} />
      )}

      <div id="profile" className={!onOtherProfilePage ? 'onMyProfile' : ''}>
        <div id="profile__fixed">

          <div className={`
            ${showSignInBanner ? 'showSignInBanner' : ''} 
            ${onOtherProfilePage ? 'addBorderBottom' : ''} 
            ${(onOtherProfilePage && showSignInBanner) ? 'bannerMargin' : ''} 
            ${(onOtherProfilePage && isLoggedIn) ? 'loggedInMargin' : ''} 
            profile__user__info
          `}
          >
            <ProfilePicture
              pictureClass="profile__user__picture clearProfPic"
              isMyPicture={!onOtherProfilePage}
            />

            <div className="profile__basic">
              <div className="profile__basic__wrapper">
                {!onOtherProfilePage && (name
                  ? <h2 className="profile__user__name">{name}</h2>
                  : (
                    <Link to={`/${currentAddress}/${routes.EDIT}`}>
                      <h2 className="profile__user__name profile__user__name__add">Add name</h2>
                    </Link>
                  ))}

                {onOtherProfilePage && (otherName
                  ? <h2 className="profile__user__name">{otherName}</h2>
                  : ''
                )}

                <span className="profile__basic__emoji">
                  {(!onOtherProfilePage && emoji) && (emoji.code ? emoji.code : emoji)}
                  {(onOtherProfilePage && otherEmoji) && (otherEmoji.code ? otherEmoji.code : otherEmoji)}
                </span>
              </div>

              <div id="profile__network" title="Network">
                <img id="profile__network__networkLogo" src={EthereumLogo} alt="Ethereum Logo" />
                <p id="profile__details__address" title={currentAddress}>
                  {!onOtherProfilePage && currentAddress && shortenEthAddr(currentAddress)}
                  {onOtherProfilePage && shortenEthAddr(location.pathname.split('/')[1])}
                </p>
              </div>

              <p className="profile__basic__description">
                {!onOtherProfilePage && description}
                {onOtherProfilePage && otherDescription}
              </p>

              {onOtherProfilePage && (
                <div className="publicProfile__basic--mobile">
                  <PubSideBar isFollowing={isFollowing} isMe={isMe} />
                </div>
              )}

            </div>

            <div className="profile__category">
              <div className="profile__category__sectionWrapper">
                {!onOtherProfilePage ? (
                  <>
                    <NavLink exact to={`/${currentAddress}/${routes.WALL}`} className="profile__category__section">
                      <div className="profile__category__tabIcon__wrappper">
                        <img src={Post} alt="Activity" className="profile__category__tabIcon--details" />
                      </div>
                      Wall
                    </NavLink>

                    <NavLink exact to={`/${currentAddress}/${routes.ACTIVITY}`} className="profile__category__section">
                      <div className="profile__category__tabIcon__wrappper">
                        <img src={ActivityIcon} alt="Activity" className="profile__category__tabIcon--activity" />
                      </div>
                      Activity
                    </NavLink>

                    <NavLink exact to={`/${currentAddress}/${routes.DETAILS}`} className="profile__category__section ">
                      <div className="profile__category__tabIcon__wrappper">
                        <img src={DetailsIcon} alt="Details" className="profile__category__tabIcon--details" />
                      </div>
                      Details
                    </NavLink>

                    <NavLink exact to={`/${currentAddress}/${routes.COLLECTIBLES}`} className="profile__category__section ">
                      <div className="profile__category__tabIcon__wrappper">
                        <img src={CollectiblesIcon} alt="Collectibles" className="profile__category__tabIcon--collectibles" />
                      </div>
                      Collectibles
                    </NavLink>

                    <NavLink exact to={`/${currentAddress}/${routes.FOLLOWING}`} className="profile__category__section ">
                      <div className="profile__category__tabIcon__wrappper">
                        <img src={ContactsIcon} alt="Following" className="profile__category__tabIcon--contacts" />
                      </div>
                      Following
                    </NavLink>
                  </>
                ) : <PubSideBar isFollowing={isFollowing} isMe={isMe} />}
              </div>
            </div>

            {/* this is showing when its not supposed to, how does it know that its my currentAddress??? */}
            {(!onOtherProfilePage)
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

      <ReactCSSTransitionGroup
        transitionName="app__modals"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
      >
        {(copySuccessful && document.queryCommandSupported('copy')) && (
          <div className="modal__container--copied">
            <div className="modal--sync">
              <div className="modal--sync__copy__wrapper">
                <img src={Copy} className="modal__copy__ico" alt="Copied" />
                <p>COPIED PROFILE URL</p>
              </div>
            </div>
          </div>
        )}
      </ReactCSSTransitionGroup>
    </div>
  );

SideBar.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  emoji: PropTypes.string,
  otherEmoji: PropTypes.string,
  currentAddress: PropTypes.string,
  otherName: PropTypes.string,
  otherDescription: PropTypes.string,
  coverPhoto: PropTypes.array,
  otherCoverPhoto: PropTypes.array,
  location: PropTypes.object.isRequired,
  onOtherProfilePage: PropTypes.bool,
  copySuccessful: PropTypes.bool,
  showSignInBanner: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  isFollowing: PropTypes.bool,
  isMe: PropTypes.bool,
  copyToClipBoard: PropTypes.func.isRequired,
};

SideBar.defaultProps = {
  name: '',
  otherName: '',
  description: '',
  otherEmoji: '',
  otherDescription: '',
  currentAddress: '',
  coverPhoto: [],
  otherCoverPhoto: [],
  emoji: '',
  copySuccessful: false,
  onOtherProfilePage: false,
  showSignInBanner: false,
  isLoggedIn: false,
  isMe: false,
  isFollowing: false,
};

function mapState(state) {
  return {
    name: state.myData.name,
    image: state.myData.image,
    coverPhoto: state.myData.coverPhoto,
    emoji: state.myData.emoji,
    description: state.myData.description,

    currentAddress: state.userState.currentAddress,
    copySuccessful: state.uiState.copySuccessful,
    showSignInBanner: state.uiState.showSignInBanner,
    onOtherProfilePage: state.uiState.onOtherProfilePage,

    isLoggedIn: state.userState.isLoggedIn,

    otherCoverPhoto: state.otherProfile.otherCoverPhoto,
    otherImage: state.otherProfile.otherImage,
    otherName: state.otherProfile.otherName,
    otherEmoji: state.otherProfile.otherEmoji,
    otherDescription: state.otherProfile.otherDescription,
  };
}

export default withRouter(connect(mapState,
  {
    copyToClipBoard,
  })(SideBar));
