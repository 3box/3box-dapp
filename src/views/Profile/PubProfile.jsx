import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// import { Helmet } from 'react-helmet';

import actions from '../../state/actions';
import {
  PublicProfileLoading,
  SignInThroughPublicProfileBanner,
} from '../../components/Modals';
import { store } from '../../state/store';
import PubContent from './PublicProfile/PubContent';
import SideBar from './SideBar';
import './styles/Profile.css';

const {
  handleSignInBanner,
} = actions.modal;

const {
  checkNetwork,
} = actions.land;

const {
  accountsPromise,
} = actions.signin;

const {
  getOtherProfile,
  getActivity,
  getCollectibles,
} = actions.profile;

class ProfilePublic extends Component {
  async componentDidMount() {
    try {
      window.scrollTo(0, 0);
      const { location: { pathname }, currentAddress } = this.props;
      const otherProfileAddress = pathname.split('/')[1];
      let activeAddress;

      store.dispatch({
        type: 'OTHER_ADDRESS_UPDATE',
        otherProfileAddress,
      });
      store.dispatch({
        type: 'UI_ON_OTHER_PROFILE',
        onOtherProfilePage: true,
      });

      if (typeof window.web3 !== 'undefined') {
        if (!currentAddress) {
          const returnedAddress = await accountsPromise;
          [activeAddress] = returnedAddress;
        } else {
          activeAddress = currentAddress;
        }
        if (otherProfileAddress === activeAddress) this.props.handleSignInBanner();
        await this.props.checkNetwork();
      }

      await this.props.getOtherProfile(otherProfileAddress);
      this.props.getCollectibles(otherProfileAddress, true);
      this.props.getActivity(otherProfileAddress);
    } catch (err) {
      console.error(err);
    }
  }

  componentWillUnmount() {
    store.dispatch({
      type: 'OTHER_ADDRESS_UPDATE',
      otherProfileAddress: '',
    });
    store.dispatch({
      type: 'UI_ON_OTHER_PROFILE',
      onOtherProfilePage: false,
    });
  }

  render() {
    const { isLoadingOtherProfile, showSignInBanner, otherImage, otherName, otherProfileAddress } = this.props;
    return (
      <div>
        {/* <Helmet>
          <title>{otherName}</title>
          <meta name="description" content={`3Box Profile for ${otherProfileAddress}`} />

          <meta property="og:description" content={`3Box Profile for ${otherProfileAddress}`} />
          <meta property="og:url" content={`https://3box.io/${otherProfileAddress}`} />
          <meta property="og:title" content={otherName} />
          <meta property="og:image" content={otherImage} />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@3boxdb" />
          <meta name="twitter:title" content={otherName} />
          <meta name="twitter:description" content={`3Box Profile for ${otherProfileAddress}`} />
          <meta name="twitter:image" content={otherImage} />
        </Helmet> */}

        <SignInThroughPublicProfileBanner show={showSignInBanner} handleSignInBanner={this.props.handleSignInBanner} />

        <div
          id="profile__page"
        >
          <div id="profile__contents">
            <SideBar isPublicProfilePage />
            <PubContent />
          </div>

          <ReactCSSTransitionGroup
            transitionName="app__modals"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
          >

            {isLoadingOtherProfile && <PublicProfileLoading />}
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
}

ProfilePublic.propTypes = {
  getOtherProfile: PropTypes.func.isRequired,
  checkNetwork: PropTypes.func.isRequired,
  getActivity: PropTypes.func.isRequired,
  handleSignInBanner: PropTypes.func.isRequired,
  getCollectibles: PropTypes.func.isRequired,
  pathname: PropTypes.object,
  location: PropTypes.object,
  isLoadingOtherProfile: PropTypes.bool,
  showSignInBanner: PropTypes.bool,
  currentAddress: PropTypes.string,
};

ProfilePublic.defaultProps = {
  pathname: {},
  location: {},
  isLoadingOtherProfile: true,
  showSignInBanner: false,
  currentAddress: '',
};

const mapState = state => ({
  isLoadingOtherProfile: state.otherProfile.isLoadingOtherProfile,
  showSignInBanner: state.uiState.showSignInBanner,
  currentAddress: state.userState.currentAddress,

  otherName: state.otherProfile.otherName,
  otherImage: state.otherProfile.otherImage,
  otherProfileAddress: state.otherProfile.otherProfileAddress,
});

export default withRouter(connect(mapState,
  {
    getOtherProfile,
    checkNetwork,
    getActivity,
    handleSignInBanner,
    getCollectibles,
  })(ProfilePublic));