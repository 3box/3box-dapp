import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import PubSideBar from './PublicProfile/PubSideBar';
import { copyToClipBoard } from '../../utils/funcs';
import * as routes from '../../utils/routes';
import ActivityIcon from '../../assets/Activity.svg';
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
  image,
  coverPhoto,
  description,
  emoji,
  location,
  onOtherProfilePage,
  copyToClipBoard,
  copySuccessful,
  otherCoverPhoto,
  otherImage,
  otherName,
  otherEmoji,
  otherDescription,
  showSignInBanner,
  currentAddress,
  isFollowing,
  isLoggedIn,
}) => (
    <div>
      {!onOtherProfilePage && (
        coverPhoto && coverPhoto.length > 0 && coverPhoto[0].contentUrl
          ? <img src={`https://ipfs.infura.io/ipfs/${coverPhoto[0].contentUrl['/']}`} className="profile__coverPhoto clearProfPic" alt="profile" />
          : <div className="profile__coverPhoto" />)
      }

      {onOtherProfilePage && (
        otherCoverPhoto.length > 0 && otherCoverPhoto[0].contentUrl
          ? <img src={`https://ipfs.infura.io/ipfs/${otherCoverPhoto[0].contentUrl['/']}`} className={`${showSignInBanner ? 'showSignInBanner' : ''} ${showSignInBanner ? 'bannerMargin' : ''} profile__coverPhoto clearProfPic`} alt="profile" />
          : <div className={`${showSignInBanner ? 'showSignInBanner' : ''} ${showSignInBanner ? 'bannerMargin' : ''} profile__coverPhoto`} />)
      }

      <div id="profile" className={!onOtherProfilePage && 'onMyProfile'}>
        <div id="profile__fixed">

          <div className={`
            ${showSignInBanner ? 'showSignInBanner' : ''} 
            ${onOtherProfilePage ? 'addBorderBottom' : ''} 
            ${(onOtherProfilePage && showSignInBanner) ? 'bannerMargin' : ''} 
            ${(onOtherProfilePage && isLoggedIn) ? 'loggedInMargin' : ''} 
            profile__user__info
          `}
          >

            {!onOtherProfilePage && (
              image && image.length > 0 && image[0].contentUrl
                ? <img src={`https://ipfs.infura.io/ipfs/${image[0].contentUrl['/']}`} className="profile__user__picture clearProfPic" alt="profile" />
                : <div className="profile__user__picture" />)
            }

            {onOtherProfilePage && (
              otherImage.length > 0 && otherImage[0].contentUrl
                ? <img src={`https://ipfs.infura.io/ipfs/${otherImage[0].contentUrl['/']}`} className="profile__user__picture clearProfPic" alt="profile" />
                : <div className="profile__user__picture" />)
            }

            <div className="profile__basic">
              <div className="profile__basic__wrapper">
                {!onOtherProfilePage && (name
                  ? <h2 id="profile__user__name">{name}</h2>
                  : <Link to={`/${currentAddress}/${routes.EDIT}`}><h2 id="profile__user__name__add">Add name</h2></Link>)
                }

                {onOtherProfilePage && (otherName
                  ? <h2 id="profile__user__name">{otherName}</h2>
                  : '')
                }


                <span className="profile__basic__emoji">
                  {(!onOtherProfilePage && emoji) && (emoji.code ? emoji.code : emoji)}
                  {(onOtherProfilePage && otherEmoji) && (otherEmoji.code ? otherEmoji.code : otherEmoji)}
                </span>
              </div>

              <div id="profile__network" title="Network">
                <img id="profile__network__networkLogo" src={EthereumLogo} alt="Ethereum Logo" />
                <p id="profile__details__address" title={currentAddress}>
                  {!onOtherProfilePage && currentAddress && currentAddress.substring(0, 8)}
                  {onOtherProfilePage && location.pathname.split('/')[1].substring(0, 8)}
                  ...
                </p>
              </div>

              <p className="profile__basic__description">
                {!onOtherProfilePage && description}
                {onOtherProfilePage && otherDescription}
              </p>

              {onOtherProfilePage && (
                <div className="publicProfile__basic--mobile">
                  <PubSideBar isFollowing={isFollowing} />
                </div>)}

            </div>

            <div className="profile__category">
              <div className="profile__category__sectionWrapper">
                {!onOtherProfilePage ? (
                  <React.Fragment>
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

                    <NavLink exact to={`/${currentAddress}/${routes.CONTACTS}`} className="profile__category__section ">
                      <div className="profile__category__tabIcon__wrappper">
                        <img src={ContactsIcon} alt="Followers" className="profile__category__tabIcon--contacts" />
                      </div>
                      Followers
                    </NavLink>
                  </React.Fragment>)
                  : (
                    <PubSideBar isFollowing={isFollowing} />)}
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
          <div className="modal__container--copied modal--effect">
            <div className="modal--sync">
              <div className="modal--sync__copy__wrapper">
                <img src={Copy} className="modal__copy__ico" alt="Copied" />
                <p>COPIED PROFILE URL</p>
              </div>
            </div>
          </div>)}
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
  image: PropTypes.array,
  coverPhoto: PropTypes.array,
  otherCoverPhoto: PropTypes.array,
  otherImage: PropTypes.array,
  location: PropTypes.object.isRequired,
  onOtherProfilePage: PropTypes.bool,
  copySuccessful: PropTypes.bool,
  showSignInBanner: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  isFollowing: PropTypes.bool,
  copyToClipBoard: PropTypes.func.isRequired,
};

SideBar.defaultProps = {
  name: '',
  otherName: '',
  description: '',
  otherEmoji: '',
  otherDescription: '',
  currentAddress: '',
  image: [],
  coverPhoto: [],
  otherImage: [],
  otherCoverPhoto: [],
  emoji: '',
  copySuccessful: false,
  onOtherProfilePage: false,
  showSignInBanner: false,
  isLoggedIn: false,
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
