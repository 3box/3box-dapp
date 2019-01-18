import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';

import { address } from '../../utils/address';
import { copyToClipBoard } from '../../state/actions';
import * as routes from '../../utils/routes';
import EthereumLogo from '../../assets/EthereumIcon.svg';
import Copy from '../../assets/Copy.svg';
import '../../views/styles/Profile.css';
import '../styles/Modal.css';

const SideBar = ({
  name,
  image,
  coverPhoto,
  description,
  emoji,
  publicProfile,
  location,
  onPublicProfilePage,
  copyToClipBoard,
  copySuccessful,
  showDownloadBanner,
}) => (
    <div>
      {!onPublicProfilePage && (
        coverPhoto.length > 0 && coverPhoto[0].contentUrl
          ? <img src={`https://ipfs.infura.io/ipfs/${coverPhoto[0].contentUrl['/']}`} className={`${showDownloadBanner ? 'bannerMargin' : ''} profile__coverPhoto clearProfPic`} alt="profile" />
          : <div className={`${showDownloadBanner ? 'bannerMargin' : ''} profile__coverPhoto`} />)
      }

      {(onPublicProfilePage && publicProfile.coverPhoto) && (
        publicProfile.coverPhoto.length > 0 && publicProfile.coverPhoto[0].contentUrl
          ? <img src={`https://ipfs.infura.io/ipfs/${publicProfile.coverPhoto[0].contentUrl['/']}`} className={`${showDownloadBanner ? 'bannerMargin' : ''} profile__coverPhoto clearProfPic`} alt="profile" />
          : <div className={`${showDownloadBanner ? 'bannerMargin' : ''} profile__coverPhoto`} />)
      }

      <div id="profile">
        <div id="profile__fixed">

          <div className={`${showDownloadBanner ? 'bannerMargin' : ''} profile__user__info`} >

            {!onPublicProfilePage && (
              image.length > 0 && image[0].contentUrl
                ? <img src={`https://ipfs.infura.io/ipfs/${image[0].contentUrl['/']}`} className="profile__user__picture clearProfPic" alt="profile" />
                : <div className="profile__user__picture" />)
            }

            {(onPublicProfilePage && publicProfile.image) && (
              publicProfile.image.length > 0 && publicProfile.image[0].contentUrl
                ? <img src={`https://ipfs.infura.io/ipfs/${publicProfile.image[0].contentUrl['/']}`} className="profile__user__picture clearProfPic" alt="profile" />
                : <div className="profile__user__picture" />)
            }

            <div className="profile__basic">
              <div className="profile__basic__wrapper">
                {!onPublicProfilePage && (name
                  ? <h2 id="profile__user__name">{name}</h2>
                  : <Link to={routes.EDITPROFILE}><h2 id="profile__user__name__add">Add name</h2></Link>)
                }

                {(onPublicProfilePage && publicProfile.name) && (publicProfile.name
                  ? <h2 id="profile__user__name">{publicProfile.name}</h2>
                  : <Link to={routes.EDITPROFILE}><h2 id="profile__user__name__add">Add name</h2></Link>)
                }


                <span className="profile__basic__emoji">
                  {!onPublicProfilePage && (emoji.code ? emoji.code : emoji)}
                  {(onPublicProfilePage && publicProfile.emoji) && (publicProfile.emoji.code ? publicProfile.emoji.code : publicProfile.emoji)}
                </span>
              </div>

              <div id="profile__network" title="Network">
                <img id="profile__network__networkLogo" src={EthereumLogo} alt="Ethereum Logo" />
                <p id="profile__details__address" title={address}>
                  {!onPublicProfilePage && address && address.substring(0, 8)}
                  {onPublicProfilePage && location.pathname.split('/')[2].substring(0, 8)}
                  ...
                </p>
              </div>

              <p className="profile__basic__description">
                {!onPublicProfilePage && description}
                {(onPublicProfilePage && publicProfile.description) && publicProfile.description}
              </p>

            </div>

            {/* this is showing when its not supposed to, how does it know that its my address??? */}
            {(!onPublicProfilePage || address === location.pathname.split('/')[2])
              && (
                <div className="profile__links">
                  {/* If /profile show link to my profile */}
                  {!onPublicProfilePage
                    ? (
                      <Link to={`${routes.PUBLIC_BASE}/${address}${routes.PUBLIC_ACTIVITY_ROUTE}`}>
                        View
                      </Link>
                    )
                    : address === location.pathname.split('/')[2] && (
                      <Link to={routes.PROFILE_ACTIVITY}>
                        Return
                      </Link>
                    )
                  }
                  <button type="button" onClick={() => copyToClipBoard()} className="profile__links__copy">
                    Share
                  </button>
                </div>)}

            <div className="profile__category">
              <div className="profile__category__sectionWrapper">
                <NavLink exact to={onPublicProfilePage ? `${routes.PUBLIC_BASE}/${location.pathname.split('/')[2]}${routes.PUBLIC_ACTIVITY_ROUTE}` : routes.PROFILE_ACTIVITY} className="profile__category__section">Activity</NavLink>
                <NavLink exact to={onPublicProfilePage ? `${routes.PUBLIC_BASE}/${location.pathname.split('/')[2]}${routes.PUBLIC_DETAILS_ROUTE}` : routes.PROFILE_ABOUT} className="profile__category__section ">Details</NavLink>
              </div>
            </div>

          </div>

          <div id="profile__footer">
            <div id="profile__footer__contents">
              <p>3Box 2018</p>
              <Link to={routes.TERMS}>Terms</Link>
              <Link to={routes.PRIVACY}>Privacy</Link>
            </div>
          </div>

        </div>
      </div>

      <div className={`${copySuccessful ? 'showModal' : ''} modal__container--copied modal--effect`}>
        <div className="modal--sync">
          <div className="modal--sync__copy__wrapper">
            <img src={Copy} className="modal__copy__ico" alt="Copied" />
            <p>COPIED PROFILE URL</p>
          </div>
        </div>
      </div>
    </div >
  );

SideBar.propTypes = {
  copyToClipBoard: PropTypes.func.isRequired,
  name: PropTypes.string,
  verifiedGithub: PropTypes.string,
  verifiedTwitter: PropTypes.string,
  email: PropTypes.string,
  website: PropTypes.string,
  job: PropTypes.string,
  school: PropTypes.string,
  degree: PropTypes.string,
  memberSince: PropTypes.string,
  major: PropTypes.string,
  year: PropTypes.string,
  employer: PropTypes.string,
  birthday: PropTypes.string,
  emoji: PropTypes.string,
  image: PropTypes.array,
  coverPhoto: PropTypes.array,
  description: PropTypes.string,
  publicProfile: PropTypes.object,
  location: PropTypes.object.isRequired,
  onPublicProfilePage: PropTypes.bool,
  copySuccessful: PropTypes.bool,
  showDownloadBanner: PropTypes.bool,
};

SideBar.defaultProps = {
  name: '',
  verifiedGithub: '',
  verifiedTwitter: '',
  email: '',
  description: '',
  image: [],
  coverPhoto: [],
  emoji: '',
  memberSince: '',
  website: '',
  birthday: '',
  job: '',
  school: '',
  degree: '',
  major: '',
  year: '',
  employer: '',
  publicProfile: {},
  copySuccessful: false,
  onPublicProfilePage: false,
  showDownloadBanner: false,
};

function mapState(state) {
  return {
    name: state.threeBox.name,
    verifiedGithub: state.threeBox.verifiedGithub,
    verifiedTwitter: state.threeBox.verifiedTwitter,
    image: state.threeBox.image,
    coverPhoto: state.threeBox.coverPhoto,
    emoji: state.threeBox.emoji,
    email: state.threeBox.email,
    description: state.threeBox.description,
    website: state.threeBox.website,
    birthday: state.threeBox.birthday,
    memberSince: state.threeBox.memberSince,
    job: state.threeBox.job,
    school: state.threeBox.school,
    degree: state.threeBox.degree,
    major: state.threeBox.major,
    year: state.threeBox.year,
    employer: state.threeBox.employer,
    publicProfile: state.threeBox.publicProfile,
    copySuccessful: state.threeBox.copySuccessful,
    showDownloadBanner: state.threeBox.showDownloadBanner,
    onPublicProfilePage: state.threeBox.onPublicProfilePage,
  };
}

export default withRouter(connect(mapState,
  {
    copyToClipBoard,
  })(SideBar));
